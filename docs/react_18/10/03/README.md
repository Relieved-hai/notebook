### packages/react-dom-bindings/src/events/DOMPluginEventSystem.js

```js
import { IS_CAPTURE_PHASE } from "./EventSystemFlags";
import { createEventListenerWrapperWithPriority } from "./ReactDOMEventListener";
import {
  addEventCaptureListener,
  addEventBubbleListener,
} from "./EventListener";

// ...

const listeningMarker = `_reactListening${Math.random().toString(36).slice(2)}`;

/**
 * 监听所有支持的事件
 *
 * @param {Element} rootContainerElement 根容器元素
 */
export function listenToAllSupportedEvents(rootContainerElement) {
  // 如果此元素尚未标记为已监听，则监听所有原生事件
  if (rootContainerElement[listeningMarker]) return;

  rootContainerElement[listeningMarker] = true;
  allNativeEvents.forEach((domEventName) => {
    listenToNativeEvent(domEventName, true, rootContainerElement);
    listenToNativeEvent(domEventName, false, rootContainerElement);
  });
}

/**
 * 监听原生事件
 *
 * @param {string} domEventName DOM 事件名称
 * @param {boolean} isCapturePhaseListener 是否在捕获阶段监听
 * @param {Element} target 目标元素
 */
export function listenToNativeEvent(
  domEventName,
  isCapturePhaseListener,
  target
) {
  let eventSystemFlags = 0;
  // 如果在捕获阶段监听，设置事件系统标记
  if (isCapturePhaseListener) {
    eventSystemFlags |= IS_CAPTURE_PHASE;
  }

  addTrappedEventListener(
    target,
    domEventName,
    eventSystemFlags,
    isCapturePhaseListener
  );
}

/**
 * 添加受限制的事件监听器
 *
 * @param {Element} targetContainer 目标容器元素
 * @param {string} domEventName DOM 事件名称
 * @param {number} eventSystemFlags 事件系统标记
 * @param {boolean} isCapturePhaseListener 是否在捕获阶段监听
 */
function addTrappedEventListener(
  targetContainer,
  domEventName,
  eventSystemFlags,
  isCapturePhaseListener
) {
  // 创建带有优先级的事件监听器
  const listener = createEventListenerWrapperWithPriority(
    targetContainer,
    domEventName,
    eventSystemFlags
  );

  // 根据监听阶段选择合适的添加监听函数
  if (isCapturePhaseListener) {
    // 捕获阶段
    addEventCaptureListener(targetContainer, domEventName, listener);
  } else {
    // 冒泡阶段
    addEventBubbleListener(targetContainer, domEventName, listener);
  }
}
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/events/EventListener.js

```js
/**
 * 在目标元素上添加捕获阶段的事件监听器
 *
 * @param {EventTarget} target - 目标元素，我们想要在上面添加监听器的元素
 * @param {string} eventType - 事件类型，我们想要监听的事件的名称
 * @param {Function} listener - 监听器函数，当事件发生时将调用的函数
 *
 * @returns {Function} 返回添加的监听器函数
 */
export function addEventCaptureListener(target, eventType, listener) {
  // 调用目标元素的 addEventListener 方法，添加捕获阶段的事件监听器，在捕获阶段触发（父→子）。‌‌
  target.addEventListener(eventType, listener, true);

  // 返回添加的监听器函数
  return listener;
}

/**
 * 在目标元素上添加冒泡阶段的事件监听器
 *
 * @param {EventTarget} target - 目标元素，我们想要在上面添加监听器的元素
 * @param {string} eventType - 事件类型，我们想要监听的事件的名称
 * @param {Function} listener - 监听器函数，当事件发生时将调用的函数
 *
 * @returns {Function} 返回添加的监听器函数
 */
export function addEventBubbleListener(target, eventType, listener) {
  // 调用目标元素的 addEventListener 方法，添加冒泡阶段的事件监听器，在冒泡阶段触发（子→父）
  target.addEventListener(eventType, listener, false);

  // 返回添加的监听器函数
  return listener;
}
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/events/ReactDOMEventListener.js

```js
/**
 * 创建一个具有优先级的事件监听器包装器。
 *
 * @param {HTMLElement} targetContainer - 目标容器，通常是一个HTML元素。
 * @param {string} domEventName - DOM事件名称。
 * @param {number} eventSystemFlags - 事件系统标志，用于表示事件在哪个阶段（冒泡/捕获）。
 * @returns {function} - 绑定了特定参数的事件调度函数。
 */
export function createEventListenerWrapperWithPriority(
  targetContainer,
  domEventName,
  eventSystemFlags
) {
  const listenerWrapper = dispatchDiscreteEvent;
  return listenerWrapper.bind(
    null,
    domEventName,
    eventSystemFlags,
    targetContainer
  );
}

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
) {}
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/events/EventSystemFlags.js

```js
// 左移运算符 << 将数字的二进制表示向左移动指定的位数
// 如果你有一个数字 n，执行 n << k 操作会将 n 的二进制表示向左移动 k 位。在移动过程中，右边空出的位用0填充。
//
// 数字 1 的二进制表示是 0001（在大多数JavaScript环境中，数字的二进制表示是基于32位的，尽管实际存储可能更少）。
// 当我们执行 1 << 2，实际上是将 0001 向左移动2位。
// 移动后的结果是 0100，即十进制的 4。
export const IS_CAPTURE_PHASE = 1 << 2;
```
