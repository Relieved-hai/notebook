# 前瞻断言与后瞻断言

有时候我们需要匹配后面跟着特定模式的一段模式。比如，我们要从 <code class='subject'>1 turkey costs 30€</code> 这段字符中匹配价格数值。

我们需要获取 <code class='subject'>€</code> 符号前面的数值（假设价格是整数）。

那就是前瞻断言要做的事情。

<br/>
<br/>
<br/>

## 前瞻断言

语法为：<code class='pattern'>x(?=y)</code>，它表示 “匹配 <code class='pattern'>x</code>, 仅在后面是 <code class='pattern'>y</code> 的情况"”

那么对于一个后面跟着 `€` 的整数金额，它的正则表达式应该为：<code class='pattern'>\d+(?=€)</code>。

```js
let str = "1 turkey costs 30€";

alert( str.match(/\d+(?=€)/) ); // 30 （正确地跳过了单个的数字 1）
```

<br/>

让我们来看另一种情况：这次我们想要一个数量，它是一个不被 <code class='subject'>€</code> 跟着的数值。

这里就要用到前瞻否定断言了。

语法为：<code class='pattern'>x(?!y)</code>，意思是 “查找 <code class='pattern'>x</code>, 但是仅在不被 <code class='pattern'>y</code> 跟随的情况下匹配成功”。

```js
let str = "2 turkeys cost 60€";

alert( str.match(/\d+(?!€)/) ); // 2（正确地跳过了价格）
```

<br/>
<br/>
<br/>

## 后瞻断言

前瞻断言允许添加一个“后面要跟着什么”的条件判断。

后瞻断言也是类似的，只不过它是在相反的方向上进行条件判断。也就是说，它只允许匹配前面有特定字符串的模式。

语法为:

- 后瞻肯定断言：<code class='pattern'>(?<=y)x</code>, 匹配 <code class='pattern'>x</code>, 仅在前面是 <code class='pattern'>y</code> 的情况。
- 后瞻否定断言：<code class='pattern'>(?<!y)x</code>, 匹配 <code class='pattern'>x</code>, 仅在前面不是 <code class='pattern'>y</code> 的情况。

<br/>

举个例子，让我们把价格换成美元。美元符号通常在数字之前，所以要查找 `$30` 我们将使用 <code class='pattern'>(?<=\\$)\d+</code> —— 一个前面带 <code class='pattern'>$</code> 的数值：

```js
let str = "1 turkey costs $30";

alert( str.match(/(?<=\$)\d+/) ); // 30 （跳过了单个的数字 1）
```

<br/>

另外，为了找到数量 —— 一个前面不带 <code class='subject'>$</code> 的数字，我们可以使用否定后瞻断言：<code class='pattern'>(?<!\\$)\d+</code>

```js
let str = "2 turkeys cost $60";

alert( str.match(/(?<!\$)\d+/) ); // 2 (跳过了价格)
```

<br/>
<br/>
<br/>

## 捕获组

一般来说，环视断言括号中（前瞻和后瞻的通用名称）的内容不会成为匹配到的一部分结果。

例如：在模式 <code class='pattern'>\d+(?!€)</code> 中，<code class='pattern'>€</code> 符号就不会出现在匹配结果中。

但是如果我们想要捕捉整个环视表达式或其中的一部分，那也是有可能的。只需要将其包裹在另加的括号中。

例如，这里货币符号 <code class='pattern'>(€|kr)</code> 和金额一起被捕获了：

```js
let str = "1 turkey costs 30€";
let reg = /\d+(?=(€|kr))/; // €|kr 两边有额外的括号

alert( str.match(reg) ); // 30, €
```

后瞻断言也一样：

```js
let str = "1 turkey costs $30";
let reg = /(?<=(\$|£))\d+/;

alert( str.match(reg) ); // 30, $
```

请注意，对于后瞻断言，顺序保持不变，尽管前瞻括号在主模式之前。

通常括号是从左到右编号，但是后瞻断言是一个例外，它总是在主模式之后被捕获。所以 <code class='pattern'>\d+</code> 的匹配会首先进入结果数组，然后是 <code class='pattern'>(\\$|£)</code>。

<br/>
<br/>
<br/>

## 总结

当我们想根据前面/后面的上下文筛选出一些东西的时候，前瞻断言和后瞻断言（通常被称为“环视断言”）对于简单的正则表达式就很有用。

