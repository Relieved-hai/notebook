### packages/react-dom-bindings/src/events/DOMPluginEventSystem.js

```js
import getEventTarget from "./getEventTarget";

// ...

/**
 * 在插件事件系统中分发事件
 *
 * @param {string} domEventName DOM事件名称
 * @param {number} eventSystemFlags 事件系统标记
 * @param {Event} nativeEvent 原生事件
 * @param {Fiber} targetInst Fiber目标实例
 * @param {Element} targetContainer 目标容器元素
 */
export function dispatchEventForPluginEventSystem(
  domEventName,
  eventSystemFlags,
  nativeEvent,
  targetInst,
  targetContainer
) {
  dispatchEventForPlugins(
    domEventName,
    eventSystemFlags,
    nativeEvent,
    targetInst,
    targetContainer
  );
}

/**
 * 为插件分发事件
 *
 * @param {string} domEventName DOM事件名称
 * @param {number} eventSystemFlags 事件系统标记
 * @param {Event} nativeEvent 原生事件
 * @param {Fiber} targetInst Fiber目标实例
 * @param {Element} targetContainer 目标容器元素
 */
function dispatchEventForPlugins(
  domEventName,
  eventSystemFlags,
  nativeEvent,
  targetInst,
  targetContainer
) {
  // 获取原生事件的目标
  const nativeEventTarget = getEventTarget(nativeEvent);
  // 事件队列，例如当前元素的click，父元素click，父父元素的click，... 依次放入依次执行
  const dispatchQueue = [];
  // 提取事件
  extractEvents(
    dispatchQueue,
    domEventName,
    targetInst,
    nativeEvent,
    nativeEventTarget,
    eventSystemFlags,
    targetContainer
  );
  // 处理分发队列
  processDispatchQueue(dispatchQueue, eventSystemFlags);
}

/**
 * 提取事件
 *
 * @param {Array} dispatchQueue 分发队列
 * @param {string} domEventName DOM事件名称
 * @param {Fiber} targetInst Fiber目标实例
 * @param {Event} nativeEvent 原生事件
 * @param {EventTarget} nativeEventTarget 原生事件目标
 * @param {number} eventSystemFlags 事件系统标记
 * @param {Element} targetContainer 目标容器元素
 */
function extractEvents(
  dispatchQueue,
  domEventName,
  targetInst,
  nativeEvent,
  nativeEventTarget,
  eventSystemFlags,
  targetContainer
) {
  SimpleEventPlugin.extractEvents(
    dispatchQueue,
    domEventName,
    targetInst,
    nativeEvent,
    nativeEventTarget,
    eventSystemFlags,
    targetContainer
  );
}

/**
 * 处理分发队列
 *
 * @param {Array} dispatchQueue 分发队列
 * @param {number} eventSystemFlags 事件系统标记
 */
function processDispatchQueue(dispatchQueue, eventSystemFlags) {}

/**
 * 累积单阶段监听器
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
) {}
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/events/plugins/SimpleEventPlugin.js

```js
import {
  registerSimpleEvents,
  topLevelEventsToReactNames,
} from "../DOMEventProperties";
import { IS_CAPTURE_PHASE } from "../EventSystemFlags";
import { accumulateSinglePhaseListeners } from "../DOMPluginEventSystem";
import { SyntheticMouseEvent } from "../SyntheticEvent";

/**
 * 提取特定事件并将其加入调度队列
 *
 * @param {Array} dispatchQueue 要处理的事件队列
 * @param {string} domEventName DOM 事件的名称，例如 'click'
 * @param {Object} targetInst 目标实例，接收事件的 React 组件
 * @param {Event} nativeEvent 原生的浏览器事件对象
 * @param {EventTarget} nativeEventTarget 原生的浏览器事件目标
 * @param {number} eventSystemFlags 事件系统标志，表示特定的事件状态
 * @param {Element} targetContainer 事件发生的 DOM 容器
 */
function extractEvents(
  dispatchQueue,
  domEventName,
  targetInst,
  nativeEvent,
  nativeEventTarget,
  eventSystemFlags,
  targetContainer
) {
  // 根据给定的 DOM 事件名，获取对应的 React 事件名
  const reactName = topLevelEventsToReactNames.get(domEventName);
  // 合成事件的构造函数
  let SyntheticEventCtor;

  switch (domEventName) {
    case "click":
      SyntheticEventCtor = SyntheticMouseEvent;
      break;

    default:
      break;
  }

  // 事件是否处于 捕获阶段？还是冒泡阶段？
  const isCapturePhase = (eventSystemFlags & IS_CAPTURE_PHASE) !== 0;
  // 使用 accumulateSinglePhaseListeners 函数获取当前阶段的所有事件监听器
  const listeners = accumulateSinglePhaseListeners(
    targetInst,
    reactName,
    nativeEvent.type,
    isCapturePhase
  );

  // 如果存在至少一个监听器
  if (listeners.length > 0) {
    // 则创建一个新的合成事件
    const event = new SyntheticEventCtor(
      reactName,
      domEventName,
      null,
      nativeEvent,
      nativeEventTarget
    );
    // 并将其与相应的监听器一起加入调度队列
    dispatchQueue.push({
      event,
      listeners,
    });
  }
}

export { registerSimpleEvents as registerEvents, extractEvents };
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/events/SyntheticEvent.js

```js
export const SyntheticMouseEvent = () => {};
```
