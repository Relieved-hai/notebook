## 字面量

```ts
// 字面量: 直接声明
const a: number = 123
const b: string = '123'
const c: object = { a: 123, b: '123' }
const d: ( number | string )[] = [1, '2', 3]
const e: { name: string }[] = [{ name: 'e' }]

// 非字面量: 通过 new 关键词实例化出来的数据
const a: Number = new Number(123)
const b: String = new String('123')
const c: object = new Object({ a: 123, b: '123' })
```

:::tip
在`TS`中，可以看到有些类型 开头是 **小写**，而有些是 **大写**
:::


<br/>
<br/>
<br/>

## 元祖(Tuple)

**元组** 类型表示一个 **已知元素数量** 和 **类型** 的 **数组**, 各元素的类型不必相同:

```ts
let arr1: [number, string] = [1, '2', 3]; // error, 数量不对, 元组中只声明有2个元素
let arr2: [number, string] = [1, 2]; // 错误, 第二个元素类型不对, 应该是字符串'2'
let arr3: [number, string] = ['1', 2]; // 错误, 2个元素的类型颠倒了
let arr4: [number, string] = [1, '2']; // 正确
```


<br/>
<br/>
<br/>

## 枚举(enum)
枚举是ts中有而js中没有的类型, 编译后会被转化成对象, 默认元素的值从1开始, 如下面的Color.Red的值为1, 以此类推Color.Green为2, Color.Blue为3:

```ts
// 默认从 0 开始， Red = 0, Green = 1, Blue = 2
enum Color { Red, Green, Blue }

// 如果我们将第二位设置为 5，那么后面的值将递增。
// 前面的值依然从0开始，后面依次递增
enum Color { Red, Green = 5, Blue }


Color[0] === 'Red'  // true
Color[6] === 'Blue' // true
```

<br/>
<br/>
<br/>

## 类型断言
有时候你会遇到这样的情况，你会比 TypeScript 更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript 会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。 其一是“尖括号”语法：
```ts
let someValue: any = 'this is a string'

let strLength: number = (<string>someValue).length
```

另一个为 as 语法：
```ts
let someValue: any = 'this is a string'

let strLength: number = (someValue as string).length
```

两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在 TypeScript 里使用 JSX 时，只有 as 语法断言是被允许的。


<br/>
<br/>
<br/>

## 交叉类型
交叉类型是将多个类型合并为一个类型, 表示"并且"的关系,用 & 连接多个类型
```ts
interface A { a: number }
interface B { b: number }

const a: A = { a: 1 }
const b: B = { b: '1' }

const ab: A & b = { ...a, ...b }
```

<br/>

我们可以把现有的多种类型叠加到一起成为一种类型，它包含了所需的所有类型的特性。 例如，`Person & Loggable` 同时是 `Person` 和 `Loggable`。 就是说这个类型的对象同时拥有了这两种类型的成员。

我们大多是在混入（`mixins`）或其它不适合典型面向对象模型的地方看到交叉类型的使用。 （在 `JavaScript` 里发生这种情况的场合很多！） 下面是如何创建混入的一个简单例子：

```ts
function extend<T, U>(first: T, second: U): T & U {
  let res = {} as T & U

  for (let id in first) {
    res[id] = first[id] as any
  }
  for (let id in second) {
    if (!res.hasOwnProperty(id)) {
      res[id] = second[id] as any
    }
  }
  return res
}


class Person {
  constructor(public name: string) {
  }
}

interface Loggable {
  log(): void
}

class ConsoleLogger implements Loggable {
  log() {
  }
}

let jim = extend(new Person('Jim'), new ConsoleLogger())
let n = jim.name
jim.log()

```

<br/>
<br/>
<br/>

## 联合类型
联合类型与交叉类型很有关联，表示"或"的关系,用 | 连接多个类型，但是使用上却完全不同。

偶尔你会遇到这种情况，一个代码库希望传入 number 或 string 类型的参数。 例如下面的函数：

