我们知道 this 绑定规则一共有 5 中情况：

- 1. 默认绑定（严格/非严格模式）
- 2. 隐式绑定
- 3. 显示绑定
- 4. new 绑定
- 5. 箭头函数绑定


其实大部分情况下可以用一句话来概括，**this 总是指向调用函数的对象**。

但是对于箭头函数并不是这样，是根据外层（函数或者全局）作用域（**词法作用域**）来决定 this。

对于箭头函数的 this 总结如下：

1. 箭头函数不绑定 this，箭头函数中的 this 相当于普通变量。

2. 箭头函数的 this 寻值行为与普通变量相同，在作用域中逐级寻找。

3. 箭头函数的 this 无法通过 bind，call，apply 来直接修改（可以间接修改）

4. 改变作用域中 this 的指向可以改变箭头函数的 this。

5. `function closure(){() => { // code }}`，在此例中，我们通过改变封包环境 `closure.bind(another)()`，来改变箭头函数 this 的指向。

6. 箭头函数的 this 指向外层函数作用域中的 this。

7. 箭头函数的 this 是定义函数时所在上下文中的 this。

8. 箭头函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。

<br/>
<br/>
<br/>

## 题目一

```js
/**
 * 非严格模式
 */

var name = 'window'

var person1 = {
  name: 'person1',
  show1: function () {
    console.log(this.name)
  },
  show2: () => console.log(this.name),
  show3: function () {
    return function () {
      console.log(this.name)
    }
  },
  show4: function () {
    return () => console.log(this.name)
  }
}
var person2 = { name: 'person2' }

person1.show1()
person1.show1.call(person2)

person1.show2()
person1.show2.call(person2)

person1.show3()()
person1.show3().call(person2)
person1.show3.call(person2)()

person1.show4()()
person1.show4().call(person2)
person1.show4.call(person2)()
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

```js
person1.show1() // person1
person1.show1.call(person2) // person2

person1.show2() // window
person1.show2.call(person2) // window

person1.show3()() // window
person1.show3().call(person2) // person2
person1.show3.call(person2)() // window

person1.show4()() // person1
person1.show4().call(person2) // person1
person1.show4.call(person2)() // person2
```

<br/>
<br/>
<br/>

分析：

```js
person1.show1() // person1 => 隐式绑定，this指向调用者 person1
person1.show1.call(person2) // person2 => person2，显式绑定，this指向 person2
```
验证了 **谁调用此方法，this就是指向谁。**

<br/>

```js
person1.show2() // window => 箭头函数绑定，this指向外层作用域，即全局作用域
person1.show2.call(person2) // window => 箭头函数绑定，this指向外层作用域，即全局作用域
```

<br/>

person1.show3是一个高阶函数，它返回了一个函数，分步走的话，应该是这样:
```js
person1.show3()() // window => 默认绑定，这是一个高阶函数，调用者是 window

var func = person3.show()

func()
```
从而导致最终调用函数的执行环境是 window，但并不是 window 对象调用了它。所以说，**this 总是指向调用调用该函数的对象**，这句话还得补充一句：**在全局函数中，this 等于 window。**

<br/>

```js
person1.show3().call(person2) // person2 => 显式绑定，this指向 person2
person1.show3.call(person2)() // window => 默认绑定，调用者是window
```
前者是通过 person2 调用了最终的打印方法。
后者是先通过 person2 调用 person1 的高阶函数，然后再在全局环境中执行了该打印方法。

<br/>

```js
person1.show4()() // person1 => 箭头函数绑定，this指向外层作用域，即person1函数作用域
person1.show4().call(person2) // person1 => 箭头函数绑定，this指向外层作用域，即person1函数作用域
```
**箭头函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。** 因为即使我用过 person2 去调用这个箭头函数，它指向的还是 person1。

<br/>

```js
person1.show4.call(person2)() // person2 => 首先是 var func1 = person1.show4.call(person2)，这是显示绑定，调用者是 person2，show 4 函数指向的是 person 2。然后是func1()，箭头函数绑定，this指向外层作用域，即person2函数作用域。
```
this 值发生改变，上诉那句描述又走不通了。

首先通过 person2指向 show4 方法，此时 show4 第一层函数的 this 指向的是 person2。所以箭头函数输出了 person2 的 name。

也就是说，箭头函数的 this 指向的是 **谁调用箭头函数的外层 function，箭头函数的 this 就是指向该对象，如果箭头函数没有外层函数，则指向 window。** 这样去理解 show2 方法，也解释的通。

<br/>

箭头函数绑定中，this 指向外层作用域，并不一定是第一层，也不一定是第二层。

因为没有自身的 this，所以只能根据作用域链往上层查找，直到找到一个绑定了 this 的函数作用域，并指向调用该普通函数的对象。

<br/>

但是。这句话就对了么？在学习的过程中，我们总是想以总结规律的方法去总结结论，并且希望结论越简单越容易描述就越好。实际上可能会错失真理。



<br/>
<br/>
<br/>

## 题目二

这次通过构造函数来创建一个对象，并执行相同的 4 个 show 方法。

```js
/**
 * 非严格模式
 */

