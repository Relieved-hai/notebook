# 模式中的反向引用：\\N 和 \\k\<name\>

我们不仅可以在结果或替换字符串中使用捕获组 <code class='pattern'>(...)</code> 的内容，还可以在模式本身中使用它们。

<br/>
<br/>
<br/>

## 按编号反向引用：\\N

可以使用 <code class='pattern'>\N</code> 在模式中引用一个组，其中 `N` 是组号。

为了弄清那为什么有帮助，让我们考虑一项任务。

我们需要找到带引号的字符串：单引号 <code class='subject'>'...'</code> 或双引号 <code class='subject'>"..."</code> – 应匹配两种变体。

如何找到它们？

我们可以将两种引号放在方括号中：<code class='pattern'>\['"\](.*?)\['"\]</code>，但它会找到带有混合引号的字符串，例如 <code class='match'>"...'</code> 和 <code class='match'>'..."</code>。当一种引号出现在另一种引号内，比如在字符串 <code class='subject'>"She's the one!"</code> 中时，便会导致不正确的匹配：

```js
let str = `He said: "She's the one!".`;

let regexp = /['"](.*?)['"]/g;

// 不是我们想要的结果
alert( str.match(regexp) ); // "She
```

如我们所见，该模式找到了一个开头的引号 <code class='match'>"</code>，然后文本被匹配，直到另一个引号 <code class='match'>'</code>，该匹配结束。

<br/>

为了确保模式查找的结束引号与开始的引号完全相同，我们可以将其包装到捕获组中并对其进行反向引用：<code class='pattern'>(['"])(.*?)\1</code>。

这是正确的代码：

```js {3}
let str = `He said: "She's the one!".`;

let regexp = /(['"])(.*?)\1/g;

alert( str.match(regexp) ); // "She's the one!"
```

现在可以了！正则表达式引擎会找到第一个引号 <code class='pattern'>(['"])</code> 并记住其内容。那是第一个捕获组。

<code class='pattern'>\1</code> 在模式中进一步的含义是“查找与第一（捕获）分组相同的文本”，在我们的示例中为完全相同的引号。

与此类似，<code class='pattern'>\2</code> 表示第二（捕获）分组的内容，<code class='pattern'>\3</code> – 第三分组，依此类推。

<br/>

:::tip
**请注意：**

如果我们在组中使用 `?:`，那么我们将无法引用它。用 `(?:...)` 捕获的组被排除，引擎不会存储。
:::

:::warning
**不要搞混了： 在模式中用 <code class='pattern'>\1</code>，在替换项中用：<code class='pattern'>$1</code>**

在替换字符串中我们使用美元符号：<code class='pattern'>$1</code>，而在模式中 – 使用反斜杠 <code class='pattern'>\1</code>。
:::

<br/>
<br/>
<br/>

## 按命名反向引用：`\k<name>`

如果正则表达式中有很多括号对（注：捕获组），给它们起个名字方便引用。

要引用命名组，我们可以使用：<code class='pattern'>\\k\<name\></code>。


在下面的示例中引号组命名为 <code class='pattern'>?\<quote\></code>，因此反向引用为 <code class='pattern'>\\k\<quote\></code>：

```js {3}
let str = `He said: "She's the one!".`;

let regexp = /(?<quote>['"])(.*?)\k<quote>/g;

alert( str.match(regexp) ); // "She's the one!"
```

<br/>
<br/>
<br/>
