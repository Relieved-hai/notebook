this 的绑定规则总共有下面 5 种：
- 1. 默认绑定（严格 / 非严格模式）
- 2. 隐式绑定
- 3. 显示绑定
- 4. new 绑定
- 5. 箭头函数绑定

<br/>

> `this` 关键字是 `JavaScript` 中最复杂的机制之一，因为 `this` 既不指向函数自身也不指向函数的作用域，而是取决于函数在哪里被调用。

<br/>

## 调用位置

调用位置就是函数在代码中被调用的位置（而不是声明的位置）

查找方法：

- 1. 分析调用栈： 调用位置就是当前正在执行的函数的**前一个调用**中

```js
function baz() {
  // 当前调用栈是：baz
  // 因此，当前调用位置是全局作用域

  console.log('baz');
  bar(); // <-- bar 的调用位置 
}

function bar() {
  // 当前调用栈是： baz --> bar
  // 因此，当前调用位置在 baz 中

  console.log('bar');
  foo(); // <-- foo 的调用位置
}

function foo() {
  // 当前调用栈是： baz --> bar --> foo
  // 因此，当前的调用位置在 bar 中

  console.log('foo');
}

baz(); // <-- baz的调用位置
```

<br/>

- 2. 使用开发者工具得到调用栈：

设置断点或者插入 debugger 语句，运行时调试器会在那个位置暂停，同时展示当前位置的函数调用列表，（call stack）这就是 **调用栈**。找到栈中的 **第二个元素**，这就是真正的调用位置

<br/>

在明确了函数的直接调用位置后，我们需要知道 `this` 绑定的规则

<br/>
<br/>
<br/>

## 绑定规则

- 默认绑定
- 隐式绑定
- 显式绑定
- new 绑定

<br/>

### 默认绑定
- **独立函数调用**： 可以把默认绑定看作是无法应用其他规则时的默认规则，`this` 指向**全局对象**。

- **严格模式下**：不能将全局对象用于默认绑定，`this` 会绑定到 `undefined`。只有函数运行在非严格模式下，默认绑定才能绑定到全局对象。  

不过这里也有一个微妙的细节，只要 `foo()` 的执行上下文在非严格模式下时，即使在严格模式下调用，也不影响默认绑定规则。

```js
function foo() { // 运行在严格模式下，this 会绑定到 undefined
  "use strict";
  
  console.log(this.a);
}

var a = 2;

// 调用
foo() // TypeError: Cannot read property 'a' of undefined

// ---------------------------------------------------- //
// ---------------------------------------------------- //
// ---------------------------------------------------- //

function foo() { // foo() 执行上下文在非严格模式
  console.log(this.a);
}

var a = 2;

(function() { // 在严格模式下调用 foo()
  "use strict";

  foo() // 2 
})()
```

<br/>
<br/>

### 隐式绑定

当函数引用有**上下文对象**时，隐式绑定规则会把函数中的 `this` 绑定到这个上下文对象。对象属性引用链中只有一层或者说最后一层在调用中起作用。

不懂？可以看下面示例

<br/>

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo
}

obj.foo() // 2
```

这就是一个隐式绑定 `this` 的例子，通过 `obj` 来调用 `foo`，使用了 `obj` 的上下文引用了 `foo()`。所以在理解 `this` 上有句比较简单的话： **谁去调用就指向谁**。其实默认绑定 `this` 也可以这样理解，`foo()` 其实就是 `window.foo()`, 所以 `this` 指向 `window`。

如上所述，当函数引用有上下文对象时（即函数作为引用属性被添加到对象中），隐式绑定规则会把函数调用中的 `this` 绑定到这个上下文对象。

<br/>

```js
function foo() {
  console.log(this.a);
}

var obj2 = {
  a: 2,
  foo: foo
}

var obj1 = {
  a: 22,
  obj2: obj2
}

obj1.obj2.foo() // 2
```

这里注意，对象属性引用链中，只有最顶层或者说最后一层会影响函数的调用位置，故此情况下，隐式绑定会将 `this` 绑定到最后一层对象。

<br/>

隐式绑定中，在特定的情况下会出现 `隐式丢失` 现象。它会应用第一条的默认绑定规则，把 `this` 绑定到全局对象或者 `undefined` 中。取决于是否在严格模式下运行。
```js
// 虽然 bar 是 obj.foo 的一个引用，但是实际上，它引用的是 foo 函数本身。
// bar() 是一个不带任何修饰的函数调用，它会应用 默认绑定
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2,
  foo: foo
}

var bar = obj.foo; // 函数别名

var a = "oops, global"; // a 是全局对象的属性

bar(); // oops, global
```

如上，这里将绑定至上下文对象的函数被赋值给一个新的函数，然后调用这个新的函数时。

<br/>

```js
function foo() {
  console.log(this.a);
}

