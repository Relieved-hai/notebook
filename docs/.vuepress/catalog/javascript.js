module.exports = [
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
    children: [
      {
        title: "EventLoop",
        children: [
          ["/javascript/other/event_loop/term/", '术语'],
          ["/javascript/other/event_loop/browser/", '浏览器中的 event loop']
        ]
      }
    ]
  }
];
