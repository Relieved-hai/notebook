### packages/react-dom-bindings/src/events/DOMPluginEventSystem.js

```js
import { allNativeEvents } from "./EventRegistry";
import * as SimpleEventPlugin from "./plugins/SimpleEventPlugin";

// 文件一加载，就会注册所有的插件
SimpleEventPlugin.registerEvents();
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/events/plugins/SimpleEventPlugin.js

```js
import { registerSimpleEvents } from "../DOMEventProperties";

export { registerSimpleEvents as registerEvents };
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/events/DOMEventProperties.js

```js
import { registerTwoPhaseEvent } from "./EventRegistry";

// 定义一个包含 'click' 的事件数组
const simpleEventPluginEvents = ["click"];

// 创建一个新的 Map 对象，用来存储顶层事件名到 React 事件名的映射（如 {click: 'onClick'}）
export const topLevelEventsToReactNames = new Map();

/**
 * 注册简单事件
 *
 * @param {string} domEventName DOM事件名称（如 click）
 * @param {string} reactName React事件名称（如 onClick）
 */
function registerSimpleEvent(domEventName, reactName) {
  // 在 Map 对象中设置 domEventName 和 reactName 的映射关系
  topLevelEventsToReactNames.set(domEventName, reactName);

  // 注册为两阶段事件
  registerTwoPhaseEvent(reactName, [domEventName]);
}

/**
 * 注册简单事件数组中的所有事件
 */
export function registerSimpleEvents() {
  // 遍历 simpleEventPluginEvents 数组
  for (let i = 0; i < simpleEventPluginEvents.length; i++) {
    // 获取数组中的每个事件名
    const eventName = simpleEventPluginEvents[i];
    // 转换事件名为小写
    const domEventName = eventName.toLowerCase();
    // 将事件名的首字母转换为大写
    const capitalizeEvent = eventName[0].toUpperCase() + eventName.slice(1);

    // 调用 registerSimpleEvent 函数，注册该事件
    // 其中，reactName 是 'on' 加上 capitalizeEvent
    // 'click' -> 'Click' -> 'onClick'
    registerSimpleEvent(domEventName, `on${capitalizeEvent}`);
  }
}
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/events/EventRegistry.js

```js
/**
 * 创建一个 Set 来存储所有的原生事件
 */
export const allNativeEvents = new Set();

/**
 * 注册一个两阶段的事件（包括捕获和冒泡阶段）
 *
 * @param {string} registrationName - 注册的事件名称
 * @param {Array<string>} dependencies - 事件依赖的其他事件的名称的数组
 */
export function registerTwoPhaseEvent(registrationName, dependencies) {
  registerDirectEvent(registrationName, dependencies);
  registerDirectEvent(registrationName + "Capture", dependencies);
}

/**
 * 直接注册事件（包括冒泡或捕获阶段）
 *
 * @param {string} registrationName - 注册的事件名称
 * @param {Array<string>} dependencies - 事件依赖的其他事件的名称的数组
 */
export function registerDirectEvent(registrationName, dependencies) {
  // 遍历依赖事件数组
  for (let i = 0; i < dependencies.length; i++) {
    // 将每个依赖事件添加到 allNativeEvents Set 中
    allNativeEvents.add(dependencies[i]);
  }
}
```
