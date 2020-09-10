## 接口(interface)
简单来说，是一个抽象的类型，用来描述一个对象，方法，类的成员类型，并实现它


<br/>
<br/>
<br/>

## 可选属性

接口里的属性不全都是必需的。 有些是只在某些条件下存在，或者根本不存在。这时就可以使用 ?

```ts
interface InterfaceName {
    age: number;
    name?: string;
}

const people: InterfaceName = {
    age: 18,
    // name 不是必须实现的
}
```

<br/>
<br/>
<br/>

## 只读属性

一些对象属性只能在对象刚刚创建的时候修改其值，赋值后，将无法修改。 你可以在属性名前用 readonly 来指定只读属性:

```ts
interface InterfaceName {
  readonly name: string
  readonly sex: string
}

const people: InterfaceName = {
    name: 'name',
    sex: 'sex'
}
```

TypeScript 具有 `ReadonlyArray<T>` 类型，它与 `Array<T>` 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改：
```ts
let a: number[] = [1, 2, 3, 4]
let ro: ReadonlyArray<number> = a
ro[0] = 12 // error!
ro.push(5) // error!
ro.length = 100 // error!
a = ro // error!

上面代码的最后一行，可以看到就算把整个 ReadonlyArray 赋值到一个普通数组也是不可以的。 但是你可以用类型断言重写：

a = ro as number[]
```

当然也可以通过索引签名设置为只读，防止给索引赋值：
```ts
interface InterfaceName {
  readonly [index: number]: string;
}

let myArray: InterfaceName = ['Alice', 'Bob'];
myArray[2] = 'Mallory'; // error!
```

<br/>
<br/>
<br/>

## 额外的属性检查

例如，在 js 中，我们在调用一个方法时，误传一个根本不需要的参数时，js 并不会说什么。但在 ts 中，会认为存在BUG


```ts
interface interfaceName {
  name: string
}

const fn = (args: interfaceName): void => {  }

const obj = {
  name: 'name',
  age: 1
}

// 通过
fn({ name: 'name' })

// 通过
fn(obj)

// 不通过
// 字面量的形式：传入的参数，这时 ts 就会对参数进行强校验，因为 interfaceName 中要求只能有 name 属性
// 引用对象的形式：传入的参数，它仅仅看是否有必须的属性，而不会去强校验其他不必要的属性
fn({ name: 'name', age: 1 })
```

<br/>

解决方式：定义索引签名

```ts
interface interfaceName {
  name: string
  sex?: number
  [propName: string]: any // 定义索引签名
}

const fn = (args: interfaceName): void => {
    // TODO
}

fn({ name: 'name', age: 18 }) // error 不添加索引签名这里就会报错。

fn(({ name: 'name', age: 18 }) as interfaceName) // 当然，不加索引签名，通过断言依然可以跳过类型检查
```

<br/>
<br/>
<br/>

## 函数类型

接口能够描述 JavaScript 中对象拥有的各种各样的外形。 除了描述带有属性的普通对象外，接口也可以描述函数类型。

为了使用接口表示函数类型，需要给接口定义一个调用签名，并去实现它，它就像是一个只有参数列表和返回值类型的函数定义。参数列表里的每个参数都需要名字和类型。

```ts
interface InterfaceName {
  // (参数一：number 类型， 参数二：number 类型，解构赋值中 num3 是 number 类型，选传): 返回一个 [ number 类型的值， string 类型的值 ]
  (num1: number, num2: number, { num3 }: { num3?: number }): [number, string]
}

// 声明函数遵循接口定义，对于函数类型的类型检查来说，函数的参数名不需要与接口里定义的名字相匹配。
const add: InterfaceName = (n1, n2, { num3 = 0 }) => {
  return [n1 + n2 + num3, 'add']
}
```

<br/>

:::warning
注意： never 类型 ( 简单来说：就是永远不可能走到最后 )
:::

```ts
function errorEmitter(): never { // 永远不可能走到最后
  throw new Error();

  // 这里将无法执行到
  console.log(123);
  // code...
}


function errorEmitter(): never {
  while(true) {}

  console.log(123);
  // code...
}

```


<br/>
<br/>
<br/>


### 类类型

TypeScript 也能够用它来明确的强制一个类去符合某种契约。

```ts
interface ClockInterface {
  currentTime: Date
  setTime(d: Date)
}

class Clock implements ClockInterface {
  currentTime: Date
  setTime(d: Date) {
    this.currentTime = d
  }
  constructor(h: number, m: number) { }
}
```

