### packages/react/src/ReactHooks.js

```js
// ...

export function useState(initialArg) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useState(initialArg);
}
```

<br/>
<br/>
<br/>

### packages/react/src/React.js

```diff
import {
  useReducer,
+ useState
} from "./ReactHooks";
import ReactSharedInternals from "./ReactSharedInternals";

export {
  useReducer,
+ useState,
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
+ useState,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
} from "./src/React";

```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberHooks.js

```js
const HooksDispatcherOnMount = {
  // ...
  useState: mountState,
};
const HooksDispatcherOnUpdate = {
  // ...
  useState: updateState,
};

// ...

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

// ...

function updateState() {
  return updateReducer(baseStateRedcuer);
}

// ...

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

// ...
```
