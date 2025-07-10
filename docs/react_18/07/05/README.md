[useLayoutEffect](https://react.dev/reference/react/useLayoutEffect)，它与 useEffect 非常相似，但它会在浏览器进行任何绘制之前调用。这意味着 useLayoutEffect 可以用来读取 DOM 布局并同步触发 UI 的更新，这对于需要确保在浏览器绘制前完成某些操作的场景非常有用。

::: warning 不推荐
useLayoutEffect 可能有性能问题，官方推荐优先使用 useEffect
:::

<br/>

### hooks.js

```js
// ...

export function useLayoutEffect(effectFunction, deps = []) {
  const currentIndex = hookIndex;
  const [destroyFunction, preDeps] = states[hookIndex] || [null, null];

  if (
    !states[hookIndex] ||
    deps.some((item, index) => item !== preDeps[index])
  ) {
    // 微任务，它会在重新渲染之前触发
    queueMicrotask(() => {
      // 销毁函数
      destroyFunction && destroyFunction();
      states[currentIndex] = [effectFunction(), deps];
    });
  }

  hookIndex++;
}
```
