# Custom elements

我们可以通过描述带有自己的方法、属性和事件等的类来创建自定义 HTML 元素。

在 custom elements （自定义标签）定义完成之后，我们可以将其和 HTML 的内置标签一同使用。

这是一件好事，因为虽然 HTML 有非常多的标签，但仍然是有穷尽的。如果我们需要像 `<easy-tabs>`、`<sliding-carousel>`、`<beautiful-upload>`…… 这样的标签，内置标签并不能满足我们。

我们可以把上述的标签定义为特殊的类，然后使用它们，就好像它们本来就是 HTML 的一部分一样。

<br/>

Custom elements 有两种：

1. **Autonomous custom elements （自主自定义标签）** —— “全新的” 元素, 继承自 `HTMLElement` 抽象类.
2. **Customized built-in elements （自定义内置元素）** —— 继承内置的 HTML 元素，比如自定义 `HTMLButtonElement` 等。

<br/>

我们将会先创建 autonomous 元素，然后再创建 customized built-in 元素。

在创建 custom elements 的时候，我们需要告诉浏览器一些细节，包括：如何展示它，以及在添加元素到页面和将其从页面移除的时候需要做什么，等等。

通过创建一个带有几个特殊方法的类，我们可以完成这件事。这非常容易实现，我们只需要添加几个方法就行了，同时这些方法都不是必须的。

下面列出了这几个方法的概述：

```js
class MyElement extends HTMLElement {
  constructor() {
    super();
    // 元素在这里创建
  }

  connectedCallback() {
    // 在元素被添加到文档之后，浏览器会调用这个方法
    //（如果一个元素被反复添加到文档／移除文档，那么这个方法会被多次调用）
  }

  disconnectedCallback() {
    // 在元素从文档移除的时候，浏览器会调用这个方法
    // （如果一个元素被反复添加到文档／移除文档，那么这个方法会被多次调用）
  }

  static get observedAttributes() {
    return [/* 属性数组，这些属性的变化会被监视 */];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    // 当上面数组中的属性发生变化的时候，这个方法会被调用
  }

  adoptedCallback() {
    // 在元素被移动到新的文档的时候，这个方法会被调用
    // （document.adoptNode 会用到, 非常少见）
  }

  // 还可以添加更多的元素方法和属性
}
```

在申明了上面几个方法之后，我们需要注册元素：

```js
// 让浏览器知道我们新定义的类是为 <my-element> 服务的
customElements.define("my-element", MyElement);
```

现在当任何带有 `<my-element>` 标签的元素被创建的时候，一个 `MyElement` 的实例也会被创建，并且前面提到的方法也会被调用。我们同样可以使用 `document.createElement('my-element')` 在 JavaScript 里创建元素。

<br/>

:::tip
**Custom element 名称必须包括一个短横线 `-`**

Custom element 名称必须包括一个短横线 `-`, 比如 `my-element` 和 `super-button` 都是有效的元素名，但 `myelement` 并不是。

这是为了确保 custom element 和内置 HTML 元素之间不会发生命名冲突。
:::

<br/>
<br/>
<br/>

## 例子: “time-formatted”




































<br/>
<br/>
<br/>

## 监视属性




































<br/>
<br/>
<br/>

## 渲染顺序




































<br/>
<br/>
<br/>

## Customized built-in elements




































<br/>
<br/>
<br/>

## 引用参考




































<br/>
<br/>
<br/>

## 总结




































<br/>
<br/>
<br/>
