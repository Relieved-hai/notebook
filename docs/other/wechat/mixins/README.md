在原生开发小程序的过程中，发现有多个页面都使用了几乎完全一样的逻辑。由于小程序官方并没有提供 Mixins 这种代码复用机制，所以只能采用非常不优雅的复制粘贴的方式去“复用”代码。随着功能越来越复杂，靠复制粘贴来维护代码显然不科学，于是便寻思着如何在小程序里面实现 Mixins。

`Component` 中可以使用 `behaviors` 来达到代码复用。`Page` 则不行

<br/>

## code

> 新建一个 mixins.js 文件：

```js
// 保存原生的 Page 函数
const originPage = Page

Page = (options) => {
  const mixins = options.mixins
  // mixins 必须为数组
  if (Array.isArray(mixins)) {
    delete options.mixins
    // mixins 注入并执行相应逻辑
    options = merge(mixins, options)
  }
  // 释放原生 Page 函数
  originPage(options)
}
```

<br/>

>  merge() 函数实现。

```js
// 定义小程序内置的属性/方法
const originProperties = ['data', 'properties', 'options']
const originMethods = ['onLoad', 'onReady', 'onShow', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onShareAppMessage', 'onPageScroll', 'onTabItemTap']

function merge (mixins, options) {
  mixins.forEach((mixin) => {
    if (Object.prototype.toString.call(mixin) !== '[object Object]') {
      throw new Error('mixin 类型必须为对象！')
    }
    // 遍历 mixin 里面的所有属性
    for (let [key, value] of Object.entries(mixin)) {
      if (originProperties.includes(key)) {
        // 内置对象属性混入
        options[key] = { ...value, ...options[key] }
      } else if (originMethods.includes(key)) {
        // 内置方法属性混入，优先执行混入的部分
        const originFunc = options[key]
        options[key] = function (...args) {
          value.call(this, ...args)
          return originFunc && originFunc.call(this, ...args)
        }
      } else {
        // 自定义方法混入
        options = { ...mixin, ...options }
      }
    }
  })
  return options
}
```

<br/>



## use

1.在小程序的 app.js 里引入 mixins.js
```js
require('./mixins.js')
```

2.撰写一个 myMixin.js 
```js
module.exports = {
  data: { someData: 'myMixin' },
  onShow () { console.log('Log from mixin!') }
}
```

3.在 page/index/index.js 中使用 
```js
Page({
  mixins: [require('../../myMixin.js')]
})
```

<br />

> 打印出结果

![log](./log.png)

<br />
<br />
<br />

::: tip
转载至 [jrainlau](
https://jrainlau.github.io/#/article?number=14&title=%E5%9C%A8%E5%B0%8F%E7%A8%8B%E5%BA%8F%E4%B8%AD%E5%AE%9E%E7%8E%B0%20Mixins%20%E6%96%B9%E6%A1%88)
:::
