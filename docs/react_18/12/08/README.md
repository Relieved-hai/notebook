### packages/react-dom-bindings/src/client/ReactDOMHostConfig.js

```js
import {
  // ...
  updateProperties,
} from "./ReactDOMComponent";

// ...

export function commitUpdate(
  domElement,
  updatePayload,
  type,
  oldProps,
  newProps
) {
  updateProperties(domElement, updatePayload, type, oldProps, newProps);
  updateFiberProps(domElement, newProps);
}
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/client/ReactDOMComponent.js

```js
// ...

export function updateProperties(domElement, updatePayload) {
  updateDOMProperties(domElement, updatePayload);
}

function updateDOMProperties(domElement, updatePayload) {
  for (let i = 0; i < updatePayload.length; i += 2) {
    const propKey = updatePayload[i];
    const propValue = updatePayload[i + 1];

    if (propKey === "style") {
      setValueForStyles(domElement, propValue);
    } else if (propKey === "children") {
      setTextContent(domElement, propValue);
    } else {
      setValueForProperty(domElement, propKey, propValue);
    }
  }
}
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberCommitWork.js

```diff
import {
  MutationMask,
  Placement,
+ Update
} from "./ReactFiberFlags";
import {
  FunctionComponent,
  HostComponent,
  HostRoot,
  HostText,
} from "./ReactWorkTags";
import {
  appendChild,
  insertBefore,
+ commitUpdate,
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
  const flags = finishedWork.flags;
  const current = finishedWork.alternate;
  switch (finishedWork.tag) {
    case FunctionComponent:
    case HostRoot:
    case HostText:
      // 递归遍历，这里会进行深度调用自己，当遍历完所有子节点后，才会走出这个循环
      recursivelyTraverseMutationEffects(root, finishedWork);
      // 真正的提交
      commitReconciliationEffects(finishedWork);
      break;

+   case HostComponent: {
+     recursivelyTraverseMutationEffects(root, finishedWork);
+     // 插入
+     commitReconciliationEffects(finishedWork);
+
+     // 更新
+     if (flags & Update) {
+       const instance = finishedWork.stateNode;
+       if (instance !== null) {
+         const newProps = finishedWork.memoizedProps;
+         const oldProps = current !== null ? current.memoizedProps : newProps;
+         const type = finishedWork.type;
+         const updatePayload = finishedWork.updateQueue;
+         finishedWork.updateQueue = null;
+         if (updatePayload) {
+           commitUpdate(
+             instance,
+             updatePayload,
+             type,
+             oldProps,
+             newProps,
+             finishedWork
+           );
+         }
+       }
+     }
+   }

    default:
      break;
  }
}

```

<br/>
<br/>
<br/>

index.jsx

```jsx
function getAge(state, action) {
  switch (action.type) {
    case "add":
      return state + action.value;
    default:
      return state;
  }
}

function FunctionComponent() {
  const [age, setAge] = React.useReducer(getAge, 0);

  return (
    <button
      onClick={() => {
        setAge({ type: "add", value: 1 });
      }}
    >
      {age}
    </button>
  );
}
```