function doFoo(fn) {
  // fn 其实引用的是 foo

  fn(); // <-- 调用位置
}

var obj = {
  a: 2,
  foo: foo
}

var a = "oops, global"; // a 是全局对象的属性

doFoo(obj.foo) // oops, global

// --------------------------------

// JS 环境中内置的 setTimeout() 函数实现和下面的伪代码类似：

function setTimeout(fn, delay) {
  // 等待 delay 毫秒
  fn(); // <-- 调用位置
}
```

也可以看做第一种情况的变种，这里参数传递其实就是一种隐式赋值，因此我们传入函数时也会被隐式赋值。所以现象和上面第一种是一样的结果，回调函数丢失 `this` 绑定是非常常见的。

除了开发人员自定义的函数，在将函数传入语言内置的函数比如 `setTimeout` 时，同样会发生隐式丢失的情况。

还有种情况 `this` 的行为会出乎我们意料：调用回调函数的函数可能会修改 `this`。

<br/>
<br/>

### 显式绑定

显示绑定里面有 `硬绑定` 和 `API 调用的 '上下文' 控制 this`


硬绑定就是我们经常看到的 `call`、`apply`、`bind(es5中)` 三个方法，如果我们把 `null` 和 `undefined` 作为 `this` 的绑定对象传入，那么这些值在调用时会被忽略，实际应用的是默认的绑定规则。

<br/>

通过 `call(...)` 、`apply(...)` 方法。第一个参数时一个对象，在调用函数时，将这个对象绑定到 `this`。因为直接指定 `this` 的绑定对象，称之为显示绑定

```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2
}

foo.call( obj ); // 2 调用 foo 时强制把 foo 的 this 绑定到 obj 上
```

显示绑定无法解决丢失绑定问题。

<br/>

- 1. 解决方案

创建函数 `bar()`，并在它的内部手动调用 `foo.call(obj)`，强制把 `foo` 的 `this` 绑定到了 `obj`。
```js
function foo() {
  console.log(this.a);
}

var obj = {
  a: 2
}

var bar = function() {
  foo.call( obj )
}

window.a = 22;
bar() // 2

setTimeout( bar, 100) // 2

// 硬绑定后的 bar 不可能再修改它的 this
bar.call( window ) // 2
```

<br/>

典型应用场景是创建一个包裹函数，负责接收参数并返回值。
```js
function foo(something) {
  console.log(this.a, something);
  return this.a + something
}

var obj = {
  a: 2
}

var bar = function() {
  return foo.apply( obj, arguments)
}

var b = bar( 3 ) // 2 3
console.log( b ) // 5
```

<br/>

创建一个可以重复使用的辅助函数

```js
function foo(something) {
  console.log( this.a, something);
  return this.a + something
}

// 简单的辅助绑定函数
function bind(fn, obj) {
  return function() {
    return fn.apply( obj, arguments )
  }
}

var obj = {
  a: 2
}

var bar = bind( foo, obj )

var b = bar( 3 ) // 2 3

console.log( b ); // 5
```

<br/>

`ES5` 内置了 `Function.prototype.bind`，`bind` 会返回一个硬绑定的新函数

```js
function foo(something) {
  console.log( this.a, something );
  return this.a + something
}

var obj = {
  a: 2
}

var bar = foo.bind( obj )

var b = bar( 3 ) // 2 3
console.log( b ); // 5
```

<br/>

- 2. **API 调用的"上下文"**

在 JavaScript 许多内置函数提供了一个可选参数，被称之为"`上下文（context）`"，其作用和 `bind(...)` 一样，确保 `callback` 回调函数使用指定的 `this`。这些函数实际上通过 `call(...)` 和 `apply(...)` 实现了显示绑定，例如：`filter`、`forEach` 等都有一个可选参数

```js
var obj = {
  name: 'objName'
}

function say(idx) {
  console.log(this.name + ' ' + idx);
}

[1, 2, 3, 4].forEach(say, obj) // 调用 say(...) 时，把 this 绑定到 obj
// objName 1
// objName 2
// objName 3
// objName 4
```

<br/>
<br/>

### new绑定

- 在 JS 中，`构造函数` 只是使用 new 操作符时被调用的普通函数，他们不属于某个类，也不会实例化一个类。实际上，它们甚至都不能说是一个特殊的函数类型，它们只是被 new 操作符调用的普通函数而已。
- 包括内置对象函数（比如 Number(..)） 在内的所有函数都可以用 new 来调用，这种函数调用被称为构造函数调用。
- 实际上，并不存在所谓的 "构造函数"，只有对函数的"构造调用"。

使用 new 来调用函数时，会自动执行以下操作：

- 1. 创建（或者说构造）一个全新对象。
- 2. 这个新对象会被执行 [[Prototype]] 链接。
- 3. 这个新对象会绑定到函数调用的 this。
- 4. 如果函数没有返回其他对象，那么 new 表达式中的函数调用会自动返回这个新对象。

使用 new 来调用 foo(..) 时，会构造一个新对象，并把它 （bar） 绑定到 foo(..) 调用中的 this。

```js
function foo1() {
  this.a = 1
}
function foo2() {
  this.a = 2
  return {
    a: 3
  }
}


