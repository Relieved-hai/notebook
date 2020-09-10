## call() 和 apply()

> 都具有 和 分别提供的参数

- `call()` 方法接收 **一个指定的 this** 和 **参数列表**

- `apply()` 方法接收 **一个指定的 this** 和  **一个参数数组**

<br/>

🌰

```javascript
var func = function(arg1, arg2) {
  // ...
}

// this、参数列表
func.call(this, arg1, arg2)

// this、参数数组
func.apply(this, [arg1, arg2])
```

<br/>
<br/>

## 使用场景

**1. 合并两个数组**

```javascript
var arr1 = ['a', 'b'];
var arr2 = ['c', 'd'];


// 将第二个数组融合进第一个数组
// 相当于 arr1.push('c', 'd');
Array.prototype.push.apply(arr1, arr2);
// 4

console.log(arr1);
// ['a', 'b', 'c', 'd']
```

:::tip
**一个函数能够接受的参数个数是有限制的**。不同的引擎有不同的限制，JS核心限制在 65535，有些引擎会抛出异常，有些不抛出异常但丢失多余参数。
:::

<br/>

**2. 获取数组中的最大值和最小值**

```javascript
var numbers = [5, 10, 15, -20];

Math.max.apply(Math, numbers); // 15

Math.max.call(Math, 5, 10, 15, -20); // 15
```

因为数组 numbers 本身没有 **max** 方法，但是 **Math** 有呀，这里借助 **call / apply** 使用 **Math.max** 方法。

<br/>

**3. 验证是否是数组**

```javascript
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}
isArray([1, 2, 3]); // true



// 直接使用 toString()
[1, 2, 3].toString(); 	// "1,2,3"
"123".toString(); 		// "123"
123.toString(); 		// SyntaxError: Invalid or unexpected token
Number(123).toString(); // "123"
Object(123).toString(); // "123"
```

可以通过 `toString()` 来获取每个对象的类型，但是不同对象的 `toString()` 有不同的实现。所以通过 `Object.prototype.toString()` 来检测，需要以 `call() / apply()` 的形式来调用，传递要检查的对象作为第一个参数。

<br/>

**4. 类数组对象（Array-like Object）使用数组方法**

```javascript
var domNodes = document.getElementsByTagName('*');
domNodes.unshift("h1"); // TypeError: domNodes.unshift is not a function

var domNodeArrays = Array.prototype.slice.call(domNodes);
domNodeArrays.unshift("h1"); // 返回该数组的新长度(该方法修改原有数组)。
```

类数组对象有下面两个特征

- **具有**：指向对象元素的数字索引下标和 length 属性

- **不具有**： 如 `push`、`shift`、`forEach` 以及 `indexOf` 等数组对象具有的方法。


类数组对象是一个**对象**。JS 中存在一种名为**类数组**的对象结构。比如 `arguments` 对象，DOM API 返回的 NodeList 对象都属于类数组对象。

<br/>

**类数组对象** 转 **数组** 的其他方法：
```javascript
// 上面代码等同于
var arr = [].slice.call(arguments);

// ES6
let arr = Array.from(arguments);
let arr = [...arguments];
```

`Array.from()` 可以将两类对象转为真正的数组：

- **类数组** 对象。

- **可遍历 ( iterable )** 对象。包括ES6新增的数据结构 Set 和 Map）。

<br/>

**PS** : 为什么要有类数组呢？或者说类数组对象是为什么解决什么问题才出现的？

> JavaScript 类型化数组是一种类似数组的**对象**，并提供了一种用于访问原始二进制数据的结构。`Array` 存储的对象能动态增多、减少，并且可以存储任何 JavaScript 值。JavaScript 引擎会做一些内部优化，以便对数组的操作可以很快。然而，随着 Web 应用程序变得越来越强大，尤其一些新增的功能，例如：音频视频编辑，访问 WebSockets 的原始数据等，很明显有些时候如果使用 JavaScript 代码可以快速方便地通过类型化数组来操作原始的二进制数据，这将会非常有帮助。

一句话就是，**可以更快的操作复杂数据。**

<br/>
<br/>

## bind()

`bind()` 方法创建一个新的函数，在 `bind()` 被调用时，这个新函数的 `this` 被指定为 `bind()` 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。

1. 可以指定 this

2. 返回一个函数

3. 可以传入参数


