`Counter.js`
```js
// 很简单的一个测试类
export default class Counter {
  constructor() {
      this.number = 0
    }
  
    addOne() {
      this.number += 1
    }
  
    addTwo() {
      this.number += 2
    }
  
    minusOne() {
      this.number -= 1
    }
  
    minusTwo() {
      this.number -= 2
    }
}
```

<br/>
<br/>
<br/>


## 钩子函数

和 `react` 一样， `jest` 同样也有自己的钩子函数。

> beforeAll(() => console.log( '--- 所有测试用例执行之前 ---' ))

> beforeEach(() => console.log( '--- 每个测试用例执行之前 ---' ))

> afterEach(() => console.log( '--- 每个测试用例执行之后 ---' ))

> afterAll(() => console.log( '--- 所有测试用例执行之后 ---' ))

<br/>

`Counter.test.js`

```js
import Counter from "./Counter";

let counter = null

beforeAll(() => {})

beforeEach(() => {
  // 这里在跑每个测试用例之前。去初始化实例，来达到每次测试用例所使用的的实例不会互相影响
  counter = new Counter()
})

afterEach(() => {})

afterAll(() => {})

test('test Counter addOne function', () => {
    console.log('test Counter addOne function');
    counter.addOne()
    expect(counter.number).toBe(1)
  })

test('test Counter minusOne function', () => {
    console.log('test Counter minusOne function');
    counter.minusOne()
    expect(counter.number).toBe(-1)
})
```

<br/>
<br/>
<br/>

## 作用域

`Counter.test.js`

这里多了两个 `describe()`，其实就是给这四个测试用例进行分组，也相当分了两个的作用域，且每个 `describe()` 中都会有这四个钩子函数。

可以看到下面还有三个`log`，在 `jest` 中。
1. 在 `钩子函数` 和 `test('', () => {})` 之外定义的方法，将最先执行
2. 其次是外层的对应的钩子函数
3. 然后是块内的对应的钩子函数
4. 最后才是 `test()` 中的测试用例

```js
import Counter from "./Counter";

let counter = null

console.log(1);

beforeAll(() => {})

beforeEach(() => {})

afterEach(() => {})

afterAll(() => {})

describe('加法测试分组', () => {
  console.log(2);

  // test.only
  test('test Counter addOne function', () => {
    counter.addOne()
    expect(counter.number).toBe(1)
  })

  test('test Counter addTwo function', () => {
    counter.addTwo()
    expect(counter.number).toBe(2)
  })
})

describe('减法测试分组', () => {
  console.log(3);

  test('test Counter minusOne function', () => {
    counter.minusOne()
    expect(counter.number).toBe(-1)
  })

  test('test Counter minusTwo function', () => {
    counter.minusTwo()
    expect(counter.number).toBe(-2)
  })

})

```

## test.only()

当一个文件中测试用例过多时，可以使用 `.only()` 忽略其他的测试用例，来单独的跑加了 `.only()` 测试用例

```js
// code ...
// code ...
// code ...

test.only('忽略其他测试用例', () => {
  // TODO
})

// code ...
// code ...
// code ...
```