var name = 'window'

function Person (name) {
  this.name = name;
  this.show1 = function () {
    console.log(this.name)
  }
  this.show2 = () => console.log(this.name)
  this.show3 = function () {
    return function () {
      console.log(this.name)
    }
  }
  this.show4 = function () {
    return () => console.log(this.name)
  }
}

var personA = new Person('personA')
var personB = new Person('personB')

personA.show1()
personA.show1.call(personB)

personA.show2()
personA.show2.call(personB)

personA.show3()()
personA.show3().call(personB)
personA.show3.call(personB)()

personA.show4()()
personA.show4().call(personB)
personA.show4.call(personB)()
```


<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

```js
personA.show1() // personA
personA.show1.call(personB) // personB

personA.show2() // personA
personA.show2.call(personB) // personA

personA.show3()() // window
personA.show3().call(personB) // personB
personA.show3.call(personB)() // window

personA.show4()() // personA
personA.show4().call(personB) // personA
personA.show4.call(personB)() // personB
```

<br/>
<br/>
<br/>

我们发现与之前字面量声明的相比，show2 方法的输出产生了不一样的结果。为什么呢？虽然说构造方法 Person 是有自己的函数作用域。但是对于 personA 来说，它只是一个对象，在直观感受上，它跟第一道题中的 person1 应该是一模一样的。JSON.stringify(new Person('person1')) === JSON.stringify(person1) 也证明了这一点。

说明构造函数创建对象与直接用字面量的形式去创建对象，它是不同的，构造函数创建对象，具体做了什么事呢？我引用红宝书中的一段话。

> 使用 new 操作符调用构造函数，实际上回经历以下四个步骤
> 1. 创建一个新对象
> 2. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）
> 3. 执行构造函数中的代码（为这个新对象添加属性）
> 4. 返回新对象

所以与字面量创建对象相比，很大一个区别是它多了构造函数的作用域。用 chrome 查看这两者的作用域链就能清晰的知道:



























```js
personA.show1() // personA，隐式绑定，调用者是 personA
personA.show1.call(personB) // personB，显式绑定，调用者是 personB

personA.show2() // personA，首先personA是new绑定，产生了新的构造函数作用域，
				// 然后是箭头函数绑定，this指向外层作用域，即personA函数作用域
personA.show2.call(personB) // personA，同上

personA.show3()() // window，默认绑定，调用者是window
personA.show3().call(personB) // personB，显式绑定，调用者是personB
personA.show3.call(personB)() // window，默认绑定，调用者是window

personA.show4()() // personA，箭头函数绑定，this指向外层作用域，即personA函数作用域
personA.show4().call(personB) // personA，箭头函数绑定，call并没有改变外层作用域，
							  // this指向外层作用域，即personA函数作用域
personA.show4.call(personB)() // personB，解析同题目1，最后是箭头函数绑定，
							  // this指向外层作用域，即改变后的person2函数作用域
```

题目一和题目二的区别在于题目二使用了new操作符。

使用 new 操作符调用构造函数，实际上会经历以下四个步骤：

1. 创建一个新对象
2. 将构造函数的作用域赋给新对象（因此 this 就指向了这个新对象）
3. 执行构造函数中的代码（为这个新对象添加属性）
4. 返回新对象

<br/>
<br/>
<br/>

## 参考

[从这两套题，重新认识JS的this、作用域、闭包、对象](https://juejin.im/post/59aa71d56fb9a0248d24fae3)
