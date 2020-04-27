红宝书（p178）上对于闭包的定义：
> **闭包是指有权访问另外一个函数作用域中的变量的函数**

<br/>

MDN 对闭包的定义为：
> **闭包是指那些能够访问自由变量的函数**。

<br/>

自由变量：
> 指在函数中使用的，但既不是函数参数也不是函数的局部变量的变量。其实就是另外一个函数作用域中的变量。

<br/>

可以看出，闭包有两部分组成：
> 闭包 = 函数 + 函数能够访问的自由变量。

<br/>
<br/>
<br/>

栗子：
```js
var a = 1;

function foo() {
  console.log(a);
}

foo();
```

foo 函数可以访问变量 a，但是 a 既不是 foo 函数的局部变量，也不是 foo 函数的参数，所以 a 就是自由变量。

那么，函数 foo + foo 函数访问的自由变量 a 不就构成了一个闭包吗......

还真是这样的！

所以在犀牛书 《JavaScript权威指南》 中就讲到：从技术的角度讲，所以的 JavaScript 函数都是闭包。

咦，这怎么跟我们平时看到的讲到的不一样呢！？

别着急，这里理论上的闭包，其实还有一个实践角度上的闭包，让我们看看汤姆大叔翻译的关于闭包的文章中的定义：

<br/>

> ECMAScript 中，闭包指的是：

- **从理论角度：**
    - 所有的函数。因为它们都在创建的时候就将上层上下文的数据保存起来了。
    - 哪怕是简单的全局变量也是如此，因为函数中访问全局变量就相当于是在访问自由变量，这个时候使用最外层的作用域。

- **从实践角度：**
    
    - 1. 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
    - 2. 在代码中引用了自由变量 
    
<br/>
<br/>
<br/>

## 分析
```js
var scope = "global scope";

function checkscope() {
  var scope = "local scope";
  
  function f() {
    return scope;
  }
  
  return f;
}

var foo = checkscope() // foo 指向函数 f
foo()                  // 调用函数 f()
```

该段代码的简要执行过程：

1. 进入全局代码，创建全局执行上下文，全局执行上下文压入执行上下文栈。
2. 全局执行上下文初始化。
3. 执行 checkscope 函数，创建 checkscope 函数执行上下文，checkscope 执行上下文被压入执行上下文栈。
4. checkscope 执行上下文初始化，创建变量对象、作用域链、this 等。
5. checkscope 函数执行完毕，checkscope 执行上下文从执行上下文栈中弹出。
6. 执行 f 函数，创建 f 函数执行上下文，f 执行上下文被压入执行上下文栈。
7. f 执行上下文初始化，创建变量对象、作用域链、this 等。
8. f 函数执行完毕， f 函数上下文从执行上下文栈中弹出。

<br/>

![执行上下文](../../stack/context_stack/context_01.png)

<br/>
<br/>

但是当 f 函数执行的时候，checkscope 函数上下文已经被销毁了啊（既从执行上下文栈中弹出），怎么还会读取到 checkscope 作用域下的值呢？

在 [作用域链和闭包](/javascript/scope_closure/chain_closure/) 中介绍过，函数 f 执行上下文维护了一个作用域链：

> 对于每个执行上下文，都些要了解的属性：  [作用域链和闭包](/javascript/stack/stack_variable/) 
- 变量对象(Variable object，VO)
- 活动对象(Activation object，AO)
- 作用域链(Scope chain)
- this

<br/>

所以指向关系是 当前作用域 -> checkscope 作用域 -> 全局作用域。如下

```js
fContext = {
  Scope: [AO, checkscopeContext.AO, globalContext.VO],
}
```

即使 checkscopeContext 被销毁了，但是 JavaScript 依然会让 checkscopeContext.AO （活动对象）活在内存中，f 函数依然可以通过 f 函数的作用域链找到它。

就是因为这个作用域链，f 函数依然可以读取到 checkscopeContext.AO（） 的值，说明当 f 函数引用了 checkscopeContext.AO 中的值的时候。即使 checkscopeContext 被销毁了，但是 JavaScript 依然会让 checkscopeContext.AO 活在内存中，f 函数依然可以通过 f 函数的作用域链找到它，正是因为 JavaScript 做到了这一点，从而实现了闭包的这个概念。


<br/>

所以，让我们再看一遍实践角度上闭包的定义：

- **从实践角度：**
    
    - 1. 即使创建它的上下文已经销毁，它仍然存在（比如，内部函数从父函数中返回）
    - 2. 在代码中引用了自由变量 
    

<br/>
<br/>
<br/>

## 必刷题
```js
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = function() {
    console.log(i);
  }
}

data[0]();
data[1]();
data[2]();
```

> 都是 3

当执行到 data[0] 函数之前，此时全局上下文的 VO 为：

```js
globalContext = {
  VO: {
    data: [...],
    i: 3
  }
}
```

当执行 data[0] 函数的时候，data[0] 函数的作用域链为：

```js
data[0]Context = {
  scope: [AO, globalContext.VO]
}
```

data[0]Context 的 AO 并没有 i 值，所以会从 globalContext.VO 中查找，i 为 3，所以打印的结果就是 3.

data[1] 和 data[2] 是一样的道理。

<br/>
<br/>

所以让我们改成闭包看看：
```js
var data = [];

for (var i = 0; i < 3; i++) {
  data[i] = (function (i) {
    return function() {
      console.log(i);
    }
  })(i);
}

data[0]();
data[1]();
data[2]();
```

当执行到 data[0] 函数之前，此时全局上下文的 VO 为：

```js
globalContext = {
  VO: {
    data: [...],
    i: 3
  }
}
```

跟没改之前一摸一样。

当执行 data[0] 函数的时候，data[0] 函数的作用域链发生了改变：

```js
data[0]Context = {
  Scope: [AO, 匿名函数Context.AO, globalContext.VO]
}
```

匿名函数执行上下文的 AO 为：
```js
匿名函数Context = {
  AO: {
    arguments: {
      0: 0,
      length: 1
    },
    i: 0
  }
}
```

data[0]Context 的 AO 并没有 i 值，所以会沿着作用域链从 匿名函数Contex.AO 中查找，这时候就会找 i 为 0，因为闭包执行上下文中贮存了变量 i，找到了就不会往 globalContext.VO 中查找了，即使 globalContext.VO 也有 i 的值（值为3），所以打印的结果就是 0.

data[1] 和 data[2] 是一样的道理。

[转载至](https://github.com/mqyqingfeng/Blog/issues/9)










































