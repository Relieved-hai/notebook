## 获取滚动条位置
```js
function getScrollPosition(el = window) {
  return {
    x: (el.pageXOffset !== undefined) ? el.pageXOffset : el.scrollLeft,
    y: (el.pageYOffset !== undefined) ? el.pageYOffset : el.scrollTop
  }
}
```

## 获取url中的参数
```js
function getURLParameters(url) {
  const params = url.match(/([^?=&]+)(=([^&]*))/g)
  return params?params.reduce(
    (a, v) => (a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1), a), {}
  ):[]
}
```

## 页面跳转，是否记录在history中
```js
function redirect(url, asLink = true) {
  asLink ? window.location.href = url : window.location.replace(url)
}

```

## 滚动条回到顶部动画
```js
function scrollToTop() {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  if (scrollTop > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  } else {
    window.cancelAnimationFrame(scrollToTop)
  }
}
```

## 复制文本
```js
function copy(str) {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  el.style.top = '-9999px'
  document.body.appendChild(el)
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}
```

