# 词边界：\b

词边界 <code class='pattern'>\b</code> 是一种检查，就像 <code class='pattern'>^</code> 和 <code class='pattern'>$</code> 一样。

当正则表达式引擎（实现搜索正则表达式的程序模块）遇到 <code class='pattern'>\b</code> 时，它会检查字符串中的位置是否是词边界。

有三种不同的位置可作为词边界：

- 在字符串开头，如果第一个字符是单词字符 <code class='pattern'>\w</code>。
- 在字符串中的两个字符之间，其中一个是单词字符 <code class='pattern'>\w</code>，另一个不是。
- 在字符串末尾，如果最后一个字符是单词字符 <code class='pattern'>\w</code>。

<br/>

例如，可以在 <code class='subject'>Hello, Java!</code> 中找到匹配 <code class='pattern'>\bJava\b</code> 的单词，其中 <code class='subject'>Java</code> 是一个独立的单词，而在 <code class='subject'>Hello, JavaScript!</code> 中则不行。

```js
alert( "Hello, Java!".match(/\bJava\b/) ); // Java
alert( "Hello, JavaScript!".match(/\bJava\b/) ); // null
```

<br/>

在字符串 <code class='subject'>Hello, Java!</code> 中，以下位置对应于 <code class='pattern'>\b</code>：

![](./images/hello-java-boundaries.svg)

因此，它与模式 <code class='pattern'>\bHello\b</code> 相匹配，因为：

1. 字符串的开头符合第一种检查 <code class='pattern'>\b</code>。
2. 然后匹配了单词 <code class='pattern'>Hello</code>。
3. 然后与 <code class='pattern'>\b</code> 再次匹配，因为我们在 <code class='subject'>o</code> 和一个空格之间。

<br/>

模式 <code class='pattern'>\bJava\b</code> 也同样匹配。但 <code class='pattern'>\bHell\b</code>（因为 `l` 之后没有词边界）和 `Java!\b`（因为感叹号不是单词 <code class='pattern'>\w</code>，所以其后没有词边界）却不匹配。

```js
alert( "Hello, Java!".match(/\bHello\b/) ); // Hello
alert( "Hello, Java!".match(/\bJava\b/) );  // Java
alert( "Hello, Java!".match(/\bHell\b/) );  // null (no match)
alert( "Hello, Java!".match(/\bJava!\b/) ); // null (no match)
```

<br/>

<code class='pattern'>\b</code> 既可以用于单词，也可以用于数字。

<br/>

例如，模式 <code class='pattern'>\b\d\d\b</code> 查找独立的两位数。换句话说，它查找的是两位数，其周围是与 <code class='pattern'>\w</code> 不同的字符，例如空格或标点符号（或文本开头/结尾）。

```js
alert( "1 23 456 78".match(/\b\d\d\b/g) ); // 23,78
alert( "12,34,56".match(/\b\d\d\b/g) ); // 12,34,56
```

<br/>

:::warning
**词边界 `\b` 不适用于非拉丁字母**

词边界测试 <code class='pattern'>\b</code> 检查位置的一侧是否匹配 <code class='pattern'>\w</code>，而另一侧则不匹配 “<code class='pattern'>\w</code>”。

但是，<code class='pattern'>\w</code> 表示拉丁字母 `a-z`（或数字或下划线），因此此检查不适用于其他字符，如西里尔字母（cyrillic letters）或象形文字（hieroglyphs）。
:::

<br/>
<br/>
<br/>