var bar1 = new foo1(); // // bar 和 foo(..) 调用中的 this 进行绑定
var bar2 = new foo2();
console.log(bar1); // {a: 1}
console.log(bar2); // {a: 3}
```

<br/>
<br/>
<br/>

## 优先级

- new 绑定
    - 函数是否使用 new 中调用（new 绑定）？如果是的话 this 绑定的是新创建的对象。
```js
var bar = new foo()
```

- 显示绑定
    - 函数是否通过 call、apply （显示绑定）或者硬绑定？如果是的话，this 绑定的是指定的对象
```js
var bar = foo.call( obj2 )
```
    
- 隐式绑定
    - 函数是否在某个上下文对象中调用（隐式绑定）？如果是的话，this 绑定的是那个上下文对象
```js
var bar = obj1.foo()
```
      
- 默认绑定
    - 如果都不是的话，使用默认绑定。如果在严格模式下，就绑定到 undefined，否则绑定到全局对象
```js
var bar = foo()
```

<br/>

在 new 中使用硬绑定函数的目的是预先设置函数的一些参数。，这样在使用 new 进行初始化时就可以只传入其余的参数（柯里化）

```js
function foo(p1, p2) {
  this.val = p1 + p2
}

// 之所以使用 null 是因为在本例中我们并不关心硬绑定的 this 是什么
// 反正使用 new 时 this 会被修改
var bar = foo.bind( null, 'p1' )

var baz = new bar( 'p2' )

baz.val // p1p2
```

<br/>
<br/>
<br/>

## 绑定例外

### 被忽略的 this

把 `null` 或者 `undefined` 作为 `this` 的绑定对象传入 `call`、`apply` 或者 `bind`，这些值在调用时会被忽略，实际应用的是默认规则。

下面两种情况下会传入 `null`

- 使用 `apply(..)` 来"展开"一个数组，并当作参数传入一个函数。
- `bind(..)` 可以对参数进行柯里化（预先设置一些参数）

```js
function foo(a, b) {
  console.log("a:" + a + ", b:" + b);
}

// 把数组"展开"成参数
foo.apply( null, [2, 3] ); // a: 1, b: 3

// 使用 bind(...) 进行柯里化
var bar = foo.bind( null, 2 );
bar( 3 ) // a: 2, b: 3
```

总是传入 `null` 来忽略 `this` 绑定可能产生一些副作用。如果某个函数确实使用了 `this`，那么默认绑定规则会把 `this` 绑定到全局对象中。

<br/>

> 更安全的 this

安全的做法就是传入一个特殊的对象（**空对象**），把 `this` 绑定到这个对象不会对你的程序产生任何副作用。

JS 中创建一个空对象最简单的方法是 **`Object.create(null)`**，这个和 `{}` 很像，但是并不会创建 `Object.prototype` 这个委托，所以比 `{}` 更空。

```js
function foo(a, b) {
    console.log( "a:" + a + "，b:" + b );
}

// 空对象 
var ø = Object.create( null );

// 把数组 "展开" 成参数
foo.apply( ø, [2, 3] ) // a: 2, b: 3

// 使用 bind(..)进行柯里化
var ber = foo.bind( ø, 2 );

bar(3) // a: 2, b: 3
```

<br/>
<br/>

### 间接引用
 
间接引用下，调用这个函数会应用默认绑定规则，间接引用最容易在赋值时发生。

```js
// p.foo = o.foo 的返回值是目标函数的引用，如此，会应用默认绑定，所以调用位置是 foo() 而不是 p.foo() 或者 o.foo()
function foo() {
  console.log(this.a);
}

var a = 2;
var o = { a: 3, foo: foo };
var p = { a: 4 };

