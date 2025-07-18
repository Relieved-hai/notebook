### packages/react-dom-bindings/src/events/ReactDOMEventListener.js

```js
import getEventTarget from "./getEventTarget";
import { getClosestInstanceFromNode } from "../client/ReactDOMComponentTree";
import { dispatchEventForPluginEventSystem } from "./DOMPluginEventSystem";

// ...
/**
 * 调度离散事件。
 *
 * @param {string} domEventName - DOM事件名称。
 * @param {number} eventSystemFlags - 事件系统标志，用于表示事件在哪个阶段（冒泡/捕获）。
 * @param {HTMLElement} container - 目标容器，通常是一个HTML元素。
 * @param {Event} nativeEvent - 原生的浏览器事件对象。
 */
function dispatchDiscreteEvent(
  domEventName,
  eventSystemFlags,
  container,
  nativeEvent
) {
  dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
}

/**
 * 调度一个事件。
 *
 * @param {string} domEventName - DOM事件名称。
 * @param {number} eventSystemFlags - 事件系统标志，用于表示事件在哪个阶段（冒泡/捕获）。
 * @param {HTMLElement} targetContainer - 目标容器，通常是一个HTML元素。
 * @param {Event} nativeEvent - 原生的浏览器事件对象。
 */
export function dispatchEvent(
  domEventName,
  eventSystemFlags,
  targetContainer,
  nativeEvent
) {
  const nativeEventTarget = getEventTarget(nativeEvent);
  // 如何通过 DOM元素 找到 Fiber 对象的呢？ => ReactDOMHostConfig.js
  const targetInst = getClosestInstanceFromNode(nativeEventTarget);
  dispatchEventForPluginEventSystem(
    domEventName,
    eventSystemFlags,
    nativeEvent,
    targetInst,
    targetContainer
  );
}
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/events/getEventTarget.js

```js
/**
 * 获取原生事件的目标元素。如果原生事件没有目标元素，
 * 则尝试获取事件的 `srcElement`，如果仍然没有，则返回全局 `window` 对象。
 *
 * @param {Event} nativeEvent - 原生的 DOM 事件对象
 * @returns {EventTarget|Window} - 事件的目标元素或 `window` 对象
 */
function getEventTarget(nativeEvent) {
  const target = nativeEvent.target || nativeEvent.srcElement || window;
  return target;
}

export default getEventTarget;
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/client/ReactDOMComponentTree.js

```js
const randomKey = Math.random().toString(36).slice(2);
const internalInstanceKey = "__reactFiber$" + randomKey;
const internalPropsKey = "__reactProps$" + randomKey;

export function precacheFiberNode(hostInst, node) {
  node[internalInstanceKey] = hostInst;
}

export function updateFiberProps(node, props) {
  node[internalPropsKey] = props;
}

export function getClosestInstanceFromNode(targetNode) {
  const targetInst = targetNode[internalInstanceKey];
  return targetInst;
}
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/client/ReactDOMHostConfig.js

```diff
import { precacheFiberNode, updateFiberProps } from "./ReactDOMComponentTree";

// ...

/**
 * 创建DOM元素实例
 *
 * @param {string} type - DOM元素的类型
 * @return {HTMLElement} - 创建的DOM元素
 *
 * createInstance函数用于创建一个新的DOM元素，元素类型由传入的type参数指定。
 */
export function createInstance(type, props, internalInstanceHandle) {
  const domElement = document.createElement(type);
+ // 将 fiber 关联到 dom 上
+  precacheFiberNode(internalInstanceHandle, domElement);
+ // 将 props 关联到 dom 上
+  updateFiberProps(domElement, props);
  return domElement;
}
```
