# 数据类型

JavaScript 中的值都具有特定的类型。例如，字符串或数字。

在 JavaScript 中有 8 种基本的数据类型（译注：7 种原始类型和 1 种引用类型）。在这里，我们将对它们进行大体的介绍，在下一章中，我们将详细讨论它们。

我们可以将任何类型的值存入变量。例如，一个变量可以在前一刻是个字符串，下一刻就存储一个数字：

```js
// 没有错误
let message = "hello";
message = 123456;
```

允许这种操作的编程语言，例如 JavaScript，被称为 `“动态类型”（dynamically typed）` 的编程语言，意思是虽然编程语言中有不同的数据类型，但是你定义的变量并不会在定义后，被限制为某一数据类型。

<br/>
<br/>
<br/>

## Number 类型

```js
let n = 123;
n = 12.345;
```

number 类型代表整数和浮点数。

数字可以有很多操作，比如，乘法 `*`、除法 `/`、加法 `+`、减法 `-` 等等。

除了常规的数字，还包括所谓的 “特殊数值（'special numeric values'）” 也属于这种类型：`Infinity`、`-Infinity` 和 `NaN`。

<br/>

- `Infinity` 代表数学概念中的 [无穷大 ∞](https://en.wikipedia.org/wiki/Infinity)。是一个比任何数字都大的特殊值。

我们可以通过除以 0 来得到它：

```js
alert( 1 / 0 ); // Infinity
```

或者在代码中直接使用它：

```js
alert( Infinity ); // Infinity
```

<br/>

- `NaN` 代表一个计算错误。它是一个不正确的或者一个未定义的数学操作所得到的结果，比如：

```js
alert( "not a number" / 2 ); // NaN，这样的除法是错误的
```

`NaN` 是粘性的。任何对 `NaN` 的进一步操作都会返回 `NaN`：

```js
alert( "not a number" / 2 + 5 ); // NaN
```

所以，如果在数学表达式中有一个 `NaN`，会被传播到最终结果。

<br/>

:::tip
**数学运算是安全的**

在 JavaScript 中做数学运算是安全的。我们可以做任何事：除以 0，将非数字字符串视为数字，等等。

脚本永远不会因为一个致命的错误（“死亡”）而停止。最坏的情况下，我们会得到 `NaN` 的结果。
:::

特殊的数值属于 “number” 类型。当然，对“特殊的数值”这个词的一般认识是，它们并不是数字

我们将在 [数字类型](../../wergfhgfhk/02/README.md) 中获取数字的更多细节。

<br/>
<br/>
<br/>

## BigInt 类型

在 JavaScript 中，“number” 类型无法表示大于 `(253-1)`（即 `9007199254740991`），或小于 `-(253-1)` 的整数。这是其内部表示形式导致的技术限制。

在大多数情况下，这个范围就足够了，但有时我们需要很大的数字，例如用于加密或微秒精度的时间戳。

`BigInt` 类型是最近被添加到 JavaScript 语言中的，用于表示任意长度的整数。

可以通过将 `n` 附加到整数字段的末尾来创建 `BigInt` 值。

```js
// 尾部的 "n" 表示这是一个 BigInt 类型
const bigInt = 1234567890123456789012345678901234567890n;
```

<br/>

由于很少需要 `BigInt` 类型的数字，我们在这没有对其进行讲解，我们在单独的章节 [BigInt](../../idortjeior/05/README.md) 中专门对其进行了介绍。当你需要使用那样的大数字的时候，可以去阅读该章节。

:::warning
**兼容性问题**

目前 Firefox/Chrome/Edge/Safari 已经支持 `BigInt` 了，但 IE 还没有。
:::

你可以查看 [MDN BigInt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/BigInt#browser_compatibility) 兼容性表 以了解哪些版本的浏览器已经支持 BigInt 了。

<br/>
<br/>
<br/>


## String 类型

JavaScript 中的字符串必须被括在引号里。

```js
let str = "Hello";
let str2 = 'Single quotes are ok too';
let phrase = `can embed another ${str}`;
```

<br/>

在 JavaScript 中，有三种包含字符串的方式。

1. 双引号：`"Hello"`

2. 单引号：`'Hello'`

3. 反引号：`Hello`

<br/>

双引号和单引号都是“简单”引用，在 JavaScript 中两者几乎没有什么差别。

反引号是 **功能扩展** 引号。它们允许我们通过将变量和表达式包装在 `${…}` 中，来将它们嵌入到字符串中。例如：

```js
let name = "John";

// 嵌入一个变量
alert( `Hello, ${name}!` ); // Hello, John!

// 嵌入一个表达式
alert( `the result is ${1 + 2}` ); // the result is 3
```

`${…}` 内的表达式会被计算，计算结果会成为字符串的一部分。可以在 `${…}` 内放置任何东西：诸如名为 `name` 的变量，或者诸如 `1 + 2` 的算数表达式，或者其他一些更复杂的。

<br/>

需要注意的是，这仅仅在反引号内有效，其他引号不允许这种嵌入。

```js
// the result is ${1 + 2}（使用双引号则不会计算 ${…} 中的内容）
alert( "the result is ${1 + 2}" );
```

我们会在 [字符串](../../wergfhgfhk/03/README.md) 一节中学习字符串的更多细节。

<br/>

:::warning
**JavaScript 中没有 character 类型。**

在一些语言中，单个字符有一个特殊的 “character” 类型，在 C 语言和 Java 语言中被称为 “char”。

在 JavaScript 中没有这种类型。只有一种 `string` 类型，一个字符串可以包含零个（为空）、一个或多个字符。
:::

<br/>
<br/>
<br/>

## Boolean 类型 ( 逻辑类型 )

<br/>
<br/>
<br/>


## "null" 值

<br/>
<br/>
<br/>


## "undefined" 值

<br/>
<br/>
<br/>


## object 类型和 symbol 类型

<br/>
<br/>
<br/>


## typeof 运算符

<br/>
<br/>
<br/>


## 总结
