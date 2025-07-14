### packages/react-reconciler/src/ReactFiberWorkLoop.js

```js
import { beginWork } from "./ReactFiberBeginWork";
// ...

/**
 * 执行一个工作单元。
 * @param {*} unitOfWork - 工作单元（无论 workInProgress 是指向根节点、还是遍历时的子节点，其都是一个 fiber 节点）。
 */
function performUnitOfWork(unitOfWork) {
  const current = unitOfWork.alternate;
  // 构建
  const next = beginWork(current, unitOfWork);

  // 调试代码
  workInProgress = null;
}
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberBeginWork.js

```js
import { HostComponent, HostRoot, HostText } from "./ReactWorkTags";
import { mountChildFibers, reconcileChildFibers } from "./ReactChildFiber";
import { processUpdateQueue } from "./ReactFiberClassUpdateQueue";
import { shouldSetTextContent } from "react-dom-bindings/src/client/ReactDOMHostConfig";

/**
 * 根据新的虚拟 DOM 生成新的 Fiber 链表
 *
 * @param {FiberNode} current - 老的父Fiber节点
 * @param {FiberNode} workInProgress - 新的Fiber节点
 * @param {*} nextChildren - 新的子虚拟DOM
 */
function reconcileChildren(current, workInProgress, nextChildren) {
  if (current === null) {
    // 初始挂载
    /* mountChildFibers 待实现 */
    workInProgress.child = mountChildFibers(workInProgress, null, nextChildren);
  } else {
    // 更新
    /* mountChildFibers 待实现 */
    workInProgress.child = reconcileChildFibers(
      workInProgress,
      current.child,
      nextChildren
    );
  }
}

/**
 * 更新 HostRoot 类型的 Fiber 节点
 *
 * @param {FiberNode} current - 老的Fiber节点
 * @param {FiberNode} workInProgress - 新的Fiber节点
 * @returns {FiberNode} 新的子Fiber节点
 */
function updateHostRoot(current, workInProgress) {
  // 处理更新
  processUpdateQueue(workInProgress);
  // 新状态
  const nextState = workInProgress.memoizedState;
  const nextChildren = nextState.element;

  // 参数传入 老fiber，新fiber，新虚拟DOM。会给 workInProgress.child 赋值
  reconcileChildren(current, workInProgress, nextChildren);

  return workInProgress.child;
}

/**
 * 更新原生组件的 Fiber 节点并构建子 Fiber 链表
 *
 * @param {FiberNode} current - 老的Fiber节点
 * @param {FiberNode} workInProgress - 新的Fiber节点
 * @returns {FiberNode} 新的子Fiber节点
 */
function updateHostComponent(current, workInProgress) {
  const { type } = workInProgress;
  const nextProps = workInProgress.pendingProps;
  let nextChildren = nextProps.children;

  const isDirectTextChild = shouldSetTextContent(type, nextProps);
  if (isDirectTextChild) {
    nextChildren = null;
  }

  reconcileChildren(current, workInProgress, nextChildren);

  return workInProgress.child;
}

/**
 * 开始根据新的虚拟 DOM 构建新的 Fiber 子链表
 *
 * @param {FiberNode} current - 老的Fiber节点
 * @param {FiberNode} workInProgress - 新的Fiber节点
 * @returns {FiberNode|null} 新的子Fiber节点或者null
 */
export function beginWork(current, workInProgress) {
  switch (workInProgress.tag) {
    // 根节点
    case HostRoot:
      return updateHostRoot(current, workInProgress);

    // 原生节点
    case HostComponent:
      return updateHostComponent(current, workInProgress);

    case HostText:
      // 这不返回文本节点类型的 fiber 节点，是因为在 fiber 树的构建过程中，对文本做了优化
      return null;

    default:
      return null;
  }
}
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberClassUpdateQueue.js

```js
import assign from "shared/assign";

// ...

/**
 * 根据老状态和更新队列中的更新计算最新的状态
 *
 * @param {FiberNode} workInProgress - 需要计算新状态的fiber节点
 */
export function processUpdateQueue(workInProgress) {
  const queue = workInProgress.updateQueue;
  const pendingQueue = queue.shared.pending;

  // 如果有更新，则清空更新队列并开始计算新的状态
  if (pendingQueue !== null) {
    queue.shared.pending = null;
    const lastPendingUpdate = pendingQueue;
    const firstPendingUpdate = lastPendingUpdate.next;
    // 把更新链表剪开，变成一个单链表
    lastPendingUpdate.next = null;
    let newState = workInProgress.memoizedState;
    let update = firstPendingUpdate;

    // 遍历更新队列，根据老状态和更新对象计算新状态
    while (update) {
      newState = getStateFromUpdate(update, newState);
      update = update.next;
    }

    // 更新 fiber 节点的 memoizedState
    workInProgress.memoizedState = newState;
  }
}

/**
 * 根据老状态和更新对象计算新状态
 *
 * @param {Update} update - 更新对象
 * @param {*} prevState - 老状态
 * @returns {*} 新状态
 */
function getStateFromUpdate(update, prevState) {
  const { payload } = update;
  // 合并prevState和payload为新状态
  return assign({}, prevState, payload);
}
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/client/ReactDOMHostConfig

```js
/**
 * 判断是否需要设置文本内容
 *
 * @param {string} type - DOM元素的类型
 * @param {Object} props - 元素属性对象
 * @return {boolean} - 如果children属性是字符串或数字，返回true，否则返回false
 */
export function shouldSetTextContent(type, props) {
  return (
    typeof props.children === "string" || typeof props.children === "number"
  );
}
```

<br/>
<br/>
<br/>

### packages/shared

```js
const assign = Object.assign;

export default assign;
```
