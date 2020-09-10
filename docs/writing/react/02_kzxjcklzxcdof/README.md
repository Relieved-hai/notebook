<auth-auth />

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

和之前的 Context 一样，它允许数据跨越组件层级直接传递，如下
```jsx
<Provider value={data}>
  <Consumer>
    { data => <span>{ data }</span> }
  </Consumer>
</Provider>
```

<br/>
<br/>
<br/>

🌰
```jsx
import React, { Component, createContext, useContext, useState } from 'react';

const CountContext = createContext()

// 写法一：Consumer
class Foo extends Component {
  render() {
    return (
      <CountContext.Consumer>
        {
          count => <h1>{count}</h1>
        }
      </CountContext.Consumer>
    )
  }
}

// 写法二：contextType
class Bar extends Component {
  static contextType = CountContext;

  render() {
    const count = this.context
    return <h1>{count}</h1>
  }
}

// 写法三：hooks
function Counter() {
  const count = useContext(CountContext)
  return <h1>{count}</h1>
}

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount(count + 1)}>add</button>

      <CountContext.Provider value={count}>
        <Foo/>
        <Bar/>
        <Counter/>
      </CountContext.Provider>
    </div>
  )
}

export default App;
```

**这里还是要强调，不要滥用 Context，它会破坏组件的独立性**

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


## 使用 Memo & Callback Hooks

`useMemo` 是 `Memo` 的变种，`Memo` 用来优化函数重渲染的行为，当传入组件的值都不变的情况下，就不会发生组件重渲染，在 `hooks` 环境下，几乎所有组件都是函数组件，我们使用 `Memo` 的几率较高。

<br/>

- `Memo` 函数针对是一个组件的渲染是否重复执行。
- `useMemo` 则定义了一段函数逻辑是否重复执行。
- 本质都是利用了同样的算法，来判定依赖是否发生改变，进而决定是否触发特定逻辑，有很多这样的逻辑，输入输出都是对等的，相同的输入，一定产生相同的输出，数学上称之为幂等。用 `Memo` 可以避免不必要的重复计算，减少资源浪费，所以严格来说，即使不使用 `useMemo`、`Memo`，都不会导致你的业务逻辑发生变化。换句话说，`Memo` 和 `useMemo` 仅仅用来做性能优化之用。

<br/>
<br/>
<br/>

🌰

**一、使用 useMemo**

```jsx
import React, { useMemo, useState } from 'react';

function Counter(props) {
  return <h1>{props.count}</h1>
}

function App() {
  const [count, setCount] = useState(0)

  /**
   * useMemo
   *   1、和 useEffect 一样
   *     ① 第一个参数是要执行的逻辑函数
   *     ② 第二个参数是这个逻辑依赖的输入变量组成的数组，如果不传第二个参数，那么它每次都会执行，那么这将毫无意义，传入空数组则会执行一次
   *
   *   2、和 useEffect 调用时机不一致
   *     ① useEffect 执行的是副作用，所以一定是在渲染之后运行
   *     ② useMemo 是希望有返回值的，而返回值可以直接参与渲染，因此 useMemo 在渲染期间完成
   */

  // 只要 count 发生变化，double 才会重新计算
  const double = useMemo(() => {
    return count * 2
  }, [count])

  return (
    <div>
      <p>count: {count} double: {double} </p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <Counter count={count}/>
    </div>
  )
}

export default App;
```

<br/>
<br/>
<br/>

**二、结合 Memo，进行优化**

```jsx
import React, { memo, useMemo, useState } from 'react';

// 使用 Memo 包裹，在传入的值不变时，不再重渲染
const Counter = memo(function Counter(props) {
  console.log('Counter render');
  return <h1>{props.count}</h1>
})

function App() {
  const [count, setCount] = useState(0)

  /**
   * 默认进来执行一次
   * 在 count === 3 之前，它就相当于 false，一直保持不变，不会重新计算
   * 在 count === 3 时候，它由 false => true，它会重新计算 double 值，等于 6
   * 在 count  >  3 时候，它由 true => false，它会重新计算 double 值，等于 8
   * 后面由于一直是 false，那么就会保持 8 一直不变
   *
   * 因 <Counter count={double}/> 被 Memo 包裹，所以从始至终，它只会执行 render 三次 ( double = 0, double = 6, double = 8 )
   */
  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  return (
    <div>
      <p>count: {count} double: {double} </p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <Counter count={double}/>
    </div>
  )
}

export default App;
```

<br/>
<br/>
<br/>

