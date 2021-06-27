## 什么是 event loop？

从广义上来说，`event loop` 就是一种【user agents 用于协调各种事件，用户交互，脚本执行，网络活动等执行时机的】调度机制。

实现 `event loop` 的 user agent 有好多个。比如说：

- window
- worker
  - dedicated worker
  - shared worker
  - service worker
- worklet
- nodejs

<br/>

实现 `event loop` 的 **通用算法**（注意，这是简单的，通用的算法）大概是这样的：

1. 时刻监视 `task queue`, 当 `task queue` 不为空的时候:
   - 执行队列中入队时间最久的那个 `task`
2. 休眠。直到等到有可执行的 `task` 出现，跳回 `1`。

用代码来简单表示就是：

```javascript
while (queue.waitForTask()) {
  queue.processNextTask()
}
```

作为单线程的 javascript 就是通过 `event loop` 来实现了它的异步编程特性。

<br/>

:::tip
鉴于实现 `event loop`的 user agent 之多和时间有限，在这里只是深入讨论浏览器中的 `event loop`（特指 `window event loop`）和 `nodejs` 中的 `event loop`。
:::

<br/>
<br/>
<br/>

## 术语

需要反复强调的是，概念是人类有效沟通交流的基础，更确切地说，将同一个（概念）“名”理解为同一个“实”，即概念理解的一致性是人类有效沟通交流的基础。概念落实到某个相关领域就称之为“术语”。鉴于无论是官方文档还是业内技术文章在使用术语的不一致性，我们有必要梳理一下阐述event loop过程中所涉及的术语，如下：

<br/>
<br/>
<br/>

## task

在MDN的诸多阐述event loop相关的文档中，都使用了这个术语。在[这篇文档中](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide)，task的定义是这么下的：

> A task is any JavaScript code which is scheduled to be run by the standard mechanisms such as initially starting to run a program, an event callback being run, or an interval or timeout being fired.

这篇文档中说到：

> The tasks form a queue, so-called “macrotask queue” (v8 term)

可以看到，我们天天一口一个的 `macrotask`，比如：`setTimeout`、`setInterval` 等等的 `callback` 就是一个 `“task”`。

<br/>
<br/>
<br/>

## task queue

task 会被推入到一个队列当中，等待调度。这个队列就是 **task queue**。在 Philip Roberts 的演讲中，他提到了一个叫 **“callback queue”** 的术语，同时他也提到了，它就是 **“task queue”** 的别名。

<br/>
<br/>
<br/>

## macrotask

macrotask === task。

<br/>
<br/>
<br/>

## macrotask queue

macrotask queue === task queue === callback queue。

<br/>
<br/>
<br/>

## messsage

[这篇MDN文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop)，通篇下来都在用 **“message”** 这个术语，可以看得出，这个 `message` 跟它对应的 `callback` 一起，两者可以统一称之为 **“task”**。那么里面所说的 **“message queue”** 就是 **“task queue”**。

<br/>
<br/>
<br/>

## microtask

MDN：

> A microtask is a short function which is executed after the function or program which created it exits and only if the JavaScript execution stack is empty, but before returning control to the event loop being used by the user agent to drive the script's execution environment.

简单理解就是，`microtask` 是一个“小”函数（正好呼应了它的名字：`micro`）。这个函数仅在 JavaScript 执行栈为空，并且创建它的函数或程序退出后才会执行。但是，它会在将控制权返回给用户代理之前执行。“控制权返回给用户代理之前”是什么意思呢，其实就是“下一个 `event loop` 之前”的意思。

<br/>
<br/>
<br/>

## microtask queue

跟 `macrotask queue` 一样，`microtask queue` 也是用于存放 `microtask` 的队列。

<br/>
<br/>
<br/>

## job

在 jake archibald 的[这篇技术文章](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/)中，他指出了 `“job”` 的概念来自于 ECMAScript 规范，它与 `“microtask”` 几乎等同，但是不完全等同。业界对两者区别的阐述一直处于含糊不清的状态。鉴于整篇文章下来，在他的阐述中，他已经把 `“job”` 等同于 `“microtask”` 了。所以，我也倾向于采用这种理解。

而另外一位同行 Daniel Chang 在他的技术文章 [Microtasks & Macrotasks — More On The Event Loop](https://abc.danch.me/microtasks-macrotasks-more-on-the-event-loop-881557d7af6f) 也秉持着同样的看法：

> In this write up I’ve been using the term task interchangeably between macrotask and microtask, much of the documentation out there refers to macrotasks as tasks and microtasks as job. Knowing this will make understanding documentation easier.

<br/>
<br/>
<br/>

## call stack/execution context stack

首先，我们先去维基百科上面看看有关于 `call stack` 的定义。

> 在计算机科学中，call stack 是一种存储计算机程序当前正在执行的子程序（subroutine）信息的栈结构......使用 call stack 的主要原因是保存一个用于追踪【当前子程序执行完毕后，程序控制权应该归还给谁】的指针.....一个 call stack 是由多个 stack frame 组成。每个 stack frame 对应于一个子程序调用。作为 stack frame，这个子程序此时应该还没有被 return 语句所终结。举个例子，我们有一个叫 DrawLine 的子程序正在运行。这个子程序又被另外一个叫做 DrawSquare 的子程序所调用，那么 call stack 中顶部的布局应该长成下面那样：

![call_stack](./images/call_stack.png)

结合维基百科给出的定义和 Philip Roberts 的演讲，我们再来看看 MDN 的诸多文档通篇下来使用的 “execution context stack” 这个概念。顾名思义，“execution context stack” 当然是由 “execution context” 组成的，那 “execution context” 又是什么？不难理解，“execution context” 就是维基百科给出示意图中 stack frame 里面的 “Locals of xxx”，即函数执行所需要用到的上下文环境。

最后，我们可以看出，“execution context stack” 其实就是 “call stack” 的子集。因为在 event loop 语境下，我们不关心 stack frame 里面的其他“成分”：“parametres for xxx” 和 “return address”。所以，两者可以等同起来理解。

<br/>
<br/>
<br/>

## 小结

有鉴于业内技术文章对这些术语的使用频率，在本文的阐述中，

- 相比于 “task”，我会采用 `“macrotask”` 的叫法；
- 相比于“job”，我会采用 `“microtask”` 的叫法；
- 相比于 “execution context stack”，我会采用 `“call stack”` 的叫法。

That is  a deal!





