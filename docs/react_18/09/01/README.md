### 初始化大体结构

```
react-18/
  ├── packages/
  │   ├── react/
  │   ├── react-dom/
  │   ├── react-dom-bindings/
  │   ├── react-reconciler/
  │   ├── scheduler/
  │   ├── shared/
  │   ├── index.jsx
  ├── index.html
  ├── jsconfig.json
  ├── package.json
  ├── vite.config.js
```

文件目录说明：

- `react/`：暴露普通的 React API
- `react-dom/`：根渲染相关的
- `react-dom-bindings/`：React18 抽离出来的，两大作用 ① 事件系统 ② 对真实 DOM 的具体操作
- `react-reconciler/`：几乎包括了 Fiber 架构下的所有内容，domdiff 也在其中，初始化渲染过程大部分也在其中，重中之重
- `scheduler/`：fiber 是一个个独立单元，它承担的就是优先级排列的分配调度
- `shared/`：工具函数

<br/>
<br/>
<br/>

### index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>React18-Core</title>
  </head>

  <body>
    <div id="root"></div>
    <script type="module" src="/packages/index.jsx"></script>
  </body>
</html>
```

<br/>
<br/>
<br/>

### jsconfig.json

Visual Studio Code 中用于配置 JavaScript 项目的文件，主要作用是提升开发体验，通过提供智能代码补全、类型检查、模块路径解析等功能增强编码效率。

```json
{
  "compilerOptions": {
    "baseUrl": "packages",
    "paths": {
      "react/*": ["react/*"],
      "react-dom/*": ["react-dom/*"],
      "react-dom-bindings/*": ["react-dom-bindings/*"],
      "react-reconciler/*": ["react-reconciler/*"],
      "scheduler/*": ["scheduler/*"],
      "shared/*": ["shared/*"]
    }
  },
  "exclude": ["node_modules"]
}
```

<br/>
<br/>
<br/>

### package.json

```json
{
  "name": "react18-core",
  "version": "1.0.0",
  "description": "core logic about react 18",
  "main": "index.js",
  "scripts": {
    "start": "vite"
  },
  "repository": {
    "type": "git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^4.3.3"
  },
  "devDependencies": {
    "@babel/core": "^7.28.0",
    "@babel/plugin-transform-react-jsx": "^7.27.1"
  }
}
```

<br/>
<br/>
<br/>

### vite.config.js

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      react: path.resolve("packages/react"),
      "react-dom": path.resolve("packages/react-dom"),
      "react-dom-bindings": path.resolve("packages/react-dom-bindings"),
      "react-reconciler": path.resolve("packages/react-reconciler"),
      scheduler: path.resolve("packages/scheduler"),
      shared: path.resolve("packages/shared"),
    },
  },
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "@babel/plugin-transform-react-jsx",
            {
              runtime: "automatic",
              importSource: path.resolve("packages/react"), // 指定自定义的 jsx
            },
          ],
        ],
      },
    }),
  ],
  optimizeDeps: {
    force: true,
  },
  server: {
    port: 8000,
  },
});
```