**三、useCallback**

函数句柄变化，会导致 Memo 失效

```jsx
import React, { memo, useCallback, useMemo, useState } from 'react';

// 使用 Memo 包裹，在传入的值不变时，不再重渲染
const Counter = memo(function Counter(props) {
  /**
   * Q: 为什么在使用 1 的方式来定义 onClick 时，当父组件修改 count 时，传入子组件的是 double，但在 double 没有发生变化的情况下，console.log('Counter render') 依然执行了？
   *
   *   这说明，每次 App 重渲染后，onClick 的句柄变化，导致 Counter 被重新渲染
   *
   * Q: count 变化可以理解，但是 onClick 就不应该变化了，毕竟它只是一个函数，有什么办法能不让 onClick 的句柄发生改变呢？
   *
   *   解决方式一：useMemo
   *   解决方式二：useCallback
   */
  console.log('Counter render');
  return <h1 onClick={props.onClick}>{props.count}</h1>
})

function App() {
  const [count, setCount] = useState(0)

  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  /**
   * 1、函数句柄的变化，会导致 Memo( <Counter /> ) 也重新渲染
   * const onClick = () => {
   *   console.log('onClick');
   * }
   */

  /**
   * 解决方式一：useMemo
   *
   * useMemo(() => fn)
   *
   * 由于我们传给 useMemo 第二个参数是一个空数组，那么整个逻辑就只会运行一次。理论上我们返回的 onClick 就只有一个句柄。useMemo 就只是用来优化性能的，现在就派上用场了
   *
   * const onClick = useMemo(() => {
   *   return () => {
   *     console.log('onClick')
   *   }
   * }, [])
   */

  /**
   * 解决方式二：useCallback
   *
   * useCallback(fn)
   *
   * useCallback 这几行代码，明明每次渲染，都会创建新的函数，useCallback 怎么就优化性能了呢？
   * 使用 useCallback 确实不能阻止创建新的函数，但这个函数不一定会被返回，换句话说，很可能创建的函数就直接被抛弃不用了，它解决的是传入子组件的函数参数，过度变化导致子组件过度渲染的问题，一定要理解好，不要对 useCallback 有误解
   */
  const onClick = useCallback(() => {
    console.log('onClick');
  }, [])

  return (
    <div>
      <p>count: {count} double: {double} </p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <Counter count={double} onClick={onClick}/>
    </div>
  )
}

export default App;
```

<br/>
<br/>
<br/>

**四、扩展**

setState 的扩展

```jsx
import React, { memo, useCallback, useMemo, useState } from 'react';

const Counter = memo(function Counter(props) {
  console.log('Counter render');
  return <h1 onClick={props.onClick}>{props.count}</h1>
})

function App() {
  const [count, setCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)

  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  /**
   * 写法一：
   *   将依赖外部的变量都写入，如 [clickCount, setClickCount]，但是 setClickCount 是不需要的，因为 react 能保证这个函数的句柄是相同的
   *   https://reactjs.org/docs/hooks-reference.html 中有这么一句话 ( React guarantees that setState function identity is stable and won’t change on re-renders. This is why it’s safe to omit from the useEffect or useCallback dependency list. )
   *
   * const onClick = useCallback(() => {
   *   console.log('onClick');
   *   setClickCount(clickCount + 1)
   * }, [clickCount])
   *
   */

  /**
   * 写法二：
   *
   *   setState
   *     ① 除了可以传入最新值以外
   *     ② 还可以传入一个函数，函数的参数是这个 state 的当前值，函数的返回值是要更新的值
   *
   *   这样可以不获取 clickCount 的句柄，通过函数的参数，来让 clickCount + 1，这样就可以把 clickCount 从依赖数组中删除。
   *
   */
  const onClick = useCallback(() => {
    console.log('onClick');

    setClickCount(clickCount => clickCount + 1)
  }, [])


  return (
    <div>
      <p>count: {count} double: {double} </p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <Counter count={double} onClick={onClick}/>
    </div>
  )
}

export default App;
```

<br/>
<br/>
<br/>

**总结**

- 和 `Memo` 函数根据属性来决定是否重新渲染组件一样，`useMemo` 可以根据自己的依赖来决定一段函数逻辑是否重复执行，从而优化性能

- 如果 `useMemo` 的返回值是函数的话，那么就可以简写成 `useCallback` 的方式，只是简单而已，实际没有更多区别

