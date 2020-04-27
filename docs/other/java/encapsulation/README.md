## 封装

> 在面向对象程式设计方法中，封装（英语：`Encapsulation`）是指一种将抽象性函式接口的实现细节部分包装、隐藏起来的方法。
> - 封装可以被认为是一个保护屏障，防止该类的代码和数据被外部类定义的代码随机访问。
> - 要访问该类的代码和数据，必须通过严格的接口控制。
> - 封装最主要的功能在于我们能修改自己的实现代码，而不用修改那些调用我们代码的程序片段。
> - 适当的封装可以让程式码更容易理解与维护，也加强了程式码的安全性。

<br/>
<br/>
<br/>

**描述**

- 将类的某些信息隐藏在类内部，不允许外部程序直接访问。

- 通过该类提供的方法来实现对隐藏信息的访问和操作。

- 隐藏对象的信息。

- 留出访问的接口。


<br/>
<br/>
<br/>

**优点**

- 1. 良好的封装能够减少耦合。

- 2. 类内部的结构可以自由修改。

- 3. 可以对成员变量进行更精确的控制。

- 4. 隐藏信息，实现细节。

<br/>
<br/>
<br/>

**实现**

- 1、修改属性的可见性来限制外部对属性的访问、修改操作（ 一般限制为 `private` ），让属性仅能在当前类内访问、修改。

- 2、对每个值属性提供对外的公共方法访问（ `public` ），也就是创建一对赋、取值方法，用于对私有属性的访问、修改。

<br/>

`封装一个 Person 类`

```java
public class Person{
    private String name;

    public String getName(){
      return name;
    }
    public void setName(String name){
      this.name = name;
    }
}
```

`测试`

```java
public class RunTest{
   public static void main(String args[]){
      Person p = new Person();
      p.setName("abc");
      p.getName();

      System.out.print("Name : " + encap.getName());
    }
}

// 运行输出： Name : abc
```




<br/>
<br/>
<br/>



## 包

Java 使用包（ `package` ）这种机制是为了防止命名冲突，访问控制，提供搜索和定位类（ `class` ）、接口、枚举（ `enumerations` ）和注释（ `annotation` ）等。

<br/>

> 作用

- 1、管理 Java 文件

- 2、解决同名文件冲突

<br/>
<br/>

> 定义包

**语法：**

```java
// package 包名;

// 例：
package com.xxx.animal;

public class Cat {
  // code ...
}

```


**注意：**
- 1、必须放在 Java 源文件中的第一行。
- 2、一个 Java 源文件中只能有一个package语句。
- 3、包名全部英文小写。
- 4、命名方式：域名倒序 + 模块 + 功能。
- 5、一个包中不能存在同名类。
- 6、建议每个包内存储信息功能单一。



<br/>
<br/>
<br/>



## 导入包

**语法：**

```java
// import 包名.类名;

// 例：
// 导入包中的全部类
import com.xxx.animal.*;

// 导入包中指定类
import com.xxx.animal.Cat;
```

<br/>
<br/>

**注意：**

`import com.*`

只能导入 com.* 包下的全部类，但该包下除了类本身，还有子包（ 子包中还有类 ），这个时候子包下的类不会导入进来。

<br/>


```java
import com.xxx.animal1.*
import com.xxx.animal2.Cat


public class Test {
  public static void main(String[] arg) {
     // 由于我们使用了 'import 域名倒序.包名.类名' 的方式加载了 animal2 中的 Cat。
     // 这里的 Cat 就是 animal2 包下的。
     Cat cat = new Cat();

     // 可以通过 (包名.类名) 的方式来指定我们用的是 animal1 包下的 Cat 类。
     com.xxx.animal1.Cat cat1 = new com.xxx.animal1.Cat();
  }
}
```

假设有一个 `Cat` 类，在 `animal1`、`animal2` 包中都存在，并且我们都要使用，我们可以将一包全部导入，另一个导入具体的类即可。



<br/>
<br/>
<br/>

## static（ 静态修饰符 ）

> 只能修饰 属性、方法

使用 static 静态修饰符后

- 所有的实例对象都会指向一个内存地址，只有在类销毁时，`static` 定义的值才会回收。

- 所以无论这个当前的这个类有多少实例，怎么修改，最后都共用一个值。

<br/>
<br/>

定义

```java
public class Cat {
  // (static + 成员属性) -> 静态属性、类属性
  static String name;

  // (static + 成员方法) -> 静态方法、类方法
  static void testFun() {
  }
}


public class Test {
  public static void main(String[] arg) {
     Cat cat = new Cat();

     // 不推荐: 对象.属性（ 可以使用，会给警告 ）
     cat.name = 2000;

     // 推荐: 类名.属性（ 使用静态方法去访问 ）
     Cat.name = 2000;

     // 不推荐: 对象.方法
     cat.testFun();

     // 推荐: 类名.方法
     Cat.testFun();
  }
}
```


<br/>
<br/>

**注意**

- 1、只有静态属性、方法

- 2、没有静态类、局部属性、...

- 3、成员方法可以访问静态成员。

- 4、静态方法不可以直接访问同一个非静态成员（属性、方法），静态方法只能访问同类中的静态成员（属性、方法），`如果非要访问，可在静态方法中实例化后，使用 (对象.成员属性、方法) 访问`。

- 5、静态方法中不能使用 this。

- 6、父类中的静态方法无法被子类重写。


<br/>
<br/>
<br/>

## 代码块

**定义：**

- 1、通过 { } 可以形成代码块

- 2、方法中的代码块：普通代码块

- 3、类内的代码块：构造代码块

- 4、static + 构造代码块：静态代码块

<br/>
<br/>

**代码块执行顺序**

1、普通代码块：随方法调用顺序执行。

2、构造代码块：随实例化过程调用

3、静态代码块：只执行一次，无论实例多少对象。


```java
public class Test {
	String name;
	static int age;

	// 静态构造代码块( 最先执行，且执行一次 )
	static {
		age = 16; // YES
		this.name = '可可'; // NO
	}


	// 构造代码块( 其次执行，实例化几次，就执行几次 )
	{
		age = 16; // YES
		this.name = "可可"; // YES
	}

	// 构造方法（ 最后执行，几个实例对象，就会执行几次 ）
	public Test() {

		// 当执行完后，nameName 就会被回收
		{
			String nameName = "可可"; // YES
		}

		age = 16; // YES
		this.name = "可可"; // YES
		String nameName = "可可"; // YES

		{
            // 因为上面已经定义的 nameName，它的作用范围就是从定义它的位置往下
            // 所以，这里就无法定义 nameName 属性
            // 如果将它放到方法体的第一行，那么上面的代码块中也无法定义 nameName 属性
			String nameName = "可可"; // NO
		}
	}
}
```




























