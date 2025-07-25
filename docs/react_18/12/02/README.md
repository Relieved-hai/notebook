### packages/react/src/ReactCurrentDispatcher.js

```js
const ReactCurrentDispatcher = {
  current: null,
};

export default ReactCurrentDispatcher;
```

<br/>
<br/>
<br/>

### packages/react/src/ReactHooks.js

```js
import ReactCurrentDispatcher from "./ReactCurrentDispatcher";

/**
 * 返回当前的React Dispatcher
 *
 * @return {Object} - 当前的React Dispatcher
 */
function resolveDispatcher() {
  return ReactCurrentDispatcher.current;
}

/**
 * 使用指定的 reducer 函数和初始参数调用当前 dispatcher 的 useReducer 方法
 *
 * @param {Function} reducer - 一个接收两个参数并返回新的state的函数，第一个参数为当前state，第二个参数为派发的action
 * @param {*} initialArg - 作为reducer函数的初始参数，返回的新的state
 * @return {Array} - 包含最新state和dispatch函数的数组
 */
export function useReducer(reducer, initialArg) {
  const dispatcher = resolveDispatcher();
  return dispatcher.useReducer(reducer, initialArg);
}
```

<br/>
<br/>
<br/>

### packages/react/src/ReactSharedInternals.js

```js
import ReactCurrentDispatcher from "./ReactCurrentDispatcher";

const ReactSharedInternals = {
  ReactCurrentDispatcher,
};

export default ReactSharedInternals;
```

<br/>
<br/>
<br/>

### packages/react/src/React.js

```js
import { useReducer } from "./ReactHooks";
import ReactSharedInternals from "./ReactSharedInternals";

export {
  useReducer,
  ReactSharedInternals as __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
};
```

<br/>
<br/>
<br/>

### packages/react/index.js

```js
export {
  useReducer,
  __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
} from "./src/React";
```

<br/>
<br/>
<br/>

### packages/shared/ReactSharedInternals.js

```js
import * as React from "react";

// 从React库中获取内部模块，这个内部模块包含了React的一些内部实现，通常不应该在应用代码中使用
// 由于这是一个内部模块，所以它的名字包含了 "__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED" 这样的警告
// 这是为了提醒开发者不要在应用代码中使用这些内部模块，否则可能导致应用的不稳定甚至崩溃
const ReactSharedInternals =
  React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

// 将这个内部模块导出，这样其他模块就可以使用它了
// 通常情况下，我们不应该在应用代码中使用这些内部模块
export default ReactSharedInternals;
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberHooks.js

```diff
+ import ReactSharedInternals from "shared/ReactSharedInternals";

+ const { ReactCurrentDispatcher } = ReactSharedInternals;
+ // Dispatcher 对象在组件 Mount 时使用的 Hooks
+ const HooksDispatcherOnMount = {
+   useReducer: mountReducer,
+ };

+ function mountReducer(reducer, initialArg) {}

/**
 * 用 hooks 渲染组件
 *
 * @param {Object} current - 当前的Fiber节点
 * @param {Object} workInProgress - 正在进行的Fiber节点
 * @param {Function} Component - 需要渲染的组件
 * @param {Object} props - 组件的props
 * @returns {*} - 组件的子节点
 */
export function renderWithHooks(current, workInProgress, Component, props) {
+ ReactCurrentDispatcher.current = HooksDispatcherOnMount;
  const children = Component(props);
  return children;
}
```
