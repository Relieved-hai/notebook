## 项目工程初始化

将之前 todo-list 项目的代码进行改造

1、移除无用代码

  ```shell script
  cd src

  # 遍历所以文件，将除了 serviceWorker.js 的文件全部删除
  ls | grep -v serviceWorker.js | xargs rm
  ```

2、编译系统改造
  - 我们用 create-react-app 初始化的是一个 SPA 的项目，只有一个页面，我们需要将其编译成四个页面

  ```shell script
  mkdir index
  cd index
  touch index.js
  touch index.css
  touch App.jsx
  touch App.css
  touch reducers.js
  touch actions.js
  touch store.js
  ```

`App.jsx`
```jsx
import { connect } from 'react-redux'
import './App.css'

function App(props) {
}

/**
 * 该文件不仅仅只作为组件的入口，还需要从 store 中获取必要的数据
 **/
export default connect(
  function mapStateToProps(state) {
  },
  function mapDispatchToProps(dispatch) {
  }
)(App);
```

`index.js`
```jsx
import React from "react";
import ReactDom from 'react-dom'
import { Provider } from 'react-redux'
// 同一各个浏览器下的默认样式
import 'normalize.css/normalize.css'
import store from './store'
import './index.css'
import App from './App'


ReactDom.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root')
)
```

`reducers.js`
```js
export default {}
```

`store.js`
```js
import {
  createStore,
  combineReducers,
  applyMiddleware
} from "redux";

import reducers from "./reducers";
import thunk from 'react-thunk'

export default createStore(
  combineReducers(reducers),
  {
    // 默认值
  },
  applyMiddleware(thunk)
)
```


  <br/>

  - 将 index 拷贝成三个目录来
  ```shell script
  cp -r index query
  cp -r index ticket
  cp -r index order
  ```

  <br/>

  - 复制 html
  ```shell script
  cd ../public
  cp index.html query.html
  cp index.html ticket.html
  cp index.html order.html
  ```

  - 修改 HTML 的 title

<br/>

  - 修改配置文件

  `/config/paths.js`

```js
module.exports = {
  // code...
  // 修改之前，由于是单页，所以这里需要配置输出
  // appHtml: resolveApp('public/index.html'),
  // appIndexJs: resolveModule(resolveApp, 'src/index'),

  // 修改之后
  appHtml: resolveApp('public/index.html'),
  appQueryHtml: resolveApp('public/query.html'),
  appTicketHtml: resolveApp('public/ticket.html'),
  appOrderHtml: resolveApp('public/order.html'),
  appIndexJs: resolveModule(resolveApp, 'src/index/index'),
  appQueryJs: resolveModule(resolveApp, 'src/query/index'),
  appTicketJs: resolveModule(resolveApp, 'src/ticket/index'),
  appOrderJs: resolveModule(resolveApp, 'src/order/index'),
  // code...
}
```

  `/config/webpack.config.js`

```js
return {
  // code...
  // 同上一样，修改之前是单页配置
  // entry: [
  //   isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient'),
  //   paths.appIndexJs,
  // ].filter(Boolean),

  // 修改之后
  entry: {
    index: [paths.appIndexJs, isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient')].filter(Boolean),
    query: [paths.appQueryJs, isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient')].filter(Boolean),
    ticket: [paths.appTicketJs, isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient')].filter(Boolean),
    order: [paths.appOrderJs, isEnvDevelopment && require.resolve('react-dev-utils/webpackHotDevClient')].filter(Boolean),
  },
  // code...
}

// code...
plugins: [
  // 修改之前是单页配置
  new HtmlWebpackPlugin(
    Object.assign(
      {},
      {
        inject: true,
        template: paths.appHtml,
      },
      isEnvProduction
        ? {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }
        : undefined
    )
  ),
  // 修改之后，一共四份代码
  new HtmlWebpackPlugin(
    Object.assign(
      {},
      {
        inject: true,
        template: paths.appHtml, // for [paths.appHtml, paths.appQueryHtml, paths.appTicketHtml, paths.appOrderHtml]
        filename: 'index.html', // 构建后的文件名 for ['index.html', 'query.html', 'ticket.html', 'order.html']
        chunks: ['index'] // 构建后的chunks ['index', 'query', 'ticket', 'order']
      },
      isEnvProduction
        ? {
          minify: {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
        }
        : undefined
    )
  ),
]
// code...


// 最后！最后！最后！
new ManifestPlugin({
    fileName: 'asset-manifest.json',
    publicPath: paths.publicUrlOrPath,
    generate: (seed, files, entrypoints) => {
      const manifestFiles = files.reduce((manifest, file) => {
        manifest[file.name] = file.path;
        return manifest;
      }, seed);
      // 改前
      // const entrypointFiles = entrypoints.main.filter(
      // 改后：原因参考 https://segmentfault.com/a/1190000022787672
      const entrypointFiles = entrypoints.index.filter(
        fileName => !fileName.endsWith('.map')
      );

      return {
        files: manifestFiles,
        entrypoints: entrypointFiles,
      };
    },
  }),
```

<br/>
<br/>
<br/>

## 为项目搭建Mock Server
