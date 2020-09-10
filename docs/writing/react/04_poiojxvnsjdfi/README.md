<auth-auth />

## PWA简介

`PWA ( Progressive Web App / 渐进式 Web 应用程序 )`，从名字上可以看出，它对业务的部署并非一蹴而就的，可以循序渐进的实现它，每次只实现一部分，这个特性既降低了业务的部署成本，也适应了浏览器厂商的更新节奏，更容易被广大开发者所接受，那么它是如何实现渐进式的呢，它是有一系列相互解耦的技术组成，如下

- **Service Worker ( 服务工作线程 )**

  - 相信大家一定接触过 `Web Worker`，一种独立于主线程的运行环境，一般用来处理较复杂的运算逻辑操作，不会阻塞页面的渲染，与主线程通过 `postMessage` 进行通信

  - `Service Worker` 与 `Web Worker` 类似，但它拥有更多的特性

    - 如，常驻内存运行 ( 独立于页面 )

    - 如，代理请求

    - 如，依赖 `HTTPS` ( 仅在 `HTTPS` 环境下运行... )

    - 。。。

    - 这是最重要的一个 `API`，它就是整个 `PWA` 系统的大脑

- **Promise ( "承诺" 控制流 )**

  - 优化回调地狱

  - `async / await` 语法同步化

  - `Service Worker` 中就存在大量的 `Promise` 风格的 `API`

- **fetch**

  - 之前在 `HTML` 中发起异步请求都是靠 `XMLHttpRequest` 对象，使用起来很麻烦，还需要自己解析返回值，很多年都没有改善，直到 fetch 的出现

  - 比 `XMLHttpRequest` 更简洁

  - `Promise` 风格的 `API`

  - `fetch` 暂时还不能完全取代 `XMLHttpRequest`，如不支持 `progress` ( 监控读取进度/性能报告 ) 和 `abort` ( 中断请求 )

- **cache API**

  - 支持资源的存储系统

  - 这是一种很强大的 `API`，以前在浏览器端，我们往 `cookie`，`localStorage` 里写入数据，都是内存数据，对于 `js`、`css`、`image` 我们没有办法操作，`cache` 它就不同了，我们可以直接进行资源请求，并返回 `cache` 中的数据，这个过程对浏览器是透明的，这就运行我们的页面在没有网络的情况下，依然运行，这是 `PWA` 一个非常非常重要的特性

  - 缓存资源 ( `css`/`scripts`/`image` )

  - 依赖 `Service Worker` 代理网络请求

  - 支持离线程序运行

- **Notification API**

  - 消息推送

  - 依赖用户授权

  - 使用 `Service Worker` 去推送

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## 服务工作线程：Service Worker

它在 `PWA` 中是最基础，最重要的概念，它对浏览器是有要求的，如果是老旧浏览器，我们是没办法 `mock` 的，在使用它之前最好判断一下浏览器的支持情况

`PWA` 需要在 `http` 协议下来访问页面，因为 `file` 协议下是不可以运行 `Server Worker` 的

<br/>
<br/>
<br/>

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="./index.css">
</head>
<body>
<script>
  // serviceWorker 是一个单例对象
  navigator.serviceWorker
    /**
     * 注册
     *  arg1: Service Worker 脚本关联的地址
     *  arg2: options 各种配置选项，其中 scope 不严格的讲，是控制的页面，就是当前目录下所以的页面
     **/
    .register('./sw.js', { scope: '/pwa/' })
    .then(
      registration => {
        // console.log(registration);
      },
      err => {
        console.error(err);
      }
    )
</script>
</body>
</html>
```

<br/>
<br/>

`index.css`

```css

```

<br/>
<br/>

`sw.js`

```js
/**
 * 在 Service Worker 的上下文中，第一不能访问 dom，第二也不能访问 window、localStorage、...诸如此类的对象，这是一个全新的上下文，只有一些特有的全局对象可以访问，如 self ( 代表 sw 的全局作用域对象 )
 *
 *
 * Service Worker 是以生命周期事件的形式提供的 API 交互手段
 *
 * service worker 的编程就是与其生命周期打交道,
 *
 */

// 执行一次
// 在一个新的 Service Worker 脚本被安装后触发，注意只要内容有一丝丝不同，浏览器就会认为这是两个不同的 service worker 版本，新的版本会被下载，安装，但不会立即生效，因为当前生效的是上一个版本
self.addEventListener('install', event => {
  console.log('install', event)

  /*
  该函数接受一个 Promise，当 Promise 完成之后，install 才真正的完成，这就意味着它会推迟 activate 的执行

  event.waitUntil(new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 5000)
  }))
  */

  // 强制使用新的 Service Worker
  event.waitUntil(self.skipWaiting())
})

// 执行一次
// 就是表示当前的 Service Worker 被正式启用
self.addEventListener('activate', event => {
  console.log('activate', event)

  // 这里的 claim 指的是 Service Worker 控制的所有页面，该方法能够让页面在首次加载后，同样收到 Service Worker 的控制，在默认情况下，首次是不受控制的
  event.waitUntil(self.clients.claim())
})

// 执行多次
// 用来捕获事件请求的
self.addEventListener('fetch', event => {
  console.log('fetch', event)
})

