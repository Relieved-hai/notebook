红宝书（p178）上对于闭包的定义：

- 闭包是指有权访问另外一个函数作用域中的变量的函数
    
    - 是一个函数
    
    - 能访问另外一个函数作用域中的变量

<br/>
<br/>
<br/>

- 闭包有下面三个特性
    
    - 1、闭包可以访问当前函数以外的变量
    
    - 2、即使外部函数已经返回，闭包仍能访问外部函数定义的变量
    
    - 3、闭包可以更新外部变量的值


<br/>
<br/>

**1、闭包可以访问当前函数以外的变量**
```js
function getOuter() {
  var date = '815'
  
  function getDate(str) {
    console.log(str + date); // 访问外部 date
  }

  return getDate('今天是：') // 今天是： 815
}

getOuter()
```

getDate 是一个闭包，该函数执行时，会形成一个作用域A，A中并没有定义变量date，但它能在父一级作用域中找到该变量的定义。

<br/>
<br/>

**2、即使外部函数已经返回，闭包仍能访问外部函数定义的变量**
```js
function getOuter() {
  var date = '815';
  
  function getDate(str) {
    console.log(str + date); // 访问外部的date
  }
  
  return getDate(); // 外部函数返回
}

var today = getOuter();

today('今天是： ')
today('明天不是： ')
```

<br/>
<br/>

**3、闭包可以更新外部变量的值**
```js
function updateCount() {
  var count = 0;
  
  function getCount(val) {
    count = val;
    console.log(count);
  }
  
  return getCount(); // 外部函数返回
}

var count = updateCount();

count(815); // 815
count(816); // 816
```

<br/>
<br/>
<br/>

## 作用域链

为啥闭包就能访问外部函数的变量呢？这就要说说Javascript中的作用域链了。

Javascript 中有一个执行上下文（execution context）的概念，它定义了变量或函数有权访问的其他数据，决定了他们各自的行为。每个执行环境都有一个与之关联的变量对象，环境中定义的所有变量和函数都保存在这个对象中。你可以把它当做 JavaScript 的一个普通对象，你可以修改它的属性，但却不能引用它。

详情查看 [执行上下文栈和变量对象](/javascript/stack/stack_variable/)

**变量对象也是有父作用域的**。当访问一个变量时，解释器会首先在当前作用域查找标示符，如果没找到，就去父作用域找，直到找到该变量的标示符或者不再存在父作用域中了，这就是作用域链。

**作用域链和原型继承有点类似，但又有点小区别：** 如果去查找一个普通对象的属性时，在当前对象和其原型中都找不到时，会undefined；但查找的属性在作用域中不存在的话就会抛出 ReferenceError。

**作用域链的顶端是全局对象，对于全局环境中的代码，作用域链只包含一个元素：全局对象**。所以，在全局环境中定义变量的时候，它们就会被定义到全局对象中。当函数被调用的时候，作用域链就会包含多个作用域对象。

<br/>
<br/>
<br/>


## 全局对象


关于作用域链讲得略多（红皮书上有关于作用域及执行环境的详细解释），看一个简单的例子

```js
// my_script.js
"use strict";

var foo = 1;
var bar = 2;
```

在全局环境中，创建了两个简单的变量。如前面所说，此时变量对象是全局对象：

![变量对象](./chain_01.png)

执行上诉代码，my_script.js 本身会形成一个执行环境，以及它所引用的变量对象

<br/>
<br/>

### 无嵌套的函数
 
改动一下代码，创建一个没有函数嵌套的函数（**Non nested functions**）：

```js
"use strict";

var foo = 1;
var bar = 2;

function myFunc() {
  // -- define local-to-function variables
  var a = 1;
  var b = 2;
  var foo = 3;
  console.log("inside myFunc");
}

console.log("outside");
//-- and then, call it:
myFunc();
```

当 myFunc 被定义的时候， myFunc 的标识符（identifier）就被加到了当前的作用域对象中（在这里就是全局对象），并且这个标识符所引用的是一个函数对象（function object）。函数对象中所包含的是函数的源代码以及其他的属性。其中一个我们所关心的属性就是内部属性[[scope]]。[[scope]]所指向的就是当前的作用域对象。也就是指的函数的标识符被创建的时候，我们所能够直接访问的那个作用域对象（在这里就是全局对象）。

