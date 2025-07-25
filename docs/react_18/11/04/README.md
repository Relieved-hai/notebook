### packages/react-reconsiler/src/ReactChildFiber.js

```js
// ...
import { HostText } from "./ReactWorkTags";

/**
 * 将剩余的子节点映射到一个Map对象中
 *
 * @param {Object|null} returnFiber 父级fiber节点
 * @param {Object|null} existingChildren 已经存在的子节点
 * @return {Map|null} 返回一个Map对象，键是子节点的key，值是子节点的fiber节点
 */
function mapRemainingChildren(returnFiber, currentFirstChild) {
  const existingChildren = new Map();
  let existingChild = currentFirstChild;
  while (existingChild != null) {
    if (existingChild.key !== null) {
      existingChildren.set(existingChild.key, existingChild);
    } else {
      existingChildren.set(existingChild.index, existingChild);
    }
    existingChild = existingChild.sibling;
  }
  return existingChildren;
}

/**
 * 如果当前节点是文本节点则复用，否则创建新的文本节点。
 *
 * @param {Fiber} returnFiber - 父级Fiber节点
 * @param {Fiber} current - 当前处理的Fiber节点
 * @param {string} textContent - 文本内容
 * @returns {Fiber} 新的或者复用的文本节点
 */
function updateTextNode(returnFiber, current, textContent) {
  if (current === null || current.tag !== HostText) {
    const created = createFiberFromText(textContent);
    created.return = returnFiber;
    return created;
  } else {
    const existing = useFiber(current, textContent);
    existing.return = returnFiber;
    return existing;
  }
}

/**
 * 从现有的子节点映射中更新Fiber节点
 *
 * @param {Map} existingChildren - 现有的子节点映射
 * @param {Fiber} returnFiber - 父级Fiber节点
 * @param {number} newIdx - 新节点的索引
 * @param {any} newChild - 新的子节点
 * @returns {Fiber} 更新后的Fiber节点
 */
function updateFromMap(existingChildren, returnFiber, newIdx, newChild) {
  if (
    (typeof newChild === "string" && newChild !== "") ||
    typeof newChild === "number"
  ) {
    const matchedFiber = existingChildren.get(newIdx) || null;
    return updateTextNode(returnFiber, matchedFiber, "" + newChild);
  }
  if (typeof newChild === "object" && newChild !== null) {
    switch (newChild.$$typeof) {
      case REACT_ELEMENT_TYPE: {
        const matchedFiber =
          existingChildren.get(newChild.key === null ? newIdx : newChild.key) ||
          null;
        return updateElement(returnFiber, matchedFiber, newChild);
      }
    }
  }
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
  let oldFiber = currentFirstChild;
  let nextOldFiber = null;
+ // 是老Fiber数组中，可复用，且不用移动的Fiber索引值-  复用节点的顺序和老节点当中的相对顺序是一致的，哪些节点是在这个起点后面
+ let lastPlacedIndex = null;

// 第一套方案：（按序比较，key 不同，立即中止）
  for (; oldFiber !== null && newIdx < newChildren.length; newIdx++) {
    nextOldFiber = oldFiber.sibling;
    // 尝试复用
    const newFiber = updateSlot(returnFiber, oldFiber, newChildren[newIdx]);
    if (newFiber === null) {
      break;
    }
    // 非初始化情况下
    if (shouldTrackSideEffects) {
      // 没有复用
      if (oldFiber && newFiber.alternate === null) {
        deleteChild(returnFiber, oldFiber);
      }
    }
    // lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
    if (previousNewFiber === null) {
      resultingFirstChild = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
    oldFiber = nextOldFiber;
  }

  // 第二套方案：(经过第一套方案后，老节点已经没有了，剩下的新节点全部新创建)
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
  }

  // 第三套方案：（走到这里，说明新Fiber还没创建完 并且 剩下的老节点可能还存在复用）
  // 把所有旧Fiber给它建立个关联 => { [fiber.key|fiber.index]: fiber }
+ const existingChildren = mapRemainingChildren(returnFiber, oldFiber);
+ for (; newIdx < newChildren.length; newIdx++) {
+   // 尝试复用
+   const newFiber = updateFromMap(
+     existingChildren,
+     returnFiber,
+     newIdx,
+     newChildren[newIdx]
+   );
+
+   if (newFiber !== null) {
+     if (shouldTrackSideEffects) {
+       if (newFiber.alternate !== null) {
+         // 尝试复用成功，从 map 中移除
+         existingChildren.delete(
+           newFiber.key === null ? newIdx : newFiber.key
+         );
+       }
+     }
+     // lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
+     if (previousNewFiber === null) {
+       resultingFirstChild = newFiber;
+     } else {
+       previousNewFiber.sibling = newFiber;
+     }
+     previousNewFiber = newFiber;
+   }
+ }

  return resultingFirstChild;
}
```
