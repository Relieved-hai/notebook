## 示例
从 ECMAScript 2015，也就是 ES6 开始， JavaScript 程序员将能够使用基于类的面向对象的方式。 使用 TypeScript，我们允许开发者现在就使用这些特性，并且编译后的 JavaScript 可以在所有主流浏览器和平台上运行。

```ts
// 声明一个 Greeter 类，有 3 个成员
class Greeter {
  // 属性
  greeting: string

  // 构造函数
  constructor(message: string) {
    this.greeting = message
  }

  // 方法
  greet() {
    return `Hello, ${this.greeting}`
  }
}

// new 构造了 Greeter 类的一个实例，它会调用之前定义的构造函数，创建一个 Greeter 类型的新对象，并执行构造函数初始化它。
let greeter = new Greeter('world')

```

<br/>
<br/>
<br/>

## 继承

在 TypeScript 里，我们可以使用常用的面向对象模式。 基于类的程序设计中一种最基本的模式是允许使用继承来扩展现有的类。

```ts
// 基类 ( 超类 )
class Animal {
  // public name: string
  // constructor(name) {
  //   this.name = name
  // }

  // 在 ts 中，这段代码等价于上面的四行代码
  constructor(public name: string) {  }

  move(distance: number = 0) {
    console.log(`Animal moved ${distance}m.`)
  }
}

// 派生类 ( 子类 ) 从基类中继承了属性和方法。
class Dog extends Animal {
  constructor(public name: string) {
    super(name);
  }

  run() {
    console.log('run');
  }
}

// 因为 Dog 继承了 Animal 的功能，因此我们可以创建一个 Dog 的实例，它能够 bark() 和 move()
const dog = new Dog('goudan')
console.log(dog.name);
dog.run()
dog.move()
```

<br/>
<br/>
<br/>

## 重写

```ts
class Animal {
  name: string

  constructor(name: string) {
    this.name = name
  }

  move(distance: number = 0) {
    console.log(`${this.name} moved ${distance}m.`)
  }
}

// 派生类包含了一个构造函数，它必须调用 super()，它会执行基类的构造函数。 而且，在构造函数里访问 this 的属性之前，一定要调用 super()。 这个是 TypeScript 强制执行的一条重要规则。
class Snake extends Animal {
  constructor(name: string) {
    super(name)
  }

  // 子类里可以重写父类的方法,重写了从 Animal 继承来的 move 方法，使得 move 方法根据不同的类而具有不同的功能。
  move(distance: number = 5) {
    console.log('Slithering...');
    super.move(distance);
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }

  move(distance: number = 45) {
    console.log('Galloping...')
    super.move(distance);
  }
}


let sam = new Snake('Sammy')

// tom 被声明为 Animal 类型，但因为它的值是 Horse，调用 tom.move(34) 时，它会调用 Horse 里重写的方法。
let tom: Animal = new Horse('Tommy')

sam.move()
tom.move(66)

/****** print ******/
// Slithering...
// Sammy moved 5m.
// Galloping...
// Tommy moved 34m.
```

<br/>
<br/>
<br/>

## 公共、私有与受保护的修饰符

### 默认为 public
在上面的例子里，我们可以自由的访问程序里定义的成员。 如果你对其它语言中的类比较了解，就会注意到我们在之前的代码里并没有使用 public 来做修饰； 在 TypeScript 里，成员都默认为 public。

也可以明确的将一个成员标记成 public。
```ts
// 等价于上面的 Animal
class Animal {
  public name: string

  public constructor(name) {
    this.name = name
  }

  public move(distance: number) {
    console.log(`${this.name} moved ${distance}m.`)
  }
}
```

```ts
class Animal {
  // public name: string
  // public constructor(name) {
  //   this.name = name
  // }

  // 在 ts 中，这段代码等价于上面的四行代码
  constructor(public name: string) {  }

  public move(distance: number) {
    console.log(`${this.name} moved ${distance}m.`)
  }
}
```

### 私有 private

> 当成员被标记成 private 时，它就不能在声明它的类的外部访问。

```ts
class Animal {
  private name: string

  constructor(name: string) {
    this.name = name
  }
}

new Animal('Cat').name // error: 'name' 是私有的，外部无法访问
```

TypeScript 使用的是结构性类型系统。 当我们比较两种不同的类型时，并不在乎它们从何处而来，如果所有成员的类型都是兼容的，我们就认为它们的类型是兼容的。

然而，当我们比较带有 `private` 或 `protected` 成员的类型的时候，情况就不同了。 如果其中一个类型里包含一个 `private` 成员，那么只有当另外一个类型中也存在这样一个 `private` 成员，并且它们都是来自同一处声明时，我们才认为这两个类型是兼容的。 对于 `protected` 成员也使用这个规则。

