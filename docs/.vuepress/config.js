module.exports = {
  title: "notebook",
  description: "整理收集学习资料",
  dest: "./dist", // 设置输出目录
  base: "/notebook/",
  repo: "https://github.com/Relieved-hai/notebook", // 添加 github 链接
  themeConfig: {
    nav: [
      {
        text: "Notebook",
        link: "/notebook/"
      },
      {
        text: "Learn",
        link: "/learn/"
      },
      // {
      //   text: "writing",
      //   link: "/writing/"
      // },
      {
        text: "GitHub",
        link: "https://github.com/Relieved-hai/notebook"
      }
    ],
    sidebar: {
      // "/typescriptt/": require('./catalog/typescriptt'),
      // "/node/": require('./catalog/node'),
      // "/flutter/": require('./catalog/flutter'),
      /* === javascript === */
      "/thank/": [],
      "/notebook/": require('./catalog/notebook'),
      "/javascript/": require('./catalog/javascript'),
      "/typescript/": require('./catalog/typescript'),
      "/writing/": require('./catalog/writing'),
      "/learn/": require('./catalog/learn/index'),
      "/learn_javascript_asdiasdkc/": require('./catalog/learn/javascript_asdiasdkc'),
      /* === css === */
      "/css_tricks/": require('./catalog/css_tricks'),
      "/css_lhammer/": require('./catalog/css_lhammer'),
      "/css_chokcoco/": require('./catalog/css_chokcoco'),
      /* === other === */
      "/other/": require('./catalog/other'),
      "/http/": require('./catalog/http'),
      // fallback
      "/": ["" /* / */]
    }
  },
  // lastUpdated: "Last Updated",
  smoothScroll: true,
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  a() {
    for (let i = 0; i < dom.length; i++) {
      const text = dom[i].innerText
      if (/慕课 | MK | mk | m | k | 某课 | 慕 | 课 | WEB | web | 前端 | 前 | 端 | 全栈 | 架构/.test(text) !== -1) {
        console.log(text)
      }
    }
  }
};
