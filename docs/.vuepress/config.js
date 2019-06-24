module.exports = {
  title: "notebook",
  description: "记事本",
  dest: "./dist", // 设置输出目录
  base: "/notebook/",
  repo: "https://github.com/Relieved-hai/notebook", // 添加 github 链接
  themeConfig: {
    themeConfig: {
      lastUpdated: "Last Updated"
    },
    nav: [
      {
        text: "blog",
        link: "https://Relieved-hai.github.io/"
      },
      {
        text: "GitHub",
        link: "https://github.com/Relieved-hai/notebook"
      }
    ],
    sidebar: [
      {
        title: "Javascript",
        collapsable: false,
        children: [
          ["/js/test/", "j"]
        ]
      },
      {
        title: "Css",
        collapsable: false,
        children: [
          ["/css/resetcss/", "清除默认样式"],
          ["/css/loading/", "加载动画"]
        ]
      }
    ]
  }
};
