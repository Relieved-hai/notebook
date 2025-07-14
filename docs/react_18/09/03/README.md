```js
import { createRoot } from "react-dom/src/client/ReactDOMRoot";

const element = <h1>Hello, React</h1>;
const root = createRoot(document.getElementById("root"));
root.render(element);
```

这里用到了 `createRoot`、`render`，实现它们看起来很简单，但实际在 Fiber 架构下，里面的逻辑还是比较丰富的。

之前的简易版初始化时，实现的 `ReactDOM.render` 的方式，和 Fiber 架构下，调用 `createRoot` 返回一个对象，再调用 `render`，这两者的区别是？

- `ReactDOM.render`：是 React 传统渲染方法，自 React 诞生以来就存在，它在同步模式下运行，即所有组件的更新和渲染都是同步执行的，一气呵成没有中断的。
- `ReactDOM.createRoot`：是 React18 引入的新方法，主要特征就是允许我们在并发模式下运行 React 应用。在渲染和更新组件时利用时间切片，使得渲染过程可中断，从而提高应用程序的响应性和性能

这就像是，就像是去往同一个目的地的两种不同方式。

<br/>
<br/>
<br/>

### packages/react-dom/src/client/ReactDOMRoot.js

```js
import {
  createContainer,
  updateContainer,
} from "react-reconciler/src/ReactFiberReconciler";

/**
 * ReactDOMRoot 构造函数
 *
 * @param {Object} internalRoot - React Fiber 树的根节点
 */
function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}

/**
 * render 方法，负责更新或渲染 React 组件树
 *
 * @param {ReactElement|ReactComponent} children - 需要渲染的 React 元素或组件
 */
ReactDOMRoot.prototype.render = function (children) {
  const root = this._internalRoot;
  updateContainer(children, root);
};

/**
 * 创建 Fiber 根节点并封装为 ReactDOMRoot 对象的工厂函数
 *
 * @param {HTMLElement} container - React 组件需要渲染到的 DOM 元素
 * @returns {ReactDOMRoot} - 封装 Fiber 根节点的 ReactDOMRoot 对象
 */
export function createRoot(container) {
  // 基于 Fiber 架构，createContainer 创建就要交给 Fiber 相关代码创建
  const root = createContainer(container);
  return new ReactDOMRoot(root);
}
```

- `createContainer`
- `updateContainer`

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberReconciler.js

```js
/**
 * 该文件是 DOM 和 Fiber 之间的连接桥梁
 */
import { createFiberRoot } from "./ReactFiberRoot";

/**
 * 创建容器，用于将虚拟 DOM 转换为真实 DOM 并插入到容器中。
 *
 * @param {*} containerInfo - DOM容器信息。
 * @returns {FiberRoot} - 创建的Fiber根节点。
 */
export function createContainer(containerInfo) {
  return createFiberRoot(containerInfo);
}

/**
 * 更新容器，将虚拟 DOM 转换为真实 DOM 并插入到容器中。
 *
 * @param {*} element - 虚拟DOM元素。
 * @param {*} container - DOM容器，FiberRootNode。
 */
export function updateContainer(element, container) {}
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberRoot.js

```js
import { createHostRootFiber } from "./ReactFiber";
import { initialUpdateQueue } from "./ReactFiberClassUpdateQueue";

/**
 * Fiber 根节点对象构造函数。
 *
 * @param {any} containerInfo - 容器信息。
 */
function FiberRootNode(containerInfo) {
  this.containerInfo = containerInfo;
}

/**
 *             ┌---------------┐
 *             |   FiberRoot   | 应用程序的根节点
 *             └---------------┘
 *                  ▲     |
 *     stateNode    |     |      current
 *（指向对应的真实DOM）|     |（指向对应的Fiber节点）
 *                  |     ▼
 *             ┌---------------┐
 *             |   RootFiber   | Fiber 树的根节点
 *             └---------------┘
 *
 *
 * 创建 Fiber 根节点。
 *
 * @param {*} containerInfo - 容器信息。
 * @returns {FiberRootNode} - 创建的 Fiber 根节点。
 */
