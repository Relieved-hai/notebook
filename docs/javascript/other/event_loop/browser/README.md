## 前言

JavaScript 是一个单线程、非阻塞、异步、解释性脚本语言。

事件循环 `Event Loop`，这是目前 **浏览器** 和 **NodeJS** 处理 JavaScript 代码的一种机制，而这种机制存在的背后，就因为 JavaScript 是一门单线程的语言。

简单来说，单线程的运行环境，它且只有一个调用栈，它每次只能够做一件事，这是单线程的意思，程序每次只可以运行一段代码。

<br/>

> 引用 Philip Roberts 的一段演讲，来简单了解下 V8

- **我**：“javascript，你是谁？”。
- **javascript**：“我？我是一门单线程，可并发的编程语言啊”。
- **我**：“哦，算你狠（作无语状）”。
- **javascript**：“好吧，我说得更具体点吧。我有一个 `call stack`，一个 `event loop`，一个 `callback queue` 和其它的一些 API 之类的东西”。
- **我喃喃自语**：“叼，我又不是学 CS(computer sciense)的，鬼知道你说的这些术语是什么。”

后来，我听闻了 v8，并且也知道，除了 v8 和 chrome，外界还有其它各种 javascript 的运行时和浏览器。我就跑去问v8了。

- **我**：“v8，v8，你是不是有一个 `call stack`，一个 `event loop`，一个 `callback queue` 和其它的一些 API 之类的东西”。
- **v8**:"我有一个 `call stack` 和一个 heap，你说的其它那些东西我就不知道了。"
- **我**：“乜你甘得意噶”。

<br/>

![](./images/v8_01.png)

上图是一个 JavaScript 的运行环境示意图。堆记录了内存的分配。然后是调用栈，这是帧这类东西的所在之处，但是如果你克隆了 V8 的代码，然后，搜索 `setTimeout`、`DOM`、`HTTP` 请求这类东西，它们并不在里面。它们不存在于 V8 引擎，我对此大吃一惊，当你想要异步编程的时候，这些是你首先需要考虑要使用的东西。如下图，这些都是浏览器提供的。

<br/>

![](./images/v8_02.png)

首先是 V8 运行环境，然后是浏览器提供的其他东西，被称之为 web APIs，DOM，AJAX，setTimeout 之类的东西，在然后是神秘的事件循环和回调队列。

<br/>
<br/>
<br/>

## [例子](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gbXVsdGlwbHkoYSxiKXsKICAgIHJldHVybiBhICogYjsKfQoKZnVuY3Rpb24gc3F1YXJlKG4pIHsKICAgIHJldHVybiBtdWx0aXBseShuLG4pOwp9CgpmdW5jdGlvbiBwcmludFNxdWFyZShuKSB7CiAgICB2YXIgc3F1YXJlZCA9IHNxdWFyZShuKTsKICAgIGNvbnNvbGUubG9nKHNxdWFyZWQpOwp9CgpwcmludFNxdWFyZSg0KTsK!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)

<br/>

![](./images/call_stack.gif)

可以通过这个[例子](http://latentflip.com/loupe/?code=ZnVuY3Rpb24gbXVsdGlwbHkoYSxiKXsKICAgIHJldHVybiBhICogYjsKfQoKZnVuY3Rpb24gc3F1YXJlKG4pIHsKICAgIHJldHVybiBtdWx0aXBseShuLG4pOwp9CgpmdW5jdGlvbiBwcmludFNxdWFyZShuKSB7CiAgICB2YXIgc3F1YXJlZCA9IHNxdWFyZShuKTsKICAgIGNvbnNvbGUubG9nKHNxdWFyZWQpOwp9CgpwcmludFNxdWFyZSg0KTsK!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D)，来对 `call stack` 的执行有初步了解

<br/>
<br/>
<br/>

## 浏览器中的 event loop

> 这里为了通俗易懂，使用了 “浏览器中的 event loop” 这种描述方式。在后面，如无特殊交代，它都是特指[规范文档](https://html.spec.whatwg.org/multipage/webappapis.html#definitions-3)里面的 “window event loop”。

上面指出，我们将会统一使用 `“call stack”`，`“microtask”` 和 `“macrotask”` 等术语来阐述 `event loop`。























[Philip Roberts 演讲视频](https://youtu.be/8aGhZQkoFbQ)