o.foo(); // 3
(p.foo = o.foo)(); // 2
```
 
<br/>
<br/>

### 软绑定

- 硬绑定可以把 this 强制绑定到指定的对象 （new 除外），防止函数调用应用默认绑定规则。但是会减低函数的灵活性，使用**硬绑定之后就无法使用隐式、显示绑定来修改 this**。

- **如果给默认绑定指定一个全局对象和 undefined 以外的值**，那就可以实现和硬绑定相同的效果，同时保留隐式、显示绑定修改 this 的能力。

```js
// 默认绑定规则，优先级排最后
// 如果 this 绑定到全局对象或者 undefined，那就把指定的默认对象 obj 绑定到 this，否则不会修改 this
if(!Function.prototype.softBind) {
    Function.prototype.softBind = function(obj) {
        var fn = this;
        // 捕获所有curried参数
        var curried = [].slice.call( arguments, 1 ); 
        var bound = function() {
            return fn.apply(
            	(!this || this === (window || global)) ? 
                	obj : this,
                curried.concat.apply( curried, arguments )
            );
        };
        bound.prototype = Object.create( fn.prototype );
        return bound;
    };
}
```

使用：软绑定版本的foo()可以手动将this绑定到obj2或者obj3上，但如果应用默认绑定，则会将this绑定到obj。

```js
function foo() {
    console.log("name:" + this.name);
}

var obj = { name: "obj" },
    obj2 = { name: "obj2" },
    obj3 = { name: "obj3" };

// 默认绑定，应用软绑定，软绑定把this绑定到默认对象obj
var fooOBJ = foo.softBind( obj );
fooOBJ(); // name: obj 

// 隐式绑定规则
obj2.foo = foo.softBind( obj );
obj2.foo(); // name: obj2 <---- 看！！！

// 显式绑定规则
fooOBJ.call( obj3 ); // name: obj3 <---- 看！！！

// 绑定丢失，应用软绑定
setTimeout( obj2.foo, 10 ); // name: obj
```

<br/>
<br/>
<br/>

## this 词法

ES6 新增一种特殊的函数类型：箭头函数，箭头函数无法使用上诉四条规则，而是根据外层（函数或者全局）作用域（词法作用域）来决定 this。

- foo() 内部创建的箭头函数会捕获调用时 foo() 的 this。由于 foo() 的 this 绑定到 obj1，bar (引用箭头函数) 的this也会绑定到 obj1，箭头函数的绑定无法被修改（new 也不行）

```js
function foo() {
    // 返回一个箭头函数
    return (a) => {
        // this继承自foo()
        console.log( this.a );
    };
}

var obj1 = {
    a: 2
};

var obj2 = {
    a: 3
}

var bar = foo.call( obj1 );
bar.call( obj2 ); // 2，不是3！
```

ES6之前和箭头函数类似的模式，采用的是词法作用域取代了传统的this机制。

```js
function foo() {
    var self = this; // lexical capture of this
    setTimeout( function() {
        console.log( self.a ); // self只是继承了foo()函数的this绑定
    }, 100 );
}

var obj = {
    a: 2
};

foo.call(obj); // 2
```

代码风格统一问题：如果既有 this 风格的代码，还会使用 seft = this 或者箭头函数来否定 this 机制。

- 只使用词法作用域并完全抛弃错误 this 风格的代码
- 完全采用 this 风格，在必要时使用 bind(..),尽量避免使用 seft = this 和箭头函数。

<br/>
<br/>
<br/>

## 思考

依次给出console.log输出的数值。

```js
var num = 1;
var myObject = {
    num: 2,
    add: function() {
        this.num = 3;
        (function() {
            console.log(this.num);
            this.num = 4;
        })();
        console.log(this.num);
    },
    sub: function() {
        console.log(this.num)
    }
}
myObject.add();
console.log(myObject.num);
console.log(num);
var sub = myObject.sub;
sub();
```

<br/>
<br/>
<br/>

这里有两种情况

- 严格模式下，报错。`TypeError: Cannot read property 'num' of undefined`
- 非严格模式下，输出 1、3、3、4、4

```js

var num = 1;
var myObject = {
    num: 2,
    add: function() {
        this.num = 3; // 隐式绑定 修改 myObject.num = 3
        (function() {
            console.log(this.num); // 默认绑定 输出 1 
            this.num = 4; // 默认绑定 修改 window.num = 4
        })();
        console.log(this.num); // 隐式绑定 输出 3
    },
    sub: function() {
        console.log(this.num) // 因为丢失了隐式绑定的 myObject，所以使用默认绑定 输出 4
    }
}
myObject.add(); // 1 3
console.log(myObject.num); // 3
console.log(num); // 4
var sub = myObject.sub; // 丢失了隐式绑定的 myObject
sub(); // 4
```

<br/>
<br/>
<br/>

## 参考

> [你不知道的JavaScript上卷](https://github.com/yygmind/Reading-Notes/blob/master/%E4%BD%A0%E4%B8%8D%E7%9F%A5%E9%81%93%E7%9A%84JavaScript%E4%B8%8A%E5%8D%B7.md)
>
> [Javascript 闭包，引用的变量是否被回收？](https://www.zhihu.com/question/40678847/answer/87982345)
