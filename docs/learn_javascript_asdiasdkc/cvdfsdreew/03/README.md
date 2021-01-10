# 变量

大多数情况下，JavaScript 应用需要处理信息。这有两个例子：

1. 一个网上商店：这里的信息可能包含正在售卖的商品和购物车。
2. 一个聊天应用：这里的信息可能包括用户和消息等等。

变量就是用来储存这些信息的。

<br/>
<br/>
<br/>

## 变量

[变量](https://en.wikipedia.org/wiki/Variable_(computer_science)) 是数据的"命名存储"。我们可以使用变量来保存商品、访客和其他信息。

在 JavaScript 中创建一个变量，我们需要用到 `let` 关键字。

下面的语句创建（ 也可以称为 **声明** 或者 **定义** ）了一个名称为 "message" 的变量：

```js
let message;
```

<br/>

现在，我们可以通过赋值运算符 `=` 为变量添加一些数据：

```js {3}
let message;

message = 'hello'; // 保存字符串
```

<br/>

现在这个字符串已经保存到与该变量相关联的内存区域了，我们可以通过使用该变量名称访问它：

```js {4}
let message;
message = 'Hello!';

alert(message); // 显示变量内容
```

<br/>

简洁一点，我们可以将变量定义和赋值合并成一行

```js
let message = 'Hello!'; // 定义变量，并且赋值

alert(message); // Hello!
```

<br/>

也可以在一行中声明多个变量：

```js
let user = 'John', age = 25, message = 'Hello';
```

<br/>

看上去代码长度更短，但并不推荐这样。为了更好的可读性，请一行只声明一个变量。

多行变量声明有点长，但更容易阅读：

```js
let user = 'John';
let age = 25;
let message = 'Hello';
```

<br/>

一些程序员采用下面的形式书写多个变量：

```js
let user = 'John',
  age = 25,
  message = 'Hello';
```

<br/>

……甚至使用“逗号在前”的形式

```js
let user = 'John'
  , age = 25
  , message = 'Hello';
```


技术上讲，都是一样的效果。所以，这是个个人品味和审美方面的问题。

::: tip

**`var` 而不是 `let`**

在较旧的脚本中，你也可能发现另一个关键字 var，而不是 let：

```js
var message = 'Hello';
```

`var` 关键字与 `let` **大体** 相同，也用来声明变量，但稍微有些不同，也有点 “老派”。

`let` 和 `var` 之间有些微妙的差别，但目前对于我们来说并不重要。我们将会在 [旧时的 "var"](../../uweiqowjsa/04/README.md) 章节中介绍它们。
:::

<br/>
<br/>
<br/>

## 一个现实生活的类比