> 下面来看一个例子，更好地说明了这一点：
```ts
class Animal {
  private name: string

  constructor(name) {
    this.name = name
  }
}

class Rhino extends Animal {
  constructor() {
    super('Rhino')
  }
}

class Employee {
  private name: string

  constructor(name: string) {
    this.name = name
  }
}

let animal = new Animal('Goat')
let rhino = new Rhino()
let employee = new Employee('Bob')

animal = rhino
animal = employee //error: Animal 与 Employee 不兼容
```

这个例子中有 Animal 和 Rhino 两个类， Rhino 是 Animal 类的子类。 还有一个 Employee 类，其类型看上去与 Animal 是相同的。 我们创建了几个这些类的实例，并相互赋值来看看会发生什么。 因为 Animal 和 Rhino 共享了来自 Animal 里的私有成员定义 private name: string，因此它们是兼容的。然而 Employee 却不是这样。当把 Employee 赋值给 Animal 的时候，得到一个错误，说它们的类型不兼容。尽管 Employee 里也有一个私有成员 name，但它明显不是 Animal 里面定义的那个。

### 受保护 protected
> protected 修饰符与 private 修饰符的行为很相似，但有一点不同，protected成员在派生类中仍然可以访问。例如：
```ts
class Person {
  protected name: string
  private age: number

  constructor(name: string) {
    this.name = name
  }
}

class Employee extends Person {
  private department: string

  constructor(name: string, department: string) {
    super(name)

    this.department = department
  }

  getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`
  }
}

let howard = new Employee('Howard', 'Sales')
console.log(howard.getElevatorPitch());
console.log(howard.name); // error
```

注意，我们不能在 Person 类外使用 name，但是我们仍然可以通过 Employee 类的实例方法访问，因为 Employee 是由 Person 派生而来的。

> 构造函数也可以被标记成 protected。 这意味着这个类不能在包含它的类外被实例化，但是能被继承。

```ts
class Person {
  protected name: string

  protected constructor(name: string) {
    this.name = name
  }
}

// Employee 能继承 Person
class Employee extends Person {
  protected department: string

