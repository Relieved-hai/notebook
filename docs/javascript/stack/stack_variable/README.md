Js 是单线程的语言，执行顺序肯定是顺序执行，但是 Js 引擎并不是一行一行地分析和执行程序，而是一段一段的分析执行，会先进行编译阶段然后才是执行阶段。

<br/>

例子一： **变量提升**

```js
foo; // undefined

var foo = function() {
  console.log('foo1');
}

foo() // foo1, foo赋值

var foo = function() {
  console.log('foo2');
}

foo() // foo2, foo重新赋值
```

<br/>

例子二：**函数提升**

```js
foo() // foo2

function foo() {
  console.log('foo1');
}

foo() // foo2

function foo() {
  console.log('foo2');
}

foo() // foo2
```

例子三： **声明优先级，函数 > 变量**

```js
foo() // foo2

var foo = function() {
  console.log('foo1');
}

foo() // foo1, foo重新赋值

function foo() {
  console.log('foo2');
}

foo() // f001
```

上面三个例子中，第一个例子是变量提升，第二个例子是函数提升，第三个例子是函数优先级高于变量声明。


注意：同一作用域下存在多个同名函数声明，后面的会替换前面的函数声明。

<br/>
<br/>
<br/>

## 执行上下文

执行上下文总共有三种类型

- **全局执行上下文：** 只有一个，浏览器中的全局对象就是 window 对象， `this` 指向这个全局对象。
- **函数执行上下文：** 存在无数个，只有在函数被调用的时候才会被创建，每次调用函数都会创建一个新的执行上下文。
- **Eval 函数执行上下文：** 指的是运行在 `eval` 函数中的代码，不建议使用。

<br/>
<br/>
<br/>

## 执行上下文栈
因为 JS 引擎创建了很多的执行上下文，所以 JS 引擎创建了执行上下文 **栈** （`Execution context stack， ECS`） 来 **管理** 执行上下文。

当 JavaScript 初始化的时候会执行上下文栈压入一个 **全局** 执行上下文，我们用 `globalContext` 来表示它，并且只有当整个应用程序结束的时候，执行栈才会清空，所以程序结束之前，执行栈最底部永远有个 `globalContext` 。

```js
ECStack = [ // 使用数组模拟栈
  globalContext
]
```

![执行栈](../context_stack/context_01.png)

<br/>
<br/>
<br/>


## 找不同

如下两段代码，执行结果一样。

```js
var scope = 'global scope';

function checkscope() {
  var scope = 'local scope';
  function f() {
    return scope;
  }
  return f()
}

checkscope();
```

<br/>

```js
var scope = 'global scope';

function checkscope() {
  var scope = 'local scope';
  function f() {
    return scope;
  }
  return f;
}

checkscope()();
```

答案是：执行上下文栈的变化不一样。
```js
ECStack.push(<checkscope> functionContext)
ECStack.push(<f> functionContext)
ECStack.pop()
ECStack.pop()
```

<br/>

```js
ECStack.push(<checkscope> functionContext);
ECStack.pop()
ECStack.push(<f> functionContext);
ECStack.pop()
```

<br/>
<br/>
<br/>

## 函数上下文

在函数上下文中，用活动对象（`activation object，AO`）来表示变量对象。

- **活动对象** 和 **变量对象** 的区别在于

    - 变量对象（VO）是规范上或者是 JS 引擎上实现的，并不能在 JS 环境中直接访问。

    - 当进入一个执行上下文后，这个变量对象才会被激活，所以叫活动对象（AO），这个时候活动对象上的各种属性才能被访问。


调用函数时，会为其创建一个 **Arguments对象**，并自动初始化局部变量 arguments，指代该 Arguments 对象。使用作为参数传入的值都会成为 Arguments 对象的数组元素。


<br/>
<br/>
<br/>

## 执行过程

执行上下文的代码会分成两个阶段进行处理

- 1. **进入** 执行上下文。
- 2. 代码 **执行**

<br/>

### 进入执行上下文

很明显，这个时候还没有执行代码

此时的变量对象包括（如下顺序初始化）：

1. **函数的所有参数（only 函数上下文）：** 没有实参，属性值设为 undefined。
2. **函数声明：** 如果变量对象已经存在相同名称的属性，则完全替换这个属性。
3. **变量声明：** 如果变量名称跟已经声明的形参或者函数相同，则变量声明**不会干扰**以及存在的这类属性。

`code`

```js
function foo(a) {
  var b = 2;
  function c() {  }
  var d = function() {  }
  b = 3;
}

foo(1);
```

对于上面的代码，这个时候的 AO 是

```js
AO = {
  arguments: {
    0: 1,
    length: 1
  },
  a: 1,
  b: undefined,
  c: reference to function c() {  }
  d: undefined
}
```

形参 arguments 这时候已经有赋值了，但是变量还是 undefined，只是初始化的值。

<br/>
<br/>

### 代码执行

这个阶段会顺序执行代码，修改变量对象的值，执行完成后 AO 如下

```js
AO = {
  arguments: {
    0: 1,
    length: 1
  },
  a: 1,
  b: 3,
  c: reference to function c() {  },
  d: reference to FunctionExpression "d"
}
```

总结：

- 1. 全局上下文的变量对象初始化是全局对象。
- 2. 函数上下文的变量对象初始化只包括 Arguments 对象。
- 3. 在进入执行上下文时会给变量对象 **添加形参、函数声明、变量声明** 等初始化的属性值。
- 4. 在代码执行阶段，会再次修改变量对象的属性值。



<br/>
<br/>
<br/>

## 参考

> [JavaScript深入之执行上下文栈](https://github.com/mqyqingfeng/Blog/issues/4)
>
> [JavaScript深入之变量对象](https://github.com/mqyqingfeng/Blog/issues/5)








