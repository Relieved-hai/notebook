# 灾难性回溯

有些正则表达式看上去很简单，但是执行起来耗时非常非常非常长，甚至会导致 JavaScript 引擎「挂起」。

开发者们很容易一不小心就写出这类正则表达式，所以我们迟早会面对这种意外问题。

典型的症状就是 —— 一个正则表达式有时能正常工作，但对于某些特定的字符串就会消耗 100% 的 CPU 算力，出现“挂起”现象。

在这种情况下，Web 浏览器会建议杀死脚本并重新载入页面。这显然不是我们愿意看到的。

在服务器端 JavaScript 中，在使用这种正则表达式处理用户数据时可能会引发程序漏洞。

<br/>
<br/>
<br/>

## 例子

假设，我们现在有一个字符串，我们想检查其中是否包含一些单词 <code class='pattern'>\w+</code>，允许字符后跟着可选的空格符 <code class='pattern'>\s?</code>。

我们使用一个这样的正则 <code class='pattern'>^(\w+\s?)*$</code>，它指定了 0 个或更多个此类的字符。

我们运行一下：

```js
let regexp = /^(\w+\s?)*$/;

alert( regexp.test("A good string") ); // true
alert( regexp.test("Bad characters: $@#") ); // false
```

这似乎能正常工作。结果是正确的。但是在特定的字符串上，它会消耗很多时间。它耗时太久以至于让 CPU 会跑满 100% 负载，导致 JavaScript 引擎「挂起」。

<br/>

:::warning
如果你运行下面这个例子，由于 JavaScript 会进入「挂起」状态，因此你可能什么结果都看不到。此时浏览器会停止对事件的响应，UI 也会停止运作。一段时间之后浏览器会建议重新载入页面。所以请谨慎对待：
:::

```js
let regexp = /^(\w+\s?)*$/;
let str = "An input string that takes a long time or even makes this regexp to hang!";

// 会耗费大量时间
alert( regexp.test(str) );
```

有些正则引擎能够处理好这种查询，但大多数引擎对此都无能为力。

<br/>
<br/>
<br/>

## 简化的例子

问题在哪？为何正则表达式会「挂起」？

为了理解它，我们来简化一下例子：移除空格符 <code class='pattern'>\s?</code>，使其成为 <code class='pattern'>^(\w+)*$</code>。

同时为了让问题更显著，再用 <code class='pattern'>\d</code> 替换掉 <code class='pattern'>\w</code>。这个新的正则表达式执行时仍然会挂起，比如：

```js
let regexp = /^(\d+)*$/;

let str = "012345678901234567890123456789!";

// 会耗费大量时间
alert( regexp.test(str) );
```

所以正则到底哪里出了问题？

<br/>

首先，有人可能发现了这个正则 <code class='pattern'>(\d+)*</code> 有点奇怪，量词 <code class='pattern'>\*</code> 有点画蛇添足。如果我们要匹配数字，那我们可以使用 <code class='pattern'>\d+</code>

实际上，正则表达式是非常死板、机械化的。造成它运行缓慢的原因和上面我们看到的那样，所以让我们来理解它运作过程，然后问题的原因就会显而易见了。

在 <code class='subject'>123456789!</code> 这行中（这里简写了，看得更清晰一些）中查询 <code class='pattern'>^(\d+)*$</code> 时到底发生了什么，要耗时这么久呢？

- 1. 首先，正则引擎尝试查一个数字 <code class='pattern'>\d+</code>。加号 <code class='pattern'>+</code> 默认为贪婪模式，所以它囊括/消耗（consume）了所有数字：

  ```
  \d+.......
  (123456789)!
  ```

  然后它尝试应用星号量词，但是此时已经没有更多数字了，所以星号匹配不到任何东西。

  模式中接下来的 <code class='pattern'>$</code> 匹配字符串的结束，但是我们例子的文字中有 <code class='subject'>!</code>，所以匹配失败，没有匹配结果：

  ```
             X
  \d+........$
  (123456789)!
  ```