- 需要特别注意的是，当依赖变化时，我们能判定 `useMemo` 一定重新执行，但是注意，即使依赖不变化，我们也不能假定它就一定不会重新执行，也就是说，它也可能重新执行，这是考虑内存优化的结果。总之，一定要仅仅把 `useMemo`、`useCallback` 当做一种锦上添花的优化手段，不可过度依赖它是否触发重新渲染。

- 它们的实际用途远比这里介绍的多

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


## 使用 Ref Hooks

在 `react` 的更新迭代中，曾在 `class` 中出现过 `String Ref`、`Callback Ref`、以及现在推荐使用的 `CreateRef`，在函数组件中我们只能使用 `useRef`，如果将它当做 `CreateRef` 是不对的，因为 `useRef` 本身有两种使用场景。

- 获取子组件或者 `DOM` 节点的句柄

- 渲染周期之间共享数据的存储

  - 可能能想到用 `state` 跨域渲染周期保存，但 `state` 的赋值会触发重渲染，但是 `Ref` 不会，从这点上看，`useRef` 更像类组件的一个普通属性成员。

<br/>
<br/>
<br/>

🌰

**一、获取元素**

```jsx
import React, { Component, useCallback, useMemo, useRef, useState } from 'react';

class Counter extends Component {
  speak() {
    console.log('speak', this.props.count);
  }

  render() {
    const { onClick, count } = this.props
    return <h1 onClick={onClick}>{count}</h1>
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)

  // 1、创建
  const counterRef = useRef()

  const double = useMemo(() => {
    return count * 2
  }, [count])

  const onClick = useCallback(() => {
    console.log('onClick');

    setClickCount(clickCount => clickCount + 1)

    // 3、counterRef.current 就是当前的元素
    counterRef.current.speak();

    // 由于依赖了 counterRef，则将它加入进来
  }, [counterRef])

  return (
    <div>
      <p>count: {count} double: {double} </p>
      <button onClick={() => setCount(count + 1)}>add</button>
      {/* 2、ref 赋值， <Counter /> 已更换成 class 组件 */}
      <Counter ref={counterRef} count={double} onClick={onClick}/>
    </div>
  )
}

export default App;
```

<br/>
<br/>
<br/>

**二、定时器问题**

① 问题代码

```jsx
import React, { Component, useCallback, useEffect, useMemo, useRef, useState } from 'react';

class Counter extends Component {
  speak() {
    console.log('speak', this.props.count);
  }

  render() {
    const { onClick, count } = this.props
    return <h1 onClick={onClick}>{count}</h1>
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  const counterRef = useRef()
  let it;

  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  const onClick = useCallback(() => {
    setClickCount(clickCount => clickCount + 1)
    counterRef.current.speak();
  }, [counterRef])

  // 1、只执行一次
  useEffect(() => {
    it = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  }, [])

  // 2、每次都执行
  useEffect(() => {
    if (count >= 10) {
      clearInterval(it)
    }
  })

  /**
   * Q: 当 count > 10，这个定时器会停下来吗？
   *
   * 运行后，会发现定时器并没有停下来，而是继续走，这是？
   *
   * 因为在 cleanInterval 的时候，定时器句柄 it 这个变量，已经不是 setInterval 的赋值了，每次 App 重渲染，都会重置它。那么把 it 放在 useState 中，可以解决吗？
   *
   * 但是 it 并没有参与渲染，而且弄不好在副作用中更新，导致死循环，这个时候 useRef 就派上用场了
   *
   */

  return (
    <div>
      <p>count: {count} double: {double} </p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <Counter ref={counterRef} count={double} onClick={onClick}/>
    </div>
  )
}

export default App;
```

<br/>

② 解决方式: `useRef`

`useRef` 和 `useState` 一样可以传入一个默认参数，但不能传入函数，它不支持函数参数进行延迟初始化

```jsx
import React, { Component, useCallback, useEffect, useMemo, useRef, useState } from 'react';

class Counter extends Component {
  speak() {
    console.log('speak', this.props.count);
  }

  render() {
    const { onClick, count } = this.props
    return <h1 onClick={onClick}>{count}</h1>
  }
}

function App() {
  const [count, setCount] = useState(0)
  const [clickCount, setClickCount] = useState(0)
  const counterRef = useRef()
  // 1、使用 useRef
  const it = useRef()

  const double = useMemo(() => {
    return count * 2
  }, [count === 3])

  const onClick = useCallback(() => {
    setClickCount(clickCount => clickCount + 1)
    counterRef.current.speak();
  }, [counterRef])

  useEffect(() => {
    // 2、将它放入到 current 中
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  }, [])

  useEffect(() => {
    if (count >= 10) {
      // 3、清除的时候
      clearInterval(it.current);
    }
  })

  return (
    <div>
      <p>count: {count} double: {double} </p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <Counter ref={counterRef} count={double} onClick={onClick}/>
    </div>
  )
}

export default App;
```

