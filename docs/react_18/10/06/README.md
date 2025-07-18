### packages/react-dom-bindings/src/events/DOMPluginEventSystem.js

```js
import { HostComponent } from "react-reconciler/src/ReactWorkTags";
import getListener from "./getListener";

// ...

/**
 * 累积单阶段监听器(层层往上找，找到对应的事件，知道顶层停下)
 *
 * @param {Fiber} targetFiber 目标Fiber实例
 * @param {string} reactName React事件名称
 * @param {string} nativeEventType 原生事件类型
 * @param {boolean} isCapturePhase 是否在捕获阶段
 */
export function accumulateSinglePhaseListeners(
  targetFiber,
  reactName,
  nativeEventType,
  isCapturePhase
) {
  // click -> onClick/onClickCapture
  const reactEventName = isCapturePhase ? reactName + "Capture" : reactName;
  const listeners = [];
  let instance = targetFiber;

  while (instance !== null) {
    const { stateNode, tag } = instance;
    if (tag === HostComponent && stateNode !== null) {
      const listener = getListener(instance, reactEventName);
      if (listener) {
        listeners.push(createDispatchListener(instance, listener, stateNode));
      }
    }
    instance = instance.return;
  }

  return listeners;
}

/**
 * 创建分发监听器
 *
 * @param {Fiber} instance Fiber实例
 * @param {Function} listener 监听器函数
 * @param {Element} currentTarget 当前目标元素
 */
function createDispatchListener(instance, listener, currentTarget) {
  return { instance, listener, currentTarget };
}
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/events/getListener.js

```js
import { getFiberCurrentPropsFromNode } from "../client/ReactDOMComponentTree";

/**
 * 从给定的React实例中获取指定事件的监听函数。
 *
 * @param {Object} instance - Fiber 对象
 * @param {string} registrationName - 注册的事件名（例如，'onClick'）。
 * @returns {Function|null} - 返回该事件的监听函数，如果不存在则返回null。
 */
export default function getListener(instance, registrationName) {
  // 从实例中取出状态节点
  const { stateNode } = instance;
  if (stateNode === null) return null;

  // 使用ReactDOMComponentTree模块的getFiberCurrentPropsFromNode函数，获取状态节点当前的props
  const props = getFiberCurrentPropsFromNode(stateNode);
  if (props === null) return null;

  // 从props中获取对应事件名的监听函数
  const listener = props[registrationName];
  // 返回监听函数，如果不存在，此处将返回undefined
  return listener;
}
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/client/ReactDOMComponentTree.js

```js
// ...

export function getFiberCurrentPropsFromNode(node) {
  return node[internalPropsKey] || null;
}
```
