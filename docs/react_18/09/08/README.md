### packages/react-reconciler/src/ReactFiberWorkLoop.js

```js
import { completeWork } from "./ReactFiberCompleteWork";

// ...

/**
 * 执行一个工作单元。
 * @param {*} unitOfWork - 工作单元（无论 workInProgress 是指向根节点、还是遍历时的子节点，其都是一个 fiber 节点）。
 */
function performUnitOfWork(unitOfWork) {
  const current = unitOfWork.alternate;
  // 构建
  const next = beginWork(current, unitOfWork);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;

  if (next === null) {
    completeUnitOfWork(unitOfWork);
  } else {
    workInProgress = next;
  }
}

/**
 * 完成一个工作单元。
 * @param {*} unitOfWork - 工作单元。
 */
function completeUnitOfWork(unitOfWork) {
  let completedWork = unitOfWork;

  do {
    const current = completedWork.alternate;
    const returnFiber = completedWork.return;
    completeWork(current, completedWork);

    const siblingFiber = completedWork.sibling;
    if (siblingFiber !== null) {
      workInProgress = siblingFiber;
      return;
    }

    completedWork = returnFiber;
    workInProgress = completedWork;
  } while (completedWork !== null);
}
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberCompleteWork.js

```js
export function completeWork(current, workInProgress) {}
```
