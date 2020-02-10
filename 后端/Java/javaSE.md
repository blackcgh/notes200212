# java

## 介绍

java是一门计算机编程语言，强类型语言，广泛应用于企业级Web应用开发和移动应用开发。

**语言特点：**

- 开源
- 跨平台
- 面向对象
- 多线程

**语言平台：**

- javaSE--标准版

- javaEE--企业版
- javaME-- 微型版 

**相关术语：**

JVM： Java Virtual Machine，java虚拟机。只认识字节码文件（.class文件），操作系统不认识，能够识别class			文件中的指令并调用操作系统向上的API完成动作，==jvm是java能够跨平台的核心==

JRE：Java Runtime Environment，java运行时环境。由jvm和Java基本类库组成

JDK：Java Development Kit，java开发工具包，java开发环境。jdk是Java开发的核心，由jre和工具组成。例如		  javac.exe、java.exe、jar.exe等

SDK：Software Development Kit，软件开发工具包

IDE：集成开发环境，[Eclipse](http://www.eclipse.org/downloads/)

- JDK>JRE>JVM，它们是包含关系
- JDK是开发环境，其中的工具用于编译、调试程序
- JRE是运行环境，如果只想运行程序，只需要安装JRE
- Eclipse是java开发工具，用来开发java项目，依赖于JDK，提供可视化界面

---



## 安装

[下载JDK](http://www.oracle.com/technetwork/java/javase/downloads/index.html ) 

环境配置：

1. 我的电脑-->属性-->高级系统设置-->高级-->环境变量-->系统变量
2. 设置 3 项属性：JAVA_HOME、PATH、CLASSPATH(无视大小写)

   - java_home：指向JDK的安装路径，JDK版本升级后直接改java_home就行
     - D:\jdk1.4
   - path：保证javac命令可以在命令行界面任意目录下运行
     - ;%JAVA_HOME%\bin;%JAVA_HOME%\jre\bin;

   - classpath：保证class文件可以在命令行界面任意目录下运行
     - .;%JAVA_HOME%\lib\dt.jar;%JAVA_HOME%\lib\tools.jar;
     - .是告诉JDK搜索class文件时先查找当前目录
3. 测试JDK安装是否成功：在命令行界面键入命令：java -version、java、javac

---



## 常见DOS命令

- d:回车   盘符切换

- dir(directory)：列出当前目录下的文件以及文件夹

- md(make directory)：创建目录

- rd(remove directory)：删除目录

- cd(change directory)：进入指定目录

- cd.. ：退回到上一级目录

- cd\ ：退回到根目录

- del(delete)：删除文件

- del *.txt：删除当前目录下所有txt文件

- exit：退出dos命令

- cls(clear screen)：清屏

---



## 编写源文件

- 一个java文件是由不同的类和接口组成的，通常是一个文件只有一个类或接口
- 一个文件可以有多个类，但只有一个类用public修饰。也可以没有public
- 如果类使用public修饰，那么文件名必须是该类名；否则可以使用任意类名或者任意名字来命名文件
- class文件是由类编译生成的，如果java文件中定义了多个类，就会生成多个相应的class文件
- 文件的public类必须有main方法。有main方法的类叫做主类
- 运行命令java后面跟的是主类编译生成的class文件

编写代码，然后保存、编译、运行

```java
javac Hello.java	// 编译java文件，生成class文件
java Hello				// 运行class文件（主类），忽略.class后缀
// Hello是java文件中的public类类名（文件名和类名相同）而且该类有main方法（主类）
// 运行程序实际是jvm调用主类的main方法
```

反编译

```java
javap Hello.class	// 不能忽略.class
```

---



## 基本语法

### 关键字

java语言赋予特定含义的单词，==特点：全部小写==

注意：

- main不是关键字，但jvm认识main
- goto、const作为保留字，不能使用

---



### 标识符

给类、接口、方法、变量、文件命名的字符序列

**命名规则：**

- 由字母、下划线、$、数字组成
- 首字符不能是数字
- 区分大小写

**常见命名：**

- 项目名、包名小写
- 类、接口单词首字符大写
- 变量、方法第二个单词开始，首字符大写
- 常量大写，下划线分割单词

---



### 注释

```java
// 单行注释
/* 多行注释 */
/** 文档注释 */
```

使用场景

```java
类注释
/**
*Copyright 版权
*FileName: 文件名.java
*类的详细说明
*
*@author 作者
*@Date 日期
*@version 1.0
*/
public class 类名 {}

属性注释
/** 提示信息 */
String studentName;

方法注释
/**
*方法的详细说明
*
*@param 参数1 使用说明
*...
*@return 返回结果说明
*@throws 异常类型. 错误代码，注明从此类方法中抛出异常的说明
*/
```

---



### 数据类型

#### 基本数据类型

- 布尔型
  - boolean
- 字符型
  - char
- 数值型
  - 整数类型
    - byte
    - short
    - int
    - long
  - 浮点类型
    - float
    - double

```java
类型			所占字节数
boolean			1
byte				1
short				2
int					4
long				8
float				4
double			8
char				2
```

**注意：**

- ==常量也是有数据类型的==，和变量一样，会分配相对应的字节数来存储常量

  ```java
  1、1.00、true、'a'、"bc"、null 都是常量，数据类型分别是int、double、boolean、char、String
  byte a = 3 + 4;		// 3、4都是int型常量，先把计算出结果，然后判断是否在byte范围内
  ```

- 整数默认是int类型，long型常量要用后缀L标记，浮点数默认是double类型，float型常量要用F标记

```java
long c = 100L;				// 分配8B来存储常量100
float d = 1.00F;			// 分配4B来存储常量1.00

long a = 100000000000;// 报错，100000000000默认是int型常量，分配4B存储该常量，但是值超出4B
long b = 100;					// 正确，先分配4B来存储常量100，无误后再将该常量存储在long型变量b中
```

---



#### 引用数据类型

- 类（class）
- 接口（interface）
- 数组（[]）

---



### 常量

常量用final声明，常量和变量的区别是==常量不占用内存==

声明格式：

```java
final 数据类型 常量名 = 值;
final int AGE = 18;
```

---



### 类型转换

类型转换是指数值类型转换，由于ASCII码，char型也能转换。

'0'		48

'A'		65

'a'		97

==boolean类型不能转换为其他数据类型，即boolean类型不参与类型转换==

#### 自动转换（小->大）

- byte，short，char—int—long—float—double

  - byte、short、char的运算，会先转换为int类型，再开始补码运算

  - 从int开始，存在哪个类型，就会先转换为该类型，再开始补码运算

    ```java
    'a' + 1;				// 98
    
    byte a = 3;int b = 4;
    byte c = z + b;	// 报错
    int d = a + b;	// 正确
    	/* 过程
    	1. 计算出二进制
      		 a													b
      	00000011			00000000 00000000 00000000 00000100
    	2. a会转换为int类型
    	  00000011 -> 00000000 00000000 00000000 00000011
    	3. 求出补码，由于是正数，补码就是原码
    	4. 补码运算，展示原码，这里的结果是正数，而正数的原码、补码相同
     	 00000000 00000000 00000000 00000011 + 00000000 00000000 00000000 00000100
     	 = 00000000 00000000 00000000 00000111 = 7
    	*/
    byte a1=3,a2=4,a;
    a=a1+a2;// 错，byte型变量运算会先转换为int型
    a=3+4;  // 对，常量运算先把结果计算出来，然后看是否在byte的范围内，如果在就不报错
    ```

#### 强制转换（大->小）

强制转换可能会损失精度

```java
int a = 1;
byte b = 0;
b += a;		// b = (byte)(b + a)
```

数据溢出

```java
byte b=130;	//错，byte范围：-128~127
byte b=(byte)130;//b=-126，强制转换导致数据溢出
/*
	常量130默认是int（4字节），二进制：00000000 00000000 00000000 10000010，其补码和原码相同
	强制转换：00000000 00000000 00000000 10000010 -> 10000010
	10000010 (补码)-1 = 10000001(反码) = 11111110(原码) = -(64+32+16+8+4+2) = -126
*/
```

---



### 数组

```java
int[] a;	// 定义一个int类型的数组a变量
int[] b = new int[3];	// 初始化一个长度为3的数组b
int[] arr = {1, 2, 3};
int[][] c = new int[3][]	// 初始化一个长度为3的二维数组c
```

创建数组后，jvm会给每一个数组元素分配默认值

---



### 默认值

```java
boolean													false
byte、short、int、long							0
float、double									 	0.0
char												空字符'/u0000'
引用类型（Array、String、Object）		null
```

---



### 键盘录入

```java
import java.util.Scanner;	//导包
Scanner s = new Scanner(System.in);	// 创建对象
int x = s.nextInt();	// 获取数据
```

---



### 流程控制语句

#### 顺序结构

从上往下，依次执行

---



#### 选择结构

```java
1. if语句
2. if-else语句
3. if-else if-else语句
4. switch语句
   switch(表达式) {
     case 常量:
       语句体
       break;
     ...
     default:
       语句体
   }
/* 注意：
 		1.表达式可以是byte、short、int、char、string
 		2.case后面的常量不能相同
 		3.没有case会出现case穿透
 		4.开关语句结束条件：遇到break或执行到语句末尾*/
```

---



#### 循环结构

```java
for(初始化; 判断条件; 控制条件) {循环体}
while(判断条件) {循环体}
do{循环体}while(判断条件);
```

---



## 包

### package语句

java中的包其实就是文件夹，作用是对类进行分类管理。格式：

```java
package 包名;
```

注意：

- 包定义必须是程序的第一条执行语句，且只能有一个

- 有package语句时，编译和运行程序要

  ```shell
  >javac -d java文件
  >java 包名.主类名
  ```

- 如果没有package，默认表示无包名

---



### import语句

不同包之间的访问要使用import语句。导包格式

```java
import 包名.类名	// 具体到类名
```

注意：

- import语句在package和class之间，可以有多个

---



### java中内置的常用包

- java.lang：默认导入的语言包，包含System、Math类等
- java.util：包含实用类
- java.io：包含输入/输出类
- java.sql：包含操作数据库的类
- java.net：包含实现网络功能的类
- javax.swing：包含GUI类
- ...

---



## 面对对象

### 概述

- 面向过程思想

  需要面对具体的每一个步骤和过程。我们是执行者

- 面向对象思想

  万物皆对象，强调的是对象，由对象去调用功能。我们是指挥者

- 面向对象开发

  不断地创建对象，使用对象，指挥对象办事

**面向对象的特征**

- 封装

  - 是指隐藏对象的属性和实现细节，仅对外提供公共访问方式。就是将不需要对外提供的内容隐藏起来，提供公共的访问方法，别人必须按照你设定的规则来访问
  - 修饰符private是封装的一种体现

  - 类、方法本身也是一种封装体
- 继承

  - 通过关键字extends实现类与类、接口与接口的继承，提高代码的复用性
- 多态
  - 操作名称的多态
  - 与继承相关的多态
    - 抽象类多态
    - 接口多态（最常用）

---



### 类与对象

- 事物有属性和行为，类有成员变量和成员方法。定义一个类，其实就是定义类的成员变量和成员方法

- 类是java的基本要素，一个java程序就是由若干个类构成的

- ==类是java中最重要的数据类型，类声明的变量就是对象==

类：是一组相关的属性和行为的集合，是一个抽象的概念，比如苹果

对象：是某一类事物的具体存在，是一个具体的概念，比如这个苹果

类定义：

```java
calss 类名 {
  类体
}

class Student {					// 定义一个名为Student的类
  String name;					// 成员变量，有默认值
  public void study() {	// 成员方法
    System.out.println("studying");
  }
}
```

---



#### 成员变量

==成员变量在整个类中都有效，与书写位置无关==

##### 与局部变量的区别

- 在内存的位置不同：成员变量在堆内存，局部变量在栈内存
- 生命周期不同：成员变量与对象一致，局部变量与方法一致
- 初始化值不同：成员变量有默认初始化值，局部变量没有默认值，必须显式初始化才能操作

注意：如果两者名字相同，在方法的使用中采用就近原则

---



##### 实例变量和静态变量

```java
String x;
static int y;
```

区别：

- 实例变量属于对象；静态变量属于类
- 实例变量存储在堆内存；静态变量存储在静态区
- 类加载时静态变量就已经存在
- 类变量不仅可以对象调用，还可以类名调用
- ==所有实例共有的变量就定义为类变量==

---



#### 成员方法

方法就是完成特定功能的代码块。java中没有函数的概念，js中行函数，也有方法

格式：

```java
修饰符 返回值类型 方法名([数据类型 形参, ...]) {}
两个明确：返回值类型、参数列表
```

##### 方法重载

在同一个类中，允许存在同名方法，只要参数的数目或类型不同，与返回值类型无关。也就是说，方法重载：

- 方法名相同
- 参数不同

---



##### 方法重写

子类中出现了和父类中相同的方法，这就是方法重写，也就是说，子类和父类的方法

- 返回值类型相同
- 方法名相同
- 参数类型和数目相同

- ==子类重写方法的访问权限不能更低==

---



##### 构造方法

给对象的数据进行初始化。

格式：

- 方法名和类名一样

- 没有返回值类型

  ```java
  class Student {
    Student() {}
  }
  ```

系统默认给出一个空的构造方法，如果提供了构造方法，系统将不再提供。==构造方法允许重载==

```java
Student s=new Student()
```

==使用new + 构造方法创建对象时先给成员变量进行默认初始化、显式初始化，再执行构造方法==

---



##### 实例方法和静态方法

```java
String study() {}			// 实例方法
static void call() {}	// 静态方法
```

注意：

- 创建第一个对象时，就会加载实例方法，以后再创建对象，直接使用已加载实例方法的引用
- 静态方法中没有this。因为this是当前对象，而类被加载时还没有创建对象
- 静态方法只能访问静态成员（静态变量、静态方法）
- ==如果方法不需要操作类的实例变量，就定义为静态方法==

---



### this关键字

this代表当前类的对象。也就是说，方法被哪个对象调用，this就代表该对象

```java
this();	// 调用构造方法
this.prop;	// 访问变量
this.mymethod();	// 访问方法
```

- 实例变量一致使用this，可以区分成员变量和局部变量

---



### static关键字

static可以修饰变量、方法

```java
static String name;
static void call() {}
```

特点：

- 随着类的加载而加载。类被加载时就存在于内存
- 优先于对象而存在。类变量属于类，实例变量属于对象
- ==所有对象共享类变量==
- 可以通过类名调用。不用创建对象，直接通过类名就能访问类变量和类方法

---



## 子类与继承

### 概述

extends关键字用于实现类与类的继承，注意：

- ==在继承中，jvm会先加载父类，再加载子类==
- 使用子类创建对象时，也是先执行父类构造方法，再执行子类构造方法

```java
class Father {}
class Son extends Father {}
```

特点：

- java只支持单继承，不支持多继承
- 支持多层继承

好处：

- 提高了代码的复用性
- 提高了代码的维护性
- 类与类之间产生了关系，是多态的前提，但也使得类变得高耦合、破坏类的封装性

注意事项：

- 子类只能继承父类非私有成员（成员变量、成员方法）
  - 同包情况下，子类会继承父类除private成员之外的成员
  - 不同包情况下，子类会继承父类除private、默认修饰的成员之外的成员，和子类同包的其他类不能访问子类继承的protected成员
- 子类不能继承父类的构造方法，但能通过super关键字去访问父类的构造方法

---



### super关键字

super代表父类引用。

this是访问本类成员，super是访问父类成员

```java
super();	// 调用父类构造方法
super.prop;	// 访问父类变量
super.mymethod();	// 访问父类方法
```

---



### 继承中的成员访问

#### 成员变量

如果子类和父类出现名字相同的变量，会使用就近原则：

- 先看方法中是否存在该变量
- 再看子类
- 然后看父类，父类的父类，直到没有继承
- 都没有就报错

==使用this可以访问子类成员，使用super可以访问父类成员==

---



#### 构造方法

子类所有的构造方法默认都会访问父类的空参数的构造方法，即子类构造方法第一条语句默认也必须是super()。

如果子类构造方法中手动调用了super(...)，系统将不提供super()。

==在使用new+构造方法创建对象时先执行父类的构造方法，再执行子类的构造方法==

```java
class Fu {
  static {}		// 1
  {}	// 3
  public Fu() {}	// 4
}
class Zi extends Fu {
  static {}		// 2
  {}		// 5
  public Zi() {}	// 6
}
class Demo {
  public static void main(String[] args) {
    Zi z = new Zi();
  }
}
// 因为Zi z时，会先加载Fu类，再加载Zi类，然后执行构造方法
```

---



#### 成员方法

如果存在同名成员变量，那么

- 子类定义的方法操作的是子类成员，也可以操作继承来的不重名的成员
- 子类继承的父类方法操作的仍是父类成员

使用成员方法时：

- 先看子类是否存在该方法
- 再看父类是否存在该方法，继续向上找
- 都没有就报错

继承中方法可以重写，



---



## 多态

### 概述

多态是指事物在不同时刻表现出来的不同状态，同一个行为具有多个不同表现形式或形态的能力

多态前提：

- 继承
- 方法重写
- 父类引用指向子类对象

```java
calss Animal {}
class Tiger extends Animal {}
Animal a = new Tiger();		// 向上转型，a是上转型对象
Tiger t = (Tiger)a;				// 向下转型，t是正常的Tiger对象
```



好处：

- 也提高了代码的维护性

- 提高了代码的扩展性

  ```java
  /*	如果需要创建不同的子类对象作为方法实参，以前都是定义不同的方法，接受不同的子类对象。 有了多态后，		 可以定义一个方法，该方法接受一个父类对象，所有的子类对象都可以使用该方法 */
  class Animal {
    public void eat() {}
  }
  class cat extends Animal {
    public void eat() {}
  }
  class Dog extends Animal {
    public void eat() {}
  }
  ...
  public void myMethod(Animal a) {}
  myMethod(new Cat())	//相当于Animal a = new Cat()
  ```

弊端：==上转型对象不能使用子类的成员==，但可以将上转型对象强转为子类对象（向下转型）





---



### 多态中的成员访问

#### 成员变量

上转型对象的成员变量是指父类的成员变量，不能访问子类的成员变量





---



#### 构造方法

new Zi()创建子类对象的时候，会访问父类的构造方法，对父类的数据进行初始化，再访问子类构造方法







---



#### 成员方法

首先检查父类中是否有该方法，如果

- 没有，则编译错误
- 有，再去调用子类的同名方法
  - 有，执行子类方法
  - 没有，执行父类方法

### 多态与继承的区别

继承中先使用子类的成员，如果没有再使用父类的成员，还没有就报错

```java
Zi z = new Zi();
```

多态中，使用父类的成员变量，没有就报错；使用子类重写的方法，没有重写就使用父类方法，还没有就报错

```java
Fu f = new Zi();
```











---



## 抽象类

java中，一个没有方法体的方法（只有声明）要定义为抽象方法，有抽象方法的类必须是抽象类

abstract关键字可以修饰类、方法。

抽象类成员：

```java
abstract class A {		// 抽象类
  private int a;			// 变量
  public final int b;	// 常量
  public A() {}				// 构造方法
  abstract int myMethod1(int x);	// 抽象方法，强制子类重写
  int myMethod2() {}	// 实例方法，将所有子类都有的方法放到这里，提高复用性
}
```

注意：

- 抽象类不能实例化。即不能使用new创建对象，但可以通过非抽象子类和多态完成实例化
- 抽象类有构造方法，用于子类访问父类数据的初始化
- 抽象类的子类
  -  抽象类，可以不重写父类的抽象方法，直接继承
  - 非抽象类，必须重写父类的所有抽象方法
- 定义为抽象类还可以阻止创建该类对象
- abstract不能与private、final、static共存

---



## 接口

### 概述

接口是java中的一种数据类型。接口包含类要实现的方法，而类是属性和方法的集合。==优先使用接口，而不是父类==

接口相当于抽象类的简化版，成员只能是常量和抽象方法，不能通过new实例化。

interface关键字用于定义接口。接口成员：

```java
interface Printable {		// 定义了一个名为Printable的接口
  public static final int MAX = 1;	// 必须是public static final，可以省略
  int MIN;
  public abstract float sum(int x);	// 必须是public abstract，可以省略
  float sub();
}
```

类实现接口使用关键字implements

```java
class 类名 implements 接口名 {
  public float sum(int x) {}
}
```

注意：

- ==接口中只有常量和抽象方法==
- 接口没有构造方法
- 接口和抽象类一样，不能实例化，只能通过多态方式来实例化
- 接口子类可以是
  - 抽象类（没意义）
  - 具体类，但必须重写接口所有的抽象方法，==重写的方法前记得加上public==

- 类可以实现多个接口
- ==接口之间可以多继承==

---



### 抽象类与接口的区别

- 接口只能有常量和抽象方法
- 抽象类用于存储所有子类的共有功能和多态功能，接口用于存储部分或单个子类的扩展功能

---







---



## 内部类

类除了有成员变量和成员方法，还可以有一种成员：内部类。包含内部类的类叫外嵌类

```java
class Outer {
  [修饰符] class Inner {}
}
```

注意：

- 内部类中不能有静态成员
- 内部类可以使用static、private、protected修饰
- 内部类可以访问外嵌类的成员
- 内部类不能和外嵌类同名
- 内部类可作为其他类的成员
- 外嵌类可以使用内部类创建对象，作为自己的成员

---



## 匿名类

匿名类没有名字，所以不能使用new和构造方法创建对象，==匿名类的实质是继承了该类或实现了该接口的子类匿名对象==。假设Hello是一个类或接口，那么可以用Hello的子类（匿名类）创建对象

```java
new Hello {}	// 写了子类的同时还创建了子类的对象
```

注意：

- 匿名类就是一个子类，该子类没有名字
- 匿名类也是内部类
- 匿名类的主要用途是用作方法的参数传值



---



## 常用类

### Object

```java
// 构造方法
Object() {}				// 只有一个无参构造方法

// 成员方法
toString()				// 直接输出对象，实际是调用toString方法，所以都要重写该方法
equals(Object obj)// 默认比较地址值，必须要重写为比较对象的属性
  
System.out.println(对象)		//默认调用toString方法，返回字符串
对象2.equals(对象2)		// 比较两者是否为同一个对象，返回布尔值
```

---



### Scanner

```java
// 构造方法

// 成员方法
nextInt();		// 获取并返回键盘录入的int数据
hasNextInt();	// 判断输入的数据是否为int型
next();			// 获取键盘录入的字符串数据
hasNext
```

---



### String

```java
// 构造方法
String()
String(byte[]) // 把字节数组转成字符串，将数字按照ASCII码转为字符
String(byte[] bytes,int ind,int len) // 把字节数组从索引ind开始，长度为len的元素转为字符串
String(char[] val) // 把字符数组转成字符串
String(char[] val,int ind,int count) // 把字符数组的一部分转成字符串
String s = “hello”;  // 常量对象的引用值赋值给s

// 成员方法
// 判断功能：返回的是布尔值
equals(Object obj) // 判断字符串内容是否相同，区分大小写
equaIsIgnoreCase(String str) // 判断字符串内容是否相同，忽略大小写
contains(String str) // 判断大字符串是否包含小字符串
startsWith(String str) // 判断字符串是否以某个指定的字符串开头
endsWith(String str) // 判断字符串是否以某个指定的字符串结尾
isEmpty() // 判断字符串是否为空

// 获取功能
length() // 获取字符串长度
charAt(int index) // 获取指定索引的字符
indexOf(int ch) // 返回指定字符在此字符串中ch第一次出现处的索引
indexOf(String str) // 返回指定字符串中str第一次出现的索引
indexOf(int ch,int fromIndex) // 返回ch在此字符串中从指定位置后第一次出现处的索引
indexOf(String str,int fromIndex)// 返回str在此字符串中从指定位置后第一次出现处的索引
substring(int start) // 从start开始截取字符串，默认到末尾
substring(int start,int end) // 截取从start开始到end的字符串

// 转换功能
getBytes() // 把字符串转换为字节数组
toCharArray() // 把字符串转换为字符数组
static String valueOf(char[] chs) // 把字符数组转换为字符串
static String valueOf(int i) // 把int类型的数据转换为字符串
toLowerCase() // 把字符串转成小写
toUpperCase() // 把字符串转成大写
concat(String str) // 把字符串拼接

replace(char old,char new)	// 将所有的old换成new
replace(String old,String new)
trim()	// 返回去掉两边空格的字符串
```

```java
/* 字符串可以看做是字符数组，"abc"也是一个字符串对象.
	 字符串是常量，定义了就不能改变其值*/
String s = "ab";
s += "cd";	// 最后s为"abcd"，只是s指向了新创建的字符串"abcd","ab"还在内存

String s1 = new String("hi");	// 分别在堆内存、常量池创建了一个对象
String s2 = "hi";	// 只在常量池创建对象
```

---

**正则表达式**

正则表达式是指含有特殊意义的字符的字符串，这些特殊字符叫元字符

```java
\		：转义字符
\\	：表示\
.		：表示任何一个字符
\.	：表示.
\\d	：代表数字
\\w	：代表标识符（不包括$）
[若干字符]	：代表里面的任何一个字符，里面可以使用 ^ ，表示非；
[a-zA-Z]	：代表字母中的任何一个

限定修饰符：
X?			X出现0或1次
X*			X出现0或多次
X+			X出现1或多次
X{n}		X出现n次
X{n,}		X至少出现n次
X{n, m}	X出现n到m次
X|Y			X的后缀是Y

matches(String regex)	// 判断字符串是否匹配正则表达式regex
String[] split(String regex)	// 以regex分割字符串

String regex = "1[38]\\d{9}";	// 以1开头的11个数字
str.matches(regex);
String age = "18-25";
String[] atrArr = age.split("-");
```

---



### Arrays

```java
// 都是静态方法
toString(int[] a) // 把数组转成字符串
sort(int[] a) // 数组升序排序，没有返回值，改变原数组
```

---



### 包装类Integer/Character...







---



### Math

```java
// 没有构造方法，而且成员都是静态的
// 成员方法
random()  // (int) (Math.random()*10)+1表示随机出现1~10的数
abs(int a) // 绝对值
ceil(double a) // 先上取整
floor(double a) // 先下取整
pow(double a,double b) // a的b次幂
sqrt(double a) // 正平方根
max(int a,int b) // 最大值
min(int a,int b) // 最小值
round(float a) // 四舍五入
round(double a) // 四舍五入
```

---



### Random









---



### System







---



### Date

```java
// 构造方法
Date()	// 创建Date对象
Date(long time) // 根据给定的毫秒值创建日期对象
  
// 成员方法
getTime() // 获取对象的毫秒数
setTime(long time) // 设置时间
```









---



## IO流

java.io包



### File类

```java
// 构造方法
File(String filename);
File();
File();

// 成员方法

File f = new File("C;\\a.txt");
```

---



### 字节流







---



### 字符流







---



### 打印流

















---



## 多线程





### 实现方式

#### Thread类





---



#### Runnable接口







---



### 同步

#### 同步代码块

锁对象是任意对象

```java
synchronized(锁对象) {...}
```





---



#### 同步方法

锁对象是this对象

```java
public synchronized void myMethod() {...}
```





---



#### 静态方法

锁对象是类的字节码文件对象（Class）

```java
public static synchronized void myMethod() {...}
```







---



## 网络编程

















---



## 泛型



















---

 

## 集合框架











---



## 补充

### 进制

进制是一种进位的方式，x进制表示逢x进1。

计算机电子元件的状态：开、关，分别用1、0表示。

国际化标准组织规定，用8个信号表示一个数据，单位是字节

计算机数据存储单位：

1byte（字节）=  8bit（位）

1k（千字节）=  1024byte

1m（兆）=  1024k

1g（吉）=  1024m

1t（太）=  1024g

八进制：二进制数据，从右开始，每三位一组合，左边不够补0，将计算出来的十进制数值组合，就是八进制。

十六进制：二进制数据，从右开始，每四位一组合，左边不够补0，将计算出来的十进制数值组合，就是十六进制

---

**不同进制的组成：**

- 二进制
  - 由0,1组成。以0b开头
- 八进制
  - 由0,1，...，7组成。以0开头
- 十进制
  - 默认是十进制
- 十六进制
  - 由0,1，...，9，a，b，c，d，e，f。以0x开头

```java
public class Demo {
  public static void main(String[] args) {
    System.out.println(100);		// 100
    System.out.println(0b100);	// 4
    System.out.println(0100);		// 64
    System.out.prinln(0x100);		// 256
  }
}
```

---

**进制转换：**

二进制：	  1			1			1			1			1			1			1			1

​					 2^7^			2^6^		 2^5^		  2^4^		   2^3^		  2^2^		  2^1^		  2^0^	

十进制：	128		64		  32		  16		   8			4			2			1

**x进制转换为y进制：x进制 -> 十进制 -> y进制**

**二进制、八进制、十六进制的快速转换：**

示例：0b1011001（二进制）----  八进制

```java
0b1011001（二进制）
  001			011			001
   1			 3			 1
0131（八进制）
```

0b1011001（二进制）----  十六进制

```java
0b1011001（二进制）
  0101			1001
   5					9
0x59（十六进制）
```

---



### 原码、反码、补码

在计算机内，有符号数有3种表示法：原码、反码、补码。

原码：最高位是符号位（0表示正，1表示负），其余位是数值大小

反码：正数的反码和原码一样；负数的反码，符号位不变，数值位取反

补码：正数的补码和原码一样；负数的补码，在其反码末位加1

==正数的原码、反码、补码相同，负数的原码、反码、补码符号位为1，数值位依次取反、末位加1==

示例：+7、-7的原码、反码、补码

```java
1. 求出数值的二进制
   111
2. 求原码
   			符号位		数值位
   +7			0		 0000111
   -7			1		 0000111
3. 求反码
  			符号位		数值位
   +7			0		 0000111
   -7			1		 1111000
4. 求补码
  			符号位		数值位
   +7			0		 0000111
   -7			1		 1111001

7->00000111（原码）->00000111（反码）->00000111（补码）
-7->10000111（原码）->11111000（反码）->11111001（补码）
```

==由于数据是按补码存储的，所以数据运算都是补码运算，按原码展示==

---



### java中的内容分配

java为了提高程序的效率，对数据进行了不同空间的分配。

- 栈stack：存储局部变量，基本数据类型的数据都存储在栈
  - 局部变量没有默认值，必须初始化才能操作
  - 局部变量只在所在作用域有效，脱离作用域就会被回收
- 堆heap：存储new出来的数据
  - 类的成员变量、数组成员都是在堆内，所以有默认值
  - 只有不存在引用，才会被回收
- 可以被所有线程共享
- 方法区（静态区）：
  - 可以被所有线程共享
  - 包含的都是在整个程序中唯一的元素，例如class和static变量，方法

---



### 修饰符

- 权限修饰符：public、protected、默认、privaet

- 状态修饰符：static、final

- 抽象修饰符：abstract

**常见用法：**

- 类：默认、public、final、abstract。常用public

- 成员变量：public、protected、默认、private。常用private

- 构造方法：public、protected、默认、provate。常用public

- 成员方法：public、protected、默认、private、static、final、abstract。常用public



---



#### static





---



#### final

可以修饰类、变量、方法。

```java
final myClass;	// 类不能被继承
final age;			// 方法不能被重写
final call();		// 常量
```

---



#### abstract



---



### main方法

```java
public static void main(String[] args) {}
/*public：权限最大，jvm调用main方法属于外部调用
	static：jvm不用创建对象就能通过类名调用
	void：返回值给jvm没有意义
	main：不是关键字，但jvm能识别，以main方法为入口运行
	String[] args:可以在运行字节码文件时接收数据，args不唯一，可以起其他名字
```

---



### 代码块

java中有几种代码块：

- 局部代码块

  在方法中定义，用完就被回收，可以提高内存利用率

- 构造代码块

  ```java
  // 在类中方法外定义，每次创建对象前都会被调用，优先于构造方法执行。可以将多个构造方法重复代码写在这里
  {
    ...
  }
  ```

- 静态代码块

  ```java
  // 在类中方法外定义，加载类时先执行，只会执行一次，优先于构造代码块执行，用于给类进行初始化
  satatic {
    ...
  }
  ```

- 同步代码块

  ```java
  // 在多线程环境，对共享数据的读写操作需要互斥进行，否则会导致数据的不一致。同步代码块需要写在方法中
  synchronized (锁对象) {
    ...
  }
  ```

 静态代码块和构造代码块：

- 都在构造方法前执行，在类中可定义多个

==执行流程：静态代码块>构造代码块>构造方法==

---



### 数组排序

#### 冒泡排序

```java
for(int i = 0; i < arr.length-1; i++) {
	for(int j = 0; j < arr.length-1-i; j++) {
		if(arr[j] > arr[j + 1]) {
    	int temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
		}
	}
}
```

---



#### 选择排序

```java
for(int i = 0; i < arr.length-1; i++) {
  for(int j = i + 1; j < arr.length; j++) {
    if(arr[i] > arr[j]) {
      int temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }
}
```

































































