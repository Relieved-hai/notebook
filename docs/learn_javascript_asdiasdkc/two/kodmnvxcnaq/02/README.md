# 移动鼠标：mouseover/out，mouseenter/leave

我们将深入研究鼠标在元素之间移动时发生的事件。

<br/>
<br/>
<br/>

## 事件 mouseover/mouseout，relatedTarget

当鼠标指针移到某个元素上时，`mouseover` 事件就会发生，而当鼠标离开该元素时，`mouseout` 事件就会发生。

![](./images/mouseover-mouseout.svg)

这些事件很特别，因为它们具有 `relatedTarget` 属性。此属性是对 `target` 的补充。当鼠标从一个元素离开并去往另一个元素时，其中一个元素就变成了 `target`，另一个就变成了 `relatedTarget`。

<br/>

对于 `mouseover`：

- `event.target` —— 是鼠标移过的那个元素。
- `event.relatedTarget` —— 是鼠标来自的那个元素（`relatedTarget` → `target`）。

`mouseout` 则与之相反：

- `event.target` —— 是鼠标离开的元素。
- `event.relatedTarget` —— 是鼠标移动到的，当前指针位置下的元素（`target` → `relatedTarget`）。

在下面这个示例中，每张脸及其功能都是单独的元素。当你移动鼠标时，你可以在文本区域中看到鼠标事件。

每个事件都具有关于 `target` 和 `relatedTarget` 的信息：

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-demo1 />
</ClientOnly>

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-code1 />
</ClientOnly>

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-code2 />
</ClientOnly>

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-code3 />
</ClientOnly>

<br/>

:::warning
**`relatedTarget` 可以为 `null`**

`relatedTarget` 属性可以为 `null`。

这是正常现象，仅仅是意味着鼠标不是来自另一个元素，而是来自窗口之外。或者它离开了窗口。

当我们在代码中使用 `event.relatedTarget` 时，我们应该牢记这种可能性。如果我们访问 `event.relatedTarget.tagName`，那么就会出现错误。
:::

<br/>
<br/>
<br/>

## 跳过元素

当鼠标移动时，就会触发 `mousemove` 事件。但这并不意味着每个像素都会导致一个事件。

浏览器会一直检查鼠标的位置。如果发现了变化，就会触发事件。

这意味着，如果访问者非常快地移动鼠标，那么某些 DOM 元素就可能被跳过：

![](./images/mouseover-mouseout-over-elems.svg)

如果鼠标从上图所示的 **`#FROM`** 快速移动到 **`#TO`** 元素，则中间的 `<div>`（或其中的一些）元素可能会被跳过。`mouseout` 事件可能会在 **`#FROM`** 上被触发，然后立即在 **`#TO`** 上触发 `mouseover`。

这对性能很有好处，因为可能有很多中间元素。我们并不真的想要处理每一个移入和离开的过程。

另一方面，我们应该记住，鼠标指针并不会“访问”所有元素。它可以“跳过”一些元素。

特别是，鼠标指针可能会从窗口外跳到页面的中间。在这种情况下，`relatedTarget` 为 `null`，因为它是从石头缝里蹦出来的（nowhere）：

![](./images/mouseover-mouseout-from-outside.svg)

你可以在下面的测试台中“实时”查看。

它的 HTML 有两个嵌套的元素：`<div id="child">` 在 `<div id="parent">` 内部。如果将鼠标快速移动到它们上，则可能只有 `<div id="child">` 或者只有 `<div id="parent">` 触发事件，或者根本没有事件触发。

还可以将鼠标指针移动到 `<div id="child">` 中，然后将其快速向下移动过其父级元素。如果移动速度足够快，则父元素就会被忽略。鼠标会越过父元素而不会引起其注意。

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-demo2 />
</ClientOnly>

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-code2-1 />
</ClientOnly>

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-code2-2 />
</ClientOnly>

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-code2-3 />
</ClientOnly>

<br/>

:::tip
**如果 `mouseover` 被触发了，则必须有 `mouseout`**

在鼠标快速移动的情况下，中间元素可能会被忽略，但是我们可以肯定一件事：如果鼠标指针“正式地”进入了一个元素（生成了 `mouseover` 事件），那么一旦它离开，我们就会得到 `mouseout`。
:::

<br/>
<br/>
<br/>

## 当移动到一个子元素时 mouseout

`mouseout` 的一个重要功能 —— 当鼠标指针从元素移动到其后代时触发，例如在下面的这个 HTML 中，从 `#parent` 到 `#child`：

```html
<div id="parent">
  <div id="child">...</div>
</div>
```

