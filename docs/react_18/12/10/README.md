```js
function FunctionComponent() {
  const [age, setAge] = React.useState(0);

  React.useEffect(() => {});
  React.useEffect(() => {});

  return (
    <button
      onClick={() => {
        setAge(age + 1);
        setAge((prev) => prev + 1);
      }}
    >
      {age}
    </button>
  );
}
```

对于 Effect 来说，初次挂载的总体执行顺序是？

- 首先要执行这个函数组件，拿到对应返回的虚拟 DOM。
- React.useEffect 会执行，但它里面的函数并不会马上执行，目前处于渲染阶段，这个阶段仅仅是想拿到对应的虚拟 DOM
- 当中的函数是为了处理副作用，只能在提交阶段执行，把 DOM 都准备好了，准备提交到 document 文档上去了，也就是 commitWork（当 commitWork 完成后，浏览器空闲了，便会执行 useEffect）

<br/>
<br/>
<br/>

### packages/react/src/ReactHooks.js

```js
// ...

export function useEffect(create, deps) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useEffect(create, deps);
}
```

<br/>
<br/>
<br/>

### packages/react/src/React.js

```diff
import {
  useReducer,
  useState,
+ useEffect,
} from "./ReactHooks";
import ReactSharedInternals from "./ReactSharedInternals";

export {
  useReducer,
  useState,
+ useEffect,
  // 这是为了提醒开发者不要在应用代码中使用这些内部模块，否则可能导致应用的不稳定甚至崩溃
  ReactSharedInternals as __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
};
```

<br/>
<br/>
<br/>

### packages/react/index.js

```diff
export {
  useReducer,
  useState,
+ useEffect,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
} from "./src/React";

```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberFlags.js

```js
// ...

// 标识位：消极的（在 React 中意味着相对滞后的操作）
export const Passive = 0b00000000000000010000000000;
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactHookEffectTags.js

```js
export const NoFlags = 0b0000;
export const HasEffect = 0b0001;
// 标识位：积极的
export const Layout = 0b0100;
// 标识位：消极的（在 React 中意味着相对滞后的操作）
export const Passive = 0b1000;
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberHooks.js

