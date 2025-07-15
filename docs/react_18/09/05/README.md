### packages/react-reconciler/src/ReactFiberWorkLoop.js

```js
import { scheduleCallback } from "scheduler";
import { createWorkInProgess } from "./ReactFiber";

// （工作进行中）‌指当前正在构建或更新的 Fiber 树
let workInProgress = null;

/**
 * 在 Fiber 上计划更新根节点。
 *  @param {*} root - 根节点。
 */
export function scheduleUpdateOnFiber(root) {
  ensureRootIsScheduled(root);
}

/**
 * 确保根节点被调度执行。
 * @param {*} root - 根节点。
 */
function ensureRootIsScheduled(root) {
  // 利用空余时间执行函数
  scheduleCallback(performConcurrentWorkOnRoot.bind(null, root));
}

/**
 * 执行根节点上的并发工作。
 * @param {*} root - 根节点。
 */
function performConcurrentWorkOnRoot(root) {
  // 先从最简单的同步情况入手
  // 这里并不是渲染到页面上，而是对 fiber 树进行一系列构建和操作
  renderRootSync(root);

  // finishedWork 正在展示的树（通常情况下，finishedWork 和页面基本一致的，当然它有一个时间差，可以忽略）
  // alternate 正在工作处理的树，处理完将会替换成工作树
  const finishedWork = root.current.alternate;
  root.finishedWork = finishedWork;

  // 这步才是真正把处理好的信息，挂载到页面上
  // 三步骤的第三步（① beginWork ② completeWork ③ commitWork）
  // commitRoot(root)
}

/**
 * 同步渲染根节点。
 * @param {*} root - 根节点。
 */
function renderRootSync(root) {
  prepareFreshStack(root);
  workLoopSync();
}

/**
 * 准备一个新的工作栈。
 * @param {*} root - 根节点。
 */
function prepareFreshStack(root) {
  workInProgress = createWorkInProgess(root.current, null);
}

/**
 * 同步工作循环。
 */
function workLoopSync() {
  // 当自上而下遍历时，遍历到对应节点，其也称之为 workInProgress
  while (workInProgress !== null) {
    performUnitOfWork(workInProgress);
  }
}

/**
 * 执行一个工作单元。
 * @param {*} unitOfWork - 工作单元（无论 workInProgress 是指向根节点、还是遍历时的子节点，其都是一个 fiber 节点）。
 */
function performUnitOfWork(unitOfWork) {
  /* 待实现 */
}
```

<br/>
<br/>
<br/>

### packages/scheduler/index.js

```js
export function scheduleCallback(callback) {
  // 先模拟
  requestIdleCallback(callback);
}
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiber.js

```js
// ...

/**
 * 基于旧的Fiber节点和新的属性创建一个新的Fiber节点
 *
 * @param {FiberNode} current - 旧的Fiber节点
 * @param {*} pendingProps - 新的属性
 * @returns {FiberNode} 新的Fiber节点
 */
export function createWorkInProgess(current, pendingProps) {
  let workInProgress = current.alternate;

  if (workInProgress === null) {
    // 没有工作处理中的树
    workInProgress = createFiber(current.tag, pendingProps, current.key);
    workInProgress.type = current.type;
    workInProgress.stateNode = current.stateNode;
    workInProgress.alternate = current;
    current.alternate = workInProgress;
  } else {
    workInProgress.pendingProps = pendingProps;
    workInProgress.type = current.type;
    workInProgress.flags = NoFlags;
    workInProgress.subtreeFlags = NoFlags;
  }

  workInProgress.child = current.child;
  workInProgress.memoizedProps = current.memoizedProps;
  workInProgress.memoizedState = current.memoizedState;
  workInProgress.updateQueue = current.updateQueue;
  workInProgress.sibling = current.sibling;
  workInProgress.index = current.index;

  return workInProgress;
}
```