语法：`fun.bind(thisArg[, arg1[, arg2[, ...]]])`

<br/>

🌰

```javascript
var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    return {
		value: this.value,
		name: name,
		age: age
    }
};

bar.call(foo, "Jack", 20); // 直接执行了函数
// {value: 1, name: "Jack", age: 20}

var bindFoo1 = bar.bind(foo, "Jack", 20); // 返回一个函数
bindFoo1();
// {value: 1, name: "Jack", age: 20}

var bindFoo2 = bar.bind(foo, "Jack"); // 返回一个函数
bindFoo2(20);
// {value: 1, name: "Jack", age: 20}
```


<br/>

## 使用场景

**1. 业务场景**

```javascript
var nickName = 'Kitty';

function Person(name) {
  this.nickName = name;
  this.distractedGreeting = function() {
    setTimeout(function() {
      console.log('Hello, my name is' + this.nickName);
    }, 500)
  }
}

var person = new Person('jawil');

person.distractedGreeting(); // log: Hello, my name isKitty
```

因为 `setTimeout` 在全局环境中执行，当前 `this` 指向的是 `window`，而全局中有一个 `nickName`。

<br/>

解决方案 ( 不考虑 ES6 )。

- **1. 缓存 this**
```javascript
var nickname = "Kitty";
function Person(name){
    this.nickname = name;
    this.distractedGreeting = function() {

		var self = this; // added
        setTimeout(function(){
            console.log("Hello, my name is " + self.nickname); // changed
        }, 500);
    }
}

var person = new Person('jawil');

person.distractedGreeting(); // Hello, my name is jawil
```

- **2. 使用 bind**

```javascript
var nickname = "Kitty";
function Person(name){
    this.nickname = name;
    this.distractedGreeting = function() {

        setTimeout(function(){
            console.log("Hello, my name is " + this.nickname);
        }.bind(this), 500);
    }
}

var person = new Person('jawil');

person.distractedGreeting(); // Hello, my name is jawil
```

<br/>

**2. 验证是否是数组**

```javascript
var toStr = Function.prototype.call.bind(Object.prototype.toString);
function isArray(obj) {
  return toStr(obj) === '[object Array]';
}

isArray([1, 2, 3]);
// true

// 使用改造后的 toStr
toStr([1, 2, 3]); 	// "[object Array]"
toStr("123"); 		// "[object String]"
toStr(123); 		// "[object Number]"
toStr(Object(123)); // "[object Number]"
```

首先使用 `Function.prototype.call` 函数指定一个 `this` 值，然后 `.bind` 返回一个新的函数，始终将 `Object.prototype.toString` 设置为传入参数。其实等价于 `Object.prototype.toString.call()`。

:::tip
前提是 toString() 方法没有被覆盖
:::

<br/>

**3. 柯里化（ curry ）**

> 只传递给函数一部分参数来调用它，让它返回一个函数去处理剩下的参数。

可以一次性地调用柯里化函数，也可以每次只穿一个参数分多次调用

```javascript
var add = function(x) {
  return function(y) {
    return x + y;
  };
};

var increment = add(1);
var addTen = add(10);

increment(2);
// 3

addTen(2);
// 12

add(1)(2);
// 3
```

这里定义了一个 `add` 函数，它接受一个参数并返回一个新的函数。调用 `add` 之后，返回的函数就通过闭包的方式记住了 `add` 的第一个参数。所以说 `bind` 本身也是闭包的一种使用场景。

<br/>
<br/>
<br/>

## 区别

- `bind()` 返回一个绑定上下文的函数

- `call()`、`apply()` 则是直接执行了函数


<br/>
<br/>
<br/>

[JavaScript深入之call和apply的模拟实现](https://github.com/mqyqingfeng/Blog/issues/11)

[JavaScript常用八种继承方案](https://juejin.im/post/5bcb2e295188255c55472db0)

[深入浅出 妙用Javascript中apply、call、bind](https://www.cnblogs.com/coco1s/p/4833199.html)

[不用 call 和 apply 方法模拟实现 ES5 的 bind 方法](https://www.cnblogs.com/libin-1/p/6799263.html)

[JavaScript 深入之 bind 的模拟实现](https://github.com/mqyqingfeng/Blog/issues/12)

[第 4 章: 柯里化（curry）](https://llh911001.gitbooks.io/mostly-adequate-guide-chinese/content/ch4.html)
