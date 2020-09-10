## 类型定义文件

> 在 `js` 中，经常会出现全局变量污染的情况，在 `ts` 中，可以使用 `namespace` 定义全局变量命名空间，只创建一个全局变量，并定义该变量为当前应用容器，把其他全局变量追加在该命名空间下，具体实现则是利用匿名函数将脚本包裹起来。


<br/>
<br/>
<br/>

1. 用 `namespace` 去定义一个空间，用 `export` 导出，以便外部调用

`a.ts`
```ts
// 定义了一个命名空间
namespace Name {
  // 暴露了一个接口
  export interface ITest {}


  // 暴露了一个类
  export class Test {}
}
```

<br/>

`b.ts`

[Typescript 三斜线指令 /// ](https://www.w3cschool.cn/typescript/typescript-triple-slash-directives.html)
```ts
// 指令是三斜线指令中最常见的一种。 它用于声明文件间的 依赖。三斜线引用告诉编译器在编译过程中要引入的额外的文件。
///<reference path='./a.ts' />

namespace Name2 {
  export class Main {
    // 使用 Name 空间中的接口
    test: Name.ITest = { name: "" };
  }
}

```

<br/>
<br/>

2. 编译后的 js

```javascript
"use strict";
var Name;
(function (Name) {
    var Test = /** @class */ (function () {
        function Test() {
        }
        return Test;
    }());
    Name.Test = Test;
})(Name || (Name = {}));
///<reference path='./a.ts' />
var Name2;
(function (Name2) {
    var Main = /** @class */ (function () {
        function Main() {
            this.test = { name: "" };
        }
        return Main;
    }());
    Name2.Main = Main;
})(Name2 || (Name2 = {}));

```

<br/>
<br/>
<br/>

## .d.ts

> 在 `ts` 中引用了一个外部的类库，但是这个类库是用 `js` 写的，那么这时就会要求我们去依赖对应的类型描述文件( `.d.ts` )

🌰：

在 `html` 中将 `jQuery` 以 `CDN` 方式去引入，并将我们编写的 `.ts` 文件也引入。（ 这里使用 `Parcel` 去运行 ）

```ts
// 本身这段代码是可以正常运行的，但编辑器会提示你（ 找不到，是否需要下载一个 jQuery 的类型定义文件 ）
$(function () {
  alert('jquery');
})
```

<br/>
<br/>

> 这时候，就需要 `.d.ts` 文件了

#### 一、声明全局变量

<br/>

创建 `jquery.d.ts` 文件

`jquery.d.ts`

```ts
// 首先，我们需要在 .d.ts 中描述一个全局变量给 ts 文件去理解

// 声明全局变量 $ ( 它的类型是一个函数，无返回值 )，并接收一个参数 ( 参数的类型是一个无返回值的函数 )
declare var $: (readyFunc: () => void) => void;
```

<br/>
<br/>

`test.ts`
```ts
// 不在提示警告
$(function () {
  alert('jquery');
})
```

<br/>
<br/>

#### 二、声明全局函数

<br/>

`jquery.d.ts`

```ts
// 首先，我们需要在 .d.ts 中描述一个全局函数给 ts 文件去理解

// 声明全局函数 $ ( 是一个函数，无返回值 )，并接收一个参数 ( 参数的类型是一个无返回值的函数 )
declare function $(readyFunc: () => void): void;
```

<br/>
<br/>

`test.ts`
```ts
// 不在提示警告
$(function () {
  alert('jquery');
})
```

<br/>
<br/>

#### 三、声明函数重载


`jquery.d.ts`

```ts
// 首先，我们需要在 .d.ts 中描述一个全局函数给 ts 文件去理解

// 声明全局函数 $ ( 是一个函数，无返回值 )，并接收一个参数 ( 参数的类型是一个无返回值的函数 )
declare function $(readyFunc: () => void): void;
```

<br/>
<br/>

`test.ts`
```ts
$(function () {
  // 这又提示警告
  $('body').html('<div>jquery</div>');
})
```

<br/>

**改写如下：ts 文件将不再警告**

`jquery.d.ts`

```ts
// 首先，我们需要在 .d.ts 中描述一个全局函数给 ts 文件去理解

declare function $(readyFunc: () => void): void;

// 声明全局函数（接收一个 string 的参数），返回了一个包含 .html 方法的对象
declare function $(selector: string): {
  // 返回对象中，有一个 html 方法，它接收一个 string 类型的参数
  html: (html: string) => {}
};
// 这里就构成了 函数重载。
```

<br/>
<br/>
<br/>

最终优化

`test.ts`

```ts
$(function () {
  $('body').html('<div>jquery</div>');
})
```

<br/>

`jquery.d.ts`

```ts
interface IJquery {
  // 在 JQuery 中，.html 后，依然返回的是一个 JQuery 对象
  html: (html: string) => IJquery
}

declare function $(readyFunc: () => void): void;
declare function $(selector: string): IJquery;
```

<br/>
<br/>
<br/>

#### 四、使用 `interface` 去描述 `Jquery`

`test.ts`

```ts
// 依然可以
$(function () {
  $('body').html('<div>jquery</div>');
})
```

<br/>

`jquery.d.ts`

```ts
interface IJquery {
  html: (html: string) => IJquery
}

// 使用 interface 去实现：函数的重载
interface JQuery {
  (readyFunc: () => void): void;

  (selector: string): IJquery;
}

declare var $: JQuery;
```

<br/>
<br/>
<br/>

#### 五、定义全局对象

`test.ts`

```ts
$(function () {
  $('body').html('<div>jquery</div>');
  // 这里又提示警告了
  new $.fn.init();
})
```

<br/>
<br/>

`jquery.d.ts`

```ts
interface IJquery {
  html: (html: string) => IJquery
}

declare function $(readyFunc: () => void): void;
declare function $(selector: string): IJquery;

/**
 * 对对象进行类型定义，对类进行类型定义，以及命名空间的嵌套
**/

// 如果，在全局上面有一个对象，那么可以使用 namespace 去构建这个对象
// 申明 $ 对象的命名空间
declare namespace $ {
  // 使用命名空间的嵌套 fn
  namespace fn {
    // 因为 new 了一个 init，所以去定义一个类。
    class init {
    }
  }
}
```

<br/>
<br/>
<br/>

#### 六、模块代码的类型描述文件

> 使用 yarn or npm , 来使用 JQuery


`test.ts`

```ts
$(function () {
  $('body').html('<div>jquery</div>');
  // 这里又提示警告了
  new $.fn.init();
})
```

<br/>
<br/>


`jquery.d.ts`

```ts
// ES6 模块化
// 定义一个模块，在模块中，就无需在使用 declare 关键字了
declare module 'jquery' {
  // 申明全局（ declare ） 变量（ var ）
  // declare var $: (param: () => void) => void;
  interface JqueryInstance {
    html: (html: string) => JqueryInstance
  }

  // 申明全局（ declare ） 函数（ function ）
  function $(readyFunc: () => void): void;
  // 申明全局（ declare ） 函数重载（ function ）
  function $(selector: string): JqueryInstance;


  // 申明一个对象的命名空间
  // 对对象进行类型定义，对类进行类型定义，以及命名空间的嵌套
  namespace $ {
    namespace fn {
      class init {
      }
    }
  }

  // 导出
  export = $;
}
```


<br/>
<br/>
<br/>

## 装饰器

> Decorator 是 ES7 的一个新语法，正如其“装饰器”的叫法所表达的，他可以对一些对象进行装饰包装然后返回一个被包装过的对象，可以装饰的对象包括：类，属性，方法等。Decorator 的写法与 Java 里的注解（Annotation）非常类似，但是一定不要把 JS 中的装饰器叫做是“注解”，因为这两者的原理和实现的功能还是有所区别的，在 Java 中，注解主要是对某个对象进行标注，然后在运行时或者编译时，可以通过例如反射这样的机制拿到被标注的对象，对其进行一些逻辑包装。而 Decorator 的原理和作用则更为简单，就是包装对象，然后返回一个新的对象描述（descriptor），其作用也非常单一简单，基本上就是获取包装对象的宿主、键值几个有限的信息。

> 相关知识 [Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)

> 装饰器本身是一个函数，通过 @ 符号来使用。

<br/>
<br/>

### 一、类的装饰器

**接受的参数：**

- `constructor`: 构造方法

<br/>

🌰一：

```ts
// 装饰器本身就是一个函数，构造方法 作为参数传递
function testDecorator(constructor: any) {
  constructor.prototype.getName = () => {
    console.log('getName');
  }
}

// 通过 @ 符号来使用
@testDecorator
class Test {
}

// 实例化
const test = new Test();

// 直接在实例上获取方式，会报错的
// 原因是，test 是创建的实例，Test 这个类上本身是没有这个方法的，而是后装饰上来的，所以 ts 是无法分析出来的
(test as any).getName();

// log: getName
```

这里通过装饰器来给类添加了一个 `getName` 的方法

<br/>

🌰二：

```ts
// 将上面代码，改造一下，返回出去
function testDecorator(name: string) {
  return function (constructor: any) {
    constructor.prototype.getName = () => {
      console.log(name);
    }
  }
}

@testDecorator('装饰器')
class Test {
}

const test = new Test();

(test as any).getName();

// log: 装饰器
```

到这里为止，上面的写法很直观，但却是不严谨的。

- 1、`constructor` 的类型是 `any`，我们需要将其类型进行具体定义，不然 `typescript` 就会变为 `anyscript`。
- 2、我们在使用 `.getName()` 时，`test` 还需要使用断言。


<br/>

🌰三：优化

```ts
/*
* 类装饰器
* @Description 这里明确指出 constructor 的类型就是一个构造函数，而不是能是 any
*   (...arg: any[]) => any   : 一个函数需要一个参数（类型 any[]，这里将任意多个参数合并到一起），最后返回一个 any 类型的值
*   new                      : 意思它是一个构造函数
*   T extends                : T extends 构造函数，也就是说 T 可以被上面这个类型构造函数给实例化出来
*   constructor: T           : 所以 T 可以理解为一个类，或者一个包含构造函数的东西
* */
function testDecorator<T extends new (...arg: any[]) => any>(constructor: T) {
  // 返回一个继承 constructor 的类
  return class extends constructor {
    name = '666';

    getName() {
      return this.name;
    }
  }
}


@testDecorator
class Test{
  constructor(public name: string) {
  }
}

const test = new Test('123');

console.log(test.name);
console.log((test as any).getName());

// log: 666
// log: 666
```

这里，将 constructor 的类型给定义了，还剩下 `.getName()` 的问题了。

<br/>
<br/>

```ts
// 仿照 🌰二 的方式，我们将类传入，并返回
function testDecorator() {
  return function <T extends new (...arg: any[]) => any>(constructor: T) {
    return class extends constructor {
      name = '666';

      getName() {
        return this.name;
      }
    }
  }
}

// 这里就不是当做一个装饰器来用了，而是当做一个函数来用
const Test = testDecorator()(
  class {
    constructor(public name: string) {
    }
  }
)

const test = new Test('123');

// 这个时候的 Test 则是被装饰后返回的，那么这里 ts 能判断其中的方法
console.log(test.getName());
```

<br/>
<br/>
<br/>


### 二、方法的装饰器

<br/>

**普通方法：接收的参数**
- `target`      : 对应的是类的原型 prototype
- `key`         : 对应方法的名字
- `descriptor`  : 参考 [Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 中的 descriptor

**静态方法：接收的参数**
- `target`      : 对应的是类的构造函数
- `key`         : 对应方法的名字
- `descriptor`  : 参考 [Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 中的 descriptor

<br/>

🌰一：

```ts
function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  // 类外部不可修改
  // descriptor.writable = false;

  descriptor.value = function () {
    return 'descriptor';
  }
}

class Test {
  constructor(public name: string) {
  }

  @getNameDecorator
  getName() {
    return this.name;
  }
}

const test = new Test('name');

console.log(test.getName());

// log: descriptor
```

<br/>
<br/>
<br/>


### 三、访问器的装饰器


**接收的参数**
- `target`     :  Prototype
- `key`        :  访问器名字
- `descriptor` :  参考 [Object.defineProperty()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 中的 descriptor。

```ts
function visitDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  return {
    ...descriptor,
    get() {
      return '999';
    }
  }
}

class Test {
  private _name: string;

  constructor(name: string) {
    this._name = name
  }

  get name() {
    return this._name;
  }

  @visitDecorator
  set name(name: string) {
    this._name = name;
  }
}

const test = new Test('name');
console.log(test.name);

// log: 999
```



<br/>
<br/>
<br/>


### 四、属性的装饰器

**接收的参数**

- `target`:  原型 prototype
- `key`:     key
- `descrioptor`: 需要单独创建

```ts
function visitDecorator(target: any, key: string): any {
  // 这里的修改并不是实例上的 name，而是原型上的 name
  target[key] = 'test';

  // 这里创建一个 descrioptor，并返回
  const descrioptor: PropertyDescriptor = {
    writable: true
  }
  return descrioptor;
}


class Test {
  @visitDecorator
  name = '123';
}

const test = new Test();
console.log(test.name);
console.log((test as any).__proto__.name);
console.log(Test.prototype.name);

// log: 123
// log: test
// log: test
```


<br/>
<br/>
<br/>

### 五、参数的装饰器

**接收的参数**

- `target`:       原型
- `key`:          参数所在方法名字
- `paramIndex`:   参数索引

```ts
function paramDecorator(target: any, key: string, paramIndex: number): any {
  console.log(target, key, paramIndex);
}

class Test {
  getInfo(@paramDecorator name: string, age: number) {
    console.log(name, age);
  }
}

const test = new Test();
test.getInfo('name', 18)

// log: Test { getInfo: [Function] } 'getInfo' 0
// log: name 18
```


<br/>
<br/>
<br/>
