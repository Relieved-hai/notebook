## 贪心算法是什么

- 贪心算法是**算法设计**中的一种方法
- 期盼通过每个阶段的**局部最优**选择，从而达到局部的最优
- 结果并**不一定是最优**

<br/>

**零钱兑换**

```shell
# coins 代表可使用面值的硬币，amount 代表需要兑换的总额
输入：coins = [1, 2, 5], amount = 11

# 需要得出能兑换成总额的最少硬币数量
输出：3

# 如果使用贪心算法，我们就要考虑局部最优选择，既然想用最少的硬币来兑换，那么就优先使用面值最大的硬币，不考虑这种选择是否是全局最优选，但从局部看，它是最有可能得到最优解的
解释：11 = 5 + 5 + 1
```

```shell
输入：coins = [1, 3, 4], amount = 6

输出：3

# 贪心算法来解，优先使用最大面值，最后导致了不是全局最优解
解释：6 = 4 + 1 + 1
```

<br/>
<br/>
<br/>

## [分发饼干](https://leetcode-cn.com/problems/assign-cookies/)

**思路**

- 局部最优：既能满足孩子，还消耗最少
- 先将 "较小的饼干" 分给 "胃口最小" 的孩子

**步骤**

- 对饼干数组和胃口数组升序排序
- 遍历饼干数组，找到能满足第一个孩子的饼干
- 然后继续遍历饼干数组，找到满足第二、三、...、n 个孩子的饼干

```javascript
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 *
 *  时间复杂度：O(n * logN) => sort O(n * logN)，chrome 曾用过快排，firefox 曾用归并。forEach O(n)
 *  空间复杂度：O(1)
 */
var findContentChildren = function (g, s) {
  const sortFun = function (a, b) {
    return a - b
  }
  g.sort(sortFun)
  s.sort(sortFun)

  let i = 0

  s.forEach((n) => {
    if (n >= g[i]) {
      i += 1
    }
  })

  return i
};
```

<br/>
<br/>
<br/>

## [买卖股票的最佳时机 II](https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/)

**思路**

- 前提：上帝视角，知道未来的价格
- 局部最优：见好就收，见差就不动，不做任何长远打算

**步骤**

- 新建一个变量，用来统计总利润
- 遍历价格数组，如果当前价格比昨天高，就在昨天买，今天卖，否则就不交易
- 遍历结束后，返回所有利润之和

```javascript
/**
 * @param {number[]} prices
 * @return {number}
 *
 *  时间复杂度：O(n)
 *  空间复杂度：O(1)
 */
var maxProfit = function (prices) {
  let profit = 0

  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1]
    }
  }

  return profit
};
```
