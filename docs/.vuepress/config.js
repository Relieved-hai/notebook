const notebookJs = [
  {
    title: "Javascript",
    collapsable: true,
    children: [
      ["/notebook/js/loop_methods/", "寻合适的遍历方法"],
      ["/notebook/js/arr_sort/", "数组排序"],
      ["/notebook/js/array/", "数组 Array"],
      ["/notebook/js/number/", "数字 Number"],
      ["/notebook/js/object/", "对象 Object"],
      ["/notebook/js/string/", "字符串 String"],
      ["/notebook/js/function/", "函数 Function"],
      ["/notebook/js/dom/", "文档对象 DOM"],
      ["/notebook/js/bom/", "浏览器对象 BOM"],
      ["/notebook/js/design/", "设计模式"]
    ]
  },
  {
    title: "Css",
    collapsable: true,
    children: [
      ["/notebook/css/resetcss/", "清除默认样式"],
      ["/notebook/css/boxsizeing/", "盒模型"],
      ["/notebook/css/vertical/", "垂直居中"],
      ["/notebook/css/layout/", "三栏布局"],
      ["/notebook/css/position_width/", "绝对定位宽度撑开"],
      ["/notebook/css/loading/", "加载动画"],
      ["/notebook/css/weather/", "天气动画"]
    ]
  }
];
const javascriptJs = [
  {
    title: "调用堆栈",
    collapsable: true,
    children: [
      ["/javascript/stack/context_stack/", "执行上下文和执行栈"],
      ["/javascript/stack/stack_variable/", "执行上下栈和变量对象"],
      ["/javascript/stack/memory_space/", "内存空间"],
      ["/javascript/stack/memory_mechanism/", "内存机制"],
      ["/javascript/stack/memory_leak/", "常见内存泄漏"]
    ]
  },
  {
    title: "作用域闭包",
    collapsable: true,
    children: [
      ["/javascript/scope_closure/chain_closure/", "作用域链和闭包"],
      ["/javascript/scope_closure/from_chain_closure/", "从作用域链理解闭包"],
      ["/javascript/scope_closure/closure_solution/", "闭包题解"]
    ]
  },
  {
    title: "this",
    collapsable: true,
    children: [
      ["/javascript/this/binding_resolution/", "this 绑定解析"],
      ["/javascript/this/arrow_function/", "this 绑定之箭头函数"],
      ["/javascript/this/call_apply_bind/", "call、apply、bind"],
      ["/javascript/this/new/", "new"]
    ]
  },
  {
    title: "原型 Prototype",
    collapsable: true,
    children: [
      ["/javascript/prototype/know/", "构造函数、原型、原型链"],
      ["/javascript/prototype/understand/", "原型链及其继承优缺点"]
    ]
  },
  {
    title: "其他",
    collapsable: true,
    children: [["/javascript/other/event_loop/", "Event Loop"]]
  }
];
const typescriptJs = [
  {
    title: "Typescript 入门",
    collapsable: true,
    children: [
      ["/typescript/types/", "类型"],
      ["/typescript/interface/", "接口"],
      ["/typescript/class/", "类"],
      ["/typescript/function/", "函数"],
      ["/typescript/genericity/", "泛型"],
      ["/typescript/other/", "其他"]
    ]
  }
];
const nodeJs = [
  {
    title: "Node",
    collapsable: true,
    children: []
  }
];
const flutterJs = [
  {
    title: "flutter",
    collapsable: true,
    children: [
      ["/flutter/practical_skills/name_icon/", "图标、名字"],
      ["/flutter/practical_skills/screen/", "屏幕方向"],
      ["/flutter/practical_skills/splash/", "启动页"],
      ["/flutter/practical_skills/nav_bar/", "状态栏"]
    ]
  }
];
const otherJs = [
  {
    title: "小程序",
    collapsable: true,
    children: [
      ["/other/wechat/mixins/", "mixins"]
    ]
  },
  {
    title: "Java",
    collapsable: true,
    children: [
      ["/other/java/one/", "面向对象"],
      ["/other/java/encapsulation/", "封装"],
      ["/other/java/inheritance/", "继承"],
      ["/other/java/polymorphism/", "多态"]
      // ["/other/java/design_pattern/", "设计模式"],
    ]
  },
  {
    title: "Nginx",
    collapsable: true,
    children: [["/other/nginx/", "nginx"]]
  },
  {
    title: "Http",
    collapsable: true,
    children: [
      ["/other/http/one/", "HTTP协议"],
      ["/other/http/two/", "HTTP协议结构和通讯原理"],
      ["/other/http/three/", "HTTP协议的特性和使用方法"],
      ["/other/http/four/", "HTTPS"],
      ["/other/http/five/", "HTTP的功能追加协议"]
      // ["/other/http/six/", "Web安全威胁解析"],
    ]
  },
  {
    title: "Jest",
    collapsable: true,
    children: [
      ["/other/jest/test/", " 测试"],
      ["/other/jest/understand/", " 认识 jest"],
      ["/other/jest/use/", "基本使用"],
      ["/other/jest/hook/", "钩子函数"],
      ["/other/jest/mock/", "mock"],
      ["/other/jest/snapshot/", "snapshot"],
      ["/other/jest/class/", "class"]
    ]
  }
];
const writingJs = [
  {
    title: "react",
    collapsable: true,
    children: [
      ["/writing/react/01_aklsdjkncvxcv/", "学习手记 1"],
      ["/writing/react/02_kzxjcklzxcdof/", "学习手记 2"],
    ]
  },
  {
    title: "MySQL",
    collapsable: true,
    children: [
      ["/writing/mysql/01_asdazxczxcsd/", "one"],
      ["/writing/mysql/02_zjooppbmkfbf/", "two"],
      ["/writing/mysql/03_idfobvcvbmcv/", "three"],
    ]
  },
];

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
      "/notebook/": notebookJs,
      "/javascript/": javascriptJs,
      "/typescript/": typescriptJs,
      "/node/": nodeJs,
      "/flutter/": flutterJs,
      "/other/": otherJs,
      "/writing/": writingJs,
      // fallback
      "/": ["" /* / */]
    }
  }
};