- 2. 由于没有匹配结果，贪婪量词 <code class='pattern'>+</code> 的重复匹配次数会减一，并往前回溯一个字符。

  现在 <code class='pattern'>\d+</code> 会匹配除了最后一个数字之外的所有数字：

  ```
  \d+.......
  (12345678)9!
  ```

- 3. 然后引擎尝试从新位置 (`9`) 继续搜索。

  星号 <code class='pattern'>(\d+)*</code> 可以成功应用 – 它匹配到了数字 <code class='match'>9</code> ：

  ```
  \d+.......\d+
  (12345678)(9)!
  ```

  引擎再次去尝试匹配 <code class='pattern'>$</code>，但是失败了，因为它遇到了 <code class='subject'>!</code>：

  ```
               X
  \d+.......\d+
  (12345678)(9)!
  ```

- 4. 没有匹配结果，所以引擎继续回溯，减少重复匹配次数。回溯的运行过程基本上是这样的：最后一个贪婪量词逐渐减少重复匹配次数，然后前一个贪婪量词再减少重复匹配次数，以此类推。

它会尝试所有可能的排列组合，这里是他们的例子：

第一串数字 <code class='pattern'>\d+</code> 有 7 位数，后面跟着一串 2 位数的数字：

```
             X
\d+......\d+
(1234567)(89)!
```

第一串数字有 7 位数，后面跟着两串数字，每串数字各有 1 位数：

```
               X
\d+......\d+\d+
(1234567)(8)(9)!
```

第一串数字有 6 位数，后面跟着一串 3 位数的数字：

```
             X
\d+.......\d+
(123456)(789)!
```

第一串数字有 6 位数，后面跟着两串数字：

```
               X
\d+.....\d+ \d+
(123456)(78)(9)!
```

……以此类推。

像 `123456789` 这样一串数字，分割成多个数的话有好几种分割方式。准确的说，如果这数字长度是 `n` ，则共有 `2n-1` 种方式去分割它。

假设 `n=20`，那么就有差不多一百万种排列组合，假设 `n=30`，那就得再乘上一千倍。正因为要尝试每种排列组合，所以才导致会消耗这么多时间。

那我们该怎么办？

我们应转而使用懒惰模式吗？

不幸的是，这没用：如果我们用 <code class='pattern'>\d+?</code> 去替代 <code class='pattern'>\d+</code>，它还是会挂起。排列组合的顺序会变化，但是总数不变。

有些正则表达式引擎应经过严密的测试，并自带一种能够避免遍历所有排列组合的有限自动机来优化速度。但并不是所有引擎能够做到，也不是在所有场合下都有效果。

<br/>
<br/>
<br/>

## 回到字符和字符串

在我们第一个例子中，当我们用 <code class='pattern'>^(\w+\s?)*$</code> 这种模式在字符串 <code class='subject'>An input that hangs!</code> 中查找字符时，也遇到了相同的问题。

原因是 <code class='pattern'>\w+</code> 可以用来表示一个或多个字符：

```
(input)
(inpu)(t)
(inp)(u)(t)
(in)(p)(ut)
...
```

对于我们人类来说，很显然它们无法匹配成功，因为例子中的字符串以感叹号 `!` 结尾，然而正则表达式期望在末尾有一个词语式字符 <code class='pattern'>\w</code> 或者空格 <code class='pattern'>\s</code> 来结尾。正则引擎理解不了这种状况。

它尝试了所有 <code class='pattern'>(\w+\s?)\*</code> 的排列组合试图去囊括整个字符串，包含了带空格 <code class='pattern'>(\w+\s)\*</code> 的情形和不带空格 <code class='pattern'>(\w+)\*</code> 的情形（因为 <code class='pattern'>\s?</code> 是可选的）。由于各种排列组合的数量太多了，所以耗费了大量时间去查询。

