module.exports = {
  title: "notebook",
  description: "整理收集学习资料",
  dest: "./dist", // 设置输出目录
  base: "/notebook/",
  repo: "https://github.com/Relieved-hai/notebook", // 添加 github 链接
  themeConfig: {
    themeConfig: {
      lastUpdated: "Last Updated"
    },
    nav: [
      {
        text: "Notebook",
        link: "/notebook/"
      },
      {
        text: "Js",
        link: "/javascript/"
      },
      {
        text: "Ts",
        link: "/typescript/"
      },
      {
        text: "Node",
        link: "/node/"
      },
      {
        text: "flutter",
        link: "/flutter/"
      },
      {
        text: "Other",
        link: "/other/"
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
      "/notebook/": require('./catalog/notebook'),
      "/javascript/": require('./catalog/javascript'),
      "/typescript/": require('./catalog/typescript'),
      "/node/": require('./catalog/node'),
      "/flutter/": require('./catalog/flutter'),
      "/other/": require('./catalog/other'),
      "/writing/": require('./catalog/writing'),
      "/learn/": require('./catalog/learn/index'),
      "/learn_javascript_asdiasdkc/": require('./catalog/learn/javascript_asdiasdkc'),
      // fallback
      "/": ["" /* / */]
    }
  }
};
