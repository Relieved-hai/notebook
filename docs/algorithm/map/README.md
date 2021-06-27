## 字典是什么？

- 与集合类似，字典也是一种存储唯一值的数据结构，但它是以 **键值对** 的形式来存储。
- ES6 中有字典，名为 `Map`。
- 字典的常用操作：键值对的增删改查。

<br/>
<br/>
<br/>

## Coding Part

```javascript
const m = new Map()


// 增
m.set('key', 'value')


// 删 单个、全部
m.delete('key')
m.clear()


// 改
m.set('key', 'value')


// 查
m.get('key')
```

<br/>
<br/>
<br/>

## [两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

**思路**

- 求 nums1 和 nums2 都有的值。
- 用字典建立一个映射关系，记录 nums1 里面的值。
- 遍历 nums2，找出 nums1 里也有的值。


**步骤**

- 新建一个字典，遍历 nums1，填充字典。
- 遍历 nums2，遇到字典里的值就选出，并从字典中删除。

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 *
 *  时间复杂度：O(m + n) 两个循环前后执行，分别为 O(m)、O(n)
 *  空间复杂度：O(m) 这个算法的输入输出都是数组，但是都不能计算在空间复杂度内，空间复杂度时指临时变量的内存消耗，这里的临时变量是一个 Map，虽然不是矩阵、数组，但是它存储的值可能是线性增长的，所以最坏的情况下，它可能会存储 nums1 个变量，也就是 O(m)
 */
var intersection = function (nums1, nums2) {
  const map = new Map()
  nums1.forEach(n => {
    map.set(n, true)
  })

  const res = []
  nums2.map(n => {
    if (map.has(n)) {
      res.push(n)
      map.delete(n)
    }
  })

  return res
};
```

<br/>
<br/>
<br/>

## [有效的括号](https://leetcode-cn.com/problems/valid-parentheses/)

之前用栈来解决过这个算法，但是效率不高。这里再次进行优化

```javascript
/**
 * @param {string} s
 * @return {boolean}
 *
 *  时间复杂度：O(n) - 只有一个 for，里面没有 for 了，且里面的操作都是 O(1) 的复杂度，如 push() pop()
 *  空间复杂度：O(n) - 新建了一个临时变量 stack，在极端的情况下，s 可能都是左括号，那么 stack 的长度就是字符串的长度，也就是 n。
 *                   虽然多了一个 Map，但它是一个常量级的，O(1) 的一个复杂度，它不会随着某个变量的增加而增加，它的长度永远都是 3，所以它并不会改变当前的空间复杂度
 */
var isValid = function (s) {
  if (s.length % 2 === 1) return false

  const stack = []
  const map = new Map()

  map
    .set('(', ')')
    .set('{', '}')
    .set('[', ']')

  for (let i = 0; i < s.length; i++) {
    const c = s[i]

    if (map.has(c)) {
      stack.push(c)
    } else {
      const t = stack[stack.length - 1]

      if (map.get(t) === c) {
        stack.pop()
      } else {
        return false
      }
    }
  }

  return stack.length === 0
  };
```

<br/>
<br/>
<br/>

## [两数之和](https://leetcode-cn.com/problems/two-sum/)

**思路**

- 把 nums 想象成相亲者
- 把 target 想象成匹配条件
- 用字典建立一个婚姻介绍所，存储相亲者的数字和下标

```javascript
// 给定 nums = [2, 7, 11, 15], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]
```

**步骤**

- 新建一个字典作为婚姻介绍所。
- nums 里的值，逐个来介绍所找对象，没有合适的就先登记着，有合适的就牵手成功。

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 *
 *  时间复杂度：O(n) - 一个 for
 *  空间复杂度：O(n) - 建立了一个额外的 Map 对象，如果 nums 最够大，这个 Map 也可能存更多的值，它是一个线性增长的
 */
var twoSum = function (nums, target) {
  const map = new Map()

  for (let i = 0; i < nums.length; i++) {
    const n = nums[i]
    const n2 = target - n

    if (map.has(n2)) {
      return [map.get(n2), i]
    } else {
      map.set(n, i)
    }
  }
};
```
<br/>
<br/>
<br/>

