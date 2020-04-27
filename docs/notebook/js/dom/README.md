## 判断当前位置是否为页面底部
```js
function bottomVisible() {
  return document.documentElement.clientHeight + window.scrollY >= (document.documentElement.scrollHeight || document.documentElement.clientHeight)
}
```

## 判断元素是否在可视范围内
```js
// partiallyVisible为是否为完全可见
function elementIsVisibleInViewport(el, partiallyVisible = false) {
  const {top, left, bottom, right} = el.getBoundingClientRect()

  return partiallyVisible ?
    ((top > 0 && top < innerHeight) || (bottom > 0 && bottom < innerHeight)) &&
    ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth)) :
    top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth
} 
```

## 获取元素css样式
```js
function getStyle(el, ruleName) {
  return getComputedStyle(el, null).getPropertyValue(ruleName)
}
```

## 进入全屏
```js
function launchFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen()
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullScreen()
  }
}

launchFullscreen(document.documentElement)
launchFullscreen(document.getElementById("id"))
```

## 退出全屏
```js
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen()
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen()
  }
}

exitFullscreen()
```

## 全屏事件
```js
document.addEventListener("fullscreenchange", function (e) {
  if (document.fullscreenElement) {
    console.log('进入全屏')
  } else {
    console.log('退出全屏')
  }
})
```

## 判断dom元素是否具有某个className
```js
/**
*  Example1 (使用HTML5新增classList 来操作类名)
*    1、classList.add(newClassName)；添加新的类名，如已经存在，取消添加
*    2、classList.contains(oldClassName)：确定元素中是否包含指定的类名，返回值为true，false
*    3、classList.remove(oldClassName)：移除已经存在的类名;
*    4、classList.toggle(className)：如果classList中存在给定的值，删除它，否则，添加它；
*/
let div = document.getElementById('test')
console.log(div.classList.contains("te")) // true


/**
* Example2 
*/
const hasClass = (el, className) => new RegExp(`(^|\\s)${className}(\\s|$)`).test(el.className);
```

## 显示全部DOM边框
```js
[].forEach.call($$("*"), dom => {
    dom.style.outline = "1px solid #" + (~~(Math.random() * (1 << 24))).toString(16);
});


[].forEach.call(document.querySelectorAll('*'),function(a){a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16)})
```

## rem，dpi
```js
/**
* rem
*/
(function (doc, win) {
  var docEl = doc.documentElement
  var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'

  function recalc() {
    var designWidth = 750
    var clientWidth = docEl.clientWidth
    if (!clientWidth || clientWidth > designWidth) return
    docEl.style.fontSize = (100 * clientWidth / designWidth) + 'px'
  }

  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
  doc.addEventListener('DOMContentLoaded', recalc, false)
})(document, window)


/**
* dpi
*/
(function () {
  var width = parseInt(window.screen.width)
  var designWidth = 450
  var scale = width / designWidth
  var userAgent = navigator.userAgent.toLowerCase()
  var metaHead = '<meta name="viewport" content="width=' + designWidth + ','
  if (/android (\d+\.\d+)/.test(userAgent)) {
    if (parseFloat(RegExp.$1) > 2.3) metaHead += 'minimum-scale=' + scale + ',maximum-scale=' + scale + ','
  } else {
    metaHead += 'user-scalable=no,';
  }
  metaHead += 'target-densitydpi=device-dpi">';
  document.write(metaHead);
})()

// 安卓 2.3 的检测感觉已经不需要了，所以可以直接将 meta 标签写在页面里
```

## 窗口或元素中平滑滚动
```js
window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
})
```
