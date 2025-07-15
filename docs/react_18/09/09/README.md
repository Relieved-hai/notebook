### packages/react-reconciler/src/ReactFiberCompleteWork.js

```js
import { NoFlags } from "./ReactFiberFlags";
import { HostComponent, HostRoot, HostText } from "./ReactWorkTags";
import {
  createInstance,
  createTextInstance,
  appendInitialChild,
  finalizeInitialChildren,
} from "react-dom-bindings/src/client/ReactDOMHostConfig";

function appendAllChildren(parent, workInProgress) {
  let node = workInProgress.child;

  while (node) {
    if (node.tag === (HostComponent || HostText)) {
      // 原生、文本节点
      appendInitialChild(parent, node.stateNode);
    } else if (node.child !== null) {
      // 先处理深度遍历
      node = node.child;
      continue;
    }

    if (node === workInProgress) {
      return;
    }

    while (node.sibling === null) {
      if (node.return === null || node.return === workInProgress) {
        return;
      }

      node = node.return;
    }

    // 在处理对应的兄弟
    node = node.sibling;
  }
}

/**
 * 完成一个Fiber节点
 *
 * @param {Fiber} current - 当前旧的Fiber节点
 * @param {Fiber} workInProgress - 新建的Fiber节点
 */
export function completeWork(current, workInProgress) {
  const newProps = workInProgress.pendingProps;

  switch (workInProgress.tag) {
    // 这里其实对应的就是 createRoot(document.getElementById("这个 DOM 元素"))
    case HostRoot:
      bubbleProperties(workInProgress);
      break;

    case HostComponent:
      const { type } = workInProgress;
      const instance = createInstance(type, newProps, workInProgress);
      appendAllChildren(instance, workInProgress);
      workInProgress.stateNode = instance;
      finalizeInitialChildren(instance, type, newProps);
      bubbleProperties(workInProgress);
      break;

    case HostText:
      const newText = newProps;
      workInProgress.stateNode = createTextInstance(newText);
      bubbleProperties(workInProgress);
      break;

    default:
      break;
  }
}
/**
 * 冒泡处理已完成Fiber节点的属性
 *
 * @param {Fiber} completedWork - 已完成的Fiber节点
 */
function bubbleProperties(completedWork) {
  let subtreeFlags = NoFlags;
  let child = completedWork.child;

  // 将子节点、子子节点下的 flags 层层上传到 root
  while (child !== null) {
    subtreeFlags |= child.subtreeFlags;
    subtreeFlags |= child.flags;
    child = child.sibling;
  }

  completedWork.subtreeFlags = subtreeFlags;
}
```

<br>
<br>
<br>

### packages/react-dom-bindings/src/client/ReactDOMHostConfig.js

```js
// ...

export function createInstance() {}

export function createTextInstance() {}

export function appendInitialChild() {}

export function finalizeInitialChildren() {}
```