<br/>
<br/>
<br/>

总结

- `useRef` 很像类属性成员，如果碰到组件中，需要访问上一次渲染时候的一些数据，甚至是 state，就把它们同步到 Ref 中，下一次渲染就能够正确的获取到了。

- `useRef` 有两种使用场景
  - 获取子组件元素
  - 用来同步不同渲染周期之间需要共享的数据

<br/>
<br/>
<br/>

**Q: 在副作用里面，如何判定一个元素或组件，在本次渲染和上次渲染之间，有过重新创建呢？**

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


## 自定义 Hooks

**优化类组件的三大问题**

- 方便复用状态逻辑

  - Custom Hooks

- 副作用的关注点分离

- 函数组件无 this 问题

<br/>
<br/>
<br/>

🌰

**一、简单的自定义 hooks**

```jsx
import React, { useEffect, useRef, useState } from 'react';

function Counter(props) {
  return <h1>{props.count}</h1>
}

// 1、自定义 hooks，将在 App 中的逻辑抽取出来
function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount)
  const it = useRef()

  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  }, [])

  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current)
    }
  })

  // 2、返回所需句柄
  return [count, setCount]
}

function App() {
  // 3、使用
  const [count, setCount] = useCount(0)

  return (
    <div>
      <p>count: {count}  </p>
      <button onClick={() => setCount(count + 1)}>add</button>
      <Counter count={count}/>
    </div>
  )
}

export default App;
```


<br/>
<br/>
<br/>

**二、hooks 返回一个 jsx**

```jsx
import React, { useEffect, useRef, useState } from 'react';

// 1、改造一下
function useCounter(count) {
  return <h1>{count}</h1>
}

function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount)
  const it = useRef()

  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  }, [])

  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current)
    }
  })

  return [count, setCount]
}

function App() {
  const [count, setCount] = useCount(0)

  // 2、调用它，返回一个 jsx
  const Counter = useCounter(count)

  console.log(Counter);

  return (
    <div>
      <p>count: {count}  </p>
      <button onClick={() => setCount(count + 1)}>add</button>
      {
        // 3、使用
        Counter
      }
    </div>
  )
}

export default App;
```

<br/>
<br/>
<br/>

**三、监听窗口大小变化**

```jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';

// 1、监听浏览器窗口变化
function useSize() {
  // 2、定义 size
  const [size, setSize] = useState({ width: 0, height: 0 })

  // 3、用 useCallback 去包装这个函数，使得它只执行一次，且句柄不变
  const onResize = useCallback(() => {
    const { clientWidth, clientHeight } = document.documentElement

    setSize({
      width: clientWidth,
      height: clientHeight
    })
  }, [])

  // 4、初始化一次，注册监听事件 resize，并返回一个销毁函数
  useEffect(() => {
    window.addEventListener('resize', onResize, false)

    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  // 5、返回
  return size
}

function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount)
  const it = useRef()

  useEffect(() => {
    it.current = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
  }, [])

  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current);
    }
  }, [count])

  return [count, setCount]
}

function useCounter(count) {
  // 6、调用
  const { width, height } = useSize()
  return <h1>count：{count}, size: {width} x {height} </h1>
}

function App() {
  const [count, setCount] = useCount(0)
  const Counter = useCounter(count)
  // 6、调用
  const { width, height } = useSize()
  return (
    <div>
      <p>count: {count}, size: {width} x {height}  </p>
      <button onClick={() => setCount(count + 1)}>add</button>
      {
        Counter
      }
    </div>
  )
}

export default App;
```


<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


## Hooks 的使用法则