export function createFiberRoot(containerInfo) {
  const root = new FiberRootNode(containerInfo);
  // 创建未初始化的根 Fiber
  const uninitializedFiber = createHostRootFiber();
  // 根容器的 current 指向当前的根 Fiber
  root.current = uninitializedFiber;
  // 根 Fiber 的 stateNode，即真实 DOM 节点，指向 FiberRootNode
  uninitializedFiber.stateNode = root;
  // 初始化根 Fiber 的更新队列
  initialUpdateQueue(uninitializedFiber);
  return root;
}
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiber.js

Fiber 相当于是对虚拟 DOM 的抽象，它不仅包含了 DOM 节点的信息，还包含了节点在 Fiber 架构下的其他信息（如子节点、兄弟节点、父节点等）。这种抽象使得 React 能够实现更为复杂的功能，如时间切片（time-slicing）和 Suspense。

```js
import { HostRoot } from "./ReactWorkTags";
import { NoFlags } from "./ReactFiberFlags";

/**
 * 构造函数，用于创建一个新的 Fiber 节点
 *
 * @param {number} tag - fiber 的类型，如函数组件、类组件、原生组件、根元素等
 * @param {*} pendingProps - 新属性，等待处理或者说生效的属性
 * @param {*} key - 唯一标识
 */
export function FiberNode(tag, pendingProps, key) {
  // 代表 fiber 节点类型
  this.tag = tag;
  this.key = key;
  // 代表 fiber 节点对应虚拟 DOM 的类型
  this.type = null;
  // 对于类组件，这是组件实例。对于原生 DOM 元素，这是实际的 DOM 节点。
  this.stateNode = null;
  // 指向父 Fiber 节点的指针
  this.return = null;
  // 指向第一个子 Fiber 节点的指针
  this.child = null;
  // 指向兄弟 Fiber 节点的指针。
  this.sibling = null;
  // 待更新 props
  this.pendingProps = pendingProps;
  // 已生效 props
  this.memoizedProps = null;
  // 已生效 state
  this.memoizedState = null;
  // 更新队列
  this.updateQueue = null;
  // 描述 Fiber 节点需要执行的副作用类型（如插入、更新或删除）。
  this.flags = NoFlags;
  // 描述 Fiber 子节点需要执行的副作用类型（如插入、更新或删除）。
  this.subtreeFlags = NoFlags;
  // 指向当前 Fiber 节点的替代 Fiber 节点，这是双缓存技术的关键部分（简单理解，页面中始终有两颗 Fiber 树，一颗在显示，另一颗在处理中，等其处理完，那么两颗树身份调换，如此往复）。
  this.alternate = null;
  this.index = 0;
}

/**
 * 用于创建新的 Fiber 节点
 *
 * @param {number} tag - fiber 的类型
 * @param {*} pendingProps - 新属性
 * @param {*} key - 唯一标识
 * @returns {FiberNode} 新的 Fiber 节点
 */
export function createFiber(tag, pendingProps, key) {
  return new FiberNode(tag, pendingProps, key);
}

/**
 * 创建新的 HostRoot 类型的 Fiber 节点
 * @returns {FiberNode} 新的 HostRoot 类型的 Fiber 节点
 */
export function createHostRootFiber() {
  return createFiber(HostRoot, null);
}
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberClassUpdateQueue.js

```js
/**
 * 初始化fiber节点的更新队列
 *
 * @param {FiberNode} fiber - 需要初始化更新队列的 fiber 节点
 */
export function initialUpdateQueue(fiber) {
  const queue = {
    shared: {
      pending: null, // 创建一个新的更新队列，其中 pending 是一个循环链表
    },
  };

  fiber.updateQueue = queue;
}
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactWorkTags.js

