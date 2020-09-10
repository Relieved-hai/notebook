## mock 使用

`fetch.js`

```js
import axios from 'axios'

// 测试回调函数
export const callBack = (cb) => {
  cb && cb()
}

// axios 请求
export const getData = () => {
  return axios.get('http://www.xxx.com/api/xxx').then(res => res.data)
}
```

mock 函数

> 1. 捕获函数的调研和返回结果
> 2. 可以让我们自由的设置返回结果
> 3. 改变函数的内部实现

:::warning
同样的测试，依然有多种写法，如下
:::

`fetch.test.js`

```js
import { callBack, getData } from "./demo";
import axios from 'axios'

// 假如 getData 一个接口 2s 响应，但是有一千个接口，时间会很长，我们这个时候可以去 mock axios, 
jest.mock('axios')


test('test callback', () => {
  // jest 中的 fn()，可以帮助我们捕获函数的调用，我们可以有多种设置返回值的方法
  // 回调函数中的返回值是 123
  const func = jest.fn(() => 123)

  // 每次返回结果 value
  func.mockReturnValue('value')
  
  // 两次返回结果 one and two
  func
    .mockReturnValueOnce('one')
    .mockReturnValueOnce('two')
  
  // 每次返回结果 value
  func.mockImplementation(() => {
    return 'value'
  })
  
  // 一次返回结果 Once
  func.mockImplementationOnce(() => {
    return 'Once'
  })
  
  // 返回 this 指向
  func.mockReturnThis();

  callBack(func)
  callBack(func)
  callBack(func)

  // 断言 callback 是否执行
  expect(func).toBeCalled(); // true

  // .toBeCalledWith(传入的回调参数)
  expect(func).toBeCalledWith()

  // fn() 的返回值 func.mock，可用于各种测试
  console.log(func.mock);
  // 该 mock 就是 func.mock 打印的结果，为了方便查看，放在一个对象中
  const mock = {
    calls: [[], [], []],                           // 传入参数
    instances: [undefined, undefined, undefined],  // this 指向
    invocationCallOrder: [1, 2, 3],                // 函数调用顺序
    results: [                                     // 函数返回值
      { type: 'return', value: '上面对应的返回值' },
      { type: 'return', value: '上面对应的返回值' },
      { type: 'return', value: '上面对应的返回值' }
    ]
  }
})


test('test getData', async () => {
  // 去模拟 axios 的返回结果，而不需要真实的去请求数据
  axios.get
    .mockResolvedValueOnce({ data: 'hello' })     // 一次的返回结果
    .mockResolvedValue({ data: 'world' })         // 之后的返回结果

  const data = await getData()
  const data1 = await getData()
  const data2 = await getData()

  expect(data).toBe('hello')  // true
  expect(data1).toBe('world') // true
  expect(data2).toBe('world') // true
})
```

<br/>
<br/>
<br/>

## mock 方法

`demo.js`

```js
import axios from 'axios'

export const fetchData = () => {
  // 假设 data 中返回 '(function(){return '123'})()'
  return axios.get('/').then(res => res.data)
}
```

<br/>

`demo.test.js`

```js
import { fetchData } from './demo'
import Axios from 'axios'

jest.mock('axios')

// 通过上面的例子，我们可以通过 mockResolvedValue 来模拟返回值
test('test fetchData', async () => {
  Axios.get.mockResolvedValue({
    data: `(function(){return '123'})()`
  })
  const data = await fetchData()
  expect(eval(data)).toEqual('123')
})
```

<br/>

`demo.test.js`

我们也可以通过模拟文件来达到同样的测试效果

在当前目录下，新建一个 `__mocks__` 文件夹，在创建一个 `demo.js`
`demo.js`

```js
// 导出一个同样的方法名，里面 return 一个 promise 
export const fetchData = () => {
  return new Promise((resolve, reject) => {
    resolve(`(function(){return '123'})()`)
  })
}
```


`demo.test.js`

```js
import { fetchData } from "./demo";

// 模拟 mock， 上面的import就会自动到 __mock__/demo.js 中寻找是否有 fetchData，有替换，没有测试用例就会报出找不到该方法
// jest.mock('./demo')。也可以在 jest.config.js 中的 automock: true ，将其打开，这样就是全局开启
jest.mock('./demo')

// 与上面对应的，就是不模拟 mock
jest.unmock('./demo')

// 当遇到同一个文件中，既有需要mock,又有不需要mock的方法时
// 可以把引入的方式 import { xxx } from './demo' 改成 const { funcName } = jest.requireActual('./demo')引入
// 这样 jest 就会去找真正的 demo.js 文件中的方法，而不会在去找 __mocks__ 下的模拟方法

test('test fetchData', async () => {
  const data = await fetchData()
  expect(eval(data)).toEqual('123')
})
```

<br/>
<br/>
<br/>

## timer 测试
`demo.js`

```js
export default cb => {
  setTimeout(() => {
    cb && cb()
  }, 3000)
}
```

`demo.test.js`

```js
import timer from './demo'

/* ****************** test1 ****************** */

// 可以使用 deno 来测试 timer 进行测试，但是如果是要等待 100000s 呢，当前的方法就不在适用了
test('test timer', (deno) => {
  timer(() => {
    expect(1).toBe(1)
    deno()
  })
})

/* ****************** test2 ****************** */
// 可以使用 mock，来模拟测试用例中的 setTimeout，setInterval 的异步 timer
jest.useFakeTimers();

test('test timer', () => {
  const fn = jest.fn()
  timer(fn)
  // 可以通过 .runAllTimers() 让 timer 立即执行
  jest.runAllTimers()
  expect(fn).toHaveBeenCalledTimes(1)
})

/* ****************** test3 ****************** */
jest.useFakeTimers();

test('test timer', () => {
  const fn = jest.fn()
  timer(fn)
  // 只运行当前队列中的timer，而不会去测试还未创建的timer
  jest.runOnlyPendingTimers()
  expect(fn).toHaveBeenCalledTimes(1)
})

/* ****************** test4 ****************** */
jest.useFakeTimers();

test('test timer', () => {
  const fn = jest.fn()
  timer(fn)

  // 快进时间 3 s
  jest.advanceTimersByTime(3000)
  // fn 被执行一次
  expect(fn).toHaveBeenCalledTimes(1)
  // 基于上面的时间，加上当次时间，也就是快进 6s 后
  jest.advanceTimersByTime(3000)
  // fn 被执行两次
  expect(fn).toHaveBeenCalledTimes(2)

  // 可以看见，如果有两个 test() , 他们相互之间会互相影响，我们可以用之前的 beforeEach(() => { jest.useFakeTimers() }) 来重置每个 test() 中的 timer。
})
```
