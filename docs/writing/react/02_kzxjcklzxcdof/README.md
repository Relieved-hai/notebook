## React Hooks 的概念与意义

- 以往 react 的组件都是以 class 的形式来编写的，只有无状态组件才可以用函数来编写

- hooks 就允许我们在函数组件中，使用特定的预定义内部函数，来标记状态和生命周期，使得几乎所有组件都可以用函数来编写

- 那么就不要再提无状态组件了，在 hooks 之后，就只有 **类组件** 和 **函数组件** 之分，它们都可以拥有状态

<br/>
<br/>
<br/>

类组件不足

- 状态逻辑复用难

  - 缺少复用机制
  - 渲染属性和高阶组件导致层级冗余

- 趋向复杂难以维护

  - 生命周期函数混杂不相干逻辑
  - 相干逻辑分散在不同生命周期

- this 指向困扰

  - 内联函数过度创建新句柄
  - 类成员函数不能保证 this

<br/>
<br/>
<br/>

Hooks 优势

- 函数组件无 this 问题

  - 首先 hooks 需要函数式组件环境，所以逻辑都在函数内部，没有了实例化的概念，也就没有了 this 指向问题。

- 自定义 hooks 方便复用状态逻辑

  - 其次 hooks 实际指的是在函数内部调用的特殊函数，最常见的有 setState，useEffect，最重要的是我们可以自定义 hooks 函数。在 hooks 函数内部依旧可以调用 useState，useEffect，这样就可以非常高效的、简单的将可复用状态逻辑提取出来，复用变得异常优雅和简洁

- 副作用的关注点分离

  - hooks 天生优化了副作用的代码逻辑，这里的副作用不是是药三分毒的贬义词
  - 相对来说，它并不是发生在数据向视图转换的环境之中的，就例如网络请求、访问原始 DOM 元素，写本地持久化缓存、绑定解绑事件、...，这些都是在数据渲染视图之外的，全部都可以是副作用
  - 以往的副作用都是写在 class 组件的生命周期中，比如 mount、update、... 前后
  - useEffect 就是一个典型的 hooks 函数，它期望是在每次渲染完成之后再调用，也刚好是在编写副作用代码的最佳时机，每个 useEffect 只处理一种副作用，那么副作用之间的关系就清晰多了，我们称这种模式为 **关注点分离**

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## 使用 State Hooks

**useState**

- 用于代替 `class component` 中的 `state`

- 首先声明，按照规定所有的 `hooks` 函数，包括自定义的，都以 `use` 开头

<br/>
<br/>
<br/>

🌰：一个简单的累计器

**class component**
```jsx
import React, { Component } from 'react';

class App extends Component {
  state = {
    count: 0
  }

  render() {
    const { count } = this.state
    return (
      <div>
        <p>count: {count}</p>
        <button type='button'
                onClick={() => this.setState({ count: count + 1 })}>
          Add
        </button>
      </div>
    );
  }
}

export default App;
```

<br/>

```jsx
import React, { useState } from 'react';

function App() {
  // const [state本身，设置state的方法] = useState(默认值)
  const [ count, setCount ] = useState(0)

  return (
    <>
      <p>count: {count}</p>
      <button type='button'
              onClick={() => setCount(count + 1)}>
        Add
      </button>
    </>
  )
}

export default App;
```

<br/>

**从上面两个例子来说，仅从实现拥有 `state` 状态的角度看，`hooks` 相对更简洁明了。**

<br/>
<br/>
<br/>

**Q: useState 没有传入环境相关参数，它是怎么知道要返回的是 count？**

- 首先 `useState` 确实不知道它要返回的是 `count`，它只要返回一个变量就行了，是作为开发者的我们，把它命名成 `count` 的，把它命名成 `a`、`b`、`c` 任意的名字都可以


**Q: 为什么返回的是当前组件的 count？而不是其他组件的 count？**

- `JavaScript` 是单线程的，在 `useState` 被调用时，它只可能在唯一一个组件上下文中，这毋庸置疑，其实 `hooks` 这些 API 或多或少都利用了全局唯一性来推断一些信息的行为。

**Q: 如果一个组件由多个 useState，那么它怎么知道哪次调用返回哪一个 state 呢？**

- 它是按照第一次运行的顺序返回的
- **调用 hooks 必须遵守相同的顺序、个数。每次调用顺序必须一致，既不能多调用，也不能少调用**。
- **最好在顶层调用，不要在条件语句中、循环块中、...调用**。

<br/>
<br/>
<br/>