## [无重复字符的最长子串](https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/)

**思路**

- 先找出所有的不包含重复字符的子串。
- 找出长度最大的那个子串，返回其长度即可。

```javascript
// 输入： 'abcabcbb'

// 输出：3
```

**步骤**

- 用双指针维护一个滑动窗口，用来剪切子串。
- 不断移动右指针，遇到重复字符，就把左指针移动到重复字符的下一位。
- 过程中，记录所有窗口的长度，并返回最大值。

```javascript
/**
 * @param {string} s
 * @return {number}
 *
 *  时间复杂度：O(n)
 *  空间复杂度：O(m) - m 是字符串中不重复字符的个数
 */
var lengthOfLongestSubstring = function (s) {
  let l = 0;                                   // 左指针
  let maxLen = 0;                              // 当前子串最大长度
  const map = new Map()

  for (let r = 0; r < s.length; r++) {         // 右指针
    if (map.has(s[r]) && map.get(s[r]) >= l) { // 字典中是否有一样的 && 重复字符的下标，必须要在当前窗口内，也就是要大于左指针
      l = map.get(s[r]) + 1                    // 移动左指针
    }

    maxLen = Math.max(maxLen, r - l + 1)

    map.set(s[r], r)                           // 当前的字符，已经下标
  }

  return maxLen
};
```

<br/>
<br/>
<br/>

## [最小覆盖子串](https://leetcode-cn.com/problems/minimum-window-substring/)

**思路**

- 先找出所有的包含 T 的子串
- 找出长度最小的那个子串，返回即可

```javascript
// 输入：s = "ADOBECODEBANC", t = "ABC"

// 输出："BANC"
```

**步骤**

- 用双指针维护一个滑动窗口
- 移动右指针，找到包含 T 的子串，移动左指针，尽量减少包含 T 的子串的长度
- 循环上述过程，找出包含 T 的最小子串

```javascript
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 *
 *  时间复杂度：O(m+n) - forof O(m)( m = t.length )。下面两个 while ，它们就仅仅是在不断移动右指针和左指针，它们基本上都是移动了 n 次，O(n)( n = s.length )
 *  空间复杂度：O(m)   - 一个字典 ( m = t.length )，在最坏的情况下，m 可能等于 s.length
 */
var minWindow = function (s, t) {
  let l = 0;                                                        // 左指针
  let r = 0;                                                        // 右指针
  const need = new Map()                                            // 子串需要的字符，以及个数

  for (const c of t) {
    need.set(c, need.has(c) ? need.get(c) + 1 : 1)                  // need.set("字符", "个数")
  }

  let needTypeNum = need.size;                                      // 需要多少种类型的字符
  let minStr = ''                                                   // 最小子串

  while (r < s.length) {
    const c = s[r]                                                  // 右指针的字符
    if (need.has(c)) {                                              // 字符在需求里面
      need.set(c, need.get(c) - 1)                                  // 符合一个，减一
      if (need.get(c) === 0) needTypeNum -= 1                       // 当一种字符都符合了，那么类型总数减一
    }

    while (needTypeNum === 0) {                                     // 当前已经满足需求了，那么就移动左指针，缩小范围
      const newStr = s.substring(l, r + 1)                          // 满足要求的子串
      if (!minStr || newStr.length < minStr.length) minStr = newStr // 记录当前最小长度的字符
      const c2 = s[l]                                               // 左指针的字符
      if (need.has(c2)) {                                           // 如果符合需求中的字符，说明，它将被移出
        need.set(c2, need.get(c2) + 1)                              // 被移出，加一
        if (need.get(c2) === 1) needTypeNum += 1                    // 被移出，那么类型总数加一
      }
      l += 1;
    }
    r += 1
  }

  return minStr
};
```



























