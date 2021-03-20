# 跨窗口通信

“同源（Same Origin）”策略限制了窗口（window）和 frame 之间的相互访问。

这个想法出于这样的考虑，如果一个用户有两个打开的页面：一个来自 `a.com`，另一个是 `b.com`，那么用户将不希望 `a.com` 的脚本可以读取 `b.com` 中的邮件。所以，“同源”策略的目的是保护用户免遭信息盗窃。

<br/>
<br/>
<br/>

## 同源

如果两个 URL 具有相同的协议，域和端口，则称它们是“同源”的。

以下的几个 URL 都是同源的：

- `http://site.com`
- `http://site.com/`
- `http://site.com/my/page.html`

但是下面这几个不是：

- http://**www**.site.com（另一个域：`www.` 影响）
- http://site.**org**（另一个域：`.org` 影响）
- **https:**//site.com（另一个协议：`https`）
- http://site.com:**8080**（另一个端口：`8080`）

<br/>

“同源”策略规定：

- 如果我们有对另外一个窗口（例如，一个使用 `window.open` 创建的弹窗，或者一个窗口中的 iframe）的引用，并且该窗口是同源的，那么我们就具有对该窗口的全部访问权限。
- 否则，如果该窗口不是同源的，那么我们就无法访问该窗口中的内容：变量，文档，任何东西。唯一的例外是 `location`：我们可以修改它（进而重定向用户）。但是我们无法读取 `location`（因此，我们无法看到用户当前所处的位置，也就不会泄漏任何信息）。

<br/>
<br/>

### 实例：iframe

一个 `<iframe>` 标签承载了一个单独的嵌入的窗口，它具有自己的 `document` 和 `window`。

我们可以使用以下属性访问它们：

- `iframe.contentWindow` 来获取 `<iframe>` 中的 window。
- `iframe.contentDocument` 来获取 `<iframe>` 中的 document，是 `iframe.contentWindow.document` 的简写形式。

当我们访问嵌入的窗口中的东西时，浏览器会检查 iframe 是否具有相同的源。如果不是，则会拒绝访问（对 `location` 进行写入是一个例外，它是会被允许的）。

<br/>

例如，让我们尝试对来自另一个源的 `<iframe>` 进行读取和写入：

```html {6,9,17,23}
<iframe src="https://example.com" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // 我们可以获取对内部 window 的引用
    let iframeWindow = iframe.contentWindow; // OK
    try {
      // ...但是无法获取其中的文档
      let doc = iframe.contentDocument; // ERROR
    } catch(e) {
      alert(e); // Security Error（另一个源）
    }

    // 并且，我们也无法 **读取** iframe 中页面的 URL
    try {
      // 无法从 location 对象中读取 URL
      let href = iframe.contentWindow.location.href; // ERROR
    } catch(e) {
      alert(e); // Security Error
    }

    // ...我们可以 **写入** location（所以，在 iframe 中加载了其他内容）！
    iframe.contentWindow.location = '/'; // OK

    iframe.onload = null; // 清空处理程序，在 location 更改后不要再运行它
  };
</script>
```

上述代码除了以下操作都会报错：

- 通过 `iframe.contentWindow` 获取对内部 window 的引用 —— 这是被允许的。
- 对 `location` 进行写入

<br/>

与此相反，如果 `<iframe>` 具有相同的源，我们可以使用它做任何事情：

```html
<!-- 来自同一个网站的 iframe -->
<iframe src="/" id="iframe"></iframe>

<script>
  iframe.onload = function() {
    // 可以做任何事儿
    iframe.contentDocument.body.prepend("Hello, world!");
  };
</script>
```

<br/>

:::tip
**`iframe.onload`** vs **`iframe.contentWindow.onload`**

`iframe.onload` 事件（在 `<iframe>` 标签上）与 `iframe.contentWindow.onload`（在嵌入的 window 对象上）基本相同。当嵌入的窗口的所有资源都完全加载完毕时触发。

……但是，我们无法使用 `iframe.contentWindow.onload` 访问不同源的 `iframe`。因此，请使用 `iframe.onload`，
:::

<br/>
<br/>
<br/>

## 子域上的 window：document.domain























<br/>
<br/>
<br/>

## Iframe：错误文档陷阱























<br/>
<br/>
<br/>

## 集合：window.frames























<br/>
<br/>
<br/>

## “sandbox” iframe 特性























<br/>
<br/>
<br/>

## 跨窗口通信























<br/>
<br/>
<br/>

## 总结























<br/>
<br/>
<br/>
