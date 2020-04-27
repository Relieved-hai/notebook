## [Jest Github](https://github.com/facebook/jest)

<br/>

## init

```shell
$ npm init -y

$ npm i jest -D

// 使用 node_modules 依赖下的 jest 命令来初始化一些配置项
$ npx jest --init


// 询问你，当前你是在 node 、浏览器环境下
? Choose the test environment that will be used for testing
> node
  jsdom (browser-like)

// 是否需要测试率报告
？Do you want Jest to add coverage reports? > (y/N) 

// 是否清除测试时的模拟调用和实例
? Automatically clear mock calls and instances between every test? > (y/N)
```

根据自己的需求去配置 jsdom y y，配置好后，目录下会多一个 jest.config.js

最后在 package.json 中，添加
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watchAll", // 文件改动，重新运行
    "coverage": "jest --coverage" // 生成测试覆盖率，也可以直接使用 npx jest --coverage
  }
}
```

当使用 `--watchAll` 后，
```shell
Watch Usage
 › Press f to run only failed tests. // 仅运行失败的测试
 › Press o to only run tests related to changed files. // 仅运行与更改的文件相关的测试，注意，项目需要在 git 管理后，才会起作用，等价于在 package.json scripts 中写 "test:watch": "jest --watch"
 › Press p to filter by a filename regex pattern. // 测试 正则匹配 的文件
 › Press t to filter by a test name regex pattern. // 测试 正则匹配 的测试名用例
 › Press q to quit watch mode. // 退出
 › Press Enter to trigger a test run. // enter 重新测试运行
```

<br/>
<br/>
<br/>

## use

把官网的入门案例走一下

在当前页面创建两个文件
`main.js`

```js
const add = (num1, num2) => {
  return num1 + num2
}

const minus = (num1, num2) => {
  return num1 - num2
}

module.exports = {
  add,
  minus
}
```

`main.test.js`
```js
const { add, minus } = require('./main')

// 测试标题， 测试方法
test('Test add method 3 + 7', () => {
  // 期待 add(3, 7) 的结果是 10
  expect(add(3, 7)).toBe(10)
})

test('Test minus method 3 - 3', () => {
  expect(minus(3, 3)).toBe(0)
})

```

```shell 
$ npm run jest // 会提示你，全部用测试例通过

$ npm run coverage // 可以通过该命令来查看测试报告，同时会在目录下创建一个 coverage 文件夹，里面 lcov-report 文件夹中的 index.html 同样也可以看到测试报告。 文件夹名字可以在 jest.config.js 下修改
```


<br/>
<br/>
<br/>

## babel 

使用 babel 转换，让 ESModule 转成 CommonJs，让代码在 node 环境跑起来。当然使用 CommonJs 、ESModule 都看个人习惯。

```babel
$ npm i @babel/core@7.4.5 @babel/preset-env@7.4.5
```

创建 .babelrc
```json
{
  "presets": [// 需要 babel 使用什么插件集合对代码进行转换
    [
      "@babel/preset-env",
      {// 配置项
        "targets": {
          "node": "current"// 感觉当前的 node 环境需要的情况来使用 @babel/preset-env 进行代码转换
        }
      }
    ]
  ]
}
```

<br/>
<br/>
<br/>

## example
matchers : 匹配器
[jest expect API](https://jestjs.io/docs/en/expect)

```js
/**
* @param { string }    测试用例名
* @param { function }  测试用例
**/
test('test 10 = 10', () => {
  // 期待 10 等于 10 ，这里的 toBe 就是匹配器（matchers）
  expect(10).toBe(10)
})

test('测试对象内容相等', () => {
  const a = { one: 1 }
  expect(a).toEqual({ one: 1 })
})

test('测试是否为null', () => {
  const a = undefined
  expect(a).toBeNull()
})

test('测试是否为undefined', () => {
  const a = undefined
  expect(a).toBeUndefined()
})

test('测试是否定义', () => {
  const a = undefined
  expect(a).toBeDefined()
})

test('测试是否为真', () => {
  const a = 1
  expect(a).toBeTruthy()
})

test('测试是否为假', () => {
  const a = 0
  expect(a).toBeFalsy()
})

test('测试是否 不 为假', () => {
  const a = 0
  expect(a).not.toBeFalsy()
})


test('测试 count 是否比 11 大', () => {
  const count = 10
  expect(count).toBeGreaterThan(11)
})

test('测试 count 是否比 $ 11', () => {
  const count = 10
  expect(count).toBeLessThan(11)
})

test('测试 count 是否大于等于 11', () => {
  const count = 11
  expect(count).toBeGreaterThanOrEqual(11)
})

test('测试 count 是否小于等于 11', () => {
  const count = 10
  expect(count).toBeLessThanOrEqual(11)
})

test('测试 a + b 是否接近 0.3', () => {
  const a = 0.1
  const b = 0.2
  expect(a + b).toBeCloseTo(0.3)
})

test('测试 str 中是否有 $ 字符串', () => {
  const str = 'www.baidu.com'
  expect(str).toMatch('com')
  expect(str).toMatch(/com/)
})


test('测试 arr 中是否包含 $ ', () => {
  const arr1 = ['a', 'b', 'c']
  const arr2 = new Set(['a', 'b', 'c'])
  expect(arr1).toContain('a')
  expect(arr2).toContain('b')
})


const throwNewErrorFunc = () => {
  throw new Error('this is a new error')
}

test('测试 arr 中是否抛异常 ', () => {
  expect(throwNewErrorFunc).toThrow()
  expect(throwNewErrorFunc).not.toThrow()
  expect(throwNewErrorFunc).toThrow('this is a new error')
  expect(throwNewErrorFunc).toThrow(/this is a new error/)
})

```
