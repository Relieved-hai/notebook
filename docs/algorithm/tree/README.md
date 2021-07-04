## 树是什么？

- 一种分层数据的抽象模型
- 前端工作中常见的数包括：DOM 数、级联选择、树形控件、......
- JS 中没有树，但是可以用 Object 和 Array 构建树
- 树的常用操作：深度/广度优先遍历、先中后序遍历

<br/>
<br/>
<br/>

## 什么是深度/广度优先遍历

- **深度优先遍历**：尽可能深的搜索树的分支。

  ![](./images/tree-01.png)

- **广度优先遍历**：先访问离根节点最近的节点。

  ![](./images/tree-02.png)

<br/>
<br/>
<br/>

## 深度优先遍历

- 访问根节点
- 对根节点的 children 挨个进行深度优先遍历

```javascript
const tree = {
  val: 'a',
  children: [
    {
      val: 'b',
      children: [
        { val: 'd', children: [] },
        { val: 'e', children: [] }
      ]
    },
    {
      val: 'c',
      children: [
        { val: 'f', children: [] },
        { val: 'g', children: [] }
      ]
    }
  ]
}

const dfs = root => {
  console.log(root.val);
  root.children.forEach(dfs)
}

dfs(tree)
```

<br/>
<br/>
<br/>

## 广度优先遍历

- 新建一个队列，把根节点入队
- 把对头出队并访问
- 把对头的 children 挨个入队
- 重复第二、三步，直到队列为空

```javascript
const tree = {
  val: 'a',
  children: [
    {
      val: 'b',
      children: [
        { val: 'd', children: [] },
        { val: 'e', children: [] }
      ]
    },
    {
      val: 'c',
      children: [
        { val: 'f', children: [] },
        { val: 'g', children: [] }
      ]
    }
  ]
}

const bfs = root => {
  const queue = [root]

  while (queue.length > 0) {
    const n = queue.shift()
    console.log(n.val);
    n.children.forEach(child => {
      queue.push(child)
    })
  }
}

bfs(tree)
```

<br/>
<br/>
<br/>

## 二叉树是什么？

树也有多种，前面讲的是多叉树

- 树中每个节点最多只能有两个子节点
- 在 JS 中通常用 Object 来模拟二叉树

<br/>
<br/>
<br/>

## 二叉树的先中后序遍历

![](./images/tree.png)

简单来说，对于上图正常的一个满节点

- **前序遍历**：A：根节点、B：左节点、C：右节点（根节点排最先，然后同级先左后右）
- **中序遍历**：B：左节点、A：根节点、C：右节点（先左后根最后右）
- **后序遍历**：B：左节点、C：右节点、A：根节点（先左后右最后根）

<br/>
<br/>
<br/>

## 先序遍历

- 访问 **根** 节点
- 对根节点的 **左** 子树进行先序遍历
- 对根节点的 **右** 子树进行先序遍历

![](./images/tree-03.png)

<br/>

### bt.js
```javascript
export default {
  val: 1,
  left: {
    val: 2,
    left: { val: 4, left: null, right: null },
    right: { val: 5, left: null, right: null },
  },
  right: {
    val: 3,
    left: { val: 6, left: null, right: null },
    right: { val: 7, left: null, right: null },
  },
}
```

<br/>

