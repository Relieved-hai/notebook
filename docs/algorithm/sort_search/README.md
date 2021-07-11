## 排序和搜索是什么？

- 排序：把某个乱序的数组变成升序或降序的数组
- 搜索：找出数组中某个元素的下标

<br/>

### 排序算法 ( [排序动画](https://visualgo.net/zh/sorting) )

- 冒泡排序
- 选择排序
- 插入排序
- 归并排序
- 快速排序
- ...

<br/>

### 搜索算法

- 顺序搜索
- 二分搜索
- ...

<br/>
<br/>
<br/>

## 冒泡排序

**思路**

- 比较所有相邻元素，如果第一个比第二个大，则交换它们
- 一轮下来，可以保证最后一个数是最大的
- 执行 n - 1 轮，就可以完成排序

```javascript
/**
 * 性能不太好的一个算法之一，几乎不会用到
 *  时间复杂度：O(n^2) => 两个嵌套循环
 */
Array.prototype.bubbleSort = function () {
  let stop // stop 标识符，表示没有发生任何的元素交换

  for (let i = 0; i < this.length - 1; i++) {
    stop = true

    for (let j = 0; j < this.length - 1 - i; j++) { // 区间逐渐变小
      if (this[j] > this[j + 1]) {
        const temp = this[j]
        this[j] = this[j + 1]
        this[j + 1] = temp
        stop = false
      }
    }

    if (stop) break
  }
}

const arr = [5, 1, 2, 3, 4]

arr.bubbleSort()
```

<br/>
<br/>
<br/>

## 选择排序

- 找到数组中的最小值，选中它并将其放置在第一位
- 接着找到第二小的值，选中它并将其放置在第二位
- 以此类型，执行 n - 1 轮

```javascript
/**
 * 性能不太好的一个算法之一，几乎不会用到
 *  时间复杂度：O(n^2) => 两个嵌套循环
 */
Array.prototype.selectionSort = function () {
  console.time('---')
  for (let i = 0; i < this.length - 1; i++) {
    let indexMin = i

    for (let j = i; j < this.length; j++) {
      if (this[j] < this[indexMin]) {
        indexMin = j
      }
    }

    if (indexMin !== i) {
      const temp = this[i]
      this[i] = this[indexMin]
      this[indexMin] = temp
    }
  }
  console.timeEnd('---')
}

const arr = [5, 1, 2, 3, 4]

arr.bubbleSort()
```

<br/>
<br/>
<br/>

## 插入排序

- 从第二个数开始 **往前比**
- 比它大就 **往后排**
- 以此类推进行到最后一个数

```javascript
/**
 *  时间复杂度：O(n^2) => 两个嵌套循环
 */
Array.prototype.insertionSort = function () {
  for (let i = 1; i < this.length; i++) {
    const temp = this[i]
    let j = i

    while (j > 0) {
      if (this[j - 1] > temp) {
        this[j] = this[j - 1]
      } else {
        break
      }
      j--
    }

    this[j] = temp
  }

  // for (let i = 1; i < arr.length; i++) {
  //   for (let j = 0; j < i; j++) {
  //     if (arr[j] > arr[i]) {
  //       arr.splice(j, 0, arr[i])
  //       arr.splice(i + 1, 1)
  //       break
  //     }
  //   }
  // }
}

const arr = [5, 4, 3, 4, 1]

arr.insertionSort()
```

<br/>
<br/>
<br/>

## 归并排序

- 分：把数组劈成两半，再递归地对子数组进行 "分" 操作，直到分成一个个单独的数。
- 合：把两个数合并为有序数组，再对有序数组进行合并，直到全部子数组合并为一个完整数组。
  - 合并两个有序数组？
    - 新建一个空数组 res，用于存放最终排序后的数组
    - 比较两个有序数组的头部，较小者出队并推入 res 中
    - 如果两个数组还有值，就重复第二步

```javascript
/**
 * 比前面的性能都好，是可以运用到实际工作中的
 *  时间复杂度：O(n * logN) => 分、合嵌套循环
 *              分：O(logN)，每次都将数组劈成两半，一共劈了 logN 次（ log 函数用于求 2 的多少次方等于 N ），想求一个数组劈了多少次才能是 N 个数字，自然就是 logN 次。基本上二分的，都是 logN
 *              合：O(n)，while
 */
Array.prototype.mergeSort = function () {
  const rec = (arr) => {
    if (arr.length === 1) return arr

    const mid = Math.floor(arr.length / 2)
    const left = arr.slice(0, mid)
    const right = arr.slice(mid, arr.length)

    const orderLeft = rec(left)
    const orderRight = rec(right)
    const res = []

    while (orderLeft.length || orderRight.length) {
      if (orderLeft.length && orderRight.length) {
        res.push(orderLeft[0] < orderRight[0] ? orderLeft.shift() : orderRight.shift())
      } else if (orderLeft.length) {
        res.push(orderLeft.shift())
      } else if (orderRight.length) {
        res.push(orderRight.shift())
      }
    }

    return res
  }
  const res = rec(this)
  res.forEach((n,i) => this[i] = n)
}

const arr = [5, 4, 3, 4, 1]

arr.mergeSort()
```

