## 回溯算法是什么？

- 回溯算法是 **算法设计** 中的一种方法
- 回溯算法是一种 **渐进式** 寻找并构建问题解决方式的策略
- 回溯算法会先从一个可能的动作开始解决问题，如果不行，就回溯并选择另一个动作，直到将问题解决

<br/>

**什么问题适合用回溯算法解决？**

- 有很多路
- 这些路里，有**死路**，也有**出路**
- 通常需要递归来模拟所有的路

全排列

```shell
输入：[1, 2, 3]

输出：[
  [1, 2, 3],
  [1, 3, 2],
  [2, 1, 3],
  [2, 3, 1],
  [3, 1, 2],
  [3, 2, 1],
]
```

- 用递归模拟出所有情况
- 遇到包含重复元素的情况，就回溯
- 收集所有达到递归终点的情况，并返回

<br/>
<br/>
<br/>

## [全排列](https://leetcode-cn.com/problems/permutations/)

**思路**

- 要求：1.所有排列情况；2.没有重复元素
- 很多路，有出路、死路

**步骤**

- 用递归模拟出所有情况
- 遇到包含重复元素的情况，就回溯
- 收集所有到达递归终点的情况，并返回

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 *
 *  时间复杂度：O(n!) => n 的阶乘，n! = 1*2*3*...*(n-1)*n；第一次是 n，第二次是 n-1，第三次 ...，最后到 1。在算法里，只要遇到嵌套，就是它们的 * 乘积
 *                     有多个递归，且每个递归中都有 for 循环， for 循环中又有递归。它嵌套层数是 n，且每次都会减一【 if (path.includes(n)) return 】
 *  空间复杂度：O(n) => 由于输出的是数组，所以不能算临时变量，虽然没有显性的数组，链表之类的，但是有递归堆栈，n 就是递归的深度，也就是 nums.length
 */
var permute = function (nums) {
  const res = []

  const backtrack = (path) => {
    if (path.length === nums.length) { // 回溯终止条件
      res.push(path)
      return
    }

    nums.forEach((n) => {
      if (path.includes(n)) return    // 是否已经存在于路径中
      backtrack(path.concat(n))
    })
  }

  backtrack([])

  return res
};
```

<br/>
<br/>
<br/>

## [子集](https://leetcode-cn.com/problems/subsets/)

**思路**

- 要求：1、所有子集；2、没有重复元素
- 有出路，有死路

**步骤**

- 用递归模拟出所有情况
- 保证接的数字都是后面的数字
- 收集所有到达递归终点的情况，并返回

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 *
 *  时间复杂度：O(2^N) => 因为每个元素都有两种可能（存在或不存在）
 *  空间复杂度：O(n) => 不考虑输出的结果，只考虑中间变量，N 是递归的深度，也就是 nums.length
 */
var subsets = function (nums) {
  const res = []

  const backtrack = (path, l, start) => { // 路径，当前路径长度，开始位置
    if (path.length === l) {              // 到达递归终点的情况
      res.push(path)
      return
    }

    for (let i = start; i < nums.length; i++) {
      backtrack(path.concat(nums[i]), l, i + 1)
    }
  }

  for (let i = 0; i <= nums.length; i++) {
    backtrack([], i, 0)
  }

  return res
};

subsets([1, 2, 3])
```




















