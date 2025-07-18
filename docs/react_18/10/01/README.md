React 合成事件 SyntheticEvent 是 React 框架中用于优化事件处理的核心机制，是一个完全符合 DOM3 的事件系统：

- **跨浏览器一致性**：通过**统一封装**，抹平了不同浏览器的事件系统差异（比如 IE11 只支持冒泡、阻止冒泡是使用 event.cancelBubble = true），有统一的 API 方便使用
- **性能优化**：大部分使用**事件委托**减少了监听器数量，同时了避免了频繁监听、销毁事件的开销（滚动事件依然是单独元素监听）

<br/>

React17 也对事件系统做了改动，如把事件统一注册到根节点，而非 document 上 [文档](https://legacy.reactjs.org/blog/2020/08/10/react-v17-rc.html#changes-to-event-delegation)

- 可以让多版本 React 共存，对微前端很友好
- 不会影响 document 及其下面非 React DOM 的事件处理
- 一些浏览器插件可能也会对 document 级别上拦截或更改事件

<br/>
<br/>
<br/>

**具体执行步骤**

在 createRoot 创建根节点时，通过事件委托来监听所有事件，后续在通过分发来触发我们代码中的回调，整个事件流程，React 使用插件机制来实现：

1. 执行所有**分类插件**的注册 `registerEvents`，将所有需要注册的原生事件名保存
2. 遍历 需要注册的原生事件名，依次在根节点注册对应事件名的捕获/冒泡阶段监听器
   - `根节点.addEventListener(原生事件名, dispatchEvent, true);`
   - `根节点.addEventListener(原生事件名, dispatchEvent, false);`
3. 等待触发（如 click）
4. 事件派发：（`dispatchEvent` 被触发，插件事件系统开始事件调度）
5. 事件提取：执行**分类插件**的 `extractEvents`
   - 1、提取事件：通过 Fiber 树，从当前元素开始，层层往上找到根元素，把对应的事件记录
   - 2、合成事件对象：不同类型的事件会有其对应**合成事件的构造函数**，创建对应的 event
   - 3、都放进 `dispatchQueue` 队列中
6. 事件执行
   - 捕获阶段：`dispatchQueue` 从最后一个执行到第一个，也就是从外到内执行
   - 冒泡阶段：`dispatchQueue` 按顺执行，从内到外执行
