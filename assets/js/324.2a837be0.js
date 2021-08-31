(window.webpackJsonp=window.webpackJsonp||[]).push([[324],{1144:function(s,t,a){"use strict";a.r(t);var n=a(19),e=Object(n.a)({},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"javascript-特性"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#javascript-特性","aria-hidden":"true"}},[s._v("#")]),s._v(" JavaScript 特性")]),s._v(" "),a("p",[s._v("本章简要回顾我们到现在为止学到的 JavaScript 特性，并特别注意了一些细节。")]),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("h2",{attrs:{id:"代码结构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#代码结构","aria-hidden":"true"}},[s._v("#")]),s._v(" 代码结构")]),s._v(" "),a("p",[s._v("语句用分号分隔：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Hello'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'World'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br")])]),a("p",[s._v("通常，换行符也被视为分隔符，因此下面的例子也能正常运行：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Hello'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'World'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("这就是所谓的「自动分号插入」。"),a("strong",[s._v("但有时它不起作用")]),s._v("，例如：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"There will be an error after this message"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("forEach")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("alert"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("大多数代码风格指南都认为我们应该在每个语句后面都加上分号。")]),s._v(" "),a("p",[s._v("在代码块 "),a("code",[s._v("{...}")]),s._v(" 后以及有代码块的语法结构（例如循环）后不需要加分号：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("f")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 函数声明后不需要加分号")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 循环语句后不需要加分号")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("p",[s._v("……但即使我们在某处添加了「额外的」分号，这也不是错误。分号会被忽略的。")]),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("h2",{attrs:{id:"严格模式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#严格模式","aria-hidden":"true"}},[s._v("#")]),s._v(" 严格模式")]),s._v(" "),a("p",[s._v("为了完全启用现代 JavaScript 的所有特性，我们应该在脚本顶部写上 "),a("code",[s._v('"use strict"')]),s._v(" 指令。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'use strict'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("p",[s._v("该指令必须位于 JavaScript 脚本的顶部或函数体的开头。")]),s._v(" "),a("p",[s._v("如果没有 "),a("code",[s._v('"use strict"')]),s._v("，所有东西仍可以正常工作，但是某些特性的表现方式与旧式「兼容」方式相同。我们通常更喜欢现代的方式。")]),s._v(" "),a("p",[s._v("语言的一些现代特征（比如我们将来要学习的类）会隐式地启用严格模式。")]),s._v(" "),a("p",[s._v("更多内容："),a("router-link",{attrs:{to:"/learn_javascript_asdiasdkc/one/cvdfsdreew/02/"}},[s._v('现代模式，"use strict"')]),s._v("。")],1),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("h2",{attrs:{id:"变量"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#变量","aria-hidden":"true"}},[s._v("#")]),s._v(" 变量")]),s._v(" "),a("p",[s._v("可以使用以下方式声明变量：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("let")])]),s._v(" "),a("li",[a("code",[s._v("const")]),s._v("（不变的，不能被改变）")]),s._v(" "),a("li",[a("code",[s._v("var")]),s._v("（旧式的，稍后会看到）")])]),s._v(" "),a("br"),s._v(" "),a("p",[s._v("一个变量名可以由以下组成：")]),s._v(" "),a("ul",[a("li",[s._v("字母和数字，但是第一个字符不能是数字。")]),s._v(" "),a("li",[s._v("字符 "),a("code",[s._v("$")]),s._v(" 和 "),a("code",[s._v("_")]),s._v(" 是允许的，用法同字母。")]),s._v(" "),a("li",[s._v("非拉丁字母和象形文字也是允许的，但通常不会使用。")])]),s._v(" "),a("p",[s._v("变量是动态类型的，它们可以存储任何值：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" x "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("5")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nx "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"John"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("br"),s._v(" "),a("p",[s._v("有 8 种数据类型：")]),s._v(" "),a("ul",[a("li",[a("code",[s._v("number")]),s._v(" — 可以是浮点数，也可以是整数，")]),s._v(" "),a("li",[a("code",[s._v("bigint")]),s._v(" — 用于任意长度的整数，")]),s._v(" "),a("li",[a("code",[s._v("string")]),s._v(" — 字符串类型，")]),s._v(" "),a("li",[a("code",[s._v("boolean")]),s._v(" — 逻辑值："),a("code",[s._v("true/false")]),s._v("，")]),s._v(" "),a("li",[a("code",[s._v("null")]),s._v(" — 具有单个值 "),a("code",[s._v("null")]),s._v(" 的类型，表示“空”或“不存在”，")]),s._v(" "),a("li",[a("code",[s._v("undefined")]),s._v(" — 具有单个值 "),a("code",[s._v("undefined")]),s._v(" 的类型，表示“未分配（未定义）”，")]),s._v(" "),a("li",[a("code",[s._v("object")]),s._v(" 和 "),a("code",[s._v("symbol")]),s._v(" — 对于复杂的数据结构和唯一标识符，我们目前还没学习这个类型。")])]),s._v(" "),a("p",[a("code",[s._v("typeof")]),s._v(" 运算符返回值的类型，但有两个例外：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("typeof")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("null")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"object"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// JavaScript 编程语言的设计错误")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("typeof")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"function"')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 函数被特殊对待")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("br"),s._v(" "),a("p",[s._v("更多内容："),a("router-link",{attrs:{to:"/learn_javascript_asdiasdkc/one/cvdfsdreew/03/"}},[s._v("变量")]),s._v(" 和 "),a("router-link",{attrs:{to:"/learn_javascript_asdiasdkc/one/cvdfsdreew/04/"}},[s._v("数据类型")]),s._v("。")],1),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("h2",{attrs:{id:"交互"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#交互","aria-hidden":"true"}},[s._v("#")]),s._v(" 交互")]),s._v(" "),a("p",[s._v("我们使用浏览器作为工作环境，所以基本的 UI 功能将是：")]),s._v(" "),a("p",[a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Window/prompt",target:"_blank",rel:"noopener noreferrer"}},[s._v("prompt(question[, default])"),a("OutboundLink")],1)]),s._v(" "),a("p",[s._v("提出一个问题，并返回访问者输入的内容，如果他按下「取消」则返回 "),a("code",[s._v("null")]),s._v("。")]),s._v(" "),a("br"),s._v(" "),a("p",[a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Window/confirm",target:"_blank",rel:"noopener noreferrer"}},[s._v("confirm(question)"),a("OutboundLink")],1)]),s._v(" "),a("p",[s._v("提出一个问题，并建议用户在“确定”和“取消”之间进行选择。选择结果以 "),a("code",[s._v("true/false")]),s._v(" 形式返回。")]),s._v(" "),a("br"),s._v(" "),a("p",[a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/API/Window/alert",target:"_blank",rel:"noopener noreferrer"}},[s._v("alert(message)"),a("OutboundLink")],1)]),s._v(" "),a("p",[s._v("输出一个 消息。")]),s._v(" "),a("br"),s._v(" "),a("p",[s._v("这些函数都会产生 模态框，它们会暂停代码执行并阻止访问者与页面的其他部分进行交互，直到用户做出回答为止。")]),s._v(" "),a("p",[s._v("举个例子：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" userName "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("prompt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Your name?"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Alice"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" isTeaWanted "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("confirm")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Do you want some tea?"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Visitor: "')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" userName "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Alice")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Tea wanted: "')]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" isTeaWanted "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// true")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[s._v("更多内容："),a("router-link",{attrs:{to:"/learn_javascript_asdiasdkc/one/cvdfsdreew/05/"}},[s._v("交互：alert、prompt 和 confirm")]),s._v("。")],1),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("h2",{attrs:{id:"运算符"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#运算符","aria-hidden":"true"}},[s._v("#")]),s._v(" 运算符")]),s._v(" "),a("p",[s._v("JavaScript 支持以下运算符：")]),s._v(" "),a("ul",[a("li",[a("strong",[s._v("算数运算符")])])]),s._v(" "),a("p",[s._v("常规的："),a("code",[s._v("+ - * /")]),s._v("（加减乘除），取余运算符 "),a("code",[s._v("%")]),s._v(" 和幂运算符 "),a("code",[s._v("**")]),s._v("。")]),s._v(" "),a("p",[s._v("二进制加号 "),a("code",[s._v("+")]),s._v(" 可以连接字符串。如果任何一个操作数是一个字符串，那么另一个操作数也将被转换为字符串：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'1'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// '12'，字符串")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'2'")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// '12'，字符串")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("br"),s._v(" "),a("ul",[a("li",[a("strong",[s._v("赋值")])])]),s._v(" "),a("p",[s._v("简单的赋值："),a("code",[s._v("a = b")]),s._v(" 和合并了其他操作的赋值："),a("code",[s._v("a * = 2")]),s._v("。")]),s._v(" "),a("br"),s._v(" "),a("ul",[a("li",[a("strong",[s._v("按位运算符")])])]),s._v(" "),a("p",[s._v("按位运算符在最低位级上操作 32 位的整数：详见 "),a("a",{attrs:{href:"https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators#Bitwise",target:"_blank",rel:"noopener noreferrer"}},[s._v("文档"),a("OutboundLink")],1),s._v("。")]),s._v(" "),a("br"),s._v(" "),a("ul",[a("li",[a("strong",[s._v("三元运算符")])])]),s._v(" "),a("p",[s._v("唯一具有三个参数的操作："),a("code",[s._v("cond ? resultA : resultB")]),s._v("。如果 "),a("code",[s._v("cond")]),s._v(" 为真，则返回 "),a("code",[s._v("resultA")]),s._v("，否则返回 "),a("code",[s._v("resultB")]),s._v("。")]),s._v(" "),a("br"),s._v(" "),a("ul",[a("li",[a("strong",[s._v("逻辑运算符")])])]),s._v(" "),a("p",[s._v("逻辑与 "),a("code",[s._v("&&")]),s._v(" 和或 "),a("code",[s._v("||")]),s._v(" 执行短路运算，然后返回运算停止处的值（"),a("code",[s._v("true")]),s._v("/"),a("code",[s._v("false")]),s._v(" 不是必须的）。逻辑非 "),a("code",[s._v("!")]),s._v(" 将操作数转换为布尔值并返回其相反的值。")]),s._v(" "),a("br"),s._v(" "),a("ul",[a("li",[a("strong",[s._v("空值合并运算符")])])]),s._v(" "),a("p",[a("code",[s._v("??")]),s._v(" 运算符从一列变量中，选取值为已定义的值（defined value）的变量。"),a("code",[s._v("a ?? b")]),s._v(" 的结果是 "),a("code",[s._v("a")]),s._v("，除非 "),a("code",[s._v("a")]),s._v(" 为 "),a("code",[s._v("null/undefined")]),s._v("，这时结果是 "),a("code",[s._v("b")]),s._v("。")]),s._v(" "),a("br"),s._v(" "),a("ul",[a("li",[a("strong",[s._v("比较运算符")])])]),s._v(" "),a("p",[s._v("对不同类型的值进行相等检查时，运算符 "),a("code",[s._v("==")]),s._v(" 会将不同类型的值转换为数字（除了 "),a("code",[s._v("null")]),s._v(" 和 "),a("code",[s._v("undefined")]),s._v("，它们彼此相等而没有其他情况），所以下面的例子是相等的：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token boolean"}},[s._v("false")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// true")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("==")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// true")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br")])]),a("p",[s._v("其他比较也将转换为数字。")]),s._v(" "),a("p",[s._v("严格相等运算符 "),a("code",[s._v("===")]),s._v(" 不会进行转换：不同的类型总是指不同的值。")]),s._v(" "),a("p",[s._v("值 "),a("code",[s._v("null")]),s._v(" 和 "),a("code",[s._v("undefined")]),s._v(" 是特殊的：它们只在 "),a("code",[s._v("==")]),s._v(" 下相等，且不相等于其他任何值。")]),s._v(" "),a("p",[s._v("大于/小于比较，在比较字符串时，会按照字符顺序逐个字符地进行比较。其他类型则被转换为数字。")]),s._v(" "),a("br"),s._v(" "),a("ul",[a("li",[a("strong",[s._v("其他运算符")])])]),s._v(" "),a("p",[s._v("还有很少一部分其他运算符，如逗号运算符。")]),s._v(" "),a("p",[s._v("更多内容："),a("router-link",{attrs:{to:"/learn_javascript_asdiasdkc/one/cvdfsdreew/07/"}},[s._v("基础运算符，数学")]),s._v("，"),a("router-link",{attrs:{to:"/learn_javascript_asdiasdkc/one/cvdfsdreew/08/"}},[s._v("值的比较")]),s._v("，"),a("router-link",{attrs:{to:"/learn_javascript_asdiasdkc/one/cvdfsdreew/11/"}},[s._v("逻辑运算符")]),s._v("，"),a("router-link",{attrs:{to:"/learn_javascript_asdiasdkc/one/cvdfsdreew/12/"}},[s._v("空值合并运算符 '??'")]),s._v("。")],1),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("h2",{attrs:{id:"循环"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#循环","aria-hidden":"true"}},[s._v("#")]),s._v(" 循环")]),s._v(" "),a("ul",[a("li",[a("strong",[s._v("我们涵盖了 3 种类型的循环：")])])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 1")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("while")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("condition"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 2")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("do")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("while")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("condition"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 3")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("for")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" i "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" i"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("++")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br")])]),a("ul",[a("li",[a("p",[a("strong",[s._v("在 "),a("code",[s._v("for(let...)")]),s._v(" 循环内部声明的变量，只在该循环内可见。但我们也可以省略 "),a("code",[s._v("let")]),s._v(" 并重用已有的变量。")])])]),s._v(" "),a("li",[a("p",[a("strong",[s._v("指令 "),a("code",[s._v("break/continue")]),s._v(" 允许退出整个循环/当前迭代。使用标签来打破嵌套循环")]),s._v("。")])])]),s._v(" "),a("p",[s._v("更多内容："),a("router-link",{attrs:{to:"/learn_javascript_asdiasdkc/one/cvdfsdreew/13/"}},[s._v("循环：while 和 for")]),s._v("。")],1),s._v(" "),a("p",[s._v("稍后我们将学习更多类型的循环来处理对象。")]),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("h2",{attrs:{id:"“switch”-结构"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#“switch”-结构","aria-hidden":"true"}},[s._v("#")]),s._v(" “switch” 结构")]),s._v(" "),a("p",[s._v("“switch” 结构可以替代多个 "),a("code",[s._v("if")]),s._v(" 检查。它内部使用 "),a("code",[s._v("===")]),s._v("（严格相等）进行比较。")]),s._v(" "),a("p",[s._v("例如：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" age "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("prompt")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("'Your age?'")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("18")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("switch")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("age"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("case")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("18")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Won\'t work"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// prompt 的结果是一个字符串，而不是数字")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("break")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("case")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"18"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"This works!"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("break")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("default")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Any value not equal to one above"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br")])]),a("p",[s._v("详情请见："),a("router-link",{attrs:{to:"/learn_javascript_asdiasdkc/one/cvdfsdreew/14/"}},[s._v('"switch" 语句')]),s._v("。")],1),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("h2",{attrs:{id:"函数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#函数","aria-hidden":"true"}},[s._v("#")]),s._v(" 函数")]),s._v(" "),a("p",[s._v("我们介绍了三种在 JavaScript 中创建函数的方式：")]),s._v(" "),a("ol",[a("li",[a("strong",[s._v("函数声明")]),s._v("：主代码流中的函数")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("sum")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" result "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("br"),s._v(" "),a("ol",{attrs:{start:"2"}},[a("li",[a("strong",[s._v("函数表达式")]),s._v("：表达式上下文中的函数")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[s._v("sum")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" result "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" result"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("br"),s._v(" "),a("ol",{attrs:{start:"3"}},[a("li",[a("strong",[s._v("箭头函数")]),s._v("：")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 表达式在右侧")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[s._v("sum")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 或带 {...} 的多行语法，此处需要 return：")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[s._v("sum")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("a"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// ...")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" a "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" b"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 没有参数")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[s._v("sayHi")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"Hello"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 有一个参数")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function-variable function"}},[s._v("double")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("n")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=>")]),s._v(" n "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("*")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br")])]),a("br"),s._v(" "),a("ul",[a("li",[a("p",[s._v("函数可能具有局部变量：在函数内部声明的变量。这类变量只在函数内部可见。")])]),s._v(" "),a("li",[a("p",[s._v("参数可以有默认值："),a("code",[s._v("function sum(a = 1, b = 2) {...}")]),s._v("。")])]),s._v(" "),a("li",[a("p",[s._v("函数总是返回一些东西。如果没有 "),a("code",[s._v("return")]),s._v(" 语句，那么返回的结果是 "),a("code",[s._v("undefined")]),s._v("。")])])]),s._v(" "),a("p",[s._v("详细内容：请见 "),a("router-link",{attrs:{to:"/learn_javascript_asdiasdkc/one/cvdfsdreew/15/"}},[s._v("函数")]),s._v("，"),a("router-link",{attrs:{to:"/learn_javascript_asdiasdkc/one/cvdfsdreew/17/"}},[s._v("箭头函数，基础知识")]),s._v("。")],1),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("h2",{attrs:{id:"更多内容"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#更多内容","aria-hidden":"true"}},[s._v("#")]),s._v(" 更多内容")]),s._v(" "),a("p",[s._v("这些是 JavaScript 特性的简要概述。截至目前，我们仅仅学习了基础知识。随着教程的深入，你会发现 JavaScript 的更多特性和高级特性。")]),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("br")])},[],!1,null,null,null);t.default=e.exports}}]);