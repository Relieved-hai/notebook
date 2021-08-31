(window.webpackJsonp=window.webpackJsonp||[]).push([[375],{1025:function(s,t,a){"use strict";a.r(t);var n=a(19),e=Object(n.a)({},function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("h1",{attrs:{id:"前瞻断言与后瞻断言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前瞻断言与后瞻断言","aria-hidden":"true"}},[s._v("#")]),s._v(" 前瞻断言与后瞻断言")]),s._v(" "),a("p",[s._v("有时候我们需要匹配后面跟着特定模式的一段模式。比如，我们要从 "),a("code",{staticClass:"subject"},[s._v("1 turkey costs 30€")]),s._v(" 这段字符中匹配价格数值。")]),s._v(" "),a("p",[s._v("我们需要获取 "),a("code",{staticClass:"subject"},[s._v("€")]),s._v(" 符号前面的数值（假设价格是整数）。")]),s._v(" "),a("p",[s._v("那就是前瞻断言要做的事情。")]),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("h2",{attrs:{id:"前瞻断言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#前瞻断言","aria-hidden":"true"}},[s._v("#")]),s._v(" 前瞻断言")]),s._v(" "),a("p",[s._v("语法为："),a("code",{staticClass:"pattern"},[s._v("x(?=y)")]),s._v("，它表示 “匹配 "),a("code",{staticClass:"pattern"},[s._v("x")]),s._v(", 仅在后面是 "),a("code",{staticClass:"pattern"},[s._v("y")]),s._v(' 的情况"”')]),s._v(" "),a("p",[s._v("那么对于一个后面跟着 "),a("code",[s._v("€")]),s._v(" 的整数金额，它的正则表达式应该为："),a("code",{staticClass:"pattern"},[s._v("\\d+(?=€)")]),s._v("。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1 turkey costs 30€"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/\\d+(?=€)/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 30 （正确地跳过了单个的数字 1）")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("br"),s._v(" "),a("p",[s._v("让我们来看另一种情况：这次我们想要一个数量，它是一个不被 "),a("code",{staticClass:"subject"},[s._v("€")]),s._v(" 跟着的数值。")]),s._v(" "),a("p",[s._v("这里就要用到前瞻否定断言了。")]),s._v(" "),a("p",[s._v("语法为："),a("code",{staticClass:"pattern"},[s._v("x(?!y)")]),s._v("，意思是 “查找 "),a("code",{staticClass:"pattern"},[s._v("x")]),s._v(", 但是仅在不被 "),a("code",{staticClass:"pattern"},[s._v("y")]),s._v(" 跟随的情况下匹配成功”。")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"2 turkeys cost 60€"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/\\d+(?!€)/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 2（正确地跳过了价格）")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("br"),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("h2",{attrs:{id:"后瞻断言"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#后瞻断言","aria-hidden":"true"}},[s._v("#")]),s._v(" 后瞻断言")]),s._v(" "),a("p",[s._v("前瞻断言允许添加一个“后面要跟着什么”的条件判断。")]),s._v(" "),a("p",[s._v("后瞻断言也是类似的，只不过它是在相反的方向上进行条件判断。也就是说，它只允许匹配前面有特定字符串的模式。")]),s._v(" "),a("p",[s._v("语法为:")]),s._v(" "),a("ul",[a("li",[s._v("后瞻肯定断言："),a("code",{staticClass:"pattern"},[s._v("(?<=y)x")]),s._v(", 匹配 "),a("code",{staticClass:"pattern"},[s._v("x")]),s._v(", 仅在前面是 "),a("code",{staticClass:"pattern"},[s._v("y")]),s._v(" 的情况。")]),s._v(" "),a("li",[s._v("后瞻否定断言："),a("code",{staticClass:"pattern"},[s._v("(?<!y)x")]),s._v(", 匹配 "),a("code",{staticClass:"pattern"},[s._v("x")]),s._v(", 仅在前面不是 "),a("code",{staticClass:"pattern"},[s._v("y")]),s._v(" 的情况。")])]),s._v(" "),a("br"),s._v(" "),a("p",[s._v("举个例子，让我们把价格换成美元。美元符号通常在数字之前，所以要查找 "),a("code",[s._v("$30")]),s._v(" 我们将使用 "),a("code",{staticClass:"pattern"},[s._v("(?<=\\$)\\d+")]),s._v(" —— 一个前面带 "),a("code",{staticClass:"pattern"},[s._v("$")]),s._v(" 的数值：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1 turkey costs $30"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/(?<=\\$)\\d+/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 30 （跳过了单个的数字 1）")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("br"),s._v(" "),a("p",[s._v("另外，为了找到数量 —— 一个前面不带 "),a("code",{staticClass:"subject"},[s._v("$")]),s._v(" 的数字，我们可以使用否定后瞻断言："),a("code",{staticClass:"pattern"},[s._v("(?<!\\$)\\d+")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"2 turkeys cost $60"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/(?<!\\$)\\d+/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 2 (跳过了价格)")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br")])]),a("br"),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("h2",{attrs:{id:"捕获组"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#捕获组","aria-hidden":"true"}},[s._v("#")]),s._v(" 捕获组")]),s._v(" "),a("p",[s._v("一般来说，环视断言括号中（前瞻和后瞻的通用名称）的内容不会成为匹配到的一部分结果。")]),s._v(" "),a("p",[s._v("例如：在模式 "),a("code",{staticClass:"pattern"},[s._v("\\d+(?!€)")]),s._v(" 中，"),a("code",{staticClass:"pattern"},[s._v("€")]),s._v(" 符号就不会出现在匹配结果中。")]),s._v(" "),a("p",[s._v("但是如果我们想要捕捉整个环视表达式或其中的一部分，那也是有可能的。只需要将其包裹在另加的括号中。")]),s._v(" "),a("p",[s._v("例如，这里货币符号 "),a("code",{staticClass:"pattern"},[s._v("(€|kr)")]),s._v(" 和金额一起被捕获了：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1 turkey costs 30€"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" reg "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/\\d+(?=(€|kr))/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// €|kr 两边有额外的括号")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 30, €")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("p",[s._v("后瞻断言也一样：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"1 turkey costs $30"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" reg "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/(?<=(\\$|£))\\d+/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("reg"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 30, $")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br")])]),a("p",[s._v("请注意，对于后瞻断言，顺序保持不变，尽管前瞻括号在主模式之前。")]),s._v(" "),a("p",[s._v("通常括号是从左到右编号，但是后瞻断言是一个例外，它总是在主模式之后被捕获。所以 "),a("code",{staticClass:"pattern"},[s._v("\\d+")]),s._v(" 的匹配会首先进入结果数组，然后是 "),a("code",{staticClass:"pattern"},[s._v("(\\$|£)")]),s._v("。")]),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("h2",{attrs:{id:"总结"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#总结","aria-hidden":"true"}},[s._v("#")]),s._v(" 总结")]),s._v(" "),a("p",[s._v("当我们想根据前面/后面的上下文筛选出一些东西的时候，前瞻断言和后瞻断言（通常被称为“环视断言”）对于简单的正则表达式就很有用。")]),s._v(" "),a("p",[s._v("有时我们可以手动处理来得到相同的结果，即：匹配所有，然后在循环中按上下文进行筛选。请记住，"),a("code",[s._v("str.matchAll")]),s._v(" 和 "),a("code",[s._v("reg.exec")]),s._v(" 返回的匹配结果有 "),a("code",[s._v(".index")]),s._v(" 属性，因此我们能知道它在文本中的确切位置。但通常正则表达式可以做得更好。")]),s._v(" "),a("p",[s._v("环视断言类型:")]),s._v(" "),a("table",[a("thead",[a("tr",[a("th",[a("strong",[s._v("模式")])]),s._v(" "),a("th",[a("strong",[s._v("类型")])]),s._v(" "),a("th",[a("strong",[s._v("匹配")])])])]),s._v(" "),a("tbody",[a("tr",[a("td",[a("code",{staticClass:"pattern"},[s._v("x(?=y)")])]),s._v(" "),a("td",[s._v("前瞻肯定断言")]),s._v(" "),a("td",[a("code",[s._v("x")]),s._v(" ，仅当后面跟着 "),a("code",[s._v("y")])])]),s._v(" "),a("tr",[a("td",[a("code",{staticClass:"pattern"},[s._v("x(?!y)")])]),s._v(" "),a("td",[s._v("前瞻否定断言")]),s._v(" "),a("td",[a("code",[s._v("x")]),s._v(" ，仅当后面不跟 "),a("code",[s._v("y")])])]),s._v(" "),a("tr",[a("td",[a("code",{staticClass:"pattern"},[s._v("(?<=y)x")])]),s._v(" "),a("td",[s._v("后瞻肯定断言")]),s._v(" "),a("td",[a("code",[s._v("x")]),s._v(" ，仅当跟在 "),a("code",[s._v("y")]),s._v(" 后面")])]),s._v(" "),a("tr",[a("td",[a("code",{staticClass:"pattern"},[s._v("(?<!y)x")])]),s._v(" "),a("td",[s._v("后瞻否定断言")]),s._v(" "),a("td",[a("code",[s._v("x")]),s._v(" ，仅当不跟在 "),a("code",[s._v("y")]),s._v(" 后面")])])])]),s._v(" "),a("p",[s._v("前瞻断言也可用于禁用回溯。为什么它是需要的 – 请看下一章。")]),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("br"),s._v(" "),a("h2",{attrs:{id:"例子"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#例子","aria-hidden":"true"}},[s._v("#")]),s._v(" 例子")]),s._v(" "),a("h3",{attrs:{id:"查找非负整数"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查找非负整数","aria-hidden":"true"}},[s._v("#")]),s._v(" 查找非负整数")]),s._v(" "),a("p",[s._v("有一串整数。")]),s._v(" "),a("p",[s._v("创建一个仅查找非负数的正则表达式（允许为零）。")]),s._v(" "),a("p",[s._v("使用示例：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" regexp "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/your regexp/g")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"0 12 -5 123 -18"')]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("alert")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("match")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("regexp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 0, 12, 123")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("br"),s._v(" "),a("p",[a("strong",[s._v("解决方案")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('/*\n  整数的regexp是 \\d。\n\n  我们可以在负数前加上负数前瞻：(?<!-)\\d+ 来排除负数。\n\n  尽管，如果我们现在尝试一下，我们可能会注意到另外一个“额外”结果：\n\n    let regexp = /(?<!-)\\d+/g;\n    let str = "0 12 -5 123 -18";\n    console.log( str.match(regexp) ); // 0, 12, 123, 8\n\n  如您所见，它与 -18 匹配，为 8。要排除它，我们需要确保 regexp 开始匹配一个数字，而不是从另一个（不匹配）数字的中间开始。\n\n  我们可以通过在后面指定另一个负数来做到这一点： (?<!-)(?<!\\d)\\d+ 。现在 (?<!\\d) 确保匹配不会在我们需要的其他数字之后开始。\n\n  我们还可以将它们加入到此处的单个外观中：\n\n    let regexp = /(?<![-\\d])\\d+/g;\n    let str = "0 12 -5 123 -18";\n    alert( str.match(regexp) ); // 0, 12, 123\n* */')]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br")])]),a("br"),s._v(" "),a("br"),s._v(" "),a("h3",{attrs:{id:"摘录后插入"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#摘录后插入","aria-hidden":"true"}},[s._v("#")]),s._v(" 摘录后插入")]),s._v(" "),a("p",[s._v("HTML文档中有一行。")]),s._v(" "),a("p",[s._v("在 "),a("code",[s._v("<body>")]),s._v(" 标记之后插入 "),a("code",[s._v("<h1>Hello</h1>")]),s._v(" 行（它可能具有属性）。")]),s._v(" "),a("p",[s._v("例如：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" regexp "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token regex"}},[s._v("/your regexp/")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n"),a("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("let")]),s._v(" str "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token string"}},[s._v('`\n<html>\n  <body style="height: 200px">\n  ...\n  </body>\n</html>\n`')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\nstr "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" str"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("replace")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("regexp"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token template-string"}},[a("span",{pre:!0,attrs:{class:"token string"}},[s._v("`<h1>Hello</h1>`")])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br")])]),a("p",[s._v("之后，"),a("code",[s._v("str")]),s._v(" 值为：")]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("html"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("body style"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[s._v('"height: 200px"')]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),s._v("h1"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("Hello"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("h1"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("...")]),s._v("\n  "),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("body"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("<")]),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("html"),a("span",{pre:!0,attrs:{class:"token operator"}},[s._v(">")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("br"),s._v(" "),a("p",[a("strong",[s._v("解决方案")])]),s._v(" "),a("div",{staticClass:"language-js line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-js"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v('/*\n为了在 <body> 标签之后插入，您首先需要找到它。 我们将使用正则表达式 <body.*>。\n\n接下来，我们需要保留 <body> 标记本身，并在其后添加文本。\n\n您可以这样做：\n\n  let str = \'...<body style="...">...\';\n  str = str.replace(/<body.*>/, \'$&<h1>Hello</h1>\');\n  alert(str); // ...<body style="..."><h1>Hello</h1>...\n\n在替换字符串中，$＆ 表示匹配项本身，即替换 <body。*> 替换为自身加上 <h1> Hello </ h1>。\n\n一种替代方法是使用 后瞻肯定断言：\n\n  let str = \'...<body style="...">...\';\n  str = str.replace(/(?<=<body.*>)/, `<h1>Hello</h1>`);\n  alert(str); // ...<body style="..."><h1>Hello</h1>...\n\n每个位置的此类正则表达式将检查 <body.*> 是否在它之前。如果是，则找到匹配项。但是 <body.*> 标记本身不包含在匹配项中，它仅参与检查。并且检查之后，没有其他字符，因此匹配文本将为空。\n\n<body.*> 开头的“空字符串”被 <h1>Hello</h1> 替换。确切地说，这是在 <body> 之后插入此行。\n\nP.S. 该正则表达式不会受到以下标志的阻碍：/<body.*>/si，以便“点”包含换行符（标签可以采用多行），也可以使标签位于不同的寄存器中，例如 <BODY>。\n* */')]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br"),a("span",{staticClass:"line-number"},[s._v("15")]),a("br"),a("span",{staticClass:"line-number"},[s._v("16")]),a("br"),a("span",{staticClass:"line-number"},[s._v("17")]),a("br"),a("span",{staticClass:"line-number"},[s._v("18")]),a("br"),a("span",{staticClass:"line-number"},[s._v("19")]),a("br"),a("span",{staticClass:"line-number"},[s._v("20")]),a("br"),a("span",{staticClass:"line-number"},[s._v("21")]),a("br"),a("span",{staticClass:"line-number"},[s._v("22")]),a("br"),a("span",{staticClass:"line-number"},[s._v("23")]),a("br"),a("span",{staticClass:"line-number"},[s._v("24")]),a("br"),a("span",{staticClass:"line-number"},[s._v("25")]),a("br")])]),a("br"),s._v(" "),a("br"),s._v(" "),a("br")])},[],!1,null,null,null);t.default=e.exports}}]);