<br/>
<br/>
<br/>

## 如何解决问题？

主要有 2 种解决方法。

第一种去试着减少各种排列组合的数量。

我们用把正则重写成 <code class='pattern'>^(\w+\s)\*\w\*</code> – 此处我们会查找后面跟着一个空格的、任意数量的单字字符 <code class='pattern'>(\w+\s)\*</code>，然后跟着一个（可选的）单字字符 <code class='pattern'>\w\*</code>。

这个正则表达式在查询效果上等同于之前那个（查找的内容是相同的），运行起来也没问题：

```js
let regexp = /^(\w+\s)*\w*$/;
let str = "An input string that takes a long time or even makes this regex to hang!";

alert( regexp.test(str) ); // false
```

为什么问题消失了？

现在星号 <code class='pattern'>\*</code> 跟在 <code class='pattern'>\w+\s</code> 后面，而不是 <code class='pattern'>\w+\s?</code> 后面。这意味着它无法匹配一个拥有多个连续单字字符串 <code class='pattern'>\w+</code> 的单词，也就省下了原本去尝试这些排列组合的时间。

举个例子，之前那个模式 <code class='pattern'>(\w+\s?)\*</code> 可能以两个 <code class='pattern'>\w+</code> 的方式来匹配单词 <code class='subject'>string</code>：

```
\w+\w+
string
```

之前那个模式，由于存在可选的 <code class='pattern'>\s</code>，它允许 <code class='pattern'>\w+</code>、<code class='pattern'>\w+\s</code> 和 <code class='pattern'>\w+\w+</code> 等等的变体形式。

我们重写之后的 <code class='pattern'>(\w+\s)\*</code> 就不存在这些情况：它可能会是 <code class='pattern'>\w+\s</code> 或者 <code class='pattern'>\w+\s\w+\s</code>，但不可能是 <code class='pattern'>\w+\w+</code>。所以总体上，排列组合的可能性大大减少了。

<br/>
<br/>
<br/>

## 防止回溯

有时候重写正则会比较麻烦，而且要推敲如何重写正则恐怕也并非易事。

另一种思路是禁止量词的回溯。

有些正则表达式我们人眼一看就知道无法匹配成功，但正则引擎还是会硬去尝试很多它的排列组合。

比如，正则 <code class='pattern'>(\d+)\*$</code> 中 <code class='pattern'>+</code> 对于我们人类来说很明显不应去回溯，就算我们用两个独立的 <code class='pattern'>\d+\d+</code> 去替换一个 <code class='pattern'>\d+</code>，也是根本没作用的：

```
\d+........
(123456789)!

\d+...\d+....
(1234)(56789)!
```

原先的那个例子 <code class='pattern'>^(\w+\s?)\*$</code> 中我们可能希望禁止在 <code class='pattern'>\w+</code> 这里去进行回溯。逻辑是： <code class='pattern'>\w+</code> 应当尽可能多地去匹配一个完整的单词。在 <code class='pattern'>\w+</code> 这里减少重复次数，然后将之进行分割，形成 <code class='pattern'>\w+\w+</code>，这类的做法没有任何意义。

为此，现代正则表达式引擎支持占有型量词（Possessive Quantifiers）。它们就像贪婪量词一样，但是不会进行回溯（所以比一般的正则量词更简单）。

它们也被成为“原子捕获分组（atomic capturing groups）” – 能够在括号内禁止回溯。

不幸的是，JavaScript 并不支持它，但是仍有其他办法。

<br/>
<br/>

### 用前瞻视角解决问题

我们可以使用前瞻断言来防止回溯。

在不进行回溯的前提下，我们用 <code class='pattern'>(?=(\w+))\1</code> 这个模式就可以尽可能多地重复匹配 <code class='pattern'>\w</code>：

来解读一下：

