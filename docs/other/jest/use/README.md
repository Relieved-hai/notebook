## 异步函数

`fetch.js` 简单的一个请求方法
```ts
import axios from 'axios'

// 假设请求成功，  data 为 { success： true }
export const fetchData = () => axios.get('http://www.xxx.com/xxx')
```

<br/>



## 测试用例

`fetch.test.js` 

和平时开发一样，同样的测试用例也有很多种的写法。

```js
// 待测试方法
import { fetchData } from "./fetchData";

// 方法一
test('fetchData result is { success: true }', done => {
  fetchData(data => {
    expect(data).toEqual({ success: true })
    done()
  })
})


// 方法二
test('fetchData result is { success: true }', async () => {
  const res = await fetchData()
  expect(res.data).toEqual({
    success: true
  })
})


// 方法三
test('fetchData result is { success: true }', () => {
  return fetchData().then((res) => {
    expect(res.data).toEqual({
      success: false
    })
  })
})


// 方法四
test('fetchData result is 404', () => {
  // expect 必须执行一次
  expect.assertions(1);

  return fetchData().catch((e) => {
    expect(e.toString().indexOf('404') > -1).toBe(true)
  })
})


// 方法五
test('fetchData result is { success: true }', () => {
  // 取到返回数据，里面是否包含
  return expect(fetchData()).resolves.toMatchObject({
    data: {
      success: true
    }
  })
})


// 方法六
test('fetchData result is 404', () => {
  期待结果是报错
  return expect(fetchData()).rejects.toThrow()
})


// 方法七
test('fetchData result is { success: true }', async () => {
  // 取到返回数据，里面是否包含
  await expect(fetchData()).resolves.toMatchObject({
    data: {
      success: true
    }
  })
})


// 方法八
test('fetchData result is 404', async () => {
  // 期待结果是报错
  await expect(fetchData()).rejects.toThrow()
})


// 方法九
test('fetchData result is 404', async () => {
  expect.assertions(1);
  try {
    await fetchData()
  } catch (e) {
    expect(e.toString()).toEqual('Error')
  }
})

// ...
```