有时我们可以手动处理来得到相同的结果，即：匹配所有，然后在循环中按上下文进行筛选。请记住，`str.matchAll` 和 `reg.exec` 返回的匹配结果有 `.index` 属性，因此我们能知道它在文本中的确切位置。但通常正则表达式可以做得更好。

环视断言类型:

| **模式** | **类型** | **匹配** |
| - | - | - |
| <code class='pattern'>x(?=y)</code> | 前瞻肯定断言 | `x` ，仅当后面跟着 `y` |
| <code class='pattern'>x(?!y)</code> | 前瞻否定断言 | `x` ，仅当后面不跟 `y` |
| <code class='pattern'>(?<=y)x</code> | 后瞻肯定断言 | `x` ，仅当跟在 `y` 后面 |
| <code class='pattern'>(?<!y)x</code> | 后瞻否定断言 | `x` ，仅当不跟在 `y` 后面 |

前瞻断言也可用于禁用回溯。为什么它是需要的 – 请看下一章。

<br/>
<br/>
<br/>

## 例子

### 查找非负整数

有一串整数。

创建一个仅查找非负数的正则表达式（允许为零）。

使用示例：

```js
let regexp = /your regexp/g;

let str = "0 12 -5 123 -18";

alert( str.match(regexp) ); // 0, 12, 123
```

<br/>

**解决方案**

```js
/*
  整数的regexp是 \d。

  我们可以在负数前加上负数前瞻：(?<!-)\d+ 来排除负数。

  尽管，如果我们现在尝试一下，我们可能会注意到另外一个“额外”结果：

    let regexp = /(?<!-)\d+/g;
    let str = "0 12 -5 123 -18";
    console.log( str.match(regexp) ); // 0, 12, 123, 8

  如您所见，它与 -18 匹配，为 8。要排除它，我们需要确保 regexp 开始匹配一个数字，而不是从另一个（不匹配）数字的中间开始。

  我们可以通过在后面指定另一个负数来做到这一点： (?<!-)(?<!\d)\d+ 。现在 (?<!\d) 确保匹配不会在我们需要的其他数字之后开始。

  我们还可以将它们加入到此处的单个外观中：

    let regexp = /(?<![-\d])\d+/g;
    let str = "0 12 -5 123 -18";
    alert( str.match(regexp) ); // 0, 12, 123
* */
```

<br/>
<br/>

### 摘录后插入

HTML文档中有一行。

在 `<body>` 标记之后插入 `<h1>Hello</h1>` 行（它可能具有属性）。

例如：

```js
let regexp = /your regexp/;

let str = `
<html>
  <body style="height: 200px">
  ...
  </body>
</html>
`;

str = str.replace(regexp, `<h1>Hello</h1>`);
```

之后，`str` 值为：

```js
<html>
  <body style="height: 200px"><h1>Hello</h1>
  ...
  </body>
</html>
```

<br/>

**解决方案**

```js
/*
为了在 <body> 标签之后插入，您首先需要找到它。 我们将使用正则表达式 <body.*>。

接下来，我们需要保留 <body> 标记本身，并在其后添加文本。

您可以这样做：

  let str = '...<body style="...">...';
  str = str.replace(/<body.*>/, '$&<h1>Hello</h1>');
  alert(str); // ...<body style="..."><h1>Hello</h1>...

在替换字符串中，$＆ 表示匹配项本身，即替换 <body。*> 替换为自身加上 <h1> Hello </ h1>。

一种替代方法是使用 后瞻肯定断言：

  let str = '...<body style="...">...';
  str = str.replace(/(?<=<body.*>)/, `<h1>Hello</h1>`);
  alert(str); // ...<body style="..."><h1>Hello</h1>...

每个位置的此类正则表达式将检查 <body.*> 是否在它之前。如果是，则找到匹配项。但是 <body.*> 标记本身不包含在匹配项中，它仅参与检查。并且检查之后，没有其他字符，因此匹配文本将为空。

<body.*> 开头的“空字符串”被 <h1>Hello</h1> 替换。确切地说，这是在 <body> 之后插入此行。

P.S. 该正则表达式不会受到以下标志的阻碍：/<body.*>/si，以便“点”包含换行符（标签可以采用多行），也可以使标签位于不同的寄存器中，例如 <BODY>。
* */
```

<br/>
<br/>
<br/>
