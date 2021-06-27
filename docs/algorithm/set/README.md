## 集合是什么？

- 一种 **无序且唯一** 的数据结构。
  - 是区别于栈、队列、链表的最大区别
- ES6 中有集合，名为 `Set`
- 集合的常用操作：去重、判断某元素是否在集合中、求交集 .....

<br/>
<br/>
<br/>

## Coding part

```javascript
// 去重
const arr = [1, 1, 2, 2]
const arr2 = [...new Set(arr)]

// 判断元素是否在集合中
const set = new Set(arr)
const has = set.has(1)

// 求交集
const set2 = new Set([2, 3])
const set3 = new Set([...set].filter(i => set2.has(i)))
```

<br/>
<br/>
<br/>

## [两个数组的交集](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

**思路**

- 求交集且无序唯一。

**步骤**

- 用集合对 `nums1` 去重
- 遍历 `nums1`，筛选出 `nums2` 也包含的值

```javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 *
 *  时间复杂度：O(n) O(m) filter * has O(n) = O(m*n)
 *  时间复杂度：O(n) O(m) filter * includes O(n) = O(m*n)
 *  空间复杂度：O(m) [...new Set(nums1)]
 */
var intersection = function(nums1, nums2) {
  return [...new Set(nums1)].filter(n => new Set(nums2).has(n))
  return [...new Set(nums1)].filter(n => nums2.includes(n))
};
```

<br/>
<br/>
<br/>

## Set 操作

- 使用 `Set` 对象：`new`、`add`、`delete`、`has`、`size`
- 迭代 `Set`：多种迭代方法、`Set` 与 `Array` 互转、求交集/差集

```javascript
let mySet = new Set()

const o = { a: 1, b: 2 }

// add
mySet
  .add(1)
  .add(5)
  .add(5)
  .add('some test')
  .add(o)
  .add({ a: 1, b: 2 })

console.log(mySet.size);

// has
console.log(mySet.has(1));
console.log(mySet.has(3));
console.log(mySet.has(o));
console.log(mySet.has({ a: 1, b: 2 }));

// delete
mySet.delete(5)

console.log(mySet.size);

// for
for (const item of mySet) console.log(item)
for (const item of mySet.keys()) console.log(item)
for (const item of mySet.values()) console.log(item)
for (const [key, value] of mySet.entries()) console.log(key, value)

// set => array
const myArr = [...mySet]
const myArr1 = Array.from(mySet)

// array => set
const mySet2 = new Set([1])

// 交集
const intersection = new Set([...mySet].filter(x => mySet2.has(x)))

// 差集
const difference = new Set([...mySet].filter(x => !mySet2.has(x)))
```












