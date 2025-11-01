### packages/react-reconciler/src/ReactFiberHooks.js

```diff
import { scheduleCallback } from "../../scheduler";
import { createWorkInProgess } from "./ReactFiber";
import { beginWork } from "./ReactFiberBeginWork";
import { completeWork } from "./ReactFiberCompleteWork";
import {
  MutationMask,
  NoFlags,
+ Passive
} from "./ReactFiberFlags";
import {
  commitMutationEffectsOnFiber,
+ commitPassiveUnmountEffects,
+ commitPassiveMountEffects,
} from "./ReactFiberCommitWork";
import { finishQueueingConcurrentUpdates } from "./ReactFiberConcurrentUpdates";

// （工作进行中）‌指当前正在构建或更新的 Fiber 树
let workInProgress = null;
+ let rootDoesHavePassiveEffect = false;
+ let rootWithPendingPassiveEffects = null;

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

  // finishedWork 正在展示的树（通常情况下， finishedWork 和页面基本一致的，当然它有一个时间差，可以忽略）
  // alternate 正在工作处理的树，处理完将会替换成工作树
  const finishedWork = root.current.alternate;
  root.finishedWork = finishedWork;

  // 这步才是真正把处理好的信息，挂载到页面上
  // 三步骤的第三步（① beginWork ② completeWork ③ commitWork）
  commitRoot(root);
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
 * 提交根节点。
 * @param {*} root - 根节点。
 */
function commitRoot(root) {
  const { finishedWork } = root;

+ if (
+   (finishedWork.subtreeFlags & Passive) !== NoFlags ||
+   (finishedWork.flags & Passive) !== NoFlags
+ ) {
+   if (!rootDoesHavePassiveEffect) {
+     rootDoesHavePassiveEffect = true;
+     // scheduleCallback 并不会马上执行 flushPassiveEffect
+     scheduleCallback(flushPassiveEffect);
+   }
+ }

  // 子节点是否有副作用
  const subtreeHasEffects =
    (finishedWork.subtreeFlags & MutationMask) !== NoFlags;
  const rootHasEffect = (finishedWork.flags & MutationMask) !== NoFlags;

  if (subtreeHasEffects || rootHasEffect) {
    commitMutationEffectsOnFiber(finishedWork, root);

+   if (rootDoesHavePassiveEffect) {
+     rootDoesHavePassiveEffect = false;
+     rootWithPendingPassiveEffects = root;
+   }
  }

  // 到这里，两棵树进行了替换
  root.current = finishedWork;
}

+ function flushPassiveEffect() {
+   if (rootWithPendingPassiveEffects !== null) {
+     const root = rootWithPendingPassiveEffects;
+     commitPassiveUnmountEffects(root, root.current);
+     commitPassiveMountEffects(root, root.current);
+   }
+ }

/**
 * 准备一个新的工作栈。
 * @param {*} root - 根节点。
 */
function prepareFreshStack(root) {
  workInProgress = createWorkInProgess(root.current, null);
  finishQueueingConcurrentUpdates();
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

### packages/react-reconciler/src/ReactFiberWorkLoop.js

```js
// ...

function updateEffect(create, deps) {
  return updateEffectImpl(PassiveEffect, HookPassive, create, deps);
}

function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
  const hook = updateWorkInProgressHook();
  const nextDeps = deps === undefined ? null : deps;
  let destroy;

  if (currentHook !== null) {
    const prevEffect = currentHook.memoizedState;
    destroy = prevEffect.destroy;

    if (nextDeps !== null) {
      const prevDeps = prevEffect.deps;
      if (areHookInputsEqual(nextDeps, prevDeps)) {
        // 这里既然没变化，为何还要在push
        hook.memoizedState = pushEffect(hookFlags, create, destroy, nextDeps);
        return;
      }
    }
  }

  currentlyRenderingFiber.flags |= fiberFlags;
  hook.memoizedState = pushEffect(
    HookHasEffect | hookFlags,
    create,
    destroy,
    nextDeps
  );
}

function areHookInputsEqual(nextDeps, prevDeps) {
  if (prevDeps === null) return null;

  for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
    if (Object.is(nextDeps[i], prevDeps[i])) {
      continue;
    }
    return false;
  }

  return true;
}

// ...
```

```diff
/**
 * 用hooks渲染组件
 *
 * @param {Object} current - 当前的Fiber节点
 * @param {Object} workInProgress - 正在进行的Fiber节点
 * @param {Function} Component - 需要渲染的组件
 * @param {Object} props - 组件的props
 * @returns {*} - 组件的子节点
 */
export function renderWithHooks(current, workInProgress, Component, props) {
  // 设置当前正在渲染的fiber节点
  currentlyRenderingFiber = workInProgress;

+ workInProgress.updateQueue = null;

  // 调用函数组件时，定义 hooks
  if (current !== null && current.memoizedState !== null) {
    ReactCurrentDispatcher.current = HooksDispatcherOnUpdate;
  } else {
    ReactCurrentDispatcher.current = HooksDispatcherOnMount;
  }

  // 通过组件和props渲染子节点
  const children = Component(props);

  currentlyRenderingFiber = null;
  workInProgressHook = null;
  currentHook = null;

  return children;
}
```

<br/>
<br/>
<br/>