- 前瞻断言 <code class='pattern'>?=</code> 从当前位置开始，向前查找最长的单词 <code class='pattern'>\w+</code>。
- 引擎默认不会去记录 <code class='pattern'>?=...</code> 括号中的内容。为了记录它们，所以我们把 <code class='pattern'>\w+</code> 放入括号中，这样引擎会记录括号中的内容了。
- ……然后用 <code class='pattern'>\1</code> 来引用括号中的内容。

它的逻辑是：我们先进行前瞻查找 – 如果有符合 <code class='pattern'>\w+</code> 的单词，我们就可以用 <code class='pattern'>\1</code> 来匹配。

为什么？因为前瞻断言查找到一个单词 <code class='pattern'>\w+</code>，将其作为一个整体，然后进行捕获形成 <code class='pattern'>\1</code> 。所以我们最终实现了一种占有型加号 <code class='pattern'>+</code> 量词。它只将 <code class='pattern'>\w+</code> 作为一个整体来捕获，而不会只捕获它的某一部分。

<br/>

例如，在单词 <code class='subject'>JavaScript</code> 中不仅可以匹配 <code class='match'>Java</code>，而且可以忽略 <code class='match'>Script</code> ，匹配模式的其余部分。

下面是 2 个模式的对比：

```js
alert( "JavaScript".match(/\w+Script/)); // JavaScript
alert( "JavaScript".match(/(?=(\w+))\1Script/)); // null
```

1. 第一个变体 <code class='pattern'>\w+</code> 首先捕获整个 <code class='subject'>JavaScript</code> 单词，然而接下来 <code class='pattern'>+</code> 会一个字一个字地进行回溯，试图匹配整个模式的其余部分，直到 <code class='pattern'>\w+</code> 匹配到了 <code class='match'>Java</code> 时，它最终才匹配成功。
2. 第二个变体 <code class='pattern'>(?=(\w+))</code> 前瞻查找并匹配整个单词 <code class='subject'>JavaScript</code>，然后把整个单词作为一个整体包含进 <code class='pattern'>\\1</code> 中，所以在它后面就无法查找到 <code class='subject'>Script</code> 了。

当我们需要禁止 <code class='pattern'>+</code> 进行回溯的话，我们只要把 <code class='pattern'>(?=(\w+))\1</code> 中的 <code class='pattern'>\w</code> 替换成更复杂的正则表达式就能实现了。

<br/>

:::tip
**请注意：**

这些文章中有更多关于占有型量词和前瞻断言的的内容：[Regex: Emulate Atomic Grouping (and Possessive Quantifiers) with LookAhead](http://instanceof.me/post/52245507631/regex-emulate-atomic-grouping-with-lookahead) 和 [Mimicking Atomic Groups](http://blog.stevenlevithan.com/archives/mimic-atomic-groups)。
:::

<br/>

我们现在用前瞻断言重写第一个例子中的正则来防止回溯吧：

```js
let regexp = /^((?=(\w+))\2\s?)*$/;

alert( regexp.test("A good string") ); // true

let str = "An input string that takes a long time or even makes this regex to hang!";

alert( regexp.test(str) ); // false，执行得很快！
```

这里我们用 <code class='pattern'>\2</code> 代替 <code class='pattern'>\1</code>，因为这里附加了额外的外部括号。为了防止数字产生混淆，我们可以给括号命名，例如 <code class='pattern'>(?\<word\>\w+)</code>。

```js
// 括号被命名为 ?<word>，使用 \k<word> 来引用
let regexp = /^((?=(?<word>\w+))\k<word>\s?)*$/;

let str = "An input string that takes a long time or even makes this regex to hang!";

alert( regexp.test(str) ); // false

alert( regexp.test("A correct string") ); // true
```

<br/>

本文所描述的问题称作“灾难性回溯（catastrophic backtracking）”，又译作“回溯陷阱”。

我们有 2 种处理它的思路：

- 重写正则表达式，尽可能减少其中排列组合的数量。
- 防止回溯。

<br/>
<br/>
<br/>
