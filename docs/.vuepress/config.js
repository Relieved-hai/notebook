module.exports = {
  title: "notes",
  description: "notes",
  dest: "./dist", // 设置输出目录
  base: "/notes/",
  repo: "https://github.com/Relieved-hai/css_tricks", // 添加 github 链接
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
        title: "工具",
        collapsable: false,
        children: [
          ["/test/", "test"],
          ["/test2/", "test"]
        ]
      }
    ]
  }
};