**useState 默认值可以是一个函数**
```jsx
import React, { useState } from 'react';

function App(props) {
  // 假如，默认值这么定义，那么每次重新渲染时，它就会重复执行，只会在第一次用到，在默认值逻辑复杂点，就会影响性能
  // const defaultCount = props.defaultCount || 0;
  // const [count, setCount] = useState(defaultCount)

  // useState 的默认值，它支持传入函数，来延迟默认值得初始化，且也只会执行一次
  const [count, setCount] = useState(() => {
    console.log('initial count');
    return props.defaultCount || 0
  })

  return (
    <>
      <p>count: {count}</p>
      <button type='button'
              onClick={() => setCount(count + 1)}>
        Add
      </button>
    </>
  )
}

export default App;
```

<br/>
<br/>
<br/>

**总结：**

- 1、使用 `useState` 需要规规矩矩的。

  - 调用 `hooks` 必须遵守相同的顺序、个数。每次调用顺序必须一致，既不能多调用，也不能少调用。

  - 最好在顶层调用，不要在条件语句中、循环块中、...调用。

- 2、`useState` 可以传入一个参数，来执行延迟初始化，提高效率。

- 3、如果在使用 `useState` 中，传入相同的值，组件是不会重新渲染的。

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## 使用 Effect Hooks

`useState` 解决了 `function component` 的无状态问题，但仅有状态是无法实现完整的业务流程，在特定的状态、节点和实际情况下，都需要执行特定的行为，这些行为置身于组件渲染过程之外，比如绑定事件、异步请求、访问 DOM 元素、...统统成为副作用。

<br/>
<br/>
<br/>

**副作用最常见的调用时机**

| 时机 | Class | Hooks |
| - | - | - |
| Mount 之后 | componentDidMount | useEffect |
| Update 之后 | componentDidUpdate | useEffect |
| Unmount 之前 | componentWillUnmount | useEffect |

<br/>

**Q: 为什么 useEffect 能实现好几个场景呢？**

- `useEffect` 标准上是在组件每次渲染之后 ( `render` ) 调用，并且会根据自定义状态来决定调不调用，这就方便了，第一次渲染的调用就相当于 `componentDidMount`，后面的调用就相当于 `componentDidUpdate`，之前我们往往在这两个生命周期中编写相同代码，并不关心它们到底是 `componentDidMount` 还是 `componentDidUpdate`，使用 `useEffect` 就减少了一份代码。

**Q: 那么 componentWillUnmount 呢？**

`useEffect` 的调用不仅仅代表一个函数的执行，它还返回另一个回调函数，这个函数的执行时机很重要，它是和 `useEffect` 的调用时机挂钩的，这个回调函数的作用，是清除上一次副作用遗留下来的状态，比如一个组件在第三、五、七次渲染后，执行了 `useEffect` 的逻辑，那么回调函数就会在第四、六、八渲染之前执行，严格来讲，是在前一次的渲染视图被清除之前，如果 `useEffect` 只在第一次调用，那么它返回的回调函数就是会在组件卸载之前调用了，也就相当于 `componentWillUnmount`。

<br/>
<br/>
<br/>

🌰：

**用 class component 实现两个功能**

**1、将网页标题设置为 state 中的 count 值**

- 在 `componentDidMount` 中调用一次设置网页标题方法

- 在 `componentDidUpdate` 中调用多次设置网页标题方法

**2、拖动页面时，计算当前页面的宽高**

- 在 `componentDidMount` 中监听事件

- 在 `componentDidUnmount` 中卸载事件

```jsx
import React, { Component } from 'react';

class App extends Component {
  state = {
    count: 0,
    size: {
      width: 0,
      height: 0
    }
  }

  onResize = () => {
    const { clientWidth, clientHeight } = document.documentElement
    this.setState({
      size: {
        width: clientWidth,
        height: clientHeight
      }
    })
  }

  componentDidMount() {
    document.title = this.state.count
    window.addEventListener('resize', this.onResize, false)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    document.title = this.state.count
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize, false)
  }

  render() {
    const { count, size: { width, height } } = this.state
    return (
      <div>
        <p>count: {count} size: ( {width} x {height} )</p>
        <button onClick={() => this.setState({ count: count + 1 })}>Add</button>
      </div>
    );
  }
}

export default App;
```

<br/>

**用 hooks component 实现两个功能**

**1、将网页标题设置为 state 中的 count 值**

- 通过 `useState` 定义 `count`、`setCount`

- 在副作用 `useEffect` 中调用设置网页标题方法

  - 第一次进入时，相当于 `componentDidMount`

  - 往后的每一次，都相当于 `componentDidUpdate`

