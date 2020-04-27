### 一、创建 util.js 及测试文件
`util.js`

测试工具类

```js
class Util {
  a() {
    // 逻辑异常复杂
  }

  b() {
    // 逻辑异常复杂
  }
}

export default Util
```

<br/>

`util.test.js`
    
util 测试文件

```js
import Util from './util'

let util = null

beforeAll(() => {
  util = new Util()
})

test('test a function', () => {
  // expect()
})
```

<br/>
<br/>
<br/>

### 二、创建 demo.js 以及测试文件，且用到了 util 中的方法
`demo.js`

在新建一个 demo.js ，这里面用到了 util 中的方法

```js
import Util from './util'

const demoFunction = (a, b) => {
  const util = new Util()
  util.a(a)
  util.b(b)
}

export default demoFunction
```

`demo.test.js`

这里同样可以使用 mock 的方法，来实现测试，在这个例子中，没必要去执行性能消耗很大的 util.a() util.b() 方法。我们只需要知道其执行即可

```js
/* *************** method 1 *************** */
jest.mock('./util')
// jest.mock() 发现 util 是一个类。会自动把类的构造函数和方法变成 jest.fn()
// 1. const Util = jest.fn()
// 2. Util.a = jest.fn()
// 3. Util.b = jest.fn()

import Util from './util'

import demoFunction from './demo'

test('test demoFunction', () => {
  demoFunction()
  expect(Util.mock.instances[0].a).toHaveBeenCalled()
  expect(Util.mock.instances[0].b).toHaveBeenCalled()
})

/* *************** method 2 *************** */
// 创建一个 __mocks__ 文件夹，下面在新建 util.js
// util.js 实现
// ---------------------------------
const Util = jest.fn(() => {
  console.log('__mocks__/Util.js');
})
Util.prototype.a = jest.fn()
Util.prototype.b = jest.fn()

export default Util
// ---------------------------------
jest.mock('./util')
// 发现有 __mocks__ 文件夹，并且里面还有一个 util.js，这里就会引入并使用

import Util from './util'

import demoFunction from './demo'

test('test demoFunction', () => {
  demoFunction()
  expect(Util.mock.instances[0].a).toHaveBeenCalled()
  expect(Util.mock.instances[0].b).toHaveBeenCalled()
})

/* *************** method 3 *************** */
jest.mock('./util', () => {
  const Util = jest.fn(() => {
    console.log(' --- Util --- ');
  })
  Util.prototype.a = jest.fn()
  Util.prototype.b = jest.fn()

  return Util
})
// 直接在 mock 中去编写该方法

import Util from './util'

import demoFunction from './demo'

test('test demoFunction', () => {
  demoFunction()
  expect(Util.mock.instances[0].a).toHaveBeenCalled()
  expect(Util.mock.instances[0].b).toHaveBeenCalled()
})

```
