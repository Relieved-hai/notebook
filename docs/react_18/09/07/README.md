### packages/react-reconciler/src/ReactChildFiber.js

```js
import { REACT_ELEMENT_TYPE } from "shared/ReactSymbols";
import { createFiberFromElement, createFiberFromText } from "./ReactFiber";
import { Placement } from "./ReactFiberFlags";
import isArray from "shared/isArray";

/**
 * 创建Child Reconciler的函数
 *
 * @param {boolean} shouldTrackSideEffects - 是否需要跟踪副作用
 * @return {function} reconcileChildFibers - 用于处理子fiber的函数
 *
 * 这个函数会根据传入的shouldTrackSideEffects参数返回一个函数reconcileChildFibers，
 * reconcileChildFibers函数可以根据新旧Fiber进行比较并返回处理结果。
 */
function createChildReconciler(shouldTrackSideEffects) {
  /**
   * 为新创建的Fiber设置索引，并在必要时设置副作用
   *
   * @param {Fiber} newFiber - 新创建的Fiber
   * @param {number} newIdx - 新的索引
   */
  function placeChild(newFiber, newIdx) {
    newFiber.index = newIdx;
    if (shouldTrackSideEffects) {
      // 这里就是给 flags 添加一个 Placement 标记
      newFiber.flags |= Placement;
    }
  }

  /**
   * 设置副作用
   *
   * @param {Object} newFiber 新的fiber节点
   * @return {Object} 返回设置了位置和可能设置了Placement标志的新fiber节点
   */
  function placeSingleChild(newFiber) {
    if (shouldTrackSideEffects) {
      newFiber.flags |= Placement;
    }
    return newFiber;
  }

  /**
   * 根据新的子节点创建新的fiber节点
   *
   * @param {Object} returnFiber 父级fiber节点
   * @param {any} newChild 新的子节点，可能是一个元素，也可能是一个字符串或者数值
   * @return {Object|null} 返回一个新的fiber节点，如果无法创建则返回null
   */
  function createChild(returnFiber, newChild) {
    if (
      (typeof newChild === "string" && newChild !== "") ||
      typeof newChild === "number"
    ) {
      const created = createFiberFromText(`${newChild}`);
      created.return = returnFiber;
      return created;
    }

    // 正常虚拟 DOM
    if (typeof newChild === "object" && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE: {
          const created = createFiberFromElement(newChild);
          created.return = returnFiber;
          return created;
        }

        default:
          break;
      }
    }

    return null;
  }

  /**
   * 将新创建的元素转换为fiber
   *
   * @param {Fiber} returnFiber - 新的父Fiber
   * @param {Fiber} currentFirstChild - 老fiber第一个子fiber
   * @param {object} element - 新的子虚拟DOM元素
   * @return {Fiber} created - 返回新创建的Fiber
   */
  function reconcileSingleElement(returnFiber, currentFirstChild, element) {
    const created = createFiberFromElement(element);
    created.return = returnFiber;
    return created;
  }

  /**
   * 将新的子节点数组与旧的子Fiber进行比较，并返回新的子Fiber
   *
   * @param {Fiber} returnFiber - 新的父Fiber
   * @param {Fiber} currentFirstChild - 老fiber第一个子fiber
   * @param {Array} newChildren - 新的子节点数组
   * @return {Fiber} resultingFirstChild - 返回的新的子Fiber
   */
  function reconcileChildrenArray(returnFiber, currentFirstFiber, newChildren) {
    let resultingFirstChild = null;
    let previousNewFiber = null;
    let newIdx = 0;
    for (; newIdx < newChildren.length; newIdx++) {
      const newFiber = createChild(returnFiber, newChildren[newIdx]);
      if (newFiber === null) continue;
      placeChild(newFiber, newIdx);
      if (previousNewFiber === null) {
        resultingFirstChild = newFiber;
      } else {
        previousNewFiber.sibling = newFiber;
      }
      previousNewFiber = newFiber;
    }
    return resultingFirstChild;
  }

  /**
   * 比较子 Fibers
   *
   * @param {Fiber} returnFiber - 新的父Fiber
   * @param {Fiber} currentFirstChild - 老fiber第一个子fiber
   * @param {object} newChild - 新的子虚拟DOM
   * @return {Fiber | null} result - 返回的新的子Fiber，或null
   */
  function reconcileChildFibers(returnFiber, currentFirstFiber, newChild) {
    // 单个虚拟 DOM
    if (typeof newChild === "object" && newChild !== null) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          // 虚拟DOM 转成 fiber
          return placeSingleChild(
            reconcileSingleElement(returnFiber, currentFirstFiber, newChild)
          );

        default:
          break;
      }
    }

    // 数组 -> 返回子一个子节点
    if (isArray(newChild)) {
      return reconcileChildrenArray(returnFiber, currentFirstFiber, newChild);
    }

    return null;
  }

  return reconcileChildFibers;
}

// 创建并导出一个不需要追踪副作用的子级协调器（没有老父fiber,初次挂载的时候用这个）
export const mountChildFibers = createChildReconciler(false);
// 创建并导出一个需要追踪副作用的子级协调器（有老父fiber更新的时候用这个）
export const reconcileChildFibers = createChildReconciler(true);
```

<br>
<br>
<br>

### packages/react-reconciler/src/ReactFiber.js

```js
import {
  // ...
  HostText,
  HostComponent,
  IndeterminateComponent,
} from "./ReactWorkTags";

// ...

/**
 * 从类型和属性创建新的 Fiber 节点
 *
 * @param {*} type - Fiber节点的类型
 * @param {*} key - 唯一标识
 * @param {*} pendingProps - 新的属性
 * @returns {FiberNode} 新的Fiber节点
 */
function createFiberFromTypeAndProps(type, key, pendingProps) {
  let tag = IndeterminateComponent;

  // ‘div’ | 'p' ...
  if (typeof type === "string") {
    tag = HostComponent;
  }

  const fiber = createFiber(tag, pendingProps, key);
  fiber.type = type;

  return fiber;
}

/**
 * 从虚拟 DOM 创建新的 Fiber 节点
 *
 * @param {*} element - 虚拟DOM元素
 * @returns {FiberNode} 新的Fiber节点
 */
export function createFiberFromElement(element) {
  const { type, key, props: pendingProps } = element;
  return createFiberFromTypeAndProps(type, key, pendingProps);
}

/**
 * 创建一个新的文本类型的Fiber节点
 *
 * @param {*} content - 文本内容
 * @returns {FiberNode} 新的文本类型的Fiber节点
 */
export function createFiberFromText(content) {
  return createFiber(HostText, content, null);
}
```

<br>
<br>
<br>

### packages/shared/isArray.js

```js
const { isArray } = Array;

export default isArray;
```
