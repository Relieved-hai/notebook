### 搭建环境

概念有个印象后，就可以搭建环境探索了

- node 环境（node v18.6.0 npm 8.19.3）
- 执行 `npx create-react-app simple-react`
- 执行 `npm start`
- 删除非必要代码，目录最后精简如下

```
- ...
- public/
  - index.html
- src/
  - index.js
- ...
```

package.json 中的启动脚本需要简单修改下，依然使用旧的转换模式

```json
  "scripts": {
    "start": "DISABLE_NEW_JSX_TRANSFORM=true react-scripts start",
  },
```
