## 时间复杂度是什么？

> 一个函数，用大 O 表示，比如 `O(1)`、`O(n)`、`O(logN)` ......，定性描述该算法的运行时间

![algorithm](./images/algorithm.png)

<br/>

- `O(1)`: 每次执行时，这两行代码永远只会执行一次，它里面没有任何循环
  ```javascript
  let i = 0
  i += 1
  ```

- `O(n)`: for 循环中的代码 `console.log(i)` 执行了 `n` 次。
  ```javascript
  for (let i = 0; i < n; i += 1) {
    console.log(i)
  }

  // O(1) + O(n) = O(n): 计算复杂度时，如果两个时间复杂度先后排列，就相加，且取增长趋势更快的复杂度。忽略增长趋势小的
  let i = 0
  i += 1;
  for (let j = 0; j < n; j += 1) {
    console.log(j)
  }
  ```

- `O(n) * O(n) = O(n^2)`: 两个 for 循环嵌套，那么需要将它们两个相乘
  ```javascript
    for(let i = 0; i < n; i+=1) {
      for(let j = 0; j < n; j++) {
        console.log(i, j);
      }
    }
  ```

- `O(logN)`: 就是以 `2` 为底的 `logN`，`log` 函数就是用来求 `2` 的多少次方为 `n`
  ```javascript
  let i = 1;
  while (i < n) {
    console.log(i)
    i *= 2;
  }
  ```

<br/>
<br/>
<br/>

## 空间复杂度是什么？


> 一个函数，用大 `O` 表示、比如 `O(1)`、`O(n)`、`O(n^2)` ......，算法在运行过程中临时占用存储空间大小的量度

- `O(1)`: 只生成了一个变量，单个变量所用的内存永远是 `1`，是恒定的内存
  ```javascript
  let i = 0;
  i += 1;
  ```

- `O(n)`: list 数组内有 `n` 个内存单元的值
  ```javascript
  const list = [];
  for(let i = 0; i < n; i++) {
    list.push(i)
  }
  ```

- `O(n^2)`: 其实就是一个矩阵，它就是一个二维数组
  ```javascript
  const matrix = []
  for(let i = 0; i < n; i++) {
    matrix.push([])
    for(let j = 0; j < n; j++) {
      matrix[i].push(j)
    }
  }
  ```
