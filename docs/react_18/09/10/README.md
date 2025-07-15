### packages/react-dom-bindings/src/client/ReactDOMHostConfig.js

```js
import { setInitialProperties } from "./ReactDOMComponent";

// ...

/**
 * 创建DOM元素实例
 *
 * @param {string} type - DOM元素的类型
 * @return {HTMLElement} - 创建的DOM元素
 *
 * createInstance函数用于创建一个新的DOM元素，元素类型由传入的type参数指定。
 */
export function createInstance(type) {
  return document.createElement(type);
}

/**
 * 创建文本节点实例
 *
 * @param {string} content - 文本内容
 * @return {Text} - 创建的文本节点
 *
 * createTextInstance函数用于创建一个新的文本节点，其中的内容是传入的content参数。
 */
export function createTextInstance(content) {
  return document.createTextNode(content);
}

/**
 * 将初始子节点附加到父节点
 *
 * @param {HTMLElement} parent - 父节点
 * @param {HTMLElement|Text} child - 子节点
 *
 * appendInitialChild函数用于将子节点附加到指定的父节点。
 */
export function appendInitialChild(parent, child) {
  parent.appendChild(child);
}

/**
 * 为DOM元素设置初始属性
 *
 * @param {HTMLElement} domElement - 目标DOM元素
 * @param {string} type - DOM元素的类型
 * @param {Object} props - 需要设置的属性对象
 *
 * finalizeInitialChildren函数用于在DOM元素创建完成后，设置其初始属性。
 */
export function finalizeInitialChildren(domElement, type, props) {
  setInitialProperties(domElement, type, props);
}
```

<br>
<br>
<br>

### packages/react-dom-bindings/src/client/ReactDOMComponent.js

```js
import hasOwnProperty from "shared/hasOwnProperty";
import { setTextContent } from "./setTextContent";
import { setValueForStyles } from "./CSSPropertyOperations";
import { setValueForProperty } from "./DOMPropertyOperations";

export function setInitialProperties(domElement, tag, props) {
  /**
   * 当一个方法内，又调用一个方法，其实可能有两种情况
   *
   * 1、对外暴露这个不变的API，内部可以随意修改
   * 2、方法内部还有其他逻辑，但是这里还没实现，方便后期扩展
   */
  setInitialDOMProperties(tag, domElement, props);
}

/**
 * 设置初始DOM属性
 *
 * @param {string} tag - DOM元素的标签名
 * @param {HTMLElement} domElement - 目标DOM元素
 * @param {Object} nextProps - 需要设置的属性对象
 *
 * setInitialDOMProperties函数用于设置目标DOM元素的初始属性。它遍历nextProps对象中的所有属性，
 * 对于'style'属性，使用setValueForStyles函数设置DOM元素的样式；
 * 对于'children'属性，根据属性值的类型（字符串或数字），使用setTextContent函数设置DOM元素的文本内容；
 * 对于其他非空属性，使用setValueForProperty函数设置DOM元素的对应属性。
 */
function setInitialDOMProperties(tag, domElement, nextProps) {
  for (const propKey in nextProps) {
    if (hasOwnProperty.call(nextProps, propKey)) {
      const nextProp = nextProps[propKey];
      if (propKey === "style") {
        setValueForStyles(domElement, nextProp);
      } else if (propKey === "children") {
        if (typeof nextProp === "string") {
          setTextContent(domElement, nextProp);
        } else if (typeof nextProp === "number") {
          setTextContent(domElement, `${nextProp}`);
        }
      } else if (nextProp !== null) {
        setValueForProperty(domElement, propKey, nextProp);
      }
    }
  }
}
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/client/setTextContent.js

```js
export function setTextContent(node, text) {
  node.textContent = text;
}
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/client/CSSPropertyOperations.js

```js
import hasOwnProperty from "shared/hasOwnProperty";

export function setValueForStyles(node, styles) {
  const { style } = node;

  for (const styleName in styles) {
    if (hasOwnProperty.call(styles, styleName)) {
      const styleValue = styles[styleName];
      style[styleName] = styleValue;
    }
  }
}
```

<br/>
<br/>
<br/>

### packages/react-dom-bindings/src/client/DOMPropertyOperations.js

```js
export function setValueForProperty(node, name, value) {
  if (value === null) {
    node.removeAttribute(name);
  } else {
    node.setAttribute(name, value);
  }
}
```