[import bt from './bt.js](/algorithm/tree/#bt-js)

```javascript
import bt from './bt.js'

const preorder = (root) => {
  if (!root) return

  console.log(root.val);

  preorder(root.left)
  preorder(root.right)
}

preorder(bt)
```

<br/>
<br/>
<br/>

## 中序遍历

- 对根节点的 **左** 子树进行中序遍历
- 访问 **根** 节点
- 对根节点的 **右** 子树进行中序遍历

![](./images/tree-04.png)

[import bt from './bt.js](/algorithm/tree/#bt-js)

```javascript
import bt from './bt.js'

const inorder = (root) => {
  if (!root) return

  inorder(root.left)
  console.log(root.val);
  inorder(root.right)
}

inorder(bt)
```

<br/>
<br/>
<br/>

## 后序遍历

- 对根节点的 **左** 子树进行后序遍历
- 对根节点的 **右** 子树进行后序遍历
- 访问 **根** 节点

![](./images/tree-05.png)

[import bt from './bt.js](/algorithm/tree/#bt-js)

```javascript
import bt from './bt.js'

const postorder = (root) => {
  if (!root) return

  postorder(root.left)
  postorder(root.right)
  console.log(root.val);
}

postorder(bt)
```

<br/>
<br/>
<br/>

## 二叉树的先中后序遍历（非递归版）

## 先序遍历

[import bt from './bt.js](/algorithm/tree/#bt-js)

```javascript
import bt from './bt.js'

const preorder = (root) => {
  if (!root) return

  const stack = [root]

  while (stack.length) {
    const n = stack.pop()

    console.log(n.val);

    if (n.right) stack.push(n.right)
    if (n.left) stack.push(n.left)
  }
}

preorder(bt)
```

<br/>
<br/>
<br/>

## 中序遍历

[import bt from './bt.js](/algorithm/tree/#bt-js)

```javascript
import bt from './bt.js'

const inorder = (root) => {
  if (!root) return

  const stack = [] // 函数调用堆栈
  let p = root     // 指针

  while (stack.length || p) {
    while (p) {
      stack.push(p) // 把左节点推入栈中
      p = p.left    // 移动到下个左节点
    }

    const n = stack.pop() // 栈顶的左节点弹出
    console.log(n.val);
    p = n.right
  }
}

inorder(bt)
```

<br/>
<br/>
<br/>

## 后序遍历

[import bt from './bt.js](/algorithm/tree/#bt-js)

```javascript
import bt from './bt.js'

const postorder = (root) => {
  if (!root) return

  const stack = [root]
  const outputStack = []

  while (stack.length) {
    const n = stack.pop()
    outputStack.push(n)
    if (n.left) stack.push(n.left)
    if (n.right) stack.push(n.right)
  }

  while (outputStack.length) {
    const n = outputStack.pop()
    console.log(n.val);
  }
}

postorder(bt)
```

<br/>
<br/>
<br/>

## [二叉树的最大深度](https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/)

**思路**

- 求最大深度，考虑使用深度优先遍历
- 在深度优先遍历过程中，记录每个节点所在的层级，找出最大的层级即可

![](./images/tree-06.png)

**步骤**

- 新建一个变量，记录最大深度
- 深度优先遍历整棵树，并记录每个节点的层级，同时不断刷新最大深度这个变量。
- 遍历结束返回最大深度这个变量

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 *
 *  时间复杂度：O(n) - 这里把整棵树都循环了一次，所以 n 整棵树的节点数
 *  空间复杂度：O(n) - 没有数组、矩阵，但是我们这个算法有一个隐性的栈结构，对于函数调用函数，它会形成一个函数调用堆栈
 *                   在函数没有执行完，我们这个变量是不能释放的，都是存在内存中，都应该被算为空间复杂度的一部分
 *                   其实我们只要知道 dfs 嵌套了多少层，嵌套的层数就是二叉树的最大深度，那么二叉树的最大深度和节点数之间的关系是如何的呢
 *                   最坏的情况下，节点数是等于最大深度的，它是 O(n)
 *                   最好的情况下，它们是均匀分布的，它是 O(log^n)
 */
var maxDepth = function (root) {
  let res = 0
  const dfs = (n, l) => { // root, 层级
    if (!n) return

    if (!n.left && !n.right) { // 叶子节点
      res = Math.max(res, l)
    }

    dfs(n.left, l + 1)
    dfs(n.right, l + 1)
  }
  dfs(root, 1)

  return res
};
```

<br/>
<br/>
<br/>

## [二叉树的最小深度](https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/)

**思路**

- 求最小深度，考虑使用广度优先遍历
- 在广度优先遍历过程中，遇到叶子节点，停止遍历，返回节点层级。

![](./images/tree-06.png)

**步骤**

- 广度优先遍历整棵树，并记录每个节点的层级
- 遇到叶子节点，返回节点层级，停止遍历

```javascript
/**
 * @param {TreeNode} root
 * @return {number}
 *
 *  时间复杂度：O(n) - 最坏情况下，它还是要遍历每个节点的，n 就是树的节点数量
 *  空间复杂度：O(n) - 一个队列，最坏情况下，也有可能装满数中的节点，n 就是树的节点数量
 */
var minDepth = function (root) {
  if (!root) return 0
  const q = [[root, 1]] // 根节点，层级

  while (q.length) {
    const [n, l] = q.shift()

    if (!n.left && !n.right) return l

    if (n.left) q.push([n.left, l + 1])
    if (n.right) q.push([n.right, l + 1])
  }
};
```

<br/>
<br/>
<br/>

## [二叉树的层序遍历](https://leetcode-cn.com/problems/binary-tree-level-order-traversal/)

**思路**

- 层序遍历顺序就是广度优先遍历
- 不过在遍历时候需要记录当前节点所处的层级，方便将其添加到不同的数组中。

![](./images/tree-07.png)

**步骤**

- 广度优先遍历二叉树
- 遍历过程中，记录每个节点的层级，并将其添加到不同的数组中

优化前

```javascript
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return []
  const q = [[root, 0]]
  const res = []

  while (q.length) {
    const [n, level] = q.shift()

    if (!res[level]) {
      res.push([n.val])
    } else {
      res[level].push(n.val)
    }

    if (n.left) q.push([n.left, level + 1])
    if (n.right) q.push([n.right, level + 1])
  }

  return res
};
```

优化后

```javascript
/**
 * @param {TreeNode} root
 * @return {number[][]}
 *
 *  时间复杂度：O(n) - 它是广度优先遍历，它会遍历每个节点，n 就是这棵树的节点数
 *  空间复杂度：O(n) - 有一个线性增长的 q 数组
 */
var levelOrder = function (root) {
  if (!root) return []
  const q = [root]
  const res = []

  while (q.length) {
    let len = q.length
    res.push([]) // 初始化

    while (len--) {
      const n = q.shift()
      res[res.length - 1].push(n.val)
      if (n.left) q.push(n.left)
      if (n.right) q.push(n.right)
    }
  }

  return res
};
```

<br/>
<br/>
<br/>

## [二叉树的中序遍历](https://leetcode-cn.com/problems/binary-tree-inorder-traversal/)

```javascript
/**
 * @param {TreeNode} root
 * @return {number[]}
 *
 * 递归版
 */
var inorderTraversal = function(root) {
  const res = []

  const rec = (n) => {
    if (!n) return

    rec(n.left)
    res.push(n.val)
    rec(n.right)
  }

  rec(root)
  return res
};


/**
 * @param {TreeNode} root
 * @return {number[]}
 *
 * 非递归版
 *  时间复杂度：O(n) - 中序遍历到了所有的节点，n 就是输的节点数量
 *  空间复杂度：O(n) - 有一个线性增长的栈
 */
var inorderTraversal = function(root) {
  if (!root) return

  const res = []
  const stack = [] // 函数调用堆栈
  let p = root     // 指针

  while (stack.length || p) {
    while (p) {
      stack.push(p)
      p = p.left
    }

    const n = stack.pop()
    res.push(n.val)
    p = n.right
  }
  return res
};
```

<br/>
<br/>
<br/>

## [路径总和](https://leetcode-cn.com/problems/path-sum/)

**思路**

- 在深度优先遍历的过程中，记录当前路径的节点值的和
- 在叶子节点处，判断当前路径的节点值的和是否等于目标值

![](./images/tree-08.jpg)

**步骤**

- 深度优先遍历二叉树，在叶子节点处，判断当前路径的节点值的和是否等于目标值，是就返回 true
- 遍历结束，如果没有匹配，就返回 false

```javascript
/**
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 *
 *  时间复杂度：O(n) - 不管深度，还是广度，都是遍历了所有节点，n 就是树的节点数
 *  空间复杂度：O(n) - 这里有个隐性的递归堆栈，n 就是递归堆栈的高度，也就是树的高度
 *                   极端情况下，等于树的节点数 O(n)
 *                   均匀分布下，高度为 O(logn)
 */
var hasPathSum = function (root, targetSum) {
  if (!root) return false
  let res = false

  const dfs = (n, s) => {
    if (!n.left && !n.r && s === targetSum) {
      res = true
    }
    if (n.left) dfs(n.left, s + n.left.val)
    if (n.right) dfs(n.right, s + n.right.val)
  }

  dfs(root, root.val)

  return res
};
```

<br/>
<br/>
<br/>

## 前端与树：遍历 JSON 的所有节点值

```javascript
const json = {
  a: { b: { c: 1 } },
  d: [1, 2]
}

const dfs = (n, path) => {
  console.log(n, path);

  Object
    .keys(n)
    .forEach(k => {
      dfs(n[k], path.concat(k))
    })
}

dfs(json, [])
```

<br/>
<br/>
<br/>




