接口描述了类的公共部分，而不是公共和私有两部分。 它不会帮你检查类是否具有某些私有成员。


<br/>
<br/>
<br/>

## 类静态部分与实例部分的区别

当你操作类和接口的时候，你要知道类是具有两个类型的：静态部分的类型和实例的类型。 你会注意到，当你用构造器签名去定义一个接口并试图定义一个类去实现这个接口时会得到一个错误：

```ts
interface ClockConstructor {
  new (hour: number, minute: number)
}

// error
class Clock implements ClockConstructor {
  currentTime: Date
  constructor(h: number, m: number) { }
}
```

这里因为当一个类实现了一个接口时，只对其实例部分进行类型检查。`constructor` 存在于类的静态部分，所以不在检查的范围内。

看下面的例子，我们定义了两个接口。
```ts
// ClockConstructor 为构造函数所用
interface ClockConstructor {
  new(hour: number, minute: number): ClockInterface
}

// ClockInterface 为实例方法所用
interface ClockInterface {
  tick()
}

// 为了方便我们定义一个构造函数 createClock，它用传入的类型创建实例。
function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
  return new ctor(hour, minute)
}

class DigitalClock implements ClockInterface {
  constructor(h: number, m: number) {
  }

  tick() {
    console.log('beep beep')
  }
}

class AnalogClock implements ClockInterface {
  constructor(h: number, m: number) {
  }

  tick() {
    console.log('tick tock')
  }
}

// 因为 createClock 的第一个参数是 ClockConstructor 类型，在 createClock(AnalogClock, 7, 32) 里，会检查 AnalogClock 是否符合构造函数签名。
let digital = createClock(DigitalClock, 12, 17)
let analog = createClock(AnalogClock, 7, 32)
```


<br/>
<br/>
<br/>

## 继承接口

和类一样，接口也可以相互继承。 这让我们能够从一个接口里复制成员到另一个接口里，可以更灵活地将接口分割到可重用的模块里。

```ts
interface Shape {
  color: string
}

interface PenStroke {
  penWidth: number
}

interface Square extends Shape, PenStroke {
  sideLength: number
}

let square = {} as Square
square.color = 'blue'
square.sideLength = 10
square.penWidth = 5.0
```


<br/>
<br/>
<br/>

## 混合类型

先前我们提过，接口能够描述 JavaScript 里丰富的类型。 因为 JavaScript 其动态灵活的特点，有时你会希望一个对象可以同时具有上面提到的多种类型。

一个例子就是，一个对象可以同时做为函数和对象使用，并带有额外的属性。
```ts
interface Counter {
  (start: number): string
  interval: number
  reset(): void
}

function getCounter(): Counter {
  let counter = (function (start: number) { }) as Counter
  counter.interval = 123
  counter.reset = function () { }
  return counter
}

let c = getCounter()
c(10)
c.reset()
c.interval = 5.0
```


<br/>
<br/>
<br/>

## 接口继承类

当接口继承了一个类类型时，它会继承类的成员但不包括其实现。 就好像接口声明了所有类中存在的成员，但并没有提供具体实现一样。 接口同样会继承到类的 `private` 和 `protected` 成员。 这意味着当你创建了一个接口继承了一个拥有私有或受保护的成员的类时，这个接口类型只能被这个类或其子类所实现（`implement`）。

当你有一个庞大的继承结构时这很有用，但要指出的是你的代码只在子类拥有特定属性时起作用。 这个子类除了继承至基类外与基类没有任何关系。例：

```ts
class Control {
  private state: any
}

interface SelectableControl extends Control {
  select(): void
}

class Button extends Control implements SelectableControl {
  select() {
  }
}

class TextBox extends Control {
  select() {
  }
}

// Error：“ImageC”类型缺少“state”属性。
class ImageC implements SelectableControl {
  select() {
  }
}
```

在上面的例子里，`SelectableControl` 包含了 `Control` 的所有成员，包括私有成员 `state`。 因为 `state` 是私有成员，所以只能够是 `Control` 的子类们才能实现 `SelectableControl` 接口。 因为只有 `Control` 的子类才能够拥有一个声明于 `Control` 的私有成员 `state`，这对私有成员的兼容性是必需的。

在 `Control` 类内部，是允许通过 `SelectableControl` 的实例来访问私有成员 `state` 的。 实际上，`SelectableControl` 接口和拥有 `select` 方法的 `Control` 类是一样的。`Button` 和 `TextBox` 类是 `SelectableControl` 的子类（因为它们都继承自 `Control` 并有 `select` 方法），但 `ImageC` 类并不是这样的。
