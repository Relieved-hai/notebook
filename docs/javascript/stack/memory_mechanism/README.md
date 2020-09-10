Js 内存空间分为 **栈（stack）**、 **堆（heap）**、**池（一般也会归类为栈中）**。
- **栈** 存放变量。
- **堆** 存放复杂对象。
- **池** 存放常量，所以也叫常量池。

<br/>

[内存空间](https://relieved-hai.github.io/notebook/javascript/memory_space/)

- 基本类型： **栈** 内存（不包含闭包中的变量）
- 引用类型： **堆** 内存

<br/>
<br/>
<br/>

## 内存回收

JavaScript 有自动垃圾收集机制，垃圾收集器会每隔一段时间就执行一次释放操作，找出那些不再继续使用的值，然后释放其占用的内存。

- 局部变量和全局变量的销毁
    - **局部变量：** 局部作用域中，当函数执行完毕，局部变量也就没有存在的必要了，因此垃圾收集器很容易做出判断并回收。
    
    - **全局变量：** 全部变量什么时候需要自动释放内存空间则很难判断，所以在开发中尽量 **避免** 使用全局变量。

- 以 Google 的 V8 引擎为例，V8 引擎中所有的 JS 对象都是通过 **堆** 来进行内存分配的。
    - **初始分配：** 当声明变量并赋值时，V8 引擎就会在栈内存中分配给这个变量。
    - **继续申请：** 当已申请的内存不足以存储这个变量时，V8 引擎就会继续申请内存，直到堆的大小达到了 V8 引擎的内存上限为止。

- V8 引擎对 **堆** 内存中的 JS 对象进行 **分代管理**
    - **新生代：** 存活周期较短的 JS 对象，如临时变量、字符串等。
    - **老生代：** 经过多次垃圾回收仍然存活，存活周期较长的对象，如主控制器、服务器对象等。

<br/>
<br/>
<br/>

## 垃圾回收算法

对垃圾回收算法来说，核心思想就是如何判断内存已经不再使用，常用垃圾回收算法有下面两种。

- 引用计数（现代浏览器不再使用）
- 标记清除（常用）

<br/>

### 引用计数

引用计数算法定义 `内存不再使用` 的标志很简单，就是看一个对象是否有指向它的 **引用**。如果没有其他对象指向它，说明该对象已经不再需要了。

```js
// 创建一个对象 person， 他有两个指向属性 age 和 name 的引用

var person = {
  age: 12,
  name: 'aaaa'
};

person.name = null; // 虽然 name 设置为 null，但因为 person 对象还有指向 name 的引用，因此 name 不会被回收

var p = person;
person = 1; // 原来的 person 对象被赋值为 1，但因为有新引用 p 指向 person 对象，因此它不会被回收

p = null; // 原 person 对象已经没有引用，很快会被回收
```

引用计数有一个致命的问题，那就是 **循环引用**

如果两个对象互相引用，尽管它们已不再使用，但是垃圾回收器不会进行回收，最终可能会导致内存泄漏。

```js
function cycle() {
  var o1 = {};
  var o2 = {};
  o1.a = o2;
  o2.a = o1;
  
  return 'ycle reference!';
}

cycle();
```

cycle 函数执行完成之后，对象 o1 和 o2 实际上已经不再需要了，但根据引用计数的原则，它们之间的互相引用依然存在，因此这部分内存不会被回收。所以现代浏览器 **不再使用** 这个算法

IE 依旧使用。
```js
var div = document.createElement('div');

div.onclick = function() {
  console.log('click');
}
```
这个写法很常见，但是该例子就是一个循环引用。

变量 div 有事件处理函数的引用，同时事件处理函数也有 div 的引用，因为 div 变量可在函数内被访问，所以循环引用就出现了。

<br/>

### 标记清除（常用）

标记清除算法将 `不再使用的对象` 定义为 **无法到达的对象**。即从根部（在 JS 中就是全局对象）出发定时扫描内存中的对象，凡是能从根部达到的对象，**保留**。那么从根部出发无法触及到的对象标记为 **不再使用**，稍后进行回收。

无法触及的对象包含了没有引用的对象这个概念，但反之未必成立。

所以上面的例子就可以正确被垃圾回收处理了。

所以现在对于主流浏览器来说，只需要切断需要回收的对象与根部的联系。最常见的内存泄漏一般都与 DOM 元素绑定有关：

```js
emali.message = document.createElement('div');

displayList.appendChild(emali.message);

// 稍后从 displayList 中清除 DOM 元素
displayList.removeChild();
```

该例子中，`div` 元素已经从 DOM 树中清除，但是该 `div` 元素还绑定在 email 对象中，所以如果 email 对象存在，那么该 `div` 元素就会一直保存在内存中。

<br/>
<br/>
<br/>

## 内存泄漏

对于持续运行的服务进程（daemon），必须及时释放不再用到的内存。否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃。对于不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak）

<br/>
<br/>
<br/>


## 内存泄漏识别方法

### 浏览器方法

1. 打开开发者工具，选择 Memory
2. 在右侧的 Select profilinf type 字段里面勾选 timeline
3. 点击右上角的录制按钮
4. 在页面上进行各种操作，模拟用户的使用情况
5. 一段时间后，点击左上角的 stop 按钮，面板上就会显示这段时间的内存占用情况。

<br/>
<br/>

### 命令行方法

使用 Node 提供的 process.memoryUsage 方法。

```js
console.log(process.memoryUsage());

// 输出
{ 
  rss: 27709440,		// resident set size，所有内存占用，包括指令区和堆栈
  heapTotal: 5685248,   // "堆"占用的内存，包括用到的和没用到的
  heapUsed: 3449392,	// 用到的堆的部分
  external: 8772 		// V8 引擎内部的 C++ 对象占用的内存
}
```

判断内存泄漏，以 `heapUsed` 字段为准。

<br/>
<br/>

### WeakMap

ES6 新出的两种数据结构： `WeakSet` 和 `WeakMap`，表示这是弱引用，它们对于值的引用都是不计入垃圾回收机制的。

```js
const wm = new WeakMap();
const element = document.getElementById('example');

wm.set(element, 'some infomation');
wm.get(element) // 'some infomation
```

先创建一个 WeakMap 实例，然后将一个 DOM 节点作为键名存入该实例，并将一些附加消息作为键值，一起存放在 WeakMap 里面。这时， WeakMap 里面对 element 的引用就是弱引用，不会被计入垃圾回收机制。


<br/>
<br/>
<br/>

## 思考

**问题一：**
从内存来看 null 和 undefined 本质的区别是什么？

<br/>

**问题二：**
ES6语法中的 const 声明一个只读的常量，那为什么下面可以修改const的值？

```js
const foo = {}; 
foo = {}; // TypeError: "foo" is read-only
foo.prop = 123;
foo.prop // 123
```

<br/>

**问题三：**
哪些情况下容易产生内存泄漏？

<br/>
<br/>
<br/>

**解答一：**

- null
    - 给一个全局变量赋值为 null，相当于将这个变量的指针对象以及值清空
    
    - 如果是给对象的属性赋值为 null，或者局部变量赋值为 null，相当于给这个属性分配了一块空的内存，然后赋值为 null
    
    - JS 会回收全局变量为 null 的对象。

- undefined
    - 给一个全局变量赋值为 undefined，相当于将这个对象的值清空，但是这个对象依旧存在，
    
    - 如果是给对象的属性赋值为 undefined，说明这个值为空值

<br/>

声明了一个变量，但未对其初始化时，这个变量的值就是 undefined，它是 JavaScript 基本类型之一。

```js
var data;

console.log(data === undefined); // true
```

<br/>

对于尚未声明过的变量，只能执行一项操作，即使用 typeof 操作符检测其数据类型，使用其他操作符都会报错

```js
// data 变量未定义
console.log(typeof data); // 'undefined'
console.log(data === undefined); // error
```

<br/>

值 null 特指对象的值未设置，它是 JavaScript 基本类型之一。

值 null 是一个字面量，它不像 [undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined) 是全局对象的一个属性。null 是表示缺少的标识，指示变量未指向任何对象

```js
// foo 不存在，它从来没有被定义过或者是初始化过
foo;
"ReferenceError: foo is not defined"

// foo 现在已经是存在，但是它没有类型或者是值：
var foo = null;
console.log(foo); // null

```

<br/>
<br/>

**解答二：**

- const
    
    - const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。
    
    - 对于简单类型的数据（数值、字符串、布尔值），值就保存在变量指向的那个内存地址，因此等同于常量。
    
    - 但对于符合类型的数据（主要是对象和数组），变量指向的内存地址，保存的只是一个指向实际数据的指针。
    
    - const 只能保证这个指针是固定的（即总是指向另一个固定的地址）
    
    - 至于它指向的数据结构是不是可变的，就完全不能控制了。因此，将一个对象声明为常量必须非常小心。



















