```diff
import ReactSharedInternals from "shared/ReactSharedInternals";
import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";
import { enqueueConcurrentHookUpdate } from "./ReactFiberConcurrentUpdates";
+ import { Passive as PassiveEffect } from "./ReactFiberFlags";
+ import {
+   HasEffect as HookHasEffect,
+   Passive as HookPassive,
+ } from "./ReactHookEffectTags";

const { ReactCurrentDispatcher } = ReactSharedInternals;
const HooksDispatcherOnMount = {
  useReducer: mountReducer,
  useState: mountState,
+ useEffect: mountEffect,
};
const HooksDispatcherOnUpdate = {
  useReducer: updateReducer,
  useState: updateState,
+ useEffect: updateEffect,
};

// 当前正在渲染的 Fiber 节点
let currentlyRenderingFiber = null;
// 进行中的 Hook
let workInProgressHook = null;
let currentHook = null;

/**
 * Mount期间用于处理 useReducer hook 的函数
 *
 * @param {Function} reducer - 进行state更新的函数
 * @param {*} initialArg - reducer函数的初始参数
 * @returns {Array} - 包含最新state和dispatch函数的数组
 */
function mountReducer(reducer, initialArg) {
  const hook = mountWorkInProgressHook();
  // 记录当前hook的初始状态
  hook.memoizedState = initialArg;
  const queue = {
    // 初始化pending队列为null
    pending: null,
  };
  // 将queue对象赋值给hook的queue属性
  hook.queue = queue;
  // 创建dispatch函数，用于后续的action派发
  const dispatch = (queue.dispatch = dispatchReducerAction.bind(
    null,
    currentlyRenderingFiber,
    queue
  ));

  // 返回包含最新状态和dispatch函数的数组
  return [hook.memoizedState, dispatch];
}

function baseStateRedcuer(state, action) {
  return typeof action === "function" ? action(state) : action;
}

function mountState(initialState) {
  const hook = mountWorkInProgressHook();
  hook.memoizedState = initialState;
  const queue = {
    pending: null,
    dispatch: null,
    lastRenderdReducer: baseStateRedcuer,
    lastRebderdState: initialState,
  };
  hook.queue = queue;
  const dispatch = (queue.dispatch = dispatchSetStateAction.bind(
    null,
    currentlyRenderingFiber,
    queue
  ));
  return [hook.memoizedState, dispatch];
}

+ function mountEffect(create, deps) {
+   // PassiveEffect：消极的副作用（执行时机相对靠后）
+   return mountEffectImpl(PassiveEffect, HookPassive, create, deps);
+ }

+ function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
+   const hook = mountWorkInProgressHook();
+   const nextDeps = deps === undefined ? null : deps;
+   currentlyRenderingFiber.flags |= fiberFlags;
+   // HookHasEffect | hookFlags（hook 是否有副作用，是否是消极的）
+   hook.memoizedState = pushEffect(
+     HookHasEffect | hookFlags,
+     create,
+     undefined,
+     nextDeps
+   );
+ }

+ function pushEffect(tag, create, destroy, deps) {
+   const effect = {
+     tag,
+     create,
+     destroy,
+     deps,
+     next: null,
+   };
+
+   let componentUpdateQueue = currentlyRenderingFiber.updateQueue;
+   if (componentUpdateQueue === null) {
+     componentUpdateQueue = createFunctionComponentUpdateQueue();
+     currentlyRenderingFiber.updateQueue = componentUpdateQueue;
+     componentUpdateQueue.lastEffect = effect.next = effect;
+   } else {
+     const lastEffect = componentUpdateQueue.lastEffect;
+     if (lastEffect === null) {
+       componentUpdateQueue.lastEffect = effect.next = effect;
+     } else {
+       const firstEffect = lastEffect.next;
+       lastEffect.next = effect;
+       effect.next = firstEffect;
+       componentUpdateQueue.lastEffect = effect;
+     }
+   }
+
+   return effect;
+ }

+ function createFunctionComponentUpdateQueue() {
+   return {
+     lastEffect: null,
+   };
+ }

function updateReducer(reducer) {
  const hook = updateWorkInProgressHook();
  const queue = hook.queue;
  const current = currentHook;
  const pendingQueue = queue.pending;

  let newState = current.memoizedState;
  if (pendingQueue !== null) {
    queue.pending = null;
    const firstUpdate = pendingQueue.next;
    let update = firstUpdate;
    do {
      const action = update.action;
      newState = reducer(newState, action);
      update = update.next;
    } while (update !== null && update !== firstUpdate);
  }
  hook.memoizedState = newState;

  return [hook.memoizedState, queue.dispatch];
}

function updateState() {
  return updateReducer(baseStateRedcuer);
}

+ function updateEffect(create) {}

/**
 * Dispatch函数，用于处理reducer action的派发
 *
 * @param {Object} fiber - 当前正在处理的Fiber节点
 * @param {Object} queue - 包含pending状态的队列
 * @param {*} action - 需要被处理的action
 */
function dispatchReducerAction(fiber, queue, action) {
  const update = {
    action,
    next: null,
  };
  // 根节点，存储数据 都做了
  const root = enqueueConcurrentHookUpdate(fiber, queue, update);
  // 调度了开始更新
  scheduleUpdateOnFiber(root);
}

function dispatchSetStateAction(fiber, queue, action) {
  const update = {
    action,
    hasEagerState: false, // 优化使用
    eagerState: null, // 优化使用
    next: null,
  };
  const { lastRenderdReducer, lastRebderdState } = queue;
  const eagerState = lastRenderdReducer(lastRebderdState, action);
  update.eagerState = eagerState;
  update.hasEagerState = true;

  // 如果结果一样，就不需要渲染了
  if (Object.is(eagerState, lastRebderdState)) {
    return;
  }

  // 根节点，存储数据 都做了
  const root = enqueueConcurrentHookUpdate(fiber, queue, update);
  // 调度了开始更新
  scheduleUpdateOnFiber(root);
}

/**
 * 在mount期间为每个hook创建一个新的工作进度（work-in-progress）对象
 *
 * @returns {Object} - 包含memoizedState, queue, next的hook对象
 */
function mountWorkInProgressHook() {
  const hook = {
    memoizedState: null,
    queue: null,
    next: null,
  };

  if (workInProgressHook === null) {
    // 如果当前没有进行中的hook，设置新的hook为进行中的hook，并将其设置为当前渲染fiber的状态
    currentlyRenderingFiber.memoizedState = workInProgressHook = hook;
  } else {
    // 如果已经有进行中的hook，将新的hook添加到链表的最后，并将其设置为当前进行中的hook
    workInProgressHook = workInProgressHook.next = hook;
  }

  return workInProgressHook; // 返回当前进行中的hook
}

function updateWorkInProgressHook() {
  if (currentHook === null) {
    const current = currentlyRenderingFiber.alternate;
    currentHook = current.memoizedState;
  } else {
    currentHook = currentHook.next;
  }

  const newHook = {
    memoizedState: currentHook.memoizedState,
    queue: currentHook.queue,
    next: null,
  };

  if (workInProgressHook === null) {
    currentlyRenderingFiber.memoizedState = workInProgressHook = newHook;
  } else {
    workInProgressHook = workInProgressHook.next = newHook;
  }

  return workInProgressHook;
}

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
