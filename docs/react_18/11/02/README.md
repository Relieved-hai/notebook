### packages/reac-reconciler/src/ReactChildFiber.js

```js
import {
  // ...
  createWorkInProgess,
} from "./ReactFiber";
import {
  //...
  ChildDeletion,
} from "./ReactFiberFlags";

// ...

/**
 * 使用现有的fiber节点和待处理的props创建新的fiber节点
 *
 * @param {Object} fiber 现有的fiber节点
 * @param {Object} pendingProps 待处理的props
 * @return {Object} clone 新的fiber节点
 */
function useFiber(fiber, pendingProps) {
  const clone = createWorkInProgess(fiber, pendingProps);
  clone.index = 0;
  clone.sibling = null;
  return clone;
}

/**
 * 删除所有剩余的子节点
 *
 * @param {Object} returnFiber 父级fiber节点
 * @param {Object} currentFirstChild 当前的第一个子节点
 * @return {null} 返回null
 */
function deleteRemainingChildren(returnFiber, currentFirstChild) {
  // 是初始化
  if (!shouldTrackSideEffects) return;

  let childToDelete = currentFirstChild;
  while (childToDelete !== null) {
    deleteChild(returnFiber, childToDelete);
    childToDelete = childToDelete.sibling;
  }
  return null;
}

/**
 * 将子节点添加到待删除列表中（也就是打标记 flags）
 *
 * @param {Object} returnFiber 父级fiber节点
 * @param {Object} childToDelete 需要被删除的子fiber节点
 */
function deleteChild(returnFiber, childToDelete) {
  // 是初始化
  if (!shouldTrackSideEffects) return;

  const deletions = returnFiber.deletions;
  if (deletions === null) {
    returnFiber.deletions = [childToDelete];
    returnFiber.flags != ChildDeletion;
  } else {
    returnFiber.deletions.push(childToDelete);
  }
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
  const key = element.key;
  let child = currentFirstChild;
  while (child !== null) {
    // 老 Fiber Key === 新虚拟 DOM key
    if (child.key === key) {
      if (child.type === element.type) {
        // 能复用，删除其余的子节点
        deleteRemainingChildren(returnFiber, child.sibling);
        const existing = useFiber(child, element.props);
        existing.return = returnFiber;
        return existing;
      } else {
        // 不能复用，删除全部子节点
        deleteRemainingChildren(returnFiber, child);
      }
    } else {
      deleteChild(returnFiber, child);
    }

    // 找兄弟节点
    child = child.sibling;
  }

  const created = createFiberFromElement(element);
  created.return = returnFiber;
  return created;
}
```

<br/>
<br/>
<br/>

### packages/reac-reconciler/src/ReactFiber.js

```js
/**
 * 构造函数，用于创建一个新的 Fiber 节点
 *
 * @param {number} tag - fiber 的类型，如函数组件、类组件、原生组件、根元素等
 * @param {*} pendingProps - 新属性，等待处理或者说生效的属性
 * @param {*} key - 唯一标识
 */
export function FiberNode(tag, pendingProps, key) {
  // ...
  this.deletions = null;
}
```

<br/>
<br/>
<br/>

### packages/reac-reconciler/src/ReactFiberFlags.js

```js
// ...

// 标识位：删除
export const ChildDeletion = 0b00000000000000000000010000;
```
