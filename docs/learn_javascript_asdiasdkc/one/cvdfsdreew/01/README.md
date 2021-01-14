## "script" 标签

JavaScript 程序可以在 `<script>` 标签的帮助下插入到 HTML 文档的任何地方。

比如

```html
<!DOCTYPE HTML>
<html>

<body>

  <p>script 标签之前...</p>

  <script>
    alert('Hello, world!');
  </script>

  <p>...script 标签之后</p>

</body>

</html>
```

`<script>` 标签中包裹了 JavaScript 代码，当浏览器遇到 `<script>` 标签，代码会自动执行。

<br/>
<br/>
<br/>

## 现代的标记（ markup ）

`<script>` 标签有一些现在很少用到的特性（ attribute ），但是我们可以在老代码中找到它们：

<br/>

**type 特性：\<script type=...>**

在老的 HTML4 标准中，要求 script 标签有 type 特性。通常是 `type="text/javascript"`。这样的特性声明，现在已经不再需要。而且，现代 HTML 标准已经完全改变了此特性的含义。现在，它可以用于 JavaScript 模块。但这是一个高级话题，我们将在本教程的另一部分中探讨 JavaScript 模块。

<br/>

**language 特性：\<script language=...>**

这个特性是为了显示脚本使用的语言。这个特性现在已经没有任何意义，因为语言默认就是 JavaScript。不再需要使用它了。

<br/>

**脚本前后的注释**
在非常古老的书籍和指南中，你可能会在 `<script>` 标签里面找到注释，就像这样：

```html
<script type="text/javascript"><!--
    ...
//--></script>
```
现代 JavaScript 中已经不这样使用了。这些注释适用于不支持 `<script>` 标签的古老的浏览器隐藏 JavaScript 代码的。由于最近 15 年内发布的浏览器都没有这样的问题，因此这种注释能帮你辨认出一些老掉牙的代码。

<br/>
<br/>
<br/>

## 外部脚本

如果你有大量的 JavaScript 代码，我们可以将它放入一个单独的文件。

脚本文件可以通过 `src` 特性（attribute）添加到 HTML 文件中。

```html
<script src="/path/to/script.js"></script>
```

这里，`/path/to/script.js` 是脚本文件从网站根目录开始的绝对路径。当然也可以提供当前页面的相对路径。例如，`src="script.js"` 表示当前文件夹中的 `"script.js"` 文件。

<br/>

也可以提供一个完整的 URL 地址，例如

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"></script>
```

<br/>

要附加多个脚本，请使用多个标签：

```html
<script src="/js/script1.js"></script>
<script src="/js/script2.js"></script>
…
```


<br/>
<br/>
<br/>

:::tip
**请注意：**

一般来说，只有最简单的脚本才嵌入到 HTML 中。更复杂的脚本存放在单独的文件中。

使用独立文件的好处是浏览器会下载它，然后将它保存到浏览器的 [缓存](https://en.wikipedia.org/wiki/Web_cache) 中。

之后，其他页面想要相同的脚本就会从缓存中获取，而不是下载它。所以文件实际上只会下载一次。

这可以节省流量，并使得页面（ 加载 ）更快。
:::

:::warning
**如果设置了 `src` 特性，`script` 标签内容将会被忽略。**

一个单独的 `<script>` 标签不能同时有 `src` 特性和内部包裹的代码。

这将不会工作：
```html
<script src="file.js">
  alert(1); // 此内容会被忽略，因为设定了 src
</script>
```

<br/>

我们必须进行选择，要么使用外部的 `<script src="...">`，要么使用正常包裹代码的 `<script>`。

为了让上面的例子工作，我们可以将它们分成两个 `<script>` 标签。

```html
<script src="file.js"></script>
<script>
  alert(1);
</script>
```
:::

<br/>
<br/>
<br/>


## 总结

- 我们可以使用一个 `<script>` 标签将 JavaScript 代码添加到页面中。

- `type` 和 `language` 特性（ attribute ）不是必需的。

- 外部的脚本可以通过 `<script src="path/to/script.js"></script>` 的方式插入。
