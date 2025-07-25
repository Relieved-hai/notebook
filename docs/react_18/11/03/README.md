### packages/react-reconciler/src/ReactChildFiber.js

```js
/**
 * 更新元素节点
 *
 * @param {Object} returnFiber 父级fiber节点
 * @param {Object} current 当前fiber节点
 * @param {Object} element 新的React元素
 * @return {Object} 返回一个更新后的fiber节点
 */
function updateElement(returnFiber, current, element) {
  const elementType = element.type;
  if (current !== null) {
    // 能复用
    if (current.type === elementType) {
      const existing = useFiber(current, element.props);
      existing.return = returnFiber;
      return existing;
    }
  }

  // 不能复用
  const created = createFiberFromElement(element);
  created.return = returnFiber;
  return created;
}

/**
 * 更新一个slot，如果新的子节点和旧的fiber节点匹配，则返回更新后的fiber节点，否则返回null
 *
 * @param {Object} returnFiber 父级fiber节点
 * @param {Object|null} oldFiber 旧的fiber节点
 * @param {any} newChild 新的子节点
 * @return {Object|null} 返回一个更新后的fiber节点，如果新的子节点和旧的fiber节点不匹配，则返回null
 */
function updateSlot(returnFiber, oldFiber, newChild) {
  const key = oldFiber !== null ? oldFiber.key : null;
  if (newChild !== null && typeof newChild === "object") {
    switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE:
        if (newChild.key === key) {
          return updateElement(returnFiber, oldFiber, newChild);
        }

      default:
        return null;
    }
  }
  return null;
}
```

```diff
/**
 * 将新的子节点数组与旧的子Fiber进行比较，并返回新的子Fiber
 *
 * @param {Fiber} returnFiber - 新的父Fiber
 * @param {Fiber} currentFirstChild - 老fiber第一个子fiber
 * @param {Array} newChildren - 新的子节点数组
 * @return {Fiber} resultingFirstChild - 返回的新的子Fiber
 */
function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren) {
  let resultingFirstChild = null;
  let previousNewFiber = null;
  // 这个索引单独定义出来，还有个原因是：这三套方案交替进行的
  let newIdx = 0;
+ let oldFiber = currentFirstChild;
+ let nextOldFiber = null;

+ // 第一套方案：（按序比较，key 不同，立即中止）
+ for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
+   nextOldFiber = oldFiber.sibling;
+   // 尝试复用
+   const newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx]);
+   if (newFiber === null) {
+     break;
+   }
+   // 非初始化情况下
+   if (shouldTrackSideEffects) {
+     // 没有复用
+     if (oldFiber && newFiber.alternate === null) {
+       deleteChild(returnFiber, oldFiber);
+     }
+   }
+   // lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
+   if (previousNewFiber === null) {
+     resultingFirstChild = newFiber;
+   } else {
+     previousNewFiber.sibling = newFiber;
+   }
+   previousNewFiber = newFiber;
+   oldFiber = nextOldFiber;
+ }

+ // 第二套方案：(经过第一套方案后，老节点已经没有了，剩下的新节点全部新创建)
  if (oldFiber === null) {
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
+ }

+ // 第三套方案：（走到这里，说明新Fiber还没创建完 并且 剩下的老节点可能还存在复用）
+ // 把所有旧Fiber给它建立个关联 => { [fiber.key|fiber.index]: fiber }

  return resultingFirstChild;
}
```