`Hooks` 被设计的如此简洁，正是因为它遵循了一些规定 [Rules fo Hooks](https://reactjs.org/docs/hooks-rules.html)，没有这些规定，`hooks` 将无法运行


- 仅在顶层调用 `hooks` 函数

  - 不能再循环语句、条件语句、嵌套函数中调用 `hooks` 函数

  - 不仅仅是 `useState`，整个 `hooks` 函数都很可能依赖调用顺序，这样 `react` 才能在组件的不同渲染周期中把相同的逻辑关联起来，一旦你的 `hooks` 函数不在顶层调用，那么很有可能在组件的不同渲染周期中，它们的调用顺序发生变化，进而导致变量混乱，信息不同步。为了尽可能规避这一类问题，强烈建议把 `hooks` 放在最顶层，不要说为了节省开销，把可能不必要的 `hooks` 放在条件语句中，这是不对的，这也算是为了 `hooks` 简洁而做出的一点小小牺牲

- 仅在函数组件和自定义 `hooks` 函数中，调用 `hooks` 函数

  - 不能再其他不同函数中调用

<br/>

**在 react 中，以 use 开头的函数，都要遵循着两条法则**

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


## Hooks 的常见问题

**1、生命周期函数如何映射到 Hooks 中？**

![](./images/01.png)

<br/>

- **constructor 阶段**

  - **class** 中，常用做初始化状态使用

  - **hooks** 中，可使用 `useState` 代替


- **getDerivedStateFromProps 阶段**

  - **class** 中，这是一个静态方法，根据参数 `nextProps`、`prevState` 来决定返回新的状态

  ```jsx
  class Counter extends Component {
    state = {
      overflow: false
    }

    static getSnapshotBeforeUpdate(prevProps, prevState) {
      if (prevProps.count > 10) {
        return {
          overflow: true
        }
      }
    }
  }
  ```

  - **hooks** 中
  ```jsx
  /**
   * Q: 这样会有问题吗？直接在函数组件中 setState，会导致死循环吗？直接 setState 会有性能问题吗？
   *  会，在代码逻辑有问题的时候，例如一直不停的 setState，触发重渲染的时候，正常逻辑是到达了某一条件，就不在触发重渲染了
   *  不会，react 文档中已经声明了，这个 setState，是在 react 操作 dom 之前完成的
   */
  function Counter(props) {
    const [overflow, setOverflow] = useState(false)

    if (props.count > 10) {
      setOverflow(true)
    }
  }
  ```

- **shouldComponentUpdate 阶段**

  - 这个在函数组件中，显然就是对 Memo 的使用了

- **render 阶段**

  - 函数组件本身就返回的 jsx

- **componentDidMount、componentDidUpdate、componentWillUnmount 阶段**

  - useEffect
  ```jsx
  function App() {
    let renderCounter = useRef(0)
    renderCounter.current++
    useEffect(() => {
      // componentDidMount

      // componentWillUnmount
      return () => {  }
    })

    useEffect(() => {
      if (renderCounter > 1) {
        // componentDidUpdate
      }
    })
  }
  ```

- **getsnapshotbeforeupdate、componentDidCatch、getDerivedStateFromError 阶段**

  - 这些 hooks 暂时无法实现，这就说明了，函数组件还不能完全取代类组件

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

**2、类实例成员变量如何映射到 Hooks？**

- class 中，类实例成员变量，它能在不同的渲染周期之间记录状态，而且还不会触发重新渲染

  ```jsx
  class App {
    it = 0;
  }
  ```

- hooks 中，没有类，也就没有办法挂载属性变量，但有 Ref，之前用 Ref 保存过定时器变量，这个就是属性变量的替代写法

  ```jsx
  function App() {
    const it = useRef(0)
  }
  ```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

**3、Hooks 中如何获取历史 props 和 state？**

- hooks 中

  ```jsx
  function Counter() {
    const [count, setCount] = useState(0)

    // 特别定义了一个 Ref，来保存上一次的 count 值
    const prevCountRef = useRef()

    // 用副作用来同步 count 值
    useEffect(() => {
      prevCountRef.current = count
    })

    // 由于 Ref 不受重渲染影响，所以可以取到上一次的值
    const prevCount = prevCountRef.current

    return <div>Now: {count}, before: {prevCount}</div>
  }
  ```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


**4、如何强制更新一个 Hooks 组件**

- class 中，可以使用 forceUpdate，调用它的话，无聊状态和属性变没变，都会让组件重渲染，甚至还跳过了 shouldComponentUpdate 的检查

- hooks 中，可以创建一个不参与实际渲染的 state，然后更新它的值，来达到同样的效果

  ```jsx
  function Counter() {
    const [count, setCount] = useState(0)
    const [updater, setUpdater] = useState(0)

    // 通过 setState 来间接的来实现重渲染
    function forceUpdate() {
      setUpdater(updater => updater + 1)
    }

    const prevCountRef = useRef()

    useEffect(() => {
      prevCountRef.current = count
    })

    const prevCount = prevCountRef.current

    return <div>Now: {count}, before: {prevCount}</div>
  }
  ```

