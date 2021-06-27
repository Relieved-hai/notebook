## 栈是什么？

- 一个 **后进先出** 的数据结构
  ![](./images/01.png)
- JavaScript 中没有栈，但可以用 `Array` 实现栈的所有功能

<br/>
<br/>
<br/>

## 栈的应用场景

- 需要 **后进先出** 的场景。
- 比如：十进制转二进制、判断字符串的括号是否有效、函数调用堆栈 ......

<br/>

> 场景一：十进制转二进制

- 后出来的余数反而要排到前面。
- 把余数依次入栈，然后再出栈，就可以实现余数倒序输出

![](./images/02.png)

<br/>

> 场景二：有效的括号

- 越靠前的左括号，对应的右括号越靠前。
- 左括号入栈，右括号出栈，最后栈空了就是合法的。

![](./images/03.png)

<br/>

> 场景三：函数调用堆栈

- 最后调用的函数，最先执行完
- JS 解释器使用栈来控制函数的调用顺序。

![](./images/04.png)

<br/>
<br/>
<br/>

## 例子

> [有效的括号](http://leetcode-cn.caom/problems/valid-parentheses/)

- 新建一个栈
- 扫描字符串，遇左括号入栈，遇到和栈顶括号类型匹配的右括号就出栈，类型不匹配直接判定不合法。
- 最后栈空了就合法，否则不合法

```javascript
/**
 * @param {string} s
 * @return {boolean}
 *
 *  时间复杂度：O(n) - 只有一个 for，里面没有 for 了，且里面的操作都是 O(1) 的复杂度，如 push() pop()
 *  空间复杂度：O(n) - 新建了一个临时变量 stack，在极端的情况下，s 可能都是左括号，那么 stack 的长度就是字符串的长度，也就是 n
 */
const isValid = (s) => {
  if (s.length % 2 === 1) return false                // 1.字符串是否为基数

  const stack = []

  for (let i = 0; i < s.length; i++) {
    const c = s[i];                                   // 2.拿到每一个字符

    if (c === '(' || c === '[' || c === '{') {
      stack.push(c)                                   // 3.入栈
    } else {
      const top = stack[stack.length - 1]

      if ((top === '(' && c === ')') || (top === '[' && c === ']') || (top === '{' && c === '}')) {
        stack.pop()                                   // 4.出栈
      } else {
        return false                                  // 5.是否匹配
      }
    }
  }

  return stack.length === 0                           // 6.最后，栈是否为空
};
```





