  constructor(name: string, department: string) {
    super(name)

    this.department = department
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`
  }
}

let howard = new Employee('Howard', 'Sales')
let john = new Person('John') // error, 'Person' 的构造函数时所保护的
```

<br/>
<br/>
<br/>

## readonly 修饰符

> 你可以使用 readonly 关键字将属性设置为只读的。 只读属性必须在声明时或构造函数里被初始化。

```ts
class Person {
  readonly name: string

  constructor(name: string) {
    this.name = name
  }
}

let john = new Person('John')
john.name = 'peter' // error
```

### 参数属性

在上面的例子中，我们必须在 `Person` 类里定义一个只读成员 `name` 和一个参数为 `name` 的构造函数，并且立刻将 `name` 的值赋给 `this.name`，这种情况经常会遇到。 参数属性可以方便地让我们在一个地方定义并初始化一个成员。 下面的例子是对之前 `Person` 类的修改版，使用了参数属性：

```ts
class Person {
  constructor(readonly name: string) {
  }
}
```

在构造函数里使用 `readonly name: string` 参数来创建和初始化 `name` 成员。 我们把声明和赋值合并至一处。

参数属性通过给构造函数参数前面添加一个访问限定符来声明。使用 `private` 限定一个参数属性会声明并初始化一个私有成员；对于 `public` 和 `protected` 来说也是一样。

<br/>
<br/>
<br/>

## 存储器

TypeScript 支持通过 getters/setters 来截取对对象成员的访问。 它能帮助你有效的控制对对象成员的访问。

> 没有使用存取器的例子

```ts
class Employee {
  fullName: string
}

let employee = new Employee()
employee.fullName = 'Bob Smith'
if (employee.fullName) {
  console.log(employee.fullName)
}
```

可以设置 fullName，因为它是 public 的，有时候当我们去修改它的时候触发一些额外逻辑，存取器就派上用场了。

```ts
let passcode = 'passcode'

class Employee {
  private _fullName: string

  get fullName(): string {
    return this._fullName
  }

  set fullName(newName: string) {
    if (passcode && passcode === 'passscode') {
      this._fullName = newName
    } else {
      console.log('Error')
    }
  }
}


let employee = new Employee()
employee.fullName = 'Bob Smiith'
if (employee.fullName) {
  console.log(employee.fullName);
}

```

我们可以修改一下密码，来验证一下存取器是否是工作的。当密码不对时，会提示我们没有权限去修改员工。

对于存取器有下面几点需要注意的：

首先，存取器要求你将编译器设置为输出 `ECMAScript 5` 或更高。 不支持降级到 `ECMAScript 3`。其次，只带有 `get` 不带有 `set` 的存取器自动被推断为 `readonly`。这在从代码生成 `.d.ts` 文件时是有帮助的，因为利用这个属性的用户会看到不允许够改变它的值。

<br/>
<br/>
<br/>

## 静态属性

那些仅当类被实例化的时候才会被初始化的属性。 我们也可以创建类的静态成员，这些属性存在于类本身上面而不是类的实例上。 在这个例子里，我们使用 `static` 定义 `origin`，因为它是所有网格都会用到的属性。 每个实例想要访问这个属性的时候，都要在 `origin` 前面加上类名。 如同在实例属性上使用 `this.xxx` 来访问属性一样，这里我们使用 `Grid.xxx` 来访问静态属性。

```ts
class Grid {
  static origin = { x: 0, y: 0 }

  scale: number

  constructor(scale: number) {
    this.scale = scale
  }

  calculateDistanceFromOrigin(point: { x: number, y: number }) {
    let xDist = point.x - Grid.origin.x
    let yDist = point.y - Grid.origin.y
    return Math.sqrt(xDist * xDist + yDist * yDist) * this.scale
  }
}

let grid1 = new Grid(1.0)  // 1x scale
let grid2 = new Grid(5.0)  // 5x scale

console.log(grid1.calculateDistanceFromOrigin({ x: 3, y: 4 }))
console.log(grid2.calculateDistanceFromOrigin({ x: 3, y: 4 }))
```

<br/>

例如：单例模式就可以借助静态属性来完成

```ts
class Demo {
  private static _demo: Demo;

  private constructor() {  }


  static getInstance() {
    if (!this._demo) {
      this._demo = new Demo();
    }
    return this._demo;
  }
}


const demo1 = Demo.getInstance();
const demo2 = Demo.getInstance();

console.log(demo1 === demo2); // true
```

<br/>
<br/>
<br/>

## 抽象类

抽象类做为其它派生类的基类使用。 它们一般不会直接被实例化。不同于接口，抽象类可以包含成员的实现细节。 abstract 关键字是用于定义抽象类和在抽象类内部定义抽象方法。

```ts
abstract class Animal {
  abstract makeSound(): void

  move(): void {
    console.log('roaming the earth...')
  }
}
```

抽象类中的抽象方法不包含具体实现并且必须在派生类中实现。 抽象方法的语法与接口方法相似。两者都是定义方法签名但不包含方法体。 然而，抽象方法必须包含 abstract 关键字并且可以包含访问修饰符。

```ts
abstract class Department {
  name: string

  protected constructor(name: string) {
    this.name = name
  }

  printName(): void {
    console.log('Department name: ' + this.name)
  }

  abstract printMeeting(): void // 必须在派生类中实现
}

class AccountingDepartment extends Department {
  constructor() {
    // 在派生类的构造函数中必须调用 super()
    super('Accounting and Auditing')
  }

  printMeeting(): void {
    console.log('The Accounting Department meets each Monday at 10am.')
  }

  generateReports(): void {
    console.log('Generating accounting reports...')
  }
}

let department: Department // 允许创建一个对抽象类型的引用
department = new Department() // error: 不能创建一个抽象类的实例
department = new AccountingDepartment() // 允许对一个抽象子类进行实例化和赋值
department.printName()
department.printMeeting()
department.generateReports() // error: 方法在声明的抽象类中不存在

```

<br/>
<br/>
<br/>

## 其他

```ts
class Greeter {
  static standardGreeting = 'Hello, there'

  greeting: string

  constructor(message?: string) {
    this.greeting = message
  }

  greet() {
    if (this.greeting) {
      return 'Hello, ' + this.greeting
    } else {
      return Greeter.standardGreeting
    }
  }
}

let greeter: Greeter
greeter = new Greeter()
console.log(greeter.greet())

let greeterMaker: typeof Greeter = Greeter
greeterMaker.standardGreeting = 'Hey there'

let greeter2: Greeter = new greeterMaker()
console.log(greeter2.greet())

```
这个例子里， `greeter` 与之前看到的一样。 我们实例化 `Greeter` 类，并使用这个对象。 与我们之前看到的一样。

再之后，直接使用类。 我们创建了一个叫做 `greeterMaker` 的变量。这个变量保存了这个类或者说保存了类构造函数。 然后我们使用 `typeof Greeter`，意思是取 `Greeter` 类的类型，而不是实例的类型。或者更确切的说，”告诉我 `Greeter` 标识符的类型”，也就是构造函数的类型。 这个类型包含了类的所有静态成员和构造函数。 之后，就和前面一样，我们在 `greeterMaker` 上使用 `new`，创建 `Greeter` 的实例。

### 把类当做接口使用

类定义会创建两个东西：类的实例类型和一个构造函数。 因为类可以创建出类型，所以你能够在允许使用接口的地方使用类。

```ts
class Point {
  x: number
  y: number
}

interface Point3d extends Point {
  z: number
}

let point3d: Point3d = {x: 1, y: 2, z: 3}
```
