> forEach、filter、map、some、every、find、findIndex、reduce 间的区别?

从最开始学的for循环遍历方法，到后来层出不穷的各种遍历方法，其实最大的区别就是应用场景的不同。 我们最需要记住的就是，什么情况下用哪一种方法比较合适。

![合适的遍历方法](https://image-static.segmentfault.com/325/169/3251698697-5caddf0759259_articlex)

这里有一堆土豆，如果换成代码，可以表示如下：
``` js
var potatos = [{ id: '1001', weight: 50 },
{ id: '1002', weight: 80 },
{ id: '1003', weight: 120 },
{ id: '1004', weight: 40 },
{ id: '1005', weight: 110 },
{ id: '1006', weight: 60 }]
```

同时把上面的重量（g）记录成一个数组
``` js
var w = [50, 80, 120, 40, 110, 60]
```

## forEach
::: tip
农民：我要催熟（批量操作）
:::

我们希望把这一批土豆全部催熟一下，进行增重 可以用到 `forEach` 方法

``` js
potatos.forEach(potato =>  potato.weight += 20 )
```

当然，`map` 也跳出来了：我也可以！

``` js
potatos.map(potato => potato.weight += 20 )
```

不过虽然 `map` 也能批量操作，但从语义上来说用 `forEach` 方法更合适


## map
::: tip
农场主：给我一份整理好的重量表格
:::

`map` 最适合做的事是映射，生成原始数据的特征信息的 `map`

相比较之下，`forEach` 是没有返回值的, 即便加上 `return` 也没有用

``` js
 w = potatos.forEach(potato => { return potato.weight += 20 })
//undefined
```

而 `map` 有返回值，可以把土豆的重量统计汇总，整理出一份表格
``` js
w = potatos.map(potato => { return potato.weight += 20 })
//[ 70, 100, 140, 60, 130, 80 ]
```

## filter
::: tip
老板：我只要大土豆（筛选过滤）
:::

`filter` 是滤波的意思 从名字上看，就知道筛选过滤这样的活是 `filter` 来干的

``` js
var bigOnes = potatos.filter(potato => { return potato.weight > 100 })

//[ { id: '1003', weight: 120 }, { id: '1005', weight: 110 } ]
```

返回一个新的对象数组，并不会改变原数组


## some
::: tip
商贩：你这有没有大的啊（有符合）
:::

旁边的小商贩嘲笑我们说，我们这都是小土豆，不中用的 那不得找一个巨无霸给他看看

当只需要判断数组中有没有符合条件的时候（一个就行） 就需要我们的 `some` 方法登场了

``` js
var hasbig = potatos.some(potato => { return potato.weight > 100 })

//true
```
我们的 `some` 小伙计，去土豆存放的仓库进行寻找，只要找到一个符合条件的，就回来报告 true 所以并不会全部遍历，不做多余的活（性能优良）

## every

::: tip
商贩：难道全都是大的吗（全符合）
:::

小商贩不服了，我不信你这全是大的 派了个 `every` 小伙计去检查
``` js
var allbig = potatos.every(potato => { return potato.weight > 100 })

//false
```
`every` 对每一个元素执行一个 callback，直到它找到一个使 callback 返回 false的元素（没那么大的土豆），就返回false，直到遍历完成也没有返回false的话，就返回true

## find

:::tip
顾客：给我个大土豆（返回一个符合的）
:::

来了一个顾客，想要一个大土豆 `find` 自告奋勇，我去找给他

```js
var big = potatos.find(potato => { return potato.weight > 100 })

//{ id: '1003', weight: 120 }
```

`find` 和 `some` 很类似，都是寻找符合条件的，有一个就可以
不过 `some` 进去搜罗了一圈回来报了个“有”（true），而find则把那个土豆抱了出来（返回第一个符合条件的对象）

## findIndex

::: tip
收银员：这土豆是仓库的第几个来着（返回序号）
:::

收银员卖完准备记录一下

“哎，这土豆是仓库的第几个？” `find` 说：“哎呀我光顾着抱土豆了，没看是第几个”

“你这粗心鬼，早知道让 `findIndex` 跟你一起去了”

```js
var i = potatos.findIndex(potato=>{ return potato.weight > 100 })

//2
```
当需要知道所需元素的索引，就可以用 `findIndex`

`findIndex` 返回第一个符合条件的索引号

## reduce

::: tip
老板：今年收成如何呀（递归累加）
:::

说起来还不知道今年收成到底怎么样呢 谁数学好 把表格上那些土豆重量加一加

`reduce` 说：那不得我来么
```js
var sum = weight.reduce((sum, w) => { return w + sum },0)

//460
//并不会改变原表格
```

reduce 可以代替 map 和 filter

> reduce()方法接收一个回调函数作为第一个参数，回调函数又接受四个参数，分别是；

> 1、previousValue =>初始值或上一次回调函数叠加的值；

> 2、currentValue => 本次回调（循环）将要执行的值；

> 3、index=>“currentValue”的索引值；

> 4、arr => 数组本身；

> reduce()方法返回的是最后一次调用回调函数的返回值；


也可以这样
```js
  var sum = potatos.reduce((sum, p) => { return p.weight + sum }, 0)
  
  //460
```

`reduce` 能力其实不止于此，这里知道基本用法即可。