```ts
function padLeft(value: string, padding: any) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}

/* lesson 1 */
// padLeft 存在一个问题，padding 参数的类型指定成了 any。 这就是说我们可以传入一个既不是 number 也不是 string 类型的参数，但是 TypeScript 却不报错。
padLeft('Hello world', 4)


/* lesson 2 */
let indentedString = padLeft('Hello world', true) // 编译阶段通过，运行时报错


/* lesson 3 */
// 为了解决这个问题，我们可以使用 联合类型做为 padding 的参数：
function padLeft(value: string, padding: string | number) {
  // ...
}

let indentedString = padLeft('Hello world', true) // 编译阶段报错
```

联合类型表示一个值可以是几种类型之一。我们用竖线（`|`）分隔每个类型，所以 `number | string` 表示一个值可以是 `number` 或 `string`。

如果一个值是联合类型，我们只能访问此联合类型的所有类型里共有的成员。

```ts
interface Bird {
  fly()
  layEggs()
}

interface Fish {
  swim()
  layEggs()
}

function getSmallPet(): Fish | Bird {
  // ...
}

let pet = getSmallPet()
pet.layEggs() // okay
pet.swim()    // error
pet.fly()    // error
```

这里的联合类型可能有点复杂：如果一个值的类型是 `A | B`，我们能够确定的是它包含了 `A` 和 `B` 中共有的成员。这个例子里，`Fish` 具有一个 `swim` 方法，我们不能确定一个 `Bird | Fish` 类型的变量是否有 `swim` 方法。 如果变量在运行时是 `Bird` 类型，那么调用 `pet.swim()` 就出错了。

<br/>
<br/>
<br/>

## 类型保护

联合类型适合于那些值可以为不同类型的情况。 但当我们想确切地了解是否为 Fish 或者是 Bird 时怎么办？ JavaScript 里常用来区分这 2 个可能值的方法是检查成员是否存在。
```ts
let pet = getSmallPet()

// 每一个成员访问都会报错
if (pet.swim) {
  pet.swim()
} else if (pet.fly) {
  pet.fly()
}
```


为了让这段代码工作，我们要使用类型断言：
```ts
let pet = getSmallPet()

if ((pet as Fish).swim) {
  (pet as Fish).swim()
} else {
  (pet as Bird).fly()
}
```

<br/>

#### 用户自定义的类型保护

> 上面我们不得不多次使用类型断言。如果我们一旦检查过类型，就能在之后的每个分支里清楚地知道 pet 的类型的话就好了。

```ts
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}
```

在这个例子里， `pet is Fish` 就是类型谓词。谓词为 `parameterName is Type` 这种形式， `parameterName` 必须是来自于当前函数签名里的一个参数名。

每当使用一些变量调用 `isFish` 时，`TypeScript` 会将变量缩减为那个具体的类型。

```ts
if (isFish(pet)) {
  pet.swim()
}
else {
  pet.fly()
}
```

注意 TypeScript 不仅知道在 if 分支里 pet 是 Fish 类型；它还清楚在 else 分支里，一定不是 Fish类型而是 Bird 类型。

<br/>

#### in 语法来做类型保护

使用in 语法。我们可以像下面这样利用类型断言来写：

```ts
function isFish(pet: Fish | Bird) {
  if('swim' in pet) {
     pet.swim()
  } else {
     pet.fly()
  }
}
```

<br/>

#### typeof 类型保护

使用联合类型书写 padLeft 代码。我们可以像下面这样利用类型断言来写：

```ts
function isNumber(x: any): x is string {
  return typeof x === 'number'
}

function isString(x: any): x is string {
  return typeof x === 'string'
}

function padLeft(value: string, padding: string | number) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(' ') + value
  }
  if (isString(padding)) {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}
```

然而，你必须要定义一个函数来判断类型是否是原始类型，但这并不必要。其实我们不必将 typeof x === 'number'抽象成一个函数，因为 TypeScript 可以将它识别为一个类型保护。 也就是说我们可以直接在代码里检查类型了。

