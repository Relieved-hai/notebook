# 选择（OR）|

选择是正则表达式中的一个术语，实际上是一个简单的“或”。

在正则表达式中，它用竖线 <code class='pattern'>|</code> 表示。

<br/>

例如，我们需要找出编程语言：HTML、PHP、Java 或 JavaScript。

对应的正则表达式为：<code class='pattern'>html|php|java(script)?</code>。

用例如下：

```js
let reg = /html|php|css|java(script)?/gi;

let str = "First HTML appeared, then CSS, then JavaScript";

alert( str.match(reg) ); // 'HTML', 'CSS', 'JavaScript'
```

我们已知的一个相似符号 —— 方括号。就允许在许多字符中进行选择，例如 <code class='pattern'>gr[ae]y</code> 匹配 <code class='match'>gray</code> 或 <code class='match'>grey</code>。

选择符号并非在字符级别生效，而是在表达式级别。正则表达式 <code class='pattern'>A|B|C</code> 意思是命中 `A`、`B` 或 `C` 其一均可。

例如：

- <code class='pattern'>gr(a|e)y</code> 严格等同 <code class='pattern'>gr[ae]y</code>。
- <code class='pattern'>gra|ey</code> 匹配 “gra” or “ey”。

我们通常用圆括号把模式中的选择部分括起来，像这样 <code class='pattern'>before(XXX|YYY)after</code>。

<br/>
<br/>
<br/>

## 时间正则表达式

在之前的章节中有个任务是构建用于查找形如 `hh:mm` 的时间字符串，例如 `12:00`。但是简单的 <code class='pattern'>\d\d:\d\d</code> 过于模糊。它同时匹配 `25:99`。

如何构建更优的正则表达式？

我们可以应用到更多的严格匹配结果中：

- 首个匹配数字必须是 `0` 或 `1`，同时其后还要跟随任一数字。
- 或者是数字 `2` 之后跟随 <code class='pattern'>[0-3]</code>。

构建正则表达式：<code class='pattern'>[01]\d|2[0-3]</code>。

接着可以添加冒号和分钟的部分。

分钟的部分必须在 `0` 到 `59` 区间，在正则表达式语言中含义为首个匹配数字 <code class='pattern'>[0-5]</code> 其后跟随任一数字 `\d`。

把它们拼接在一起形成最终的模式 <code class='pattern'>[01]\d|2[0-3]:[0-5]\d</code>。

快大功告成了，但仍然存在一个问题。选择符 `|` 在 <code class='pattern'>[01]\d</code> 和 <code class='pattern'>2[0-3]:[0-5]\d</code> 之间。这是错误的，因为它只匹配符号左侧或右侧任一表达式。

```js
let reg = /[01]\d|2[0-3]:[0-5]\d/g;

alert("12".match(reg)); // 12 (matched [01]\d)
```

这个错误相当明显，但也是初学正则表达式的常见错误。

我们需要添加一个插入语用于匹配时钟：`[01]\d` 或 `2[0-3]`。

以下为正确版本：

```js
let reg = /([01]\d|2[0-3]):[0-5]\d/g;

alert("00:00 10:10 23:59 25:99 1:2".match(reg)); // 00:00,10:10,23:59
```

<br/>
<br/>
<br/>

## 例子

### 1. 查找编程语言

有许多编程语言，例如 Java, JavaScript, PHP, C, C++。

构建一个正则式，用来匹配字符串 <code class='subject'>Java JavaScript PHP C++ C</code> 中包含的编程语言：

```js
let reg = /your regexp/g;

alert("Java JavaScript PHP C++ C".match(reg)); // Java JavaScript PHP C++ C
```

<br/>

**解决方案**

```js
/*
  第一个解法是列出所有语言，中间加上 `|` 符号。

  但是运行不如所愿：

    let reg = /Java|JavaScript|PHP|C|C\+\+/g;
    let str = "Java, JavaScript, PHP, C, C++";
    alert( str.match(reg) ); // Java,Java,PHP,C,C

  正则表达式引擎查找选择模式的时是挨个查找的。意思是：它先匹配是否存在 Java，否则 —— 接着匹配 JavaScript 及其后的字符串。

  结果，JavaScript 永远匹配不到，因为 Java 先被匹配了。

  C 和 C++ 同理。

  这个问题有两个解决办法：

    1. 变更匹配顺序，长的字符串优先匹配：JavaScript|Java|C\+\+|C|PHP。
    2. 合并相同前缀：Java(Script)?|C(\+\+)?|PHP。

  运行代码如下：

    let reg = /Java(Script)?|C(\+\+)?|PHP/g;
    let str = "Java, JavaScript, PHP, C, C++";
    alert( str.match(reg) ); // Java,JavaScript,PHP,C,C++
* */
```

<br/>
<br/>

### 2. 查找 bbtag 对

“bb-tag” 形如 `[tag]...[/tag]`，`tag` 匹配 `b`、`url` 或 `quote` 其中之一。