**2、拖动页面时，计算当前页面的宽高**

- 通过 `useState` 定义 `size`，`setSize`

- 在副作用 `useEffect` 中

  - 定义绑定事件

  - 定义解绑事件

  - 定义在什么情况下会调用 `useEffect`，也就是 `useEffect` 第二个参数

```jsx
import React, { useEffect, useState } from 'react';

function App() {
  const [count, setCount] = useState(0)
  const [size, setSize] = useState({ width: 0, height: 0 })

  const onResize = () => {
    const { clientWidth, clientHeight } = document.documentElement
    setSize({ width: clientWidth, height: clientHeight })
  }

  // 每次渲染后调用
  useEffect(() => {
    document.title = count
  })

  useEffect(() => {
    // 1、绑定 resize 监听事件
    window.addEventListener('resize', onResize, false)

    /*
     * 2、解绑事件：返回一个回调函数，它会在视图被销毁之前触发，有两种销毁原因
     *   ① 重渲染
     *   ② 组件卸载
     * */
    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])
  /*
   * 3、难道每次渲染都要执行绑定、解绑事件吗？
   *    ① useEffect 第二个参数，是个可选数组，只有数组中的每一项都不变的情况下，useEffect 才不会执行。
   *    ② 默认第一次会执行一次 useEffect，如果不指定第二个参数，那么每次都会执行 useEffect。
   * */


  return (
    <div>
      <p>count: {count} size: ( {size.width} x {size.height} )</p>
      <button onClick={() => setCount(count + 1)}>add</button>
    </div>
  )
}

export default App;
```

<br/>
<br/>
<br/>

**验证 useEffect 第二个参数的实际效果**

```jsx
import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0)
  const [size, setSize] = useState({ width: 0, height: 0 })

  const onResize = () => {
    const { clientWidth, clientHeight } = document.documentElement
    setSize({ width: clientWidth, height: clientHeight })
  }

  useEffect(() => {
    document.title = count
  })

  useEffect(() => {
    window.addEventListener('resize', onResize, false)

    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  /**
   * 1、通过不同的参数来验证第二个参数的作用
   *   ① 除了第一次执行，useEffect 之后的执行，是否只在依赖数组中每一项变化后才触发
   *   ② 确实只有 count 变化后，才会执行，size 变化则不会触发
   *   ③ 从这里来看，我们在设计一些较为复杂的逻辑时，特别是幂等的行为，最好时用到哪些变量，就把哪些变量声明在这个依赖数组之中，声明多了，会过多执行副作用，声明少了，很可能会导致 BUG 的出现。
   */
  useEffect(() => {
    console.log('count', count);
  }, [count])

  /**
   * 2、验证回调函数的执行
   *   ① 无论是生命周期函数、useEffect 都是处理副作用的
   *   ② 生命周期函数在命名上比较容易理解，但其实都是围绕组件的渲染和重渲染的
   *   ③ useEffect 把它们都抽象了一层，通过第二个参数来控制执行的时机，和生命周期是等价的
   *   ④ 要理解什么样的 useEffect 参数与什么样的生命周期是对应的，只要能精准的控制 useEffect 第二个参数，既能优化运行时性能，还能写出维护性很高的代码
   */
  const onClick = () => {
    console.log('click');
  }
  // 如果 useEffect 这样写的话，那么下面在变化 count 来销毁 <h1 id='size'> 之后，所绑定的 click 事件也无法在执行了
  // useEffect(() => {
  //   document.querySelector('#size').addEventListener('click', onClick, false)
  // }, [])

  // 现在无论 DOM 元素如何切换，都会在最新的 DOM 元素上绑定 click 事件，这是一个典型的频繁清理状态的副租用
  useEffect(() => {
    document.querySelector('#size').addEventListener('click', onClick, false)

    return () => {
      document.querySelector('#size').removeEventListener('click', onClick, false)
    }
  })

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>


      {
        /* 通过 count 来决定哪个元素显示 */
        count % 2
          ? <h1 id="size">size: ( {size.width} x {size.height} )</h1>
          : <p id="size">size: ( {size.width} x {size.height} )</p>
      }
    </div>
  )
}

export default App;
```

<br/>
<br/>
<br/>

**Q: useEffect 的第二个参数要在第二个数组中的成员不变的情况下，才不会执行，那么要如何理解这个不变呢？**

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


## 使用 Context Hooks

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


## 使用 Memo & Callback Hooks

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


## 使用 Ref Hooks

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


## 自定义 Hooks

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


## Hooks 的使用法则

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


## Hooks 的常见问题