```ts
function padLeft(value: string, padding: string | number) {
  if (typeof padding === 'number') {
    return Array(padding + 1).join(' ') + value
  }
  if (typeof padding === 'string') {
    return padding + value
  }
  throw new Error(`Expected string or number, got '${padding}'.`)
}
```

这些 `typeof` 类型保护只有两种形式能被识别：`typeof v === "typename"` 和 `typeof v !== "typename"`， `"typename"` 必须是`"number"`，`"string"`，`"boolean"` 或 `"symbol"`。 但是 `TypeScript` 并不会阻止你与其它字符串比较，只是 `TypeScript` 不会把那些表达式识别为类型保护。

<br/>

#### instanceof 类型保护

`instanceof` 类型保护是通过构造函数来细化类型的一种方式。

```ts
class Bird {
  fly () {
    console.log('bird fly')
  }

  layEggs () {
    console.log('bird lay eggs')
  }
}

class Fish {
  swim () {
    console.log('fish swim')
  }

  layEggs() {
    console.log('fish lay eggs')
  }
}

function getRandomPet () {
  return Math.random() > 0.5 ? new Bird() : new Fish()
}

let pet = getRandomPet()

if (pet instanceof Bird) {
  pet.fly()
}
if (pet instanceof Fish) {
  pet.swim()
}
```

<br/>
<br/>
<br/>

## 类型保护和类型断言

由于可以为 `null` 的类型能和其它类型定义为联合类型，那么你需要使用类型保护来去除 `null`。幸运地是这与在 `JavaScript` 里写的代码一致：
```ts
function f(sn: string | null): string {
  if (sn === null) {
    return 'default'
  } else {
    return sn
  }
}
```

这里很明显地去除了 null，你也可以使用短路运算符：
```ts
function f(sn: string | null): string {
  return sn || 'default'
}
```

如果编译器不能够去除 `null` 或 `undefined`，你可以使用类型断言手动去除。语法是添加 `!` 后缀： `identifier!` 从 `identifier` 的类型里去除了 `null` 和 `undefined`：

```ts
function broken(name: string | null): string {
  function postfix(epithet: string) {
    return name.charAt(0) + '.  the ' + epithet // error, 'name' 可能为 null
  }

  name = name || 'Bob'
  return postfix('great')
}

function fixed(name: string | null): string {
  function postfix(epithet: string) {
    return name!.charAt(0) + '.  the ' + epithet // ok
  }

  name = name || 'Bob'
  return postfix('great')
}

broken(null)

fixed(null)

```
::: warning
这里使用了嵌套函数，因为编译器无法去除嵌套函数的 `null`（除非是立即调用的函数表达式）。因为它无法跟踪所有对嵌套函数的调用，尤其是你将内层函数做为外层函数的返回值。如果无法知道函数在哪里被调用，就无法知道调用时 `name` 的类型。
:::

<br/>
<br/>
<br/>

## 字符串字面量类型

字符串字面量类型允许你指定字符串必须具有的确切值。在实际应用中，字符串字面量类型可以与联合类型，类型保护很好的配合。通过结合使用这些特性，你可以实现类似枚举类型的字符串。


```ts
type Easing = 'ease-in' | 'ease-out' | 'ease-in-out'

class UIElement {
  animate(dx: number, dy: number, easing: Easing) {
    if (easing === 'ease-in') {
      // ...
    } else if (easing === 'ease-out') {
    } else if (easing === 'ease-in-out') {
    } else {
      // error! 不能传入 null 或者 undefined.
    }
  }
}

let button = new UIElement()
button.animate(0, 0, 'ease-in')
button.animate(0, 0, 'uneasy') // error 你只能从三种允许的字符中选择其一来做为参数传递，传入其它值则会产生错误。
```

<br/>

```ts
// 定义一个类型
type Type1 = { name: string; age: number }

// 数组中的每一项，都要符合这个类型，或者包含该类型中该有的属性
const arr: Type1[] = [{ name: '', age: 18 }]
```

<br/>
<br/>
<br/>