![作用域对象](./chain_02.png)

<br/>
<br/>

比较重要的一点是：myFunc 所引用的函数对象，其本身不仅仅含有函数的代码，并且还含有指向其被创建的时候的作用域对象。

当 myFunc 函数被调用的时候，一个新的作用域对象被创建了。新的作用域对象中包含 myFunc 函数所定义的本地变量，以及其参数（arguments）。这个新作用域对象的父作用域对象就是在运行 myFunc 时，我们所能直接访问的那个作用域对象。（全局对象）

所以，当 myFunc 被执行的时候，对象之间的关系如下图所示

![作用域对象](./chain_03.png)


<br/>
<br/>

### 嵌套函数（ Nested functions ）

如前面所说，当函数返回没有被引用的时候，就会被垃圾回收器回收。但是对于闭包（函数嵌套形成闭包的一种简单方式）呢，即使外部函数返回了，函数对象仍会引用它被创建时的作用域对象。

```js
"use strict";

function createCounter(initial) {
  var counter = initial;
  
  function increment(value) {
    counter += value;
  }
  
  function get() {
    return counter;
  }

  return {
    increment: increment,
    get: get
  }
}

var myCounter = createCounter(100);
console.log(myCounter.get());   // 返回 100
myCounter.increment(5);
console.log(myCounter.get());   // 返回 105
```

当调用 createCounter 时，对象之间的关系如下图所示：

内嵌套函数 increment 和 get 都有指向 createCounter(100) scope 的引用。如果 createCounter(100) 没有任何返回值，那么 createCounter(100) scope 不再被引用，于是就可以被垃圾回收。

![作用域对象](./chain_04.png)

<br/>
<br/>

但是因为 createCounter(100) 实际上是有返回值的，并且返回值都存储在了 myCounter 中，所以对象之间的引用关系变成了如下所示：

![作用域对象](./chain_05.png)

<br/>

需要用点时间思考的是：即使 createCounter(100) 已经返回，但是其作用域存在，并能且只能被内联函数访问。可以通过调用 myCounter.increment() 或 myCounter.get() 来直接访问 createCounter(100) 的作用域。

当 myCounter.increment() 或 myCounter.get() 被调用时，新的作用域对象会被创建，并且该作用域对象的父作用域对象会是当前可以直接访问的作用域对象。此时，引用关系如下：

![作用域对象](./chain_06.png)

<br/>


当执行到 return counter 时，在 get() 所在的作用域并没有找到对应的标识符，就会沿着作用域链往上找，直到找到变量 counter，然后返回该变量。

调用 increment(5) 则会更有意思：

![作用域对象](./chain_07.png)

<br/>


当单独调用 increment(5) 时，参数 value 会存贮在当前的作用域对象。函数要访问 value，就马上在当前作用域找到该变量。但是当函数要访问 counter 时，并没有找到，于是沿着作用域链向上查找，在 createCounter(100) 的作用域找到了对应的标识符，increment() 就会修改 counter 的值。除此之外，没有其他方式来修改这个变量。闭包的强大也在于此，能够存贮私有数据。

<br/>
<br/>
<br/>

Similar function objects, different scope objects

对于上面的counter示例，再说点扩展的。

```js
//myScript.js
"use strict";

function createCounter(initial) {
  /* ... see the code from previous example ... */
}
//-- create counter objects
var myCounter1 = createCounter(100);
var myCounter2 = createCounter(200);
```

myCounter1 和 myCounter2 创建之后，关系图：

![作用域](./chain_08.png)

在上面的例子中，myCounter1.increment 和 myCounter2.increment 的函数对象拥有一样的代码以及一样的属性值（name，length ...），但是它们的 [[scope]] 指向的是不一样的作用域对象。

这才有了下面的结果：

```js
var a, b;
a = myCounter1.get();   // a 等于 100
b = myCounter2.get();   // b 等于 200
myCounter1.increment(1);
myCounter1.increment(2);
myCounter2.increment(5);
a = myCounter1.get();   // a 等于 103
b = myCounter2.get();   // b 等于 205
```

<br/>
<br/>
<br/>

## 参考

[转载至：从作用域链谈闭包](https://github.com/dwqs/blog/issues/18)



