例如：

```
[b]text[/b]
[url]http://google.com[/url]
```

BB-tags 可以嵌套。但标签不能自嵌套，比如：

```
可行：
[url] [b]http://google.com[/b] [/url]
[quote] [b]text[/b] [/quote]

不可行：
[b][b]text[/b][/b]
```

标签可以包含换行，通常为以下形式：

```
[quote]
  [b]text[/b]
[/quote]
```

构造一个正则式用于查找所有 BB-tags 和其内容。

举例：

```js
let reg = /your regexp/g;

let str = "..[url]http://google.com[/url]..";
alert( str.match(reg) ); // [url]http://google.com[/url]
```

如果标签嵌套，那么我们需要记录匹配的外层标签（如果希望继续查找匹配的标签内容的话）：

```js
let reg = /your regexp/g;

let str = "..[url][b]http://google.com[/b][/url]..";
alert( str.match(reg) ); // [url][b]http://google.com[/b][/url]
```

<br/>

**解决方案**

```js
/*
  起始标签是 \[(b|url|quote)\]。

  匹配字符串直到遇到结束标签 —— 模式 [\s\S]*? 匹配任意字符，包括换行和用于结束标记的反向引用。

  完整模式为：\[(b|url|quote)\][\s\S]*?\[/\1\]。

  运行代码如下：

    let reg = /\[(b|url|quote)\][\s\S]*?\[\/\1\]/g;

    let str = `
      [b]hello![/b]
      [quote]
        [url]http://google.com[/url]
      [/quote]
    `;

    alert( str.match(reg) ); // [b]hello![/b],[quote][url]http://google.com[/url][/quote]

  请注意我们要转义结束标签 [/\1] 中的斜杠，通常斜杠会关闭模式。
* */
```

<br/>
<br/>

### 3. 查询引用字符串

构建一个正则表达式用于匹配双引号内的字符串 <code class='subject'>"..."</code>。

最重要的部分是字符串应该支持转义，正如 JavaScript 字符串的行为一样。例如，引号可以插入为 <code class='subject'>\"</code>，换行符为 <code class='subject'>\n</code>，斜杠本身为 <code class='subject'>\\\\</code>。

```js
let str = "Just like \"here\".";
```

对我们来说，重要的是转义的引号 <code class='subject'>\"</code> 不会结束字符串匹配。

所以，我们应该匹配两个引号之间的内容，且忽略中间转义的引号。

这是任务的关键部分，否则这个任务就没什么意思了。

匹配字符串示例：

```
.. "test me" ..
.. "Say \"Hello\"!" ... (escaped quotes inside)
.. "\\" ..  (double slash inside)
.. "\\ \"" ..  (double slash and an escaped quote inside)
```

在 JavaScript 中，双斜杠用于把斜杠转义为字符串，如下所示：

```js
let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

// the in-memory string
alert(str); //  .. "test me" .. "Say \"Hello\"!" .. "\\ \"" ..
```

<br/>

**解决方案**

```js
/*
  答案是 /"(\\.|[^"\\])*"/g。

  步骤如下：

    首先匹配左双引号 "
    接着如果有反斜杠 \\，则匹配其后跟随的任意字符。（技术上，我们必须在模式中用双反斜杠，因为它是一个特殊的字符，但实际上是一个反斜杠字符）
    如果没有，则匹配除双引号（字符串的结束）和反斜杠（排除仅存在反斜杠的情况，反斜杠仅在和其后字符一起使用时有效）外的任意字符：[^"\\]
    …继续匹配直到遇到反双引号

  运行代码如下：

    let reg = /"(\\.|[^"\\])*"/g;
    let str = ' .. "test me" .. "Say \\"Hello\\"!" .. "\\\\ \\"" .. ';

    alert( str.match(reg) ); // "test me","Say \"Hello\"!","\\ \""
* */
```

<br/>
<br/>

### 4. 查找完整标签

写出一个正则表达式，用于查找 `<style...>` 标签。它应该匹配完整的标签：该标签可能是没有属性的标签 `<style>` 或是有很多属性的标签 `<style type="..." id="...">`。

…同时正则表达式不应该匹配 `<styler>`！

举例如下：

```js
let reg = /your regexp/g;

alert( '<style> <styler> <style test="...">'.match(reg) ); // <style>, <style test="...">
```

<br/>

**解决方案**

```js
/*
  模式的开头显而易见：<style。

  …然而不能简单地写出 <style.*?> 这样的表达式，因为会同时匹配 <styler>。

  要么匹配 <style 后的一个空格，然后匹配任意内容；要么直接匹配结束符号 >。

  最终的正则表达式为：<style(>|\s.*?>)。

  运行代码如下：

    let reg = /<style(>|\s.*?>)/g;
    alert( '<style> <styler> <style test="...">'.match(reg) ); // <style>, <style test="...">
* */
```

<br/>
<br/>
<br/>
