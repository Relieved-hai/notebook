当 state 或 props 发生变更后，[shouldComponentUpdate](https://reactjs.org/docs/react-component.html#shouldcomponentupdate) 会被调用，其返回值（Boolean）决定视图是否更新，默认更新。

初始渲染或使用 forceUpdate 不会执行，forceUpdate 其实就是 Component.js 中的 Component.update，所以不能在 Component.update 中调用 shouldComponentUpdate，哪里可以拿到最新的值呢？很显然可以在 Updater.launchUpdate 中操作

# Updater.js

```js
// ...

export class Updater {
  // ...

  /**
   * nextProps：由于组件内部更新，是不存在 props 更新的，都是内部 state 更新，但如果是父组件更新导致我们组件更新，其实这个时候可能是有 props 的，这时候就要接收下 props
   */
+ launchUpdate(nextProps) {
+   const { ClassComponentInstance, pendingState } = this;
+
+   if (pendingState.length === 0 && !nextProps) return;
+
+   // 默认更新
+   let isShouldUpdate = true;
+   // 最新状态
+   let nextState = this.pendingState.reduce((preState, newState) => {
+     return { ...preState, ...newState };
+   }, ClassComponentInstance.state);
+
+   // 清空使用过的 state
+   this.pendingState.length = 0;
+
+   if (
+     ClassComponentInstance.shouldComponentUpdate &&
+     !ClassComponentInstance.shouldComponentUpdate(nextProps, nextState)
+   ) {
+     isShouldUpdate = false;
+   }
+
+   // 无论视图是否更新，state、props 都需要更新
+   ClassComponentInstance.state = nextState;
+   if (nextProps) ClassComponentInstance.props = nextProps;
+
+   // 是否更新视图
+   if (isShouldUpdate) ClassComponentInstance.update();
+ }

- //   launchUpdate() {
- //     const { ClassComponentInstance, pendingState } = this;
- //     if (pendingState.length === 0) return;
- //     ClassComponentInstance.state = this.pendingState.reduce(
- //       (preState, newState) => {
- //         return { ...preState, ...newState };
- //       },
- //       ClassComponentInstance.state
- //     );
- //     this.pendingState.length = 0;
- //     ClassComponentInstance.update();
- //   }
}
```

<br>
<br>
<br>

### react-dom.js

```diff
// ...

function updateClassComponent(oldVNode, newVNode) {
  const classInstance = (newVNode.classInstance = oldVNode.classInstance);
- classInstance.updater.launchUpdate();
+ classInstance.updater.launchUpdate(newVNode.props);
}

// ...
```

<br/>
<br/>
<br/>

### 调试

```diff
import React from "./react";
import ReactDOM from "./react-dom";

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

+ shouldComponentUpdate(nextProps, nextState) {
+   return false;
+ }

  tick = () => {
    this.setState({
      date: new Date(),
    });
  };

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
ReactDOM.render(<Clock />, document.getElementById("root"));
```