```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## “承诺”控制流：Promise

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## 更优雅的请求：fetch


**使用 XMLHttpRequest 进行请求**

```js
const xhr = new XMLHttpRequest()

xhr.responseType = 'json';

xhr.onreadystatechange = () => {
  if(xhr.readyState === 4) {
    if(xhr.status >= 200 && xhr.status < 300) {
      console.log(xhr.response);
    }
  }
}

xhr.open('GET', 'userinfo.json', true)

xhr.send(null)
```

<br/>

**使用 fetch 进行请求**

```js
fetch('/userinfo.json')
  .then(response => response.json())
  .then(info => console.log(info))



const req = new Request('/userinfo.json',{
  method: 'GET',
  // body
  headers: new Headers(),
  credentials: 'include'
})

fetch(req)
  .then(response => response.json())
  .then(info => console.log(info))
```

<br/>

在 `Service Worker` 中是访问不到 `XMLHttpRequest`，`fetch` 是唯一的发起请求的方法，但是 `fetch` 并不是万能的，它还是属于一种比较低级的 `API`，它不能提供上传进度的功能，也不能控制超时时间，还不能主动中断请求，如果在非 `Service Worker` 上下文中，一般都不会使用 `fetch`。

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## 资源的缓存系统：Cache API

毫不客气的说，除了 `Service Worker` 可以称之为 `PWA` 的灵魂之外，就只有 `cache API` 可以称为 `PWA` 的顶梁柱，因为它使得我们的 `web` 应用在离线环境下运行成为了可能。


`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link rel="stylesheet" href="./index.css">
</head>
<body>
<h1>Hello PWA</h1>
<script>
  navigator.serviceWorker
    .register('./sw.js', { scope: '/pwa/' })
    .then(
      registration => {
        // console.log(registration);
      },
      err => {
        console.error(err);
      }
    )
</script>
</body>
</html>

```

<br/>

`sw.js`

```js
const CACHE_NAME = 'cache-v1'

self.addEventListener('install', event => {
  console.log('install', event)

  // 1、打开缓存空间
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // 写入缓存，参数为资源列表，每一项都是
      cache.addAll(['/pwa/', './index.css'])
    })
  )
})

self.addEventListener('activate', event => {
  console.log('activate', event)

  // 3、将旧缓存给移除
  event.waitUntil(
    // 获取缓存中所有的 key
    caches.keys().then(cacheNames => {
      return Promise.all(cacheNames.map(cacheName => {
        if (cacheName !== CACHE_NAME) return caches.delete(cacheName)
      }))
    })
  )
})

self.addEventListener('fetch', event => {
  console.log('fetch', event)

  /**
   * 2、捕获到包括 html、css 的所有请求
   *   ① 进入 cache 中查询
   *   ② 有返回
   *   ③ 无，发起网络请求获取
   */
  event.respondWith(
    caches.open(CACHE_NAME).then(cache => {
      return cache.match(event.request).then(response => {
        // 存在，就是命中缓存，返回
        if (response) return response

        // 无，发起网络请求
        return fetch(event.request).then(response => {
          // arg1: key，arg2: value ( request 是流式的，只能读取一次，为了缓存可读取，克隆一份出来 )
          cache.put(event.request, request.clone())
          // 返回
          return response
        })
      })
    })
  )
})

```


<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## 消息推送：Notification API

通知应该不会陌生，每个一个应用程序，都在想法设法的让你开启通知权限，以便在合适的时机告诉你一些资讯，总之，通知是一种用户被动接受消息的方式，对于常驻后台的应用程序来说，能够发起通知，这是理所当然的，那么对于 `web` 应用来说，我们显然不能指望用户一直停留在页面上，我们期望，即使页面关闭了,只要浏览器进程还在，就依然有弹出通知的途径，毫无疑问 `PWA` 中的 `Service Worker` 正是最适合弹出通知的地方。不仅如此，它还能接受到 `post` 事件，和 `Notification` 简直是天作之合。

<br/>
<br/>
<br/>

在浏览器控制台中

```js
/**
 * 1、页面上下文中的 Notification
 **/

// 查询用户是否授权我们使用通知，它有三个值 ( default、denied、granted )
Notification.permission

// 让用户进行通知授权
Notification.requestPermission().then(permission => console.log(permission))

// 当用户授权同意后，使用
new Notification('hello notification', { body: 'This is from console' })



/**
 * 2、Service Worker 的上下文中
 **/

// 它的默认值是 denied
Notification.permission

// Notification.requestPermission is not a function，会提示它不存在
Notification.requestPermission().then(permission => console.log(permission))

// 因为相对于的页面不打开的话，这个授权请求都没地方弹，即使让它弹，用户也不好直观的判断是那个页面在请求授权，所以要获取授权，需在页面的上下文中获取

// 在页面上下文中,用户授权同意后，使用。
// 这里创建通知和页面中不一样，不允许我们把 Notification 当做构造函数来创建通知，只有一个方法
self.registration.showNotification('hello', { body: 'This is from console' })

// 这个 registration，其实就是我们在 index.html 中注册 Service Worker 所得到的对象
```


<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## 如何在项目中开启 PWA

react 项目中，则是使用的 google 的 [workbox](https://developers.google.cn/web/tools/workbox/)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

