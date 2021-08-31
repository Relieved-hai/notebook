(window.webpackJsonp=window.webpackJsonp||[]).push([[446],{1249:function(s,a,t){"use strict";t.r(a);var n=t(19),e=Object(n.a)({},function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h2",{attrs:{id:"多态"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#多态","aria-hidden":"true"}},[s._v("#")]),s._v(" 多态")]),s._v(" "),t("p",[s._v("多态是同一个行为具有多个不同表现形式或形态的能力。")]),s._v(" "),t("p",[s._v("多态就是同一个接口，使用不同的实例而执行不同操作。")]),s._v(" "),t("p",[s._v("多态性是对象多种表现形式的体现。")]),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("p",[t("strong",[s._v("必要条件")])]),s._v(" "),t("ul",[t("li",[t("p",[s._v("继承")])]),s._v(" "),t("li",[t("p",[s._v("重写")])]),s._v(" "),t("li",[t("p",[s._v("父类引用指向子类对象")])])]),s._v(" "),t("br"),s._v(" "),t("p",[t("strong",[s._v("优点")])]),s._v(" "),t("ul",[t("li",[s._v("消除类型之间的耦合关系")]),s._v(" "),t("li",[s._v("可替换性")]),s._v(" "),t("li",[s._v("可扩充性")]),s._v(" "),t("li",[s._v("接口性")]),s._v(" "),t("li",[s._v("灵活性")]),s._v(" "),t("li",[s._v("简化性")])]),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("h2",{attrs:{id:"向上转型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#向上转型","aria-hidden":"true"}},[s._v("#")]),s._v(" 向上转型")]),s._v(" "),t("p",[t("strong",[s._v("向上转型")]),s._v("："),t("code",[s._v("隐式转型、自动转型")])]),s._v(" "),t("ul",[t("li",[t("p",[s._v("一个父类引用指向子类实例。")])]),s._v(" "),t("li",[t("p",[s._v("把一个子类对象转成一个父类对象，小类转型为大类。")])]),s._v(" "),t("li",[t("p",[s._v("可以调用 "),t("strong",[s._v("子类重写父类")]),s._v("、"),t("strong",[s._v("父类派生")]),s._v(" 的方法，无法调用子类独有方法。")])]),s._v(" "),t("li",[t("p",[s._v("父类中的静态方法无法被子类重写，所以向上转型之后，只能调用父类原有的静态方法。")])])]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[s._v("\n"),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/*\n * Animal 父类\n * Cat    子类\n */")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Animal")]),s._v(" one "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Cat")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("br"),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("h2",{attrs:{id:"向下转型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#向下转型","aria-hidden":"true"}},[s._v("#")]),s._v(" 向下转型")]),s._v(" "),t("p",[t("strong",[s._v("向下转型")]),s._v("："),t("code",[s._v("强制类型转换")])]),s._v(" "),t("ul",[t("li",[t("p",[s._v("子类引用指向父类对象，此处必须进行强转。")])]),s._v(" "),t("li",[t("p",[s._v("可以调用子类特有的成员方法。")])]),s._v(" "),t("li",[t("p",[s._v("需要满足转换条件才能进行转换，使用 "),t("code",[s._v("instanceof")]),s._v(" 运算符（ "),t("code",[s._v("任意实例 instanceof 对应的类或者父类")]),s._v(" 都为true ）。")])])]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/*\n * one    上面转型后的实例\n * Cat    子类\n */")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Cat")]),s._v(" temp "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Cat")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" one"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("br"),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("h2",{attrs:{id:"abstract-抽象"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#abstract-抽象","aria-hidden":"true"}},[s._v("#")]),s._v(" abstract 抽象")]),s._v(" "),t("ul",[t("li",[t("p",[t("strong",[t("code",[s._v("abstract + 类")])]),s._v(" ：抽象类")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("通过关键字 "),t("code",[s._v("abstract")]),s._v(" 修饰的类")])]),s._v(" "),t("li",[t("p",[s._v("不允许实例化，可以通过向上转型，指向子类实例。")])]),s._v(" "),t("li",[t("p",[s._v("类的其它功能依然存在，成员变量、成员方法和构造方法的访问方式和普通类一样。")])]),s._v(" "),t("li",[t("p",[s._v("应用场景：某个父类只是知道其子类包含怎样的方法，但无法准确知道这些子类如何实现这些方法。这样既避免了子类设计随意性，在一定程度上也避免了无意义的父类实例化。")])])])]),s._v(" "),t("li",[t("p",[t("strong",[t("code",[s._v("abstract + 方法")])]),s._v(" ：抽象方法")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("只包含一个方法名，而没有方法体。")])]),s._v(" "),t("li",[t("p",[s._v("如果一个类包含抽象方法，那么该类必须是抽象类。")])]),s._v(" "),t("li",[t("p",[s._v("任何子类必须重写父类的抽象方法，或者声明自身为抽象类。")])])])])]),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("p",[t("strong",[s._v("小结")])]),s._v(" "),t("ul",[t("li",[t("p",[t("code",[s._v("abstract")]),s._v(" 定义抽象类，不能直接实例化，只能被继承，可以通过向上转型完成对象实例，可以由抽象类的非抽象子类可以创建对象。")])]),s._v(" "),t("li",[t("p",[t("code",[s._v("abstract")]),s._v(" 定义抽象方法，不需要具体实现（不需要方法体）")])]),s._v(" "),t("li",[t("p",[s._v("抽象类中不一定包含抽象方法，但是有抽象方法的类必定是抽象类。")])]),s._v(" "),t("li",[t("p",[s._v("因为 "),t("code",[s._v("abstract")]),s._v(" 定义的方法是需要子类中重写的，所以 "),t("code",[s._v("构造方法")]),s._v(" 以及 "),t("code",[s._v("static（静态）")]),s._v("、"),t("code",[s._v("final（最终）")]),s._v("、"),t("code",[s._v("private（私有）")]),s._v(" 修饰的方法不能声明为抽象方法。")])]),s._v(" "),t("li",[t("p",[s._v("子类当中必须重写父类中的抽象方法，除非子类也是抽象类")])])]),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("h2",{attrs:{id:"interface-接口"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#interface-接口","aria-hidden":"true"}},[s._v("#")]),s._v(" Interface 接口")]),s._v(" "),t("p",[s._v("Java 中只支持单继承，一个子类只有一个唯一的直接父类，当两个类之间满足 "),t("code",[s._v("A is a B")]),s._v("。")]),s._v(" "),t("p",[t("strong",[s._v("Q：如何解决一个类型中需要继承多种类型特征的问题？")])]),s._v(" "),t("p",[t("strong",[s._v("Q：以及多个不同类型具有相同特性的问题呢？")])]),s._v(" "),t("p",[s._v("这时就需要用到 "),t("code",[s._v("interface")]),s._v(" 接口了。")]),s._v(" "),t("br"),s._v(" "),t("blockquote",[t("p",[s._v("接口 "),t("code",[s._v("Interface")]),s._v("，在 "),t("code",[s._v("Java")]),s._v(" 编程语言中是一个抽象类型，是抽象方法的集合，接口通常以 "),t("code",[s._v("interface")]),s._v(" 来声明。一个类通过继承接口的方式，从而来继承接口的抽象方法。")])]),s._v(" "),t("p",[s._v("接口并不是类，编写接口的方式和类很相似，但是它们属于不同的概念。")]),s._v(" "),t("ul",[t("li",[t("p",[t("strong",[s._v("类")]),s._v(" 描述对象的属性和方法。")])]),s._v(" "),t("li",[t("p",[t("strong",[s._v("接口")]),s._v(" 则包含类要实现的方法。")])]),s._v(" "),t("li",[t("p",[s._v("除非实现接口的类是抽象类，否则该类要定义接口中的所有方法。")])]),s._v(" "),t("li",[t("p",[s._v("接口无法被实例化，但是可以被实现。")])]),s._v(" "),t("li",[t("p",[s._v("一个实现接口的类，必须实现接口内所描述的所有方法，否则就必须声明为抽象类。")])]),s._v(" "),t("li",[t("p",[s._v("另外，在 Java 中，接口类型可用来声明一个变量，他们可以成为一个空指针，或是被绑定在一个以此接口实现的对象。")])])]),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("p",[t("strong",[s._v("接口与类相似点：")])]),s._v(" "),t("ul",[t("li",[t("p",[s._v("一个接口可以有多个方法。")])]),s._v(" "),t("li",[t("p",[s._v("接口文件保存在 .java 结尾的文件中，文件名使用接口名。")])]),s._v(" "),t("li",[t("p",[s._v("接口的字节码文件保存在 .class 结尾的文件中。")])]),s._v(" "),t("li",[t("p",[s._v("接口相应的字节码文件必须在与包名称相匹配的目录结构中。")])])]),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("p",[t("strong",[s._v("接口与类的区别：")])]),s._v(" "),t("ul",[t("li",[t("p",[s._v("接口不能用于实例化对象。")])]),s._v(" "),t("li",[t("p",[s._v("接口没有构造方法。")])]),s._v(" "),t("li",[t("p",[s._v("接口中所有的方法必须是抽象方法。")])]),s._v(" "),t("li",[t("p",[s._v("接口不能包含成员变量，除了 static 和 final 变量。")])]),s._v(" "),t("li",[t("p",[s._v("接口不是被类继承了，而是要被类实现。")])]),s._v(" "),t("li",[t("p",[s._v("接口支持多继承。")])])]),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("p",[t("strong",[s._v("接口特性：")])]),s._v(" "),t("ul",[t("li",[t("p",[s._v("接口中每一个方法也是隐式抽象的,接口中的方法会被隐式的指定为 "),t("code",[s._v("public abstract")]),s._v("，不必使用abstract关键字（只能是 "),t("code",[s._v("public abstract")]),s._v("，其他修饰符都会报错）。")])]),s._v(" "),t("li",[t("p",[s._v("接口中可以含有变量，但是接口中的变量会被隐式的指定为 "),t("code",[s._v("public static final")]),s._v(" 变量，不必使用abstract关键字（并且只能是 "),t("code",[s._v("public")]),s._v("，用 "),t("code",[s._v("private")]),s._v(" 修饰会报编译错误）。")])]),s._v(" "),t("li",[t("p",[s._v("接口中的方法都是公有的，接口中的方法是不能在接口中实现的，只能由实现接口的类来实现接口中的方法。")])]),s._v(" "),t("li",[t("p",[s._v("当类实现接口时，除了抽象类以外，都需要去实现接口中的所有抽象方法。")])]),s._v(" "),t("li",[t("p",[s._v("如果实现类中和接口当中存在一个同名的信息，例如 "),t("code",[s._v("public static final int TEMP = 值")]),s._v("。")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("当在程序中，使用 "),t("code",[s._v("接口的引用指向实现类")]),s._v(" 的时候，这时的 TEMP 依然是接口中定义的值。")])]),s._v(" "),t("li",[t("p",[s._v("当在程序中，使用 "),t("code",[s._v("实现类的引用指向实现类")]),s._v(" 的时候，这时的 TEMP 就是实现类中定义的值。")])])]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("INet")]),s._v(" net "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("new")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SmartWatch")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nnet"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("TEMP "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// -> INet 中定义的值")]),s._v("\n\n"),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SmartWatch")]),s._v(" sw "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" neww "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SmartWatch")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\nsw"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("TEMP "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// -> SmartWatch 中定义的值")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])])])]),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("p",[t("strong",[s._v("声明：")])]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// Interface关键字用来声明一个接口。")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),s._v("可见度"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("interface")]),s._v(" 接口名称 "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("extends")]),s._v(" 其他的接口名"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 声明变量")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 抽象方法")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br")])]),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 接口访问修饰符： public 默认")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("interface")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("INet")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/*\n   * 接口当中抽象方法可以不写 abstract 关键字\n   * 也可以不写 public，默认使用 public\n   * 当类实现接口时，需要去实现接口中的所有抽象方法，否则需要将该类设置为抽象类，让它接着传下去。\n   */")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("network")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/*\n   * 接口中 默认会给常量添加 public static final\n   */")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" TEMP "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("20")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/*\n   * JDK1.8+\n   *   default 默认方法，可以带方法体\n   *   可以通过接口引用实例化的一个子类的对象进行调用\n   *   可以在实现类中重写，并可以通过接口的引用调用\n   */")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("default")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("connection")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("System")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("out"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("println")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"我是接口中的默认方法"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/*\n   * JDK1.8+\n   *   static 静态方法也是可以带方法体的\n   *   只能通过接口.进行调用\n   *   不可以在实现类中重写，可以用接口名调用\n   */")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("static")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("stop")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("System")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("out"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("println")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"我是接口中的静态方法"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br"),t("span",{staticClass:"line-number"},[s._v("14")]),t("br"),t("span",{staticClass:"line-number"},[s._v("15")]),t("br"),t("span",{staticClass:"line-number"},[s._v("16")]),t("br"),t("span",{staticClass:"line-number"},[s._v("17")]),t("br"),t("span",{staticClass:"line-number"},[s._v("18")]),t("br"),t("span",{staticClass:"line-number"},[s._v("19")]),t("br"),t("span",{staticClass:"line-number"},[s._v("20")]),t("br"),t("span",{staticClass:"line-number"},[s._v("21")]),t("br"),t("span",{staticClass:"line-number"},[s._v("22")]),t("br"),t("span",{staticClass:"line-number"},[s._v("23")]),t("br"),t("span",{staticClass:"line-number"},[s._v("24")]),t("br"),t("span",{staticClass:"line-number"},[s._v("25")]),t("br"),t("span",{staticClass:"line-number"},[s._v("26")]),t("br"),t("span",{staticClass:"line-number"},[s._v("27")]),t("br"),t("span",{staticClass:"line-number"},[s._v("28")]),t("br"),t("span",{staticClass:"line-number"},[s._v("29")]),t("br"),t("span",{staticClass:"line-number"},[s._v("30")]),t("br"),t("span",{staticClass:"line-number"},[s._v("31")]),t("br"),t("span",{staticClass:"line-number"},[s._v("32")]),t("br"),t("span",{staticClass:"line-number"},[s._v("33")]),t("br"),t("span",{staticClass:"line-number"},[s._v("34")]),t("br")])]),t("br"),s._v(" "),t("p",[t("strong",[s._v("实现：")])]),s._v(" "),t("p",[s._v("当类实现接口的时候，类要实现接口中所有的方法。否则，类必须声明为抽象的类。")]),s._v(" "),t("p",[s._v("类使用 "),t("code",[s._v("implements")]),s._v(" 关键字实现接口。在类声明中，"),t("code",[s._v("Implements")]),s._v(" 关键字放在 "),t("code",[s._v("class")]),s._v(" 声明后面。")]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("implements")]),s._v(" 接口名称"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("[")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" 其他接口名称"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" 其他接口名称"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("]")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SmartWatch")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("implements")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Inet")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("static")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("final")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" TEMP "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("30")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("network")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("System")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("out"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("println")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[s._v('"network"')]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token annotation punctuation"}},[s._v("@Override")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("connection")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 调用接口中默认的方法")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("INet")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("super")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("commection")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br"),t("span",{staticClass:"line-number"},[s._v("9")]),t("br"),t("span",{staticClass:"line-number"},[s._v("10")]),t("br"),t("span",{staticClass:"line-number"},[s._v("11")]),t("br"),t("span",{staticClass:"line-number"},[s._v("12")]),t("br"),t("span",{staticClass:"line-number"},[s._v("13")]),t("br")])]),t("br"),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("h2",{attrs:{id:"关于多接口中重名默认方法处理的解决方案"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#关于多接口中重名默认方法处理的解决方案","aria-hidden":"true"}},[s._v("#")]),s._v(" 关于多接口中重名默认方法处理的解决方案")]),s._v(" "),t("blockquote",[t("p",[s._v("INet、IPhoto")])]),s._v(" "),t("p",[s._v("当 "),t("code",[s._v("INet")]),s._v(" 和 "),t("code",[s._v("IPhoto")]),s._v(" 中，")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("都有 "),t("code",[s._v("default public void connection() {}")]),s._v(" 默认方法时:")]),s._v(" "),t("ul",[t("li",[s._v("如果不重写 "),t("code",[s._v("connection")]),s._v(" 的话，程序就会报错。")])])]),s._v(" "),t("li",[t("p",[s._v("都有属性 "),t("code",[s._v("x")]),s._v(" (无论 "),t("code",[s._v("static")]),s._v("、"),t("code",[s._v("final")]),s._v(" 修饰的)时：")]),s._v(" "),t("ul",[t("li",[s._v("需要显示的来指定到底是访问 "),t("code",[s._v("INet")]),s._v(" 还是 "),t("code",[s._v("IPhoto")]),s._v(" 中的属性。")])])])]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SmartWatch")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("implements")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("INet")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPhoto")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("connection")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("System")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("out"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("println")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("INet")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("x"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("br"),s._v(" "),t("br"),s._v(" "),t("blockquote",[t("p",[s._v("父类、INet、IPhoto")])]),s._v(" "),t("p",[s._v("当 "),t("code",[s._v("父类、INet、IPhoto")]),s._v(" 中")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("都有 "),t("code",[s._v("public void connection() {}")]),s._v(" 方法时:")]),s._v(" "),t("ul",[t("li",[s._v("默认会调用父类中的 "),t("code",[s._v("connection")]),s._v(" 方法，也可以在子类中进行重写")])])]),s._v(" "),t("li",[t("p",[s._v("都有属性 "),t("code",[s._v("x")]),s._v(" 时：")]),s._v(" "),t("ul",[t("li",[s._v("必须要在子类中去定义 "),t("code",[s._v("x")]),s._v(" 成员。")])])])]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("class")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("SmartWatch")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("extends")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("ParentWatch")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("implements")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("INet")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("IPhoto")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("int")]),s._v(" x "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("66")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("void")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("connection")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("System")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("out"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("println")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("x"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br"),t("span",{staticClass:"line-number"},[s._v("8")]),t("br")])]),t("br"),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("h2",{attrs:{id:"接口可继承"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#接口可继承","aria-hidden":"true"}},[s._v("#")]),s._v(" 接口可继承")]),s._v(" "),t("blockquote",[t("p",[s._v("一个接口能继承另一个接口，和类之间的继承方式比较相似。接口的继承使用extends关键字，子接口继承父接口的方法。")])]),s._v(" "),t("p",[s._v("在Java中，类的多继承是不合法，但接口允许多继承。")]),s._v(" "),t("p",[s._v("在接口的多继承中extends关键字只需要使用一次，在其后跟着继承接口。 如下所示：")]),s._v(" "),t("div",{staticClass:"language-java line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("public")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("interface")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Hockey")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("extends")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Sports")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[s._v("Event")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("如果，两个父接口中都有相同的默认签名，那么需要在子类中进行重写签名")]),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("br"),s._v(" "),t("h2",{attrs:{id:"内部类"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#内部类","aria-hidden":"true"}},[s._v("#")]),s._v(" 内部类")]),s._v(" "),t("blockquote",[t("p",[s._v("在Java中，可以将一个类定义在另一个类里面或者一个方法里面，这样的类成为内部类")])]),s._v(" "),t("p",[s._v("内部类隐藏在外部类之内，更好的实现了信息隐藏")]),s._v(" "),t("br"),s._v(" "),t("ul",[t("li",[t("p",[t("strong",[s._v("成员内部类")])]),s._v(" "),t("ul",[t("li",[t("p",[s._v("内部类中最常见的就是成员内部类，也称为普通内部类。")])]),s._v(" "),t("li",[t("p",[s._v("内部类在外部使用时，无法直接实例化，需要借由外部类信息才能完成实例化。获取内部类对象：")]),s._v(" "),t("ul",[t("li",[t("p",[s._v("方式一："),t("code",[s._v("new 外部类().new 内部类()")])])]),s._v(" "),t("li",[t("p",[s._v("方式二："),t("code",[s._v("外部类对象.new 内部类()")])])]),s._v(" "),t("li",[t("p",[s._v("方式三："),t("code",[s._v("外部类对象.获取内部类方法()")])])])])]),s._v(" "),t("li",[t("p",[s._v("内部类的访问修饰符，可以任意，但是访问范围会受到影响。")])]),s._v(" "),t("li",[t("p",[s._v("内部类可以直接方位外部类的成员，如果出现同名属性，优先访问内部类中定义的。")])]),s._v(" "),t("li",[t("p",[s._v("可以使用外部类.this.成员的方式，访问外部类中的同名的信息")])]),s._v(" "),t("li",[t("p",[s._v("外部类访问内部类信息，需要通过内部类实例，在去访问，不能直接访问")])]),s._v(" "),t("li",[t("p",[s._v("内部类编译后的.class文件命名： 外部类$内部类.class")])])])]),s._v(" "),t("li",[t("p",[t("strong",[s._v("静态内部类")])]),s._v(" "),t("ul",[t("li",[t("p",[s._v("静态内部类中，只能直接访问外部类的静态成员(属性、方法)，如果需要调用非静态成员(属性、方法)，可以通过对象实例调用")])]),s._v(" "),t("li",[t("p",[s._v("静态内部类对象实例时，可以不依赖于外部类对象")])]),s._v(" "),t("li",[t("p",[s._v("可以直接通过 "),t("code",[s._v("外部类.内部类.静态成员")]),s._v("，访问内部类中的静态成员")])]),s._v(" "),t("li",[t("p",[s._v("当内部类属性与外部类属性同名时，默认直接访问内部类中的成员。")])]),s._v(" "),t("li",[t("p",[s._v("如果需要访问外部类中的静态属性，则可以直接通过 "),t("code",[s._v("外部类.属性")]),s._v(" 的方法。")])]),s._v(" "),t("li",[t("p",[s._v("如果需要访问外部类中的非静态属性，则可以通过 "),t("code",[s._v("new 外部类().属性")]),s._v(" 的方法。")])])])]),s._v(" "),t("li",[t("p",[t("strong",[s._v("方法内部类")])]),s._v(" "),t("ul",[t("li",[s._v("定义在外部类方法中的内部类，也称局部内部类")]),s._v(" "),t("li",[s._v("定义在方法内部，作用范围也在方法内，定义的局部变量只能在方法里使用")]),s._v(" "),t("li",[s._v("和方法内部成员使用规则一样，class前面不可以添加 public private protected static")]),s._v(" "),t("li",[s._v("内中不能包含静态成员，")]),s._v(" "),t("li",[s._v("类中可以包含final、abstract(不推荐)")])])]),s._v(" "),t("li",[t("p",[t("strong",[s._v("匿名内部类")])]),s._v(" "),t("ul",[t("li",[t("p",[s._v("使用场景：")]),s._v(" "),t("ul",[t("li",[s._v("只用到类的一个实例")]),s._v(" "),t("li",[s._v("类在定义后马上用到")]),s._v(" "),t("li",[s._v("给类命名并不会导致代码逻辑的场景")])])]),s._v(" "),t("li",[t("p",[s._v("匿名内部类没有类型名称、实例对象名称")])]),s._v(" "),t("li",[t("p",[s._v("编译后的文件命名：外部类$数字.class")])]),s._v(" "),t("li",[t("p",[s._v("无法使用private public protected abstract static 修饰")])]),s._v(" "),t("li",[t("p",[s._v("无法编写构造方法、可以添加构造代码块")])]),s._v(" "),t("li",[t("p",[s._v("不能出现静态成员")])]),s._v(" "),t("li",[t("p",[s._v("匿名内类可以实现接口，也可以继承父类，但是不可以兼得")])])])])])])},[],!1,null,null,null);a.default=e.exports}}]);