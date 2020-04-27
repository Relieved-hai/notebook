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


















