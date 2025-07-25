### packages/react-reconciler/src/ReactFiberHooks.js

```js
// ...

// 当前正在渲染的 Fiber 节点
let currentlyRenderingFiber = null;
// 进行中的 Hook
let workInProgressHook = null;

/**
 * Mount期间用于处理 useReducer hook 的函数
 *
 * @param {Function} reducer - 进行state更新的函数
 * @param {*} initialArg - reducer函数的初始参数
 * @returns {Array} - 包含最新state和dispatch函数的数组
 */
function mountReducer(reducer, initialArg) {
  const hook = mountWorkInProgressHook();
  // 记录当前hook的初始状态
  hook.memoizedState = initialArg;
  const queue = {
    // 初始化pending队列为null
    pending: null,
  };
  // 将queue对象赋值给hook的queue属性
  hook.queue = queue;
  // 创建dispatch函数，用于后续的action派发
  const dispatch = dispatchReducerAction.bind(
    null,
    currentlyRenderingFiber,
    queue
  );

  // 返回包含最新状态和dispatch函数的数组
  return [hook.memoizedState, dispatch];
}

/**
 * Dispatch函数，用于处理reducer action的派发
 *
 * @param {Object} fiber - 当前正在处理的Fiber节点
 * @param {Object} queue - 包含pending状态的队列
 * @param {*} action - 需要被处理的action
 */
function dispatchReducerAction(fiber, queue, action) {
  console.log("dispatch");
}

/**
 * 在mount期间为每个hook创建一个新的工作进度（work-in-progress）对象
 *
 * @returns {Object} - 包含memoizedState, queue, next的hook对象
 */
function mountWorkInProgressHook() {
  const hook = {
    memoizedState: null,
    queue: null,
    next: null,
  };

  if (workInProgressHook === null) {
    // 如果当前没有进行中的hook，设置新的hook为进行中的hook，并将其设置为当前渲染fiber的状态
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // 如果已经有进行中的hook，将新的hook添加到链表的最后，并将其设置为当前进行中的hook
    workInProgressHook = workInProgressHook.next = hook;
  }

  return workInProgressHook; // 返回当前进行中的hook
}
```

```diff
export function renderWithHooks(current, workInProgress, Component, props) {
+ // 设置当前正在渲染的fiber节点
+ currentlyRenderingFiber = workInProgress;
  ReactCurrentDispatcher.current = HooksDispatcherOnMount;
  const children = Component(props);
  return children;
}

```