如果我们在 `#parent` 上，然后将鼠标指针更深入地移入 `#child`，但是在 `#parent` 上会得到 `mouseout`！

![](./images/mouseover-to-child.svg)

这听起来很奇怪，但很容易解释。

**根据浏览器的逻辑，鼠标指针随时可能位于单个元素上 —— 嵌套最多的那个元素（z-index 最大的那个）。**

因此，如果它转到另一个元素（甚至是一个后代），那么它将离开前一个元素。

请注意事件处理的另一个重要的细节。

后代的 `mouseover` 事件会冒泡。因此，如果 `#parent` 具有 `mouseover` 处理程序，它将被触发：

![](./images/mouseover-bubble-nested.svg)

你可以在下面这个示例中很清晰地看到这一点：`<div id="child">` 位于 `<div id="parent">` 内部。`#parent` 元素上有 `mouseover/out` 的处理程序，这些处理程序用于输出事件详细信息。

如果你将鼠标从 `#parent` 移动到 `#child`，那么你会看到在 `#parent` 上有两个事件:

- 1. `mouseout [target: parent]`（离开 parent），然后
- 2. `mouseover [target: child]`（来到 child，冒泡）。

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-demo3 />
</ClientOnly>

`script.js`
```js
function mouselog(event) {
  let d = new Date();
  text.value += `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | ${event.type} [target: ${event.target.id}]\n`.replace(/(:|^)(\d\D)/, '$10$2');
  text.scrollTop = text.scrollHeight;
}
```

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-code3-1 />
</ClientOnly>

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-code3-2 />
</ClientOnly>

如上例所示，当鼠标指针从 `#parent` 元素移动到 `#child` 时，会在父元素上触发两个处理程序：`mouseout` 和 `mouseover`：

```js
parent.onmouseout = function(event) {
  /* event.target: parent element */
};
parent.onmouseover = function(event) {
  /* event.target: child element (bubbled) */
};
```

**如果我们不检查处理程序中的 `event.target`，那么似乎鼠标指针离开了 `#parent` 元素，然后立即回到了它上面。**

但是事实并非如此！鼠标指针仍然位于父元素上，它只是更深入地移入了子元素。

如果离开父元素时有一些行为（action），例如一个动画在 `parent.onmouseout` 中运行，当鼠标指针深入 `#parent` 时，我们并不希望发生这种行为。

为了避免它，我们可以在处理程序中检查 `relatedTarget`，如果鼠标指针仍在元素内，则忽略此类事件。

另外，我们可以使用其他事件：`mouseenter` 和 `mouseleave`，它们没有此类问题，接下来我们就对其进行详细介绍。

<br/>
<br/>
<br/>

## 事件 mouseenter 和 mouseleave

事件 `mouseenter/mouseleave` 类似于 `mouseover/mouseout`。它们在鼠标指针进入/离开元素时触发。

但是有两个重要的区别：

- 1. 元素内部与后代之间的转换不会产生影响。
- 2. 事件 `mouseenter/mouseleave` 不会冒泡。

这些事件非常简单。

当鼠标指针进入一个元素时 —— 会触发 `mouseenter`。而鼠标指针在元素或其后代中的确切位置无关紧要。

当鼠标指针离开该元素时，事件 `mouseleave` 才会触发。

这个例子和上面的例子相似，但是现在最顶部的元素有 `mouseenter/mouseleave` 而不是 `mouseover/mouseout`。

正如你所看到的，唯一生成的事件是与将鼠标指针移入或移出顶部元素有关的事件。当鼠标指针进入 child 并返回时，什么也没发生。在后代之间的移动会被忽略。

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-demo4 />
</ClientOnly>

`script.js`
```js
function mouselog(event) {
  let d = new Date();
  text.value += `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} | ${event.type} [target: ${event.target.id}]\n`.replace(/(:|^)(\d\D)/, '$10$2');
  text.scrollTop = text.scrollHeight;
}
```

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-code3-1 />
</ClientOnly>

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-code3-2 />
</ClientOnly>

<br/>
<br/>
<br/>

## 事件委托

事件 `mouseenter/leave` 非常简单且易用。但它们不会冒泡。因此，我们不能使用它们来进行事件委托。

假设我们要处理表格的单元格的鼠标进入/离开。并且这里有数百个单元格。

通常的解决方案是 —— 在 `<table>` 中设置处理程序，并在那里处理事件。但 `mouseenter/leave` 不会冒泡。因此，如果类似的事件发生在 `<td>` 上，那么只有 `<td>` 上的处理程序才能捕获到它。

`<table>` 上的 `mouseenter/leave` 的处理程序仅在鼠标指针进入/离开整个表格时才会触发。无法获取有关其内部移动的任何信息。

