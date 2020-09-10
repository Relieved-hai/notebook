## Snapshot

快照测试第一次运行的时候会将`被测试ui组件、配置文件 config.js 等`类似的文件，在不同情况下的 `渲染结果，运行结果` 保存一份快照文件。后面每次再运行快照测试时，都会和第一次的比较。

<br/>
<br/>

`config.js`

```js
// 模拟一些配置文件
export const config2 = () => {
  return {
    server: 'http://localhost',
    port: 8080,
    desc: 'xxx'
  }
}
export const config2 = () => {
  return {
    server: 'http://localhost',
    port: 8081,
    desc: 'xxx',
    time: new Date()
  }
}
```

<br/>
<br/>

`config.test.js`
```js
import { config1, config2 } from "./demo";

test('test config1', () => {
  // .toMatchSnapshot 来进行快照测试
  // 1. 第一次运行时，测试用例都会通过，将进运行结果放在一个 .snap 文件中保存，并放置在所配置的目录下
  // 2. 以后的每一次，都会将此次的结果与上一次的快照文件进行对比，一旦不会，测试将不通过
  // 3. 通过 npm jest --watchAll 进行测试，如果匹配不上了，它会提示你，可以通过 u 来进行更新快照
  // 4. 如果有两个的话，可以通过 i 对每一个快照进行单独的 u 更新
  expect(config1()).toMatchSnapshot()
})

test('test config2', () => {
  expect(config2()).toMatchSnapshot({
    // 因为 config2 中有个属性值是 Date 类型，每次都会不一样，可以通过 .any(Date) 来让测试通过
    time: expect.any(Date)
  })
})
```
