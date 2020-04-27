## 定义

> new 运算符创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例。 —— [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/new)

`new` 关键字会进行如下的操作

- 1. 创建一个空的简单 `JavaScript` 对象（ 即 `{}` ）；

- 2. 链接该对象（ 即设置该对象的构造函数 ）到另一个对象；

- 3. 将步骤1新创建的对象作为 `this` 的上下文；

- 4. 如果该函数没有返回对象，则返回 `this`；

🌰

```javascript
function Car(color) {
  this.color = color;
}

Car.prototype.start = function() {
  console.log(this.color + ' car start');
}

var car = new Car("black");
car.color; // 访问构造函数里的属性
// black

car.start(); // 访问原型里的属性
// black car start
```

可以看出 new 创建的实例有以下 2 个特征

- 1. 访问到构造函数里的属性

- 2. 访问到原型里的属性


<br/>
<br/>
<br/>

:::tip
ES6 新增 `symbol` 类型，不可以使用 `new Symbol()`，因为 `symbol` 是基本数据类型，每个从 `Symbol()` 返回的 `symbol` 值都是唯一的。
:::

```javascript
Number("123"); // 123
String(123); // "123"
Boolean(123); // true
Symbol(123); // Symbol(123)

new Number("123"); // Number {123}
new String(123); // String {"123"}
new Boolean(true); // Boolean {true}
new Symbol(123); // Symbol is not a constructor
```

<br/>

:::tip
如果你没有使用 new 运算符，构造函数会像其他的常规函数一样被调用，并不会创建一个对象。在这种情况下，this 的指向也是不一样的。
:::