## 索引类型

获取对象的键值, `ts` 中的 `keyof` 和 `Object.keys` 类似, 可以用来获取对象类型的键值:

```ts
type A = keyof {a:1,b:'123'} // 'a'|'b'
type B = keyof [1,2] // '1'|'2'|'push'... , 获取到内容的同时, 还得到了Array原型上的方法和属性(实战中暂时没遇到这种需求, 了解即可)
```

可以获得键值, 也可以获取对象类型的值的类型:

```ts
type C = A['a'] // 等于type C = 1;
let c:C = 2 // 错误, 值只能是1
```


<br/>
<br/>
<br/>

## 映射类型

[摘抄至 铁皮饭盒](https://juejin.im/post/5d3fe80fe51d456206115987#heading-12)

### `Readonly<T>`, 把每个属性都变成只读:
```ts
type A  = {a:number, b:string}
type A1 = Readonly<A> // {readonly a: number;readonly b: string;}
```

<br/>

### `Partial<T>`, 让属性都变成可选的
```ts
type A  = {a:number, b:string}
type A1 = Partial<A> // { a?: number; b?: string;}
```

<br/>

### `Required<T>`, 让属性都变成必选
```ts
type A  = {a?:number, b?:string}
type A1 = Required<A> // { a: number; b: string;}
```


<br/>

### `Pick<T,K>`, 只保留自己选择的属性, U代表属性集合

```ts
type A  = {a:number, b:string}
type A1 = Pick<A, 'a'> //  {a:number}
```

<br/>

### `Omit<T,K>` 实现排除已选的属性

```ts
type A  = {a:number, b:string}
type A1 = Omit<A, 'a'> // {b:string}
```

<br/>

### `Record<K,T>`, 创建一个类型,T代表键值的类型, U代表值的类型

```ts
type A1 = Record<string, string> // 等价{[k:string]:string}
```

<br/>

### `Exclude<T,U>`, 过滤T中和U相同(或兼容)的类型

```ts
type A  = {a:number, b:string}
type A1 = Exclude<number|string, string|number[]> // number

// 兼容
type A2 = Exclude<number|string, any|number[]> // never , 因为any兼容number, 所以number被过滤掉
```

<br/>

### `Extract<T,U>`, 提取T中和U相同(或兼容)的类型

```ts
type A  = {a:number, b:string}
type A1 = Extract<number|string, string|number[]> // string
```

<br/>

### `NonNullable`, 剔除T中的undefined和null

```ts
type A1 = NonNullable<number|string|null|undefined> // number|string
```

<br/>

### `ReturnType`, 获取T的返回值的类型

```ts
type A1= ReturnType<()=>number> // number
```

<br/>

### `InstanceType`, 返回T的实例类型

ts中类有2种类型, 静态部分的类型和实例的类型, 所以T如果是构造函数类型, 那么InstanceType可以返回他的实例类型:

```ts
interface A{
    a:HTMLElement;
}

interface AConstructor{
    new():A;
}

function create (AClass:AConstructor):InstanceType<AConstructor>{
    return new AClass();
}
```

<br/>

### `Parameters` 获取函数参数类型

返回类型为元祖, 元素顺序同参数顺序.

```ts
interface A{
    (a:number, b:string):string[];
}

type A1 = Parameters<A> // [number, string]
```

<br/>

### `ConstructorParameters` 获取构造函数的参数类型

和Parameters类似, 只是T这里是构造函数类型.

```ts
interface AConstructor{
    new(a:number):string[];
}

type A1 = ConstructorParameters<AConstructor> // [number]
```

<br/>
<br/>
<br/>

## 条件类型

```ts
T extends U ? X : Y

// 用来表示类型是不确定的, 如果U的类型可以表示T, 那么返回X, 否则Y. 举几个例子:
type A =  string extends '123' ? string :'123' // '123'
type B =  '123' extends string ? string :123 // string

// 明显string的范围更大, '123'可以被string表示, 反之不可.
```

<br/>
<br/>
<br/>


