### 为什么需要 Fiber 架构

在 React 16 之前，React 使用的是基于 Stack Reconciler 堆栈的递归调和算法(dom-diff)，这种算法在进行虚拟 DOM 比较时可能会阻塞主线程，导致页面渲染卡顿，用户体验不佳。

<br/>

简易版的实现是基于堆栈，其执行起来中间没有停顿一气呵成的，下面是伪代码

```js
function updateDomTree(parent, children) {
  // 遍历子组件
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    // 创建或更新 DOM 节点
    updateDOMNode(parent, child);
    // 递归调和子组件的子组件
    if (child.children && child.children.length > 0) {
      updateDomTree(child, child.children);
    }
  }
}

// 更新整个组件树
updateDomTree(root, root.children);
```

简化例子中，updateDomTree 函数递归地遍历整个组件树，直到所有子组件都完成调和。由于 JavaScript 是单线程的，这意味着在调和过程中，其他任务（如动画、用户交互等）将被阻塞，导致浏览器看起来卡顿。

<br/>
<br/>
<br/>

### 浏览器都在做什么呢

```
+-----------------------------------------------------------+
|    JavaScript Execution                                   |
|   (Event Handling, Animation, AJAX, DOM Manipulation)     |
+-----------------------------------------------------------+
                              |
                              v
+-----------------------------------------------------------+
|    Style Recalculation                                    |
|   (Update CSSOM, Resolve Inheritance, Cascade Styles)     |
+-----------------------------------------------------------+
                              |
                              v
+-----------------------------------------------------------+
|    Layout Update                                          |
|   (Generate Layout Tree, Calculate Positions and Sizes)   |
+-----------------------------------------------------------+
                              |
                              v
+-----------------------------------------------------------+
|    Paint & Rasterization                                  |
|   (Draw Elements, Rasterize Text, Create Layers)          |
+-----------------------------------------------------------+
                              |
                              v
+-----------------------------------------------------------+
|    Compositing                                            |
|   (Layer Management, Blending, GPU Acceleration)          |
+-----------------------------------------------------------+
                              |
                              v
+-----------------------------------------------------------+
|    Display on Screen                                      |
|   (Update Screen, V-Sync, Refresh Rate)                   |
+-----------------------------------------------------------+
```

- **JavaScript Execution（JavaScript 执行）**：在一帧的开始，浏览器执行 JavaScript 代码。这包括处理用户交互事件（如点击、滚动和触摸）、动画更新、数据获取（如 AJAX 请求）、以及直接操作 DOM。
- **Style Recalculation（样式重新计算）**：如果 JavaScript 操作导致了样式更改，浏览器将重新计算受影响元素的样式。这包括更新 CSSOM、解析样式继承、以及级联样式规则。
- **Layout Update（布局更新）**：样式更改可能导致布局信息的更新。浏览器将生成布局树并计算元素的新位置和大小。
- **Paint & Rasterization（绘制和光栅化）**：浏览器根据更新后的布局信息将元素绘制到屏幕上。这包括绘制矢量图形、文本、图像等，并将矢量图形转换为位图（光栅化）。此过程还包括创建图层，为合成阶段做准备。
- **Compositing（合成）Display on Screen（显示在屏幕上）**：浏览器将各个图层合成为最终的图像。这个过程涉及图层管理、图像合成和混合。此外，合成阶段还可以利用 GPU 加速以提高性能。
- **Display on Screen（显示在屏幕上）**- ：浏览器将生成的最终图像显示在屏幕上。这涉及更新屏幕、与显示器的垂直同步信号（V-Sync）保持同步，以及适应屏幕的刷新率。

> 关于浏览器的工作原理，也可以参考一篇 [文章](https://developer.chrome.com/blog/inside-browser-part3/) 丰富理论基础知识

<br/>

浏览器做的事情非常多，为了实现流畅的用户体验，浏览器需要在每秒约 60 帧的速率下完成这些任务。意味着每一帧只有大约 16.7 毫秒来执行所有操作，当一个函数调用栈持续时间过长时，就会出现卡顿现象。

要想利用好浏览器的空余时间来工作，需要将需要执行的内容拆分成独立的小任务。而引入 Fiber 架构的原因，就是为了将原本一气呵成的堆栈调用进行拆分，拆分成一个个可以独立运行且存在优先级的任务，充分利用浏览器的工作机制，提升性能。

是否有浏览器 API 能支持我们在空闲时执行任务呢？

<br/>
<br/>
<br/>

### requestIdleCallback

它允许在浏览器空闲时段执行一些后台或低优先级任务。当浏览器主线程空闲时，即在处理高优先级任务（如动画、用户交互、布局更新等）之间的间隙，会调用你提供的回调函数。可以有效地利用主线程的闲置时间，以提高应用程序的性能和响应速度。但它也有一些局限性：

- **浏览器支持**：并非所有浏览器都支持。在使用之前，确保目标浏览器的支持性。
- **不可预测的执行时间**：只在浏览器空闲时执行回调，意味着不能确切地知道何时执行。
- **不适用于实时性要求高的任务**：由于执行时间不可预测，不适合执行对实时性要求较高的任务（如动画、用户交互和即时响应）。
- **可能的性能影响**：尽管是在空闲时间执行任务以提高性能，但在使用时执行了高耗时或高计算量的任务，仍然可能对性能产生负面影响。
- **无法设置优先级**

<br/>

虽无法满足，但可以了解下

- 注册回调函数：requestIdleCallback 函数向浏览器注册一个回调函数。浏览器会在有空闲时间时尽快调用这个回调函数。
  ```js
  requestIdleCallback(myCallback);
  ```
- 回调函数参数：当浏览器调用回调时，会传递一个 IdleDeadline 对象作为参数。对象包含以下：
  - timeRemaining(): 返回当前空闲周期中剩余的时间，以毫秒为单位。可以使用这个方法来检查浏览器还有多少空闲时间可以执行任务。
  - didTimeout: 一个布尔值，表示回调是否因为超时而被调用。如果在注册回调时设置了超时，那么当超时发生时，这个属性会为 true。
- 设置超时：在注册回调函数时，可以设置一个可选的超时参数。如果在超时时间内浏览器仍未找到空闲时间来执行回调，那么它会尽快调用回调函数，并将 IdleDeadline 对象的 didTimeout 属性设置为 true。
  ```js
  requestIdleCallback(myCallback, { timeout: 1000 }); // 设置超时为 1000 毫秒
  ```
- 取消回调：如果需要取消之前注册的回调，可以使用 cancelIdleCallback 函数。它接受一个表示回调 ID 的参数，这个 ID 由 requestIdleCallback 返回。
  ```js
  const callbackId = requestIdleCallback(myCallback);
  cancelIdleCallback(callbackId); // 取消回调
  ```

<br/>
<br/>
<br/>

```js
const tasks = [
  () => console.log("Task 1"),
  () => console.log("Task 2"),
  () => console.log("Task 3"),
  () => console.log("Task 4"),
  () => console.log("Task 5"),
];

function processTask(deadline) {
  while (
    (deadline.timeRemaining() > 0 || deadline.didTimeout) &&
    tasks.length > 0
  ) {
    const task = tasks.shift(); // 从任务队列中取出一个任务
    task(); // 执行任务
  }

  if (tasks.length > 0) {
    // 如果仍有未完成的任务，则继续请求空闲回调
    requestIdleCallback(processTask);
  } else {
    console.log("All tasks completed!");
  }
}

// 请求空闲回调以启动工作循环
requestIdleCallback(processTask);
```