因此，让我们使用 `mouseover/mouseout`。

让我们从高亮显示鼠标指针下的元素的简单处理程序开始：

```js
// 高亮显示鼠标指针下的元素
table.onmouseover = function(event) {
  let target = event.target;
  target.style.background = 'pink';
};

table.onmouseout = function(event) {
  let target = event.target;
  target.style.background = '';
};
```

现在它们已经激活了。当鼠标在下面这个表格的各个元素上移动时，当前位于鼠标指针下的元素会被高亮显示：

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-demo5 />
</ClientOnly>

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-code4-1 />
</ClientOnly>

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-code4-2 />
</ClientOnly>

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-code4-3 />
</ClientOnly>

在我们的例子中，我们想要处理表格的单元格 `<td>` 之间的移动：进入一个单元格并离开它。我们对其他移动并不感兴趣，例如在单元格内部或在所有单元格的外部。让我们把这些过滤掉。

我们可以这样做：

- 在变量中记住当前被高亮显示的 `<td>`，让我们称它为 `currentElem`。
- `mouseover` —— 如果我们仍然在当前的 `<td>` 中，则忽略该事件。
- `mouseout` —— 如果没有离开当前的 `<td>`，则忽略。

这是说明所有可能情况的代码示例：

```js
// 现在位于鼠标下方的 <td>（如果有）
let currentElem = null;

table.onmouseover = function(event) {
  // 在进入一个新的元素前，鼠标总是会先离开前一个元素
  // 如果设置了 currentElem，那么我们就没有鼠标所悬停在的前一个 <td>，
  // 忽略此事件
  if (currentElem) return;

  let target = event.target.closest('td');

  // 我们移动到的不是一个 <td> —— 忽略
  if (!target) return;

  // 现在移动到了 <td> 上，但在处于了我们表格的外部（可能因为是嵌套的表格）
  // 忽略
  if (!table.contains(target)) return;

  // 给力！我们进入了一个新的 <td>
  currentElem = target;
  onEnter(currentElem);
};


table.onmouseout = function(event) {
  // 如果我们现在处于所有 <td> 的外部，则忽略此事件
  // 这可能是一个表格内的移动，但是在 <td> 外，
  // 例如从一个 <tr> 到另一个 <tr>
  if (!currentElem) return;

  // 我们将要离开这个元素 —— 去哪儿？可能是去一个后代？
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // 到父链上并检查 —— 我们是否还在 currentElem 内
    // 然后发现，这只是一个内部移动 —— 忽略它
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // 我们离开了 <td>。真的。
  onLeave(currentElem);
  currentElem = null;
};

// 任何处理进入/离开一个元素的函数
function onEnter(elem) {
  elem.style.background = 'pink';

  // 在文本区域显示它
  text.value += `over -> ${currentElem.tagName}.${currentElem.className}\n`;
  text.scrollTop = 1e6;
}

function onLeave(elem) {
  elem.style.background = '';

  // 在文本区域显示它
  text.value += `out <- ${elem.tagName}.${elem.className}\n`;
  text.scrollTop = 1e6;
}
```

再次，重要的功能是：

- 1. 它使用事件委托来处理表格中任何 `<td>` 的进入/离开。因此，它依赖于 `mouseover/out` 而不是 `mouseenter/leave`，`mouseenter/leave` 不会冒泡，因此也不允许事件委托。
- 2. 额外的事件，例如在 `<td>` 的后代之间移动都会被过滤掉，因此 `onEnter/Leave` 仅在鼠标指针进入/离开 `<td>` 整体时才会运行。

这是带有所有详细信息的完整示例：

<ClientOnly>
  <learn_javascript_asdiasdkc-two-kodmnvxcnaq-02-demo6 />
</ClientOnly>

尝试将鼠标指针移入和移出表格单元格及其内部。快还是慢都没关系。与前面的示例不同，只有 `<td>` 被作为一个整体高亮显示。

<br/>
<br/>
<br/>

## 总结

我们讲了 `mouseover`，`mouseout`，`mousemove`，`mouseenter` 和 `mouseleave` 事件。

以下这些内容要注意：

- 快速移动鼠标可能会跳过中间元素。
- `mouseover/out` 和 `mouseenter/leave` 事件还有一个附加属性：`relatedTarget`。这就是我们来自/到的元素，是对 `target` 的补充。

即使我们从父元素转到子元素时，也会触发 `mouseover/out` 事件。浏览器假定鼠标一次只会位于一个元素上 —— 最深的那个。

`mouseenter/leave` 事件在这方面不同：它们仅在鼠标进入和离开元素时才触发。并且它们不会冒泡。

<br/>
<br/>
<br/>
