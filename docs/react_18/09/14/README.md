实现初始化渲染，必须经过 beginWork -> completeWork -> commitWork 阶段，那么函数组件也不例外，但改造过程不涉及 completeWork，因为 completeWork 的作用是把对应 fiber 节点的真实 DOM 生成，而函数组件本事是没有真实 DOM 节点的，而它返回的 JSX 是可以有真实节点的

<br/>

### packages/react-reconciler/ReactFiberBeginWork.js

```js
import {
  // ...
  FunctionComponent,
  IndeterminateComponent,
} from "./ReactWorkTags";
import { renderWithHooks } from "./ReactFiberHooks";

function mountIndeterminateComponent(current, workInProgress, Component) {
  const props = workInProgress.pendingProps;
  const value = renderWithHooks(current, workInProgress, Component, props);
  // 源码中，这里会判断是 ClassComponent？FunctionComponent？
  // 这就不实现 ClassComponent，全当 FunctionComponent 处理
  workInProgress.tag = FunctionComponent;
  reconcileChildren(current, workInProgress, value);
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
    case IndeterminateComponent:
      return mountIndeterminateComponent(
        current,
        workInProgress,
        workInProgress.type
      );

    // ...
  }
}
```

<br/>
<br/>
<br/>

### packages/react-reconciler/ReactFiberCommitWork.js

```js
import {
  // ...
  FunctionComponent,
} from "./ReactWorkTags";

/**
 * 遍历 fiber 树并在每个 fiber 上应用 mutation 副作用
 *
 * @param {Fiber} finishedWork - 已完成的工作单位，即fiber节点
 * @param {Fiber} root - fiber树的根节点
 */
export function commitMutationEffectsOnFiber(finishedWork, root) {
  switch (finishedWork.tag) {
    case FunctionComponent:
    case HostRoot:
    case HostComponent:
    case HostText:
    //...
  }
}
```

<br/>
<br/>
<br/>

### packages/react-reconciler/ReactFiberHooks.js

```js
export function renderWithHooks(current, workInProgress, Component, props) {
  const children = Component(props);
  return children;
}
```
