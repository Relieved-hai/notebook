> [getDerivedStateFromProps](https://legacy.reactjs.org/docs/react-component.html#static-getderivedstatefromprops) 在调用 render 方法之前立即调用，无论是在初始挂载时还是后续更新时。它应该返回一个对象来更新状态，或者 null 不更新任何内容。

- 在 render 函数执行之前调用
- 返回一个对象则更新 state，返回 null 表示没有任何更新
- 使用这个函数的场景很少，当 state 需要随着 props 的变化而变化的时候才会用到，其实相当于一种缓冲机制
- 如果需要使用的时候，可以考虑用 [memoization](https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#what-about-memoization) 技术
- 静态函数不能访问类实例，不能通过 this.xxx 产生一些副作用，因此多个类组件可以抽取为纯函数的公用逻辑
- 该函数在初始化挂载，更新，调用 forceUpdate 都会执行，与场景无关，而 UNSAFE_componentWillReceiveProps 只在由于父组件导致的更新的场景下调用，组件内的 setState 导致的更新不会调用

<br/>

### Component.js

```js
// ...

export class Component {
  // ,,,

  // forceUpdate
  update() {
    // ...
    let oldDom = findDomByVNode(oldVNode); // 根据旧虚拟DOM找到它对应的真实DOM节点

+   if (this.constructor.getDerivedStateFromProps) {
+     let newState =
+       this.constructor.getDerivedStateFromProps(this.props, this.state) || {};
+     this.state = { ...this.state, ...newState };
+   }

    let newVNode = this.render();
    // ...
  }
}
```

<br/>
<br/>
<br/>

### react-dom.js

因为在调试 getDerivedStateFromProps 的例子时，有点问题，所以完善下

```js
// ....
function getDomByClassComponent(VNode) {
  // ..
  instance.oldVNode = renderVNode;
+ VNode.classInstance = instance;

  // 给类组件添加 ref
  ref && (ref.current = instance);
  // ..
}
// ....
```

<br/>
<br/>
<br/>

### 调试

```js
import React from "./react";
import ReactDOM from "./react-dom";

class DerivedState extends React.Component {
  constructor(props) {
    super(props);
    this.state = { prevId: "111", email: "111@xx.com" };
  }

  static getDerivedStateFromProps(props, state) {
    if (props.userId !== state.prevId) {
      return {
        prevId: props.userId,
        email: `${props.userId}@xx.com`,
      };
    }
  }

  render() {
    return (
      <div>
        <p>Email: {this.state.email}</p>
      </div>
    );
  }
}

class ParentClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { id: "111" };
  }

  changeUpdate = () => {
    this.setState({
      id: "000",
    });
  };

  render() {
    return (
      <div>
        <input type="button" value="change" onClick={this.changeUpdate} />
        <DerivedState userId={this.state.id} />
      </div>
    );
  }
}
ReactDOM.render(<ParentClass />, document.getElementById("root"));
```

效果如下

![](./images/01.gif)
