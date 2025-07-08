事件合成机制是？为什么要做这件事？

<br/>

```js
let element = document.getElementById("btn");
// 方式1:
element.onclick = function () {};
// 方式2:
element.addEventListenner("click", function () {});
```

在 JavaScript 中操作事件时，有可能会遇到下面的问题。当然在日新月异的现在，可能已不是问题了

- 浏览器兼容
  - 获取事件源
    - w3c 浏览器：
    - IE6、7、8
  - 阻止冒泡
    - 微软模型中：设置 cancelBubble 属性为 true
    - W3C 模型中：调用 stopPropagation() 方法
  - 取消默认事件
    - window.event.returnValue = false
    - event.preventDefault()
  - ...
- 如果给每个 dom 元素都进行一次事件绑定，内存占用，操作繁琐
- ...

<br/>
<br/>
<br/>

通过 **事件合成** 的方式，至少可以解决上面所提到的两个问题

![](./images/event.png)

图中展示了 dom 事件流的三个阶段

- **事件捕获阶段**
- **处于目标阶段**
- **事件冒泡阶段**

**先后顺序：先由外而内捕获，事件源头收到事件，后由内而外冒泡**

事件合成机制，对传统 dom 事件流进行整合，把原本需要绑定在子元素的事件委托给父元素，让父元素负责事件监听。这个过程称之为事件委托或事件代理。而实现事件合成机制，充分利用了 dom 事件流中的事件冒泡阶段。

从图中可以可以看到，我们可以将事件统一注册到 document（也可以注册到某个根节点） 上，事件源的事件触发后，事件冒泡到 document 后再统一处理。
