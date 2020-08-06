<auth-auth />

## Context 实现跨层级的组件数据传递

- `Context`: 上下文，这个 api 有种全局变量的感觉
- `ContextType`: 其实是对 Context 的一种补充，或者说是语法糖
- `lazy`: 它允许我们懒加载指定的组件，一般不能独自使用，要和 `Suspense` 配合
- `Suspense`: `lazy` 必然会触发一段 loading 状态，它就是填充这块视觉的
- `memo`: 一般用于优化渲染性能


<br/>
<br/>
<br/>


## Context
**定义**

`Context` 提供了一种方式，能够让数据在组件中传递，而不必一级一级手动传递，这样会使得代码简练，但这种类似全局变量的方法，会导致组件复用起来更困难。不过存在即合理，一定会有场景会使用到的。

<br/>
<br/>
<br/>

**结构**

首先要有一个 `Context` 的实例对象，这个实例对象可以派发出两个 `react` 组件
- `<Provider>`: 提供者，它需要携带一个变量值，以后后代组件去使用
- `<Consumer>`: 消费者，它可以获取 `<Provider>` 提供的变量值
- `<Consumer>` 一定是 `<Provider>` 的后代元素，它们之间的层级可以是任意的。

<br/>
<br/>
<br/>

**API**

`createContext(defaultValue?)`: 是唯一一种创建 `Context` 的方法

- `defaultValue` 的作用，是防止在未使用 `<Context.Provider value={value}>` 包裹的情况下，而直接使用了 `<Context.Consumer />`，这时 defaultValue 就起了作用
- 不设置 `defaultValue`，也不用 `<Context.Provider value={value}>` ，而直接使用 `<Context.Consumer />` 也不错报错，通常用于单元测试

<br/>
<br/>
<br/>

🌰：

单个 Context

```jsx
import React, { Component, createContext } from 'react';

// 1、创建
const AppContext = createContext()

class CountCmp extends Component {
  render() {
    return (
      // 3、消费者
      <AppContext.Consumer>
        {
          count => <h1>count: { count }</h1>
        }
      </AppContext.Consumer>
    )
  }
}

class MiddleCmp extends Component {
  render() {
    return <CountCmp/>
  }
}

class App extends Component {
  state = {
    count: 0
  }

  render() {
    const { count } = this.state
    return (
      // 2、提供者
      <AppContext.Provider value={count}>
        <button onClick={() => this.setState({ count: count + 1 })}>add</button>
        <MiddleCmp/>
      </AppContext.Provider>
    );
  }
}

export default App;
```

<br/>
<br/>
<br/>

多个 Context

```jsx
import React, { Component, createContext } from 'react';

// 1、创建多个 Context
const AppContext = createContext()
const OnlineContext = createContext()

class CountCmp extends Component {
  render() {
    return (
      // 3、消费者嵌套，顺序任意
      <AppContext.Consumer>
        {
          count => (
            <OnlineContext.Consumer>
              {
                online => <h1>count: { count } online: { String(online) }</h1>
              }
            </OnlineContext.Consumer>
          )
        }
      </AppContext.Consumer>
    )
  }
}

class MiddleCmp extends Component {
  render() {
    return <CountCmp/>
  }
}

class App extends Component {
  state = {
    count: 0,
    online: false
  }

  render() {
    const { count, online } = this.state
    return (
      // 2、提供者嵌套，顺序任意
      <AppContext.Provider value={count}>
        <OnlineContext.Provider value={online}>
          <button onClick={() => this.setState({ count: count + 1 })}>count</button>
          <MiddleCmp/>
          <button onClick={() => this.setState({ online: !online })}>online</button>
        </OnlineContext.Provider>
      </AppContext.Provider>
    );
  }
}

export default App;
```

<br/>
<br/>
<br/>

**注意**

`Context` 能任意层级的组件中传递变量值，在一个组件中可以消费任意多的 `Context`，但是 `Context` 会让组件变得不纯粹，因为依赖的全局变量，这决定 `Context` 不应该被大规模的使用。


<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## 静态属性 ContextType 访问跨层级组件的数据

**使用场景：** 在只有一个 `Context` 的时候，就可以使用 `ContextType` 来简化代码，它就仅仅是解编程效率问题

<br/>
<br/>
<br/>

🌰

