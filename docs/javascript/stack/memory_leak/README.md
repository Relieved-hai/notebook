## 垃圾回收算法

常用垃圾回收算法叫做 **标记清除（Mark-and-sweep）**

- 垃圾回收器创建了一个 "**roots**" 列表。**roots** 通常是代码中全局变量的引用。

- 所有的 **roots** 被检查和标记为激活（即不是垃圾）。所有的子对象也被递归第检查。从 root 开始的所有对象如果是可达的，它就不被当作垃圾。

- 所有未标记的内存会被当做垃圾，收集器现在可以释放内存，归还给操作系统了。

现代的垃圾回收器改良了算法，但本质是相同的：可达内存被标记，其余的被当作垃圾回收。

<br/>
<br/>
<br/>

## 四种常见的 JS 内存泄漏

### 1.意外的全局变量 

未定义的变量会在全局对象创建一个新变量

```js
function foo(arg) {
  bar = 'this is a hidden global variable'
}
```

函数 foo 内部忘记使用 var ，实际上 JS 会把 bar 挂载在全局对象上，意外创建一个全局变量。

```js
function foo(arg) {
  window.bar = 'this is an explicit global variable'
}
```

另一个意外的全局变量可能由 `this` 创建

```js
function foo() {
  this.variable = 'potential accidental global'
}

// Foo 调用自己， this 指向了全局对象 （window）
// 而不是 undefined
foo()
```

在 JavaScript 文件头部加上 ’`use strict`‘，使用严格模式避免意外的全局变量，此时该例子中的 `this` 执行 `undefined`。如果必须使用全局变量存储大量数据时，确保用完以后把它设置为 null 或者重新定义。

<br/>
<br/>

### 2.被遗忘的计时器或回调函数 

计时器 `setInterval` 代码很常见

```js
var someResource = getData();

setInterval(function() {
  var node  = document.getElementById('node');
  if(node) { 
    // 处理 node 和 someResource
    node.innerHTML = JSON.stringify(someResource)
  }
}, 1000)
```

上面的例子表明，在节点 node 或者数据不再需要时，定时器依旧指向这些数据。所以哪怕 node 节点被移除后，interval 依旧存活并且垃圾回收器没办法回收，它的依赖也没办法被回收，除非终止定时器。

<br/>

```js
var element = document.getElementById('button');

function onClick(event) {
  element.innerHTML = 'text';
}

element.addEventListener('click', onClick);
```

对于上面观察者的例子，一旦它们不再需要（或者关联的对象变成不可达），明确地移除它们非常重要。老的 IE6 是无法处理循环引用的。因为老版本的 IE 是无法检测 DOM 节点与 JavaScript 代码之间的循环引用，会导致内存泄漏。

但是，现代的浏览器（包括 IE 和 Microsoft Edge）使用了更先进的垃圾回收算法（标记清除），已经可以正确检测和处理循环引用了。既回收节点内存时，不必非要调用 `removeEventListener` 了。

<br/>
<br/>

### 3.脱离 DOM 的引用 

如果把 DOM 存在字典（JSON键值对）或者数组，此时，同样的 DOM 元素存在两个引用：
    - 一个在 DOM 树中
    - 另一个在字典中。
那么将来需要把两个引用都清除。

<br/>

```js
var elements = {
  button: document.getElementById('button'),
  image: document.getElementById('image'),
  text: document.getElementById('text')
};

function doStuff() {
  image.src = 'http://some/url/image';
  button.click();
  console.log(text.innerHTML);
  // code ...
}

function removeButtom() {
  // 按钮是 body 的后代元素
  document.body.removeChild(document.getElementById('button'));
  // 此时，仍旧存在一个全局的 #button 的引用
  // elements 字典。button 元素仍旧在内存中，不能被 GC 回收。
}
```

如果代码中保存了表格某一个 `<td>` 的引用。将来决定删除整个表格的时候，直觉认为 GC 会回收除了已保存的 `<td>` 以外的其他节点。实际情况并非如此
    - 此 `<td>` 是表格的子节点，子元素与父元素是引用关系。
    - 由于代码保留了 `<td>` 的引用，导致整个表格仍待在内存中。
    - 所有保存 DOM 元素引用的时候，要小心谨慎。

<br/>
<br/>


### 4.闭包 

闭包的关键是匿名函数可以访问父级作用域的变量。

```js
var theThing = null;

var replaceThing = function() {
  var originalThing = theThing;
  
  var unused = function() {
    if(originalThing) { 
      console.log('hi');
    }
  };

  theThing = {
    longStr: new Array(1000000).join('*'),
    someMethod: function() {
      console.log(someMessage);
    }
  }
};

setInterval(replaceThing, 1000)
```

- 代码片段做了一件事情：
    - 每次调用 replaceThing ，theThing 得到一个包含一个大数组和一个新闭包（someMethod）的新对象。
    - 同时，变量 unused 是一个引用 originalThing 的闭包（先前的 replaceThing 又调用了 theThing ）。
    - 思绪混乱了吗？最重要的事情是，闭包的作用域一旦创建，它们有同样的父级作用域，作用域是共享的。
    - someMethod 可以通过 theThing 使用。
    - someMethod 与 unused 分享闭包作用域。
    - 尽管 unused 从未使用，它引用的 originalThing 迫使它保留在内存中（防止被回收）。
    - 当这段代码反复运行，就会看到内存占用不断上升，垃圾回收器（GC）并无法降低内存占用。
    - 本质上，闭包的链表已经创建，每一个闭包作用域携带一个指向大数组的间接的引用，造成严重的内存泄漏。

**解决方法：**

在 `replaceThing` 的最后添加 `originalThing = null`。

<br/>
<br/>
<br/>

> [4类 JavaScript 内存泄漏及如何避免](https://jinlong.github.io/2016/05/01/4-Types-of-Memory-Leaks-in-JavaScript-and-How-to-Get-Rid-Of-Them/)
>
>[ECMAScript 6 入门之const 命令](http://es6.ruanyifeng.com/#docs/let#const-%E5%91%BD%E4%BB%A4)