<br/>
<br/>
<br/>

## 快速排序

- 分区：从数组中任意选择一个 "基准"，所有比基准小的元素放在基准前面，比基准大的元素放在基准的后面
- 递归：递归地对基准前后的子数组进行分区

```javascript
/**
 * 比冒泡、选择、插入的性能都好，是可以运用到实际工作中的
 *  时间复杂度：O(n * logN) => 嵌套循环
 *                           递归的时间复杂度是 O(logN)
 *                           分区操作的时间复杂度时 O(n)
 *
 */
Array.prototype.quickSort = function () {
  const rec = (arr) => {
    if (arr.length <= 1) return arr

    const left = []
    const right = []
    const mid = arr[0];   // 基准位置

    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < mid) {
        left.push(arr[i])
      } else {
        right.push(arr[i])
      }
    }

    return [...rec(left), mid, ...rec(right)]
  }

  const res = rec(this)
  res.forEach((n, i) => {
    this[i] = n
  })
}
```

<br/>
<br/>
<br/>

## 顺序搜索

- 遍历数组
- 找到跟目标值相等的元素，就返回它的下标
- 遍历结束后，如果没有搜索到目标值，就返回 -1

```javascript
/**
 * 非常低效
 *  时间复杂度：O(n)
 */
Array.prototype.sequentialSearch = function (item) {
  for (let i = 0; i < this.length; i++) {
    if (this[i] === item) {
      return i
    }
  }

  return -1
}


const arr = [2, 4, 5, 3, 1]

arr.sequentialSearch(3)
```

<br/>
<br/>
<br/>

## 二分搜索

- 必须是升序有序数组
- 从数组的中间元素开始，如果中间元素正好是目标值，则搜索结束
- 如果目标值大于或小于中间元素，则在大于或小于中间元素的那一半数组中搜索

```javascript
/**
 * 比顺序搜索高效
 *  时间复杂度：O(logN) => 每一次比较都使搜索范围缩小一半
 */
Array.prototype.binarySearch = function (item) {
  let low = 0                // 最小下标
  let high = this.length - 1 // 最大下标

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    const element = this[mid]

    if (element < item) {
      low = mid + 1
    } else if (element > item) {
      high = mid - 1
    } else {
      return mid
    }
  }

  return -1
}

const arr = [1, 2, 3, 4, 5]

arr.binarySearch(4)
```

<br/>
<br/>
<br/>

## [合并两个有序链表](https://leetcode-cn.com/problems/merge-two-sorted-lists/)

**思路**

- 与归并排序中的合并两个有序数组很相似
- 将数组替换成链表就能解此题

**步骤**

- 新建一个链表，作为返回结果
- 用指针遍历两个有序链表，并比较两个链表的当前节点，较小者先接入新链表，并将指针后移一步
- 链表遍历结束，返回新链表

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 *
 *  时间复杂度：O(m + n) => m 是 l1 长度，n 是 l2 长度
 *  空间复杂度：O(1) => 常量级的指针
 */
var mergeTwoLists = function (l1, l2) {
  const res = new ListNode(0)

  let p = res
  let p1 = l1
  let p2 = l2

  while (p1 && p2) {
    if (p1.val < p2.val) {
      p.next = p1
      p1 = p1.next
    } else {
      p.next = p2
      p2 = p2.next
    }

    p = p.next
  }

  if (p1) p.next = p1

  if (p2) p.next = p2

  return res.next
};
```

<br/>
<br/>
<br/>

## [猜数字大小](https://leetcode-cn.com/problems/guess-number-higher-or-lower/)

**思路**

- 二分搜索
- 调用 guess 函数，判断中间元素是否是目标值

**步骤**

- 从数组的中间元素开始，如果中间元素正好是目标值，则搜索过程结束
- 如果目标值大于或者小于中间元素，则在数组大于或小于中间元素的那一半中查找

```javascript
/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return              -1 if num is lower than the guess number
 *                   1 if num is higher than the guess number
 *                       otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 *
 *  时间复杂度：O(logN) => 每次搜索范围都会小一半
 *  空间复杂度：O(1) => 没有线性增长的变量
 */
var guessNumber = function (n) {
  let low = 1
  let higt = n

  while (low <= higt) {
    const mid = Math.floor((low + higt) / 2)
    const res = guess(mid)

    switch (res) {
      case 0:
        return mid;
      case 1:
        low = mid + 1
        break
      case -1:
        higt = mid - 1
        break
    }
  }
};
```

<br/>
<br/>
<br/>