```js
// 表示函数式组件
export const FunctionComponent = 0;
// 表示类组件
export const ClassComponent = 1;
// 表示尚未确定类型的组件，在 React 渲染过程中，如果遇到了这种类型，会先尝试将其当做函数式组件处理
export const IndeterminateComponent = 2;

// 表示宿主环境的根节点（例如在浏览器环境中，对应的是 RootFiber）
export const HostRoot = 3;
// 表示宿主环境的常规节点（例如在浏览器环境中，代表一个普通的 DOM 元素，如 div、span、...）
export const HostComponent = 5;
// 表示宿主环境的文本节点（例如在浏览器环境中，代表一个文本节点）
export const HostText = 6;
```

<br/>
<br/>
<br/>

### packages/react-reconciler/src/ReactFiberFlags.js

````js
/**
 * 都是二进制，这和 React 中用到的位运算有关。
 * 位运算只能用于整数，并且是直接对二进制位进行计算，直接处理每一个比特位，是非常底层的运算，运算速度极快。
 *
 * 位运算的优势:
 *  - 高效状态组合
 *    - 通过按位或（|）可合并多个标志（如同时标记插入和更新），按位与（&）可快速检测特定操作：
 *      ```js
 *      // 合并插入和更新状态
 *      const flags = Placement | Update; // 0b00000110
 *      // 检查是否需要更新
 *      if (flags & Update) {  执行更新逻辑  }
 *      ```
 *  - 节省内存
 *    - 单个32位整数可表示多达32种独立状态（如React实际定义了约20种标志），避免多变量冗余
 *  - 快速筛选
 *    - MutationMask 用于在commit阶段过滤出需DOM操作的节点，减少遍历开销
 *
 *
 * 如 workInProgress.flags |= Placement; 这里就是给 workInProgress 添加一个 Placement 的副作用。
 * 如 finishedWork.flags &= ~Placement; 这里则是给 finishedWork 清除一个 Placement 的副作用。
 *
 * 这种处理不仅速度快，而且简洁方便，是非常巧妙的方式，值得我们学习借鉴。
 */
// 标识位：无
export const NoFlags = 0b00000000000000000000000000;
// 标识位：插入
export const Placement = 0b00000000000000000000000010;
// 标识位：更新
export const Update = 0b00000000000000000000000100;
// 变更标识位掩码
export const MutationMask = Placement | Update;

/**
 *  🌰
 * JavaScript 中的位运算符主要用于整数（32位）的二进制表示进行操作。
 *
 * 按位或（OR）：按位或运算符 (|) 对其操作数的每一位执行逻辑或操作。如果两个相应的位中至少有一个为1，则结果位为1。
 * 按位与（AND）：按位与运算符 (&) 对其操作数的每一位执行逻辑与操作。只有当两个相应的位都为1时，结果位才为1。
 *
 * fiber1.flags = NoFlags | Placement | Update;
 *   0b00000000000000000000000000 NoFlags
 * | 0b00000000000000000000000010 Placement
 * | 0b00000000000000000000000100 Update
 * ------------------------------
 * = 0b00000000000000000000000110 代表 fiber1 承载了 插入+更新（React 利用二进制，来给 fiber 的属性 flags 赋值，表示它需要插入，也需要更新。）
 *
 *
 *
 * // 检查是否需要更新
 *   0b00000000000000000000000110
 * & 0b00000000000000000000000010
 * ------------------------------
 * = 0b00000000000000000000000010 需要插入
 *
 * if (fiber1.flags & Placement) {
 * }
 *
 *
 *
 * // 检查是否需要插入（假设 fiber2.flags = 0b00000000000000000000000100）
 *   0b00000000000000000000000100
 * & 0b00000000000000000000000010
 * ------------------------------
 * = 0b00000000000000000000000000 不需要插入
 *
 * if (fiber2.flags & Placement) {
 * }
 */
````
