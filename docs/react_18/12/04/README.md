### packages/react-reconciler/src/ReactFiberHooks.js

```diff
+ import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";
+ import { enqueueConcurrentHookUpdate } from "./ReactFiberConcurrentUpdates";

// ...

+ // Dispatcher 对象在组件 Update 时使用的 Hooks
+ const HooksDispatcherOnUpdate = {
+   useReducer: updateReducer,
+ };

/**
 * Dispatch函数，用于处理reducer action的派发
 *
 * @param {Object} fiber - 当前正在处理的Fiber节点
 * @param {Object} queue - 包含pending状态的队列
 * @param {*} action - 需要被处理的action
 */
function dispatchReducerAction(fiber, queue, action) {
+  const update = {
+    action,
+    next: null,
+  };
+  // 根节点，存储数据 都做了
+  const root = enqueueConcurrentHookUpdate(fiber, queue, update);
+  // 调度了开始更新
+  scheduleUpdateOnFiber(root);
}

/**
 * 用hooks渲染组件
 *
 * @param {Object} current - 当前的Fiber节点
 * @param {Object} workInProgress - 正在进行的Fiber节点
 * @param {Function} Component - 需要渲染的组件
 * @param {Object} props - 组件的props
 * @returns {*} - 组件的子节点
 */
export function renderWithHooks(current, workInProgress, Component, props) {
  // 设置当前正在渲染的fiber节点
  currentlyRenderingFiber = workInProgress;

+ if (current !== null && current.memoizedState !== null) {
+   ReactCurrentDispatcher.current = HooksDispatcherOnUpdate;
+ } else {
    ReactCurrentDispatcher.current = HooksDispatcherOnMount;
+ }

  // 通过组件和props渲染子节点
  const children = Component(props);

+ currentlyRenderingFiber = null;
+ workInProgressHook = null;

  return children;
}

```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberConcurrentUpdates.js

```js
// ...

// 并发队列数组
const concurrentQueue = [];
// 并发队列索引
let concurrentQueuesIndex = 0;

/**
 * 将更新加入并发队列
 *
 * @param {Object} fiber - fiber对象
 * @param {Object} queue - 更新队列
 * @param {Object} update - 更新对象
 * @param {number} lane - 车道信息
 */
function enqueueUpdate(fiber, queue, update) {
  concurrentQueue[concurrentQueuesIndex++] = fiber;
  concurrentQueue[concurrentQueuesIndex++] = queue;
  concurrentQueue[concurrentQueuesIndex++] = update;
}

/**
 * 获取更新的fiber的根节点
 *
 * @param {Object} sourceFiber - 源fiber节点
 * @returns {Object|null} fiber的根节点，如果不存在则返回null
 */
function getRootForUpdateFiber(sourceFiber) {
  let node = sourceFiber;
  let parent = node.return;

  while (parent !== null) {
    node = parent;
    parent = node.return;
  }

  return node.tag === HostRoot ? node.stateNode : null;
}

/**
 * 将钩子更新加入并发队列
 *
 * @param {Object} fiber - fiber对象
 * @param {Object} queue - 更新队列
 * @param {Object} update - 更新对象
 * @param {number} lane - 车道信息
 * @returns {Object|null} 更新的fiber的根，如果不存在则返回null
 */
export function enqueueConcurrentHookUpdate(fiber, queue, update) {
  enqueueUpdate(fiber, queue, update);
  return getRootForUpdateFiber(fiber);
}

/**
 * 完成并发更新的排队
 */
export function finishQueueingConcurrentUpdates() {
  // 最大的索引值
  const endIndex = concurrentQueuesIndex;
  // 重置索引
  concurrentQueuesIndex = 0;

  let i = 0;
  while (i < endIndex) {
    const fiber = concurrentQueue[i++];
    const queue = concurrentQueue[i++];
    const update = concurrentQueue[i++];

    if (queue !== null && update !== null) {
      const pending = queue.pending;

      if (pending === null) {
        update.next = update;
      } else {
        update.next = pending.next;
        pending.next = update;
      }

      queue.pending = update;
    }
  }
}

// ...
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberWorkLoop.js

```diff
+ import { finishQueueingConcurrentUpdates } from "./ReactFiberConcurrentUpdates";

// ...

/**
 * 准备一个新的工作栈。
 * @param {*} root - 根节点。
 */
function prepareFreshStack(root) {
  workInProgress = createWorkInProgess(root.current, null);
+ finishQueueingConcurrentUpdates();
}
```
