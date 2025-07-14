### packages/react-reconciler/src/ReactFiberReconciler.js

```js
import { createUpdate, enqueueUpdate } from "./ReactFiberClassUpdateQueue";
import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

// ...

/**
 * 更新容器，将虚拟 DOM 转换为真实 DOM 并插入到容器中。
 *
 * @param {*} element - 虚拟DOM元素。
 * @param {*} container - DOM容器，FiberRootNode。
 */
export function updateContainer(element, container) {
  // 当前的根 Fiber
  const current = container.current;
  // 创建更新
  const update = createUpdate();
  // 要更新的虚拟 DOM
  update.payload = { element };
  // 将更新添加到当前根 Fiber 的更新队列上，并返回根节点
  const root = enqueueUpdate(current, update);
  // 在根 Fiber 上调度更新
  scheduleUpdateOnFiber(root);
}
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberClassUpdateQueue.js

```js
import { markUpdateLaneFromFiberToRoot } from "./ReactFiberConcurrentUpdates";

// ...

/**
 * 创建一个状态更新对象
 *
 * @returns {Update} 更新对象
 */
export function createUpdate() {
  const update = {};
  return update;
}

/**
 * 将更新对象添加到fiber节点的更新队列中
 *
 * @param {FiberNode} fiber - 需要添加更新的 fiber 节点
 * @param {Update} update - 待添加的更新对象
 * @returns {FiberNode} - fiber 根节点
 */
export function enqueueUpdate(fiber, update) {
  const updateQueue = fiber.updateQueue;
  const pending = updateQueue.shared.pending;

  if (pending === null) {
    // 如果 pending 为空，则让 update 自引用形成一个循环链表
    update.next = update;
  } else {
    update.next = pending.next;
    pending.next = update;
  }

  // pending 始终指向最后一个更新对象，形成一个单向循环链表
  updateQueue.shared.pending = update;
  /**
   * pending 为空的情况下，enqueueUpdate 后
   *                               ┌------next-----┐
   *                               |               |
   *                               ▼               |
   * ┌---------┐       ┌-------------------------┐ |
   * | pending |------►| new update = {tag: XXX} |-┘
   * └---------┘       └-------------------------┘
   *
   *
   *
   * ---------------------------------------------------------------------------------------------
   *
   *
   *
   *
   * pending 不为空的情况下，enqueueUpdate 后
   *
   *                         ┌--------------next----------------┐
   *                         ▼                                  |
   *               ┌---------------------┐         ┌-------------------------┐
   *               | update = {tag: XXX} |--next--►| new update = {tag: XXX} |
   *               └---------------------┘         └-------------------------┘
   * ┌---------┐                                                ▲
   * | pending |------------------------------------------------┘
   * └---------┘
   *
   *
   * 再次 enqueueUpdate 后
   *                         ┌------------------------------------------------------next--------┐
   *                         ▼                                                                  |
   *               ┌---------------------┐         ┌---------------------┐         ┌-------------------------┐
   *               | update = {tag: XXX} |--next--►| update = {tag: XXX} |--next--►| new update = {tag: XXX} |
   *               └---------------------┘         └---------------------┘         └-------------------------┘
   * ┌---------┐                                                                                ▲
   * | pending |--------------------------------------------------------------------------------┘
   * └---------┘
   **/

  return markUpdateLaneFromFiberToRoot(fiber);
}
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberConcurrentUpdates.js

```js
import { HostRoot } from "./ReactWorkTags";

/**
 * 从源 Fiber 向上遍历树，找到程序的根节点
 *
 * @param {Fiber} sourceFiber - 源 Fiber。
 * @returns {Node|null} - 如果找到程序的根节点，则返回；否则返回 null。
 */
export function markUpdateLaneFromFiberToRoot(sourceFiber) {
  let node = sourceFiber;
  let parent = sourceFiber.return;

  while (parent !== null) {
    node = parent;
    parent = parent.return;
  }

  // 持续向上遍历树，直到找到程序的根节点，而不是 fiber 树的根节点
  if (node.tag === HostRoot) {
    return node.stateNode;
  }

  return null;
}
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberWorkLoop.js

```js
/**
 * 在 Fiber 上计划更新根节点。
 *
 * @param {*} root - 根节点。
 */
export function scheduleUpdateOnFiber(root) {
  /* 待实现 */
}
```
