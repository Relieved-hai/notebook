### packages/react-reconciler/src/ReactFiberWorkLoop.js

```js
import { MutationMask, NoFlags } from "./ReactFiberFlags";
import { commitMutationEffectsOnFiber } from "./ReactFiberCommitWork";

// ...

/**
 * 执行根节点上的并发工作。
 * @param {*} root - 根节点。
 */
function performConcurrentWorkOnRoot(root) {
  // ...

  commitRoot(root);
}

/**
 * 提交根节点。
 * @param {*} root - 根节点。
 */
function commitRoot(root) {
  const { finishedWork } = root;
  // 子节点是否有副作用
  const subtreeHasEffects =
    (finishedWork.subtreeFlags & MutationMask) !== NoFlags;
  const rootHasEffect = (finishedWork.flags & MutationMask) !== NoFlags;

  if (subtreeHasEffects || rootHasEffect) {
    commitMutationEffectsOnFiber(finishedWork, root);
  }

  // 到这里，两棵树进行了替换
  root.current = finishedWork;
}
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberCommitWork.js

```js
import { MutationMask, Placement } from "./ReactFiberFlags";
import { HostComponent, HostRoot, HostText } from "./ReactWorkTags";
import {
  appendChild,
  insertBefore,
} from "react-dom-bindings/src/client/ReactDOMHostConfig";

/**
 * 递归遍历所有子节点并在每个 fiber 上应用 mutation 副作用
 *
 * @param {Fiber} root - Fiber树的根节点
 * @param {Fiber} parentFiber - 当前fiber节点的父节点
 */
function recursivelyTraverseMutationEffects(root, parentFiber) {
  // 子节点是否有需要提交的内容
  if (parentFiber.subtreeFlags & MutationMask) {
    let { child } = parentFiber;
    while (child !== null) {
      commitMutationEffectsOnFiber(child, root);
      child = child.sibling;
    }
  }
}

/**
 * 应用 fiber 节点上的调和副作用
 *
 * @param {Fiber} finishedWork - 已完成的工作单位，即fiber节点
 */
function commitReconciliationEffects(finishedWork) {
  const { flags } = finishedWork;
  // 是否有插入动作
  if (flags & Placement) {
    // 真正的提交实现
    commitPlacement(finishedWork);
  }
}

/**
 * 判断是否为宿主父节点
 *
 * @param {Fiber} fiber - fiber节点
 * @returns {Boolean} 是宿主父节点则返回true，否则返回false
 */
function isHostParent(fiber) {
  return fiber.tag === HostComponent || fiber.tag === HostRoot;
}

/**
 * 获取fiber节点的宿主父节点（原生节点，如 div、p、span、...，不能是 FunctionComponent、ClassComponent）
 *
 * @param {Fiber} fiber - fiber节点
 * @returns {Fiber} fiber节点的宿主父节点
 */
function getHostParentFiber(fiber) {
  let parent = fiber.return;

  while (parent !== null) {
    if (isHostParent(parent)) {
      return parent;
    }
    parent = parent.return;
  }
}

/**
 * 获取宿主兄弟节点
 * @param {Fiber} fiber - fiber节点
 * @returns {Node|null} 如果存在宿主兄弟节点则返回，否则返回null
 */
function getHostSibling(fiber) {
  let node = fiber;

  // 无线循环
  siblings: while (true) {
    // 兄弟节点不存在
    while (node.sibling === null) {
      // 父节点不存在 || 父节点是个原生节点
      if (node.return === null || isHostParent(node.return)) {
        return null;
      }
      node = node.return;
    }

    // 兄弟节点存在
    node = node.sibling;
    // 不是原生节点、不是文本节点
    while (node.tag !== HostComponent && node.tag !== HostText) {
      // 如果有插入需要，继续找兄弟，继续 siblings 循环
      if (node.flags & Placement) {
        continue siblings; // 跳到外层循环的下一个迭代
      } else {
        node = node.child;
      }
    }

    // 不需要插入
    if (!(node.flags & Placement)) {
      return node.stateNode;
    }
  }
}

/**
 * 将节点插入或附加到父节点
 *
 * @param {Fiber} node - fiber节点
 * @param {Node} before - 参考节点（插到这个兄弟节点前面）
 * @param {Node} parent - 父节点
 */
function insertOrAppendPlacementNode(node, before, parent) {
  const { tag } = node;
  // 是否是宿主类型节点
  const isHost = tag === HostComponent || tag === HostText;

  if (isHost) {
    const { stateNode } = node;
    if (before) {
      insertBefore(parent, stateNode, before);
    } else {
      appendChild(parent, stateNode);
    }
  } else {
    const { child } = node;
    if (child !== null) {
      insertOrAppendPlacementNode(child, before, parent);
      let { sibling } = child;
      while (sibling !== null) {
        insertOrAppendPlacementNode(sibling, before, parent);
        sibling = sibling.sibling;
      }
    }
  }
}

/**
 * 提交位置
 *
 * @param {Fiber} finishedWork - 已完成的工作单位，即fiber节点
 */
function commitPlacement(finishedWork) {
  const parentFiber = getHostParentFiber(finishedWork);

  switch (parentFiber.tag) {
    case HostRoot: {
      const parent = parentFiber.stateNode.containerInfo;
      const before = getHostSibling(finishedWork);
      // 这里真正的操作 DOM
      insertOrAppendPlacementNode(finishedWork, before, parent);
      break;
    }

    case HostComponent: {
      const parent = parentFiber.stateNode;
      const before = getHostSibling(finishedWork);
      insertOrAppendPlacementNode(finishedWork, before, parent);
      break;
    }

    default:
      break;
  }
}

/**
 * 遍历 fiber 树并在每个 fiber 上应用 mutation 副作用
 *
 * @param {Fiber} finishedWork - 已完成的工作单位，即fiber节点
 * @param {Fiber} root - fiber树的根节点
 */
export function commitMutationEffectsOnFiber(finishedWork, root) {
  switch (finishedWork.tag) {
    case HostRoot:
    case HostComponent:
    case HostText:
      // 递归遍历，这里会进行深度调用自己，当遍历完所有子节点后，才会走出这个循环
      recursivelyTraverseMutationEffects(root, finishedWork);
      // 真正的提交
      commitReconciliationEffects(finishedWork);
      break;

    default:
      break;
  }
}
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/client/ReactDOMHostConfig.js

```js
// ...

/**
 * 将子节点附加到父节点
 *
 * @param {HTMLElement} parentInstance - 父节点
 * @param {HTMLElement|Text} child - 子节点
 *
 * appendChild函数用于将子节点附加到指定的父节点。
 */
export function appendChild(parentInstance, child) {
  parentInstance.appendChild(child);
}

/**
 * 在指定子节点前插入新的子节点
 *
 * @param {HTMLElement} parentInstance - 父节点
 * @param {HTMLElement|Text} child - 需要插入的新子节点
 * @param {HTMLElement|Text} beforeChild - 指定的子节点
 *
 * insertBefore函数用于在父节点的指定子节点前插入一个新的子节点。
 */
export function insertBefore(parentInstance, child, beforeChild) {
  parentInstance.insertBefore(child, beforeChild);
}
```
