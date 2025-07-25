### packages/react-dom-bindings/src/client/ReactDOMHostConfig.js

```js
export function prepareUpdate() {}
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberBeginWork.js

```js
// ...

function updateFunctionComponent(
  current,
  workInProgress,
  Component,
  nextProps
) {
  const nextChildren = renderWithHooks(
    current,
    workInProgress,
    Component,
    nextProps
  );
  reconcileChildren(current, workInProgress, nextChildren);
  return workInProgress.child;
}
```

```diff

/**
 * 开始根据新的虚拟 DOM 构建新的 Fiber 子链表
 *
 * @param {FiberNode} current - 老的Fiber节点
 * @param {FiberNode} workInProgress - 新的Fiber节点
 * @returns {FiberNode|null} 新的子Fiber节点或者null
 */
export function beginWork(current, workInProgress) {
  switch (workInProgress.tag) {
    case IndeterminateComponent:
      return mountIndeterminateComponent(
        current,
        workInProgress,
        workInProgress.type
      );

    // 根节点
    case HostRoot:
      return updateHostRoot(current, workInProgress);

    // 原生节点
    case HostComponent:
      return updateHostComponent(current, workInProgress);

+   // 函数组件
+   case FunctionComponent:
+     const Component = workInProgress.type;
+     const nextProps = workInProgress.pendingProps;
+     return updateFunctionComponent(
+       current,
+       workInProgress,
+       Component,
+       nextProps
+     );

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

### packages/react-reconciler/src/ReactFiberCompleteWork.js

```js
import {
  // ...
  Update,
} from "./ReactFiberFlags";
import {
  // ...
  FunctionComponent,
} from "./ReactWorkTags";
import {
  // ...
  prepareUpdate,
} from "react-dom-bindings/src/client/ReactDOMHostConfig";

function markUpdate(workInProgress) {
  workInProgress.flags |= Update;
}

function updateHostComponent(current, workInProgress, type, newProps) {
  const oldProps = current.memoizedProps;
  const instance = workInProgress.stateNode;
  const updatePayload = prepareUpdate(instance, type, oldProps, newProps);
  workInProgress.updateQueue = updatePayload;
  if (updatePayload) {
    markUpdate(workInProgress);
  }
}
```

```diff

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
+     if (current !== null && workInProgress.stateNode !== null) {
+       updateHostComponent(current, workInProgress, type, newProps);
+     } else {
        const instance = createInstance(type, newProps, workInProgress);
        appendAllChildren(instance, workInProgress);
        workInProgress.stateNode = instance;
        finalizeInitialChildren(instance, type, newProps);
+     }
+     bubbleProperties(workInProgress);
+     break;
+
+   case FunctionComponent:
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
```