```jsx
import React, { Component, createContext } from 'react';

// 1、创建
const AppContext = createContext()

// 3、消费者
class CountCmp extends Component {
  // ①
  static contextType = AppContext()

  render() {
    // ② 设置后，我们在运行时能获取到一个新的属性 this.context，它的值就是 count 本身
    const count = this.context

    return (
      /*
      *
      * 由于 Consumer 的特性，里面必须是 { () => () } 的返回值
      * 这样的代码就显得不那么工整了，我们希望在整个 jsx 之前，就能够取到 Provider 提供的值
      * 于是 contextType 就派上用场了，这是一个类静态变量，用 static contextType = AppContext() 声明
      *
      * <AppContext.Consumer>
      *   {
      *      count => <h1>count: { count }</h1>
      *   }
      * </AppContext.Consumer>
      *
      * */

      // ③ 这里就可以直接丢弃 <Consumer /> 了
      <h1>count: {count}</h1>
    )
  }
}

class MiddleCmp extends Component {
  render() {
    return <CountCmp/>
  }
}

class App extends Component {
  state = {
    count: 0
  }

  render() {
    const { count } = this.state

    return (
      <div>
        {/* 2、提供者 */}
        <AppContext.Provider value={count}>
          <button onClick={() => this.setState({ count: count + 1 })}>count</button>
          <MiddleCmp/>
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
```



<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


## Lazy 与 Suspense 实现延迟加载

用于解决程序运行时，提升性能的几个 api

无论 SPA (单页面应用)、MPA (多页面应用)，有些页面，用户未激活，但是依然下载到了浏览器上，显而易见，这是有优化空间的

```jsx
import React, { Component, lazy, Suspense } from 'react';

// 1、lazy 来创建一个异步加载组件
// /*webpackChunkName: 'about'*/ 魔法注释，用来告诉 webpack 打包后，这个文件名叫 about
const About = lazy(() => import(/*webpackChunkName: 'about'*/ './About'))

class App extends Component {
  state = {
    hasError: false
  }

  // 3、错误捕获方式二，遇到错误，会返回一个新的 state 数据，并合并到组件的 state 中
  static getDerivedStateFromError() {
    return { hasError: true }
  }


  // 3、错误捕获方式一，可以在这个生命周期中，因为组件没有成功引入而抛出的
  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true })
  }

  render() {
    if (this.state.hasError) return <div>error</div>

    return (
      <div>
        {/* 2、Suspense 包裹 lazy，传一个 loading 状态下，需要展示的样子 */}
        <Suspense fallback={<div>loading</div>}>
          <About/>
        </Suspense>
      </div>
    );
  }
}

export default App;
```


<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


## Memo 实现指定组件进行渲染

- 在 react 中，视图应该与对应的数据保持同步
- 当数据变化时，会通过 render 来重新渲染，达到视图更新的效果
- 但如果数据没变化，它是否就一定不会执行 render ？外部因素会影响吗？

<br/>
<br/>
<br/>

🌰

**Q:** 如果数据没变化，它是否就一定不会执行 render ？外部因素会影响吗？

```jsx
import React, { Component } from 'react';

class Foo extends Component {
  render() {
    console.log('Foo render');
    return null
  }
}

class App extends Component {
  state = {
    count: 0
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>count</button>

        {/* 当点击事件触发，会执行 render 函数，那么 <Foo /> 中的 render 函数也会被重新执行 */}
        <Foo name='like'/>
      </div>
    );
  }
}

export default App;
```

<br/>
<br/>
<br/>

解决方案一：shouldComponentUpdate
```jsx
import React, { Component } from 'react';

class Foo extends Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // 判断 下一次的 name === 当前的 name 是否成立
    if (nextProps.name === this.props.name) {
      // 返回 false，不重渲染
      return false
    }
    // 返回 true，重渲染
    return true
  }

  render() {
    console.log('Foo render');
    return null
  }
}

class App extends Component {
  state = {
    count: 0
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>count</button>

        <Foo name='like'/>
      </div>
    );
  }
}

export default App;
```


<br/>
<br/>
<br/>


解决方案二：PureComponent
```jsx
import React, { Component, PureComponent } from 'react';

/*
*
* PureComponent 是有局限性的，只有传入属性本身的对比，和浅对比很类似，如果内部发生了什么变化，它就搞不定了
* 例如，name 不再是一个 string，而是一个 Object，Object 里面的值发生了变化，此时它是无法感知的
* 又例如，在 <Foo cb={() => {}}> 中传入一个内联函数，由于这个函数都是新的，它的句柄都发生了改变，它就会重渲染
*
* */

// 直接继承 PureComponent
class Foo extends PureComponent {
  render() {
    console.log('Foo render');
    return null
  }
}

class App extends Component {
  state = {
    count: 0
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>count</button>

        <Foo name='like'/>
      </div>
    );
  }
}

export default App;
```


<br/>
<br/>
<br/>



解决方案三：memo
```jsx
import React, { Component, memo } from 'react';

// 用 memo 将组建包裹起来
const Foo = memo(
  function Foo(props) {
    console.log('Foo render');
    return <div>{props.person.age}</div>
  }
)

class App extends Component {
  state = {
    count: 0,
    person: {
      age: 1
    }
  }

  cb = () => {
  }

  render() {
    return (
      <div>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>count</button>

        <Foo person={this.state.person} cb={this.cb}/>
      </div>
    );
  }
}

export default App;
```
























