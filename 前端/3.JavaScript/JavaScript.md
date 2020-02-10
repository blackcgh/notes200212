# JavaScript

## JS 概述

**JAvaScript 特点：**

- JavaScript 是互联网上最流行、运行在客户端的脚本语言，也是一种轻量级的编程语言

- JavaScript 是单线程的语言
- JavaScript 是可插入 HTML 页面的编程代码，可以操作HTML元素、CSS样式

- 在页面渲染过程中，浏览器渲染引擎(内核)负责执行HTML/CSS；**JS引擎负责逐行解释并执行JS**

**JavaScript 组成：**

- **ECMAScript：**规定了JS的基本语法
- **DOM(Document Object Model)：**文档对象模型。W3C推荐的处理XML的编程接口，可以操作页面元素
- **BOM(Browser Object Model)：**浏览器对象模型。描述与浏览器进行交互的API，可操作浏览器窗口

**DOM和BOM都属于Web APIs**。[MDN文档]()

---



## ECMAScript

### 输入输出

```js
alert()						// 浏览器弹出警示框
prompt()          // 浏览器弹出输入框
console.dir()			// 控制台输出对象信息
console.log()			// 控制台输出信息
```

---



### 变量

变量是内存里的一块空间，用于存储数据，方便我们使用数据。声明变量的本质是在内存申请空间。

var：variable

```js
var name;					// 声明变量
name = 'black';		// 赋值
var age = 18;			// 初始化
```

声明多个变量

```js
var name = 'black',
    age = 18;
```

JS是弱类型的语言，声明变量时并没有确定类型，而是由赋值来判断变量的类型，并且可以赋予不同类型的值，变量值将以最后一次赋值为准（JS是弱类型/动态语言，变量的数据类型是可以变化的）。

```js
var name = 'black';
name = true;
```

只声明不赋值的变量，默认是undefined；不声明不赋值的‘变量’，使用会报错；不声明只赋值的‘变量’是全局变量

```js
var name;
console.log(name);		// name = undefined
console.log(email);		// 报错
address = '192.168.0.101';
console.log(address);	// address = '192.168.0.101'
```

**变量命名规范:**

- 变量由字母、数字、下划线、美元符号组成，不能以数字开头
- 区分大小写
- 不能是关键字、保留字
- ==name是window下的一个特殊属性，不能使用==
- 见名知意
- 遵守驼峰命名法

---



### 数据类型

**简单数据类型：**

- Number(数字型)：包括整型、浮点型

  ```js
  // 数字型进制：二进制（0b）、八进制（0）、十进制、十六进制（0x）
  /* 数字型范围：
  Number.MAX_VALUE	最大值
  Number.MIN_VALUE	最小值
  Infinity					无穷大
  -Infinity					负无穷大
  NaN								非数字。与数字型运算的结果有数字、字符串、NaN*/
  // isNaN(x) 用于判断变量x是否是NaN
  console.log(isNaN(1));		// 返回false
  console.log(isNaN('是'))	 // 返回true
  ```

- Boolean(布尔型)：true、false，

  ```js
  // 参与运算时等价于1、0
  ```

- String(字符串)：

  ```js
  /* 转义字符：以 \ 开头
  \n(换行)、\r(回车)、\t(制表)、\b(空格)、\\(反斜杠)、\'(单引号)
  */
  // 字符串的length属性(没有括号)
  console.log('my name'.length		// 7
  ```

- Undefined(未定义)：只声明的变量或`var a = undefined`

  ```js
  var a;
  console.log(a + 'str');		// undefinedstring
  // undefined参与运算的结果是NaN
  ```

- Null(空值)：`var b = null`

  ```js
  // null参与运算等同于0
  cconsole.log(null + 1);		// 1
  ```

---

**复杂数据类型：**

- Object(对象)：

  ```js
  
  ```

- Array(数组)：

  ```js
  
  ```

- Function(函数)：

  ```js
  
  ```

---

**typeof运算符**

typeof 用于判断变量的数据类型，返回的是字符串。

- `typeof null = 'Object'`
- `typeof 数组/对象 = 'Object'`
- `typeof 函数 = 'Function'`

---



### 类型转换

#### 显示转换

**Number**

- `parseInt()`：返回整数或NaN，可忽略数字后面的非数字部分，如：`100px`
- `parseFloat()`：返回浮点数或整数或NaN，可忽略数字后面的非数字部分
- `Number(变量)`：返回数字型
- `- * /`：`'12' - 0`

**String**

- `String(变量)`：
- `变量.toString()`：将变量转为字符串格式
- `变量 + ''`：拼接为字符串（隐式转换）

**Boolean**

- `Boolean(变量)`：0、''、null、undefined、NaN转为false，其余是true

---

#### 隐式转换

`-、*、/、==、关系运算符`：==字符串和数字运算会先转为数字，再运算。==

`+`：任何类型和字符串相加都是字符串拼接。

---



### 运算符

也叫操作符（operator）。尽量不让浮点数参与运算、比较，可能会出现一些问题。

**表达式：**由数字、运算符、变量组成的式子。

**返回值：**表达式的结果。

常用的运算符有：

- 算数运算符

  ```js
  + - * / %
  // 
  ```

- 递增和递减运算符

  ```js
  ++ --
  var a = 10;
  var b = a++ + ++a;		// b = 22
  ```

- 关系运算符

  ```js
  < > >= <=
  == !=			// 隐式转换
  === !==		// 全等，
  ```

- 逻辑运算符

  ```js
  && || !
  console.log(123 && 456);		// 456
  console.log(0 && 1);				// 0，前一个是false，返回第一个值
  console.log(1 || 2);				// 1，前一个是true，返回第一个值
  ```

- 赋值运算符

  ```js
  = += -= *= /= %=
  ```

| 优先级 | 运算符     |
| ------ | ---------- |
| 1      | 小括号     |
| 2      | 一元运算符 |
| 3      | 算数运算符 |
| 4      | 关系运算符 |
| 5      | 逻辑运算符 |
| 6      | 赋值运算符 |

---



### 流程控制

**流程控制结构：**

- 顺序结构

- 分支结构

  - if语句

  - if...else语句

  - if...else if...else语句

  - switch语句

    ```js
    switch(变量) {
      case 常量:			// 变量和常量是全等比较
        ...
    }
    ```

- 循环结构

  - for语句
  - while语句
  - do...while语句

**三元表达式：**

条件表达式 ? 表达式1 : 表达式2

---



### continue&break关键字

**continue关键字：**用于跳出本次循环，继续下一次循环。

**break关键字：**用于跳出整个循环

---



### return关键字

**return关键字：**用于结束函数，就是return后面的代码不会被执行。

**return只能返回一个值，如果有多个值，就返回最后一个值；**如果想返回多个值，可以使用数组或对象

---



### 数组

数组是一组数据的集合。数组的创建方式

```js
var arr = new Array()		// 构造函数创建空数组
vstr arr2 = [1, 2, 3];					// 简写，初始化

arr[0] = 7;							// 添加元素
```

JS中的数组可以存储不同的数据类型

```js
var arr = [1, true, '字符串', null, undefined];
```

通过索引访问数组元素

```js
arr[0];			// 没有该索引会返回undefined
```

遍历数组

```js
// 遍历就是访问数组所有元素
for(var i = 0; i<arr.length; i++) {console.log(arr[i])}
```

数组的length属性是可读写的

```js
var arr = [1, 2];
arr.length = 3;			// arr = [1, 2, undefined]
arr.length = 1;			// arr = [1]
```

数组新增元素

```js
var arr = [1, 2];
arr[2] = 3;					// arr = [1, 2, 3]
```

冒泡排序

```js
for(var i = 0; i < arr.length - 1; i++) {
  for(var j = 0; j < arr.length - 1 - i; j++) {
    if(arr[j] > arr[j + 1]) {
      var temp = arr[j];
      arr[j] = arr[j + 1];
      arr[j + 1] = temp;
    }
  }
}
```

---



### 函数

**函数：**是封装了一段可以被重复调用执行的代码块。通过代码块可以实现大量代码的重复使用。

**命名函数**

```js
function 函数名() {...}
```

**匿名函数**

```js
var 变量 = function() {...}		// 将函数赋值给变量
```

通过`()`调用函数

```js
函数名();
变量名();
```

函数的参数

```js
function 函数名(形参1, 形参2, ...) {}	// 声明函数，形参是不用声明的变量
函数名(实参1, 实参2, ...);							// 调用函数

// 如果没有实参传递过来，形参是undefined
```

函数的返回值通过return语句实现，注意：

- return只能返回一个值
- return以后的代码不会执行
- **函数默认返回undefined**

```js
function getResult() {
  ...
  return 2；
}
```

**函数的arguments内置对象**

```js
// 在JS中，所有函数都内置了一个arguments对象，用于存储实参。arguments是一个伪数组
function fn() {
  console.log(arguments);		// [1, 2, 3]
}
fn(1, 2, 3);
```

---



### 构造函数

构造函数是一种特殊的函数，主要用来封装对象中公共的属性和方法，可以快速创建同类对象。

```js
function 构造函数名(形参1, ...) {				// 定义构造函数
  this.属性 = 值,											// 实例成员
  this.方法 = function() {},
}
构造函数名.属性 = 值;										 // 静态成员

var obj = new 构造函数名(实参1, ...);		// 创建对象
```

**注意：**

- 构造函数就是类
- 构造函数名首字母要大写
- 属性值一般是形参
- 构造函数不需要return，new关键字就可以返回创建的对象

**new关键字：**

- 在内存中创建一个新对象
- this指向新对象
- 执行构造函数中的代码，给空对象添加属性和方法
- 返回新对象

---



### prototype 原型

每一个构造函数都有一个 `prototype` 属性，是一个对象。**原型对象用于存储构造函数的方法。**

```js
// 把构造函数的方法定义在原型上，所有实例共享这些方法
构造函数.prototype.方法 = function() {};	// 定义方法
实例.方法();														 // 调用方法
```

**prototype.constructor属性**

原型对象中有一个属性`constructor`，指向构造函数本身。该属性用于记录原型对象引用于哪个构造函数。**它可以让原型对象重新指向原来的构造函数。**

```js
构造函数.prototype = {			// 当以这种形式添加方法时，需要手动设置constructor重新指向构造函数
  constructor: 构造函数;
  ...
}
```

**注意：**

- ==除 Math 外，JS 所有的内置对象都是构造函数。==

---

**对象原型 `__proto__`**

每一个对象都有一个 `__proto__` 属性，指向构造函数的原型对象`prototype`。正是由于该属性，对象才能使用原型对象的属性和方法。==但该属性是非标准属性，开发中不能使用。==

![image-20200121210334850](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200121210334850.png)

---

**原型链**

原型对象也有 `__proto__` 属性，指向Object的原型对象，......。这样由`__proto__`形成的链条就是原型链。

![image-20200121214055855](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200121214055855.png)

**对象成员查找规则：**

- 当访问对象的属性/方法时，先看该对象中是否存在
- 如果没有就根据原型链一级一级查找
- 最后还没有找到就报错

---

**ES5 继承**

```js
function Father() {
  this.属性 = 值;
}
Father.prototype.方法 = function() {}

function Son() {										// 属性的继承
  Father.call(this, arg1, ...);			// 把Father当做普通函数，通过改变其内部this指向来调用
}

Son.prototype = new Father();				// 方法的继承
son.prototype.constructor = Son;
```

---



### 作用域

**ES5作用域：**

- 全局作用域：整个script标签或js文件
- 局部作用域：函数内部

**ES5变量：**

- 全局变量：在函数外定义的变量，任何地方都能访问
- 局部变量：在函数内定义的变量，只能在函数内访问

**注意：**

- ==在函数内内部没有声明直接赋值的变量也是全局变量==
- 函数的形参是局部变量
- ES6新增了块级作用域

---

**作用域链**

代码中至少有一个全局作用域；如果存在函数，那么还有局部作用域，局部作用域中可能还有局部作用域。而变量是在当前作用域中查找，如果没有找到，就会向上级作用域去查找，直到全局作用域，这个过程形成的链条就叫做作用域链（就近原则）。

---



### 对象

**对象是拥有属性和方法的集合，对象也是数据。**

**对象属性：**用变量描述事物的特征。常用名词命名属性。

**对象方法：**用函数描述事物的行为。常用动词命名行为。

**对象是键值对的容器，**写法是`name: value`，name是不用声明的变量

```js
/* 键：属性名
	 值：属性值，可以是具体值、函数 */
```

---

**创建对象的方式：**

- 对象字面量

  ```js
  var obj = {
    name: 'black',					// 属性
    age:18,
    sing: function() {...},	// 方法
  }
  ```

- new Object

  ```js
  var obj = new Object();		// 创建一个空对象
  obj.name = 'black';				// 添加属性
  obj.sing = function() {};	// 添加方法
  ```

- 自定义构造函数

  ```js
  function Obj(name) {
    this.name = name;
    this.sing = function() {}
  }
  var obj = new Obj('black');
  ```

---

**调用对象的方式：**

```js
obj.name;										// 调用对象的属性
obj['age'];
obj.sing();									// 调用对象的方法
```

**遍历对象**

```js
for(var k in obj) {}				// k是属性名、数组索引
```

---

**instanceof运算符**

`instanceof`用于检测构造函数的 `prototype` 属性是否出现在实例的原型链上。

```js
实例 instanceof 构造函数

arr instanceof Array		// true
```

---



### 内置对象

JavaScript中的对象分为**自定义对象，内置对象、浏览器对象**。前两者属于ECMAScript，浏览器对象是JS独有的。

**内置对象：**

- Math

  ```js
  // Math不是函数对象，属性和方法都是静态的
  Math.max(n1, n2, ...)	// 最大值
  Math.min(n1, n2, ...)	// 最小值
  Math.floor(n)					// 向上取整
  Math.ceil(n)					// 向下取整
  Math.round(n)					// 四色五入
  Math.abs(n)						// 绝对值，也可以将字符串'-1'转为数字型
  Math.random()					// 返回[0, 1)中的浮点数
  ```

- Date

  ```js
  // 构造函数
  new Date()											// 返回当前时间
  new Date('2020-1-18 12:18:00')	// 返回指定时间
  date.getTime()									// 返回Date对象的时间戳（总的毫秒数）
  +new Date()											// 返回当前时间的时间戳
  +new Date(date)									// 返回Date对象的时间戳
  Date.now()											// h5新增
  ```

- Array

  ```js
  // 构造函数
  Array.isArray(arr)							// H5新增
  push(元素1[, ...[])							 // 数组追加元素
  pop()														// 数组删除最后一个元素
  unshift(元素1[, ...[])				 	 // 数组前置添加元素
  shift()												  // 数组删除第一个元素
  reverse()												// 反转数组
  indexOf()												// 返回指定元素的索引，否则返回-1
  toString()											// 返回以逗号分隔元素的字符串
  join([str])											// 返回以str分隔元素的字符串，默认是逗号
  splice(start[,count, 元素1, ...])// 可删除/替换/添加数组元素，返回更改过的数组
  sort([(a,b) => a-b])						// 数组排序(升序)
  
  ```

- String

  ```js
  // 字符串是常量，改变值的实质是创建新的字符串，变量指向新的字符串，先前的字符串并没有从内存中消失
  indexOf(str)										// 返回指定字符的位置
  charAt(index)										// 返回指定位置的字符
  charCodeAt(index)								// 返回指定位置的字符的ASCII码，可判断按下哪个键
  split(str)											// 根据str将字符串分隔为几个数组元素
  substr(start, length)						// 从索引start开始，截取length长度的字符
  concat(str1, str2, ...)					// 拼接字符串
  replace(oldstr, newstr)					// 将字符串的子串oldstr替换为snewtr
  trim()													// 去除两边空格
  ```

- 基本包装类型（Boolean、Number、String）

  ```js
  // 当读取基本类型值时，JS就会创建对应的基本包装类型对象，从而能够调用该类型的属性和方法，完成操作就会  		销毁包装对象，可以在包装对象的原型上添加属性和方法，以供使用
  
  // Number方法
  toFixed(n)											// 指定数值的小数位数
  ```

---



### AJAX

#### 概述

AJAX（异步 JavaScript 和 XML）是一种用于创建快速动态网页的技术。

传统的网页（不使用 AJAX）如果需要更新内容，必需重载整个网页面；AJAx可以局部刷新页面

---



#### XMLHttpRequest 对象

XMLHttpRequest 用于在后台与服务器交换数据。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新

```js
let xhr = new XMLHttpRequest();
```

---



#### 对象属性/方法

```js
readyState													// 存有 XMLHttpRequest 的状态：0、1、2、3、4
status															// 
responseText												// 获得字符串形式的响应数据
responseHTML												// 获得 HTML 形式的响应数据
onreadystatechange									// 每当 readyState 属性改变时，就会调用该函数
open(method, url)										// 规定请求的类型、URL 以及是否异步处理请求
send([string])											// 发送请求，参数string用于post请求方式
setRequestHeader(header,value)			// 设置请求头

```

**AJAX实例：**

```js
let xhr;
if (window.XMLHttpRequest) xhr = new XMLHttpRequest();
else xhr = new ActiveXObject("Microsoft.XMLHTTP");
xhr.onreadystatechange=function()
{
	if (xhr.readyState==4 && xhr.status==200)
	{
		document.getElementById("myDiv").innerHTML=xhr.responseText;
	}
}
xhrp.open("GET","/try/ajax/info.txt");
xhr.send();
```

---



### JSON

#### 概述

**JSON（JavaScript Object Notation）：**是一种语法，用来序列化对象、数组、数值、字符串、布尔值和 null。它基于 JavaScript 语法，但又与之不同。

JSON 是用于存储和传输数据的格式，通常用于服务端向网页传递数据 。

JSON 格式在语法上与 JS 对象代码是相同的。所以 JS 程序可以很容易的将 JSON 数据转换为 JavaScript 对象。

---



#### 语法规则

- 属性名称必须是双引号括起来的字符串；最后一个属性后不能有逗号

- 数据为键值对

- 数据之间由逗号分隔

  ```json
  [
  	{
    	"result": true,
    	"count": 42
  	},
    {
      ...
    }
  ]
  ```

---



#### 对象方法

```js
// 都是静态方法
JSON.parse(json)							// 解析JSON字符串并返回对应的值
JSON.stringify(js)						// 返回与指定值对应的JSON字符串
```

---



## Web APIs

**Web APIs是浏览器提供的一套操作浏览器功能(BOM)和页面元素(DOM)的API。**

---

### DOM

#### 概述

文档对象模型 将 web 页面与到脚本语言(JavaScript)连接起来。DOM模型用逻辑树来表示文档，树上有许多节点(node)，每个节点都包含着对象(objects)。DOM的方法(methods)可以操作文档树（改变文档的结构、样式或内容）。节点上还可以设置事件，用于监听指定动作。

**DOM树（文档树）**

<img src="E:\HTML源代码\imagesrc\dom.jpg" alt="DOM树"  />

- **文档：**一个页面就是一个文档，DOM中使用document表示
- **元素：**标签就是元素，DOM中使用element表示
- **节点：**页面上所有内容都是节点（文档、标签、属性、文本、注释），DOM中使用node表示
- **对象：**文档、元素、节点都是对象

==注意：==

- 属性节点是元素节点的兄弟节点
- 文本节点是元素节点的子节点
- 标签内外的换行、空格也是文本节点

---



#### DOM 对象属性/方法

**常用属性：**

```js
innerHTML									// 元素节点的内容
style											// 元素节点的样式对象
className									// 元素节点的类属性
classList									// 返回元素的所有类名，伪数组或对象，用于添加、移除及切换类名，H5新增
nodeName									// 节点名称(标签名称)
nodeValue									// 节点值。默认为空
nodeType									// 节点类型。元素节点的nodeType为1
parentNode								// 获取节点的父节点
childNodes								// 获取节点的子节点的伪数组，包含文本节点
children									// 子元素伪数组
offsetParent							// 获取元素的已定位父元素
offsetLeft								// 获取盒子相对于定位父盒子的左偏移
offsetTop									// 获取盒子相对于定位符盒子的上偏移
offsetWidth								// 获取盒子总宽度
offsetHeight							// 获取盒子总高度
scrollLeft								// 获取元素左边框大小
scrollTop									// 获取元素上边框大小
clientWidth								// 获取元素内容、内边距的宽度
clientHeight							// 获取元素内容、内边距的高度
scrollLeft								// 获取元素滚动的左侧距离
scrollTop									// 获取元素滚动的上侧距离
scrollWidth								// 获取元素包括内容溢出的宽度，不含边框
scrollHeihgt							// 获取元素包括内容溢出的高度
```

**常用方法：**

```js
getElementById('id')			// 获取指定id的元素节点
querySelector('选择器')		// 获取指定选择器的元素节点
addEventListener('类型',fn)// 元素添加事件
getAttribute('属性')			 // 获取指定的属性值
setAttribute('属性', '值')	// 设置属性的值
removeAttribute('属性')		 // 移除属性节点
addEventListener('类型',fn[,capture])	// 设置事件监听，同一事件可设置多个监听器
appendChild(node)					// 追加新的子元素节点
removeChild(node)					// 移除子元素节点
scroll(x, y)							// 
focus()										// 设置文档或元素获取焦点
click()										// 元素模拟一次鼠标单击
blur()										// 设置元素失去焦点
select										// 选择元素中的文本
submit()									// 提交表单，不会再调用默认提交
```

**document对象属性方法：**

```js
document.title						// 设置文档标题(title标签)
document.bgColor					// 设置页面背景色

document.write('<p>...</p>')	 // 用于写入文档内容。在load事件中会重绘文档
document.createElement('标签')	// 创建元素节点
```

---



#### 获取元素

- ID获取

  ```js
  <div id="box"></div>
  document.getElementById('box');						// 返回节点对象
  ```

- 标签名获取

  ```js
  document.getElementsByTagName('li');			// 返回一个伪数组
  ```

- H5新增

  - 类名

    ```js
    document.getElementsByClassName('red');// 返回伪数组
    ```

  - 选择器

    ```js
    querySelector('#box');								 // 返回找到的第一个元素对象
    querySelectorAll('.red');					 		 // 返回伪数组
    ```

- 节点

  ```js
  parentNode																// 返回父节点
  childNodes																// 返回子节点伪数组，可用nodeType过滤文本节点
  children																	// 返回子元素节点的伪数组
  firstElementChild													// 返回第一个子元素节点，IE9以上兼容
  lastElementChild
  nextElementSibling												// 返回下一个兄弟元素节点
  previousElementSibling
  ```
  
- 特殊元素

  ```js
  document;																	// document对象
  document.documentElement;									// html对象
  document.head;														// head对象
  document.body;														// body对象
  ```

---



#### 操作元素

##### 元素属性

- 改变 HTML 内容

  ```js
  document.querySelector('#box').innerHTML = '新文本';
  ```

  ```js
  innerText						// 获取/设置元素内容，不包含html标签、空格、换行等
  innerHTML						// 获取/设置元素原内容，存在安全问题
  ```

- 改变 HTML 属性

  ```js
  document.getElementById('box').attr = '新属性值';						// 获取/设置标签的attr属性
  document.querySelector('#box').getAttribute('自定义属性');	  // 获取自定义属性
  document.querySelector('#box').setAttribute(' 属性', '值'); // 设置自定义属性
  document.querySelector('#box').removeAttribute('属性');			// 移除自定义属性
  ```

  - 一般属性

    ```js
    src、href、id、...			// 标签属性都是DOM元素的属性，而且是读写属性
    ```

  - 表单属性

    ```js
    type、value、checked、disable、...		// button标签的内容通过innerHTML修改
    ```
    
  - 自定义属性

    ```js
    <em id="em" data-index="1" />														// data-index是自定义属性
    document.querySelector('#em').getAttribute('index');		// 1
    document.getElementById('em').setAttribute('id', 'set');// 将em元素的id设置为set
    document.querySelector('#em').removeAttribute('data-index');
    ```

- 改变 HTML 样式

  - 行内样式

    ```js
    document.getElementById('box').style.prop = '新属性值';		//prop是CSS驼峰命名
    document.getElementById('box').style.backgroundColor = '#000';
    document.querySelector('box').style.backgroundPosition = '0 -7p' + 'x';
    ```

  - 类名样式

    ```js
    document.querySelector('#box').className = 'initial my-class';	// 会覆盖原先的类
    ```
    
  - 类列表
  
    ```js
    let box = document.querySelector('#box');
    box.classList.length;								// 获取元素总的类数
    box.classList.add('new');						// 元素添加类
    box.classList.remove('delete');			// 元素删除类
    box.classList.toggle('flex');				// 元素切换类
    ```
  
    

---



##### 创建元素

```js
document.createElement('标签')
```

**创建元素的三种方式：**

- document.write()：将内容写入文档；页面加载完毕后（load事件）写入会导致页面重绘
- innerHTML：将内容写入DOM 节点。用数组拼接来创建多个元素效率更高，但结构复杂
- document.createElement()：结构简单

---



##### 添加元素

```js
appendChild(元素)									// 父节点追加子元素
insertBefore(元素, 指定元素)			 // 在指定元素前插入元素
```

---



##### 移除元素

```js
removeChild(子元素)							// 从父节点中移除子元素
```

---



##### 替换元素

```js
replaceChild(新元素, 被替换元素)	 // 父元素替换某一个子元素
```

---



##### 克隆元素

```js
cloneNode(n)							// n为false是浅拷贝(只拷贝标签)；true是深拷贝(拷贝标签、内容)
```

---



#### 事件

**事件三要素：**

- 事件源：事件的触发对象
- 事件类型：触发事件的前提
- 处理函数：事件被触发的处理函数

---



##### 注册事件

**注册事件有两种方式：**

- 以on开头的事件，同一事件只能有一个处理函数

  ```js
  document.getElementById('btn').onclick = function() {}
  ```

- addEventListener方法，可设置多个监听器，监听器按注册顺序执行；IE9兼容

  ```js
  元素.addEventListener('type', fn[, captrue])		// capture是事件捕获模式，默认是false
  document.getElementById('btn').addEventListener('click', function() {...})
  ```

---



##### **移除事件**

```js
元素.onclick = null												// 设置元素click事件的处理函数是null
元素.removeEventListener('click', fn)			// 移除元素click事件的监听器fn
```

---



##### 事件流

**DOM 事件流：**从页面中接受事件的顺序（事件在页面的特定传播顺序），该传播过程就是就是 DOM 事件流。分为事件捕获和**事件冒泡**。

**DOM 事件流分为三个阶段：**

- 捕获阶段：DOM顶层节点向具体元素传播的过程
- 目标阶段：处于具体元素的阶段
- 冒泡阶段：具体元素向DOM顶层节点传播的过程

**事件冒泡：**IE提出，事件开始时由具体元素接收，然后逐级向上传播到 DOM 顶层节点的过程。

**事件捕获：**网景提出，由 DOM 顶层节点接收，然后逐级向下传播到具体元素的过程。

**注意：**

-  JS 事件只能执行捕获或冒泡其中一个阶段
-  onclick方式注册的事件只能得到冒泡阶段
-  addEventListener方法的第三个参数就是用来设置事件使用哪个阶段，默认是冒泡阶段
-  有些事件没有冒泡阶段，比如onblur、onfocus、onmouseenter、onmouseleave
-  事件冒泡有优点（事件委托），也有缺点（阻止冒泡）

---



##### 事件委托

事件委托(代理、委派)：把原本需要绑定在子元素的事件委托给父元素，然后利用事件冒泡来影响么一个子元素。

具体实现：

- 父元素设置监听器
- 子元素触发事件
- **由于事件冒泡，父元素执行监听函数，利用事件对象的target属性，获取触发事件的事件源（子元素）**
- 操作子元素

---



##### 事件对象

event 对象是事件被触发后系统创建的对象，代表事件的状态，比如事件源、按下哪个键、鼠标位置等。

**event 对象属性**

```js
type								// 返回触发事件的类型
target							// 返回触发事件的元素对象（被点击的元素）
currentTarget				// 返回绑定事件的元素对象
keyCode							// 返回按键的ASCII码
clientX							// 鼠标相对于浏览器可视区的 X 坐标
clientY							// 鼠标相对于浏览器可视区的 Y 坐标
pageX								// 鼠标相对于文档页面的 X 坐标，IE9兼容
pageY								// 鼠标相对于文档页面的 Y 坐标
```

**event 对象方法**

```js
preventDefault()		// 阻止事件源的默认行为，return false也能阻止on方式注册的事件
stopPropagation()		// 阻止冒泡，IE使用cancelBubble = true
```

---



##### 事件类型

- 鼠标事件

  ```js
  onclick					// 点击
  ondbclick				// 双击
  onmouseover			// 鼠标经过。经过子元素也会触发。但enter/leave没有事件冒泡
  onmouseout			// 鼠标离开
  onmousemove			// 鼠标移动
  onmouseup				// 鼠标弹起
  onmousedown			// 鼠标按下
  contextmenu			// 右键菜单，document添加该事件可以禁止弹出菜单(e.preventDefault)
  selectstart			// 选中文字，document添加该事件可以禁止选中文字
  ```

- 键盘事件

  ```js
  onkeydown				// 键按下，down和up不区分大小写，如a和A都是65
  onkeyup					// 键释放
  onkeypress			// 键按下，忽略功能键，区分大小写
  ```

- 表单事件

  ```js
  onfocus					// 获得焦点
  onblur					// 失去焦点
  oninput					// value属性改变时触发，通过js改变value时，却不会触发。
  onchange				// 表单元素内容改变且失去焦点时触发
  onsubmit				// 表单提交时触发
  ```

- DOM 对象事件

  ```js
  onload					// 元素加载完成时触发,如页面,img。链接、刷新、前进后退都能触发，但火狐后退不触发
  onpageshow			// 页面显示时触发，可解决load的问题
  onunload				// 离开页面时触发
  onerror					// 元素出错时触发，比如脚本、img
  onscroll				// 元素滚动时触发
  transitionend		// 在 CSS 完成过渡后触发
  ```

---



### BOM

#### 概述

浏览器对象模型使 JavaScript 有能力操作浏览器功能。**BOM的核心是顶级对象window。**

BOM尚无正式标准，ECMAScript的标准化组织是ECMA，DOM的标准化组织是W3C，BOM最初是Netscape（网景）浏览器标准的一部分。

浏览器对象BOM的兼容性较差，所以主要学习没有兼容性问题的内容。

DOM与BOM比较：

- DOM把文档当做一个对象，就是document对象，主要是操作页面元素
- BOM把浏览器当做一个对象，就是window对象，主要是操作浏览器
- DOM是W3C标准规范。而BOM是浏览器各自定义的，兼容性较差
- **DOM是BOM的一部分**

---



#### window对象

![image-20200120082415282](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200120082415282.png)

- ==window对象是浏览器的顶级对象==
- window是全局对象。定义在全局作用域中的变量、函数、对象均自动成为window对象的成员，调用的时候可以省略window
- 全局函数时window对象的方法
- DOM 也是window对象的属性之一

---



##### location

window.location对象用于获取当前页面的URL，并把浏览器重定向到新页面。

URL格式：

```js
protocol://host[:port]/path/[?query]#fragment

protocol：协议，常用http
host：主机（域名）
port：端口号。http默认端口是80
path：路径
query：参数。&分隔的键值对。表单提交的数据存放在这里
fragment：片段。常用于锚点链接

http://www.itcast.cn/index.html?name=black&age=18#link
```

**location对象属性（可读写）**

```js
href					// 页面URL，修改URL会跳转新页面
protocol			// 协议
hostname			// 主机名（域名）
port					// 端口号，默认端口的port是空字符串
pathname			// 路径
search				// 参数
hash					// 片段
```

**location对象方法**

```js
assign('url')	// 重定向页面
replace('url')// 替换当前页面，不记录历史
reload()			// 重新加载页面。相当于浏览器刷新；参数为true时会强制刷新
```

---



##### history

window.history包含浏览器的历史记录，用于加载历史列表的上一个URL、下一个URL。

**history对象方法**

```js
back()				// 后退
forword()			// 前进
go(n)					// 正整数表示前进、负整数表示后退
```

---



##### 属性/方法

```js
pageXOffset
pageYOffset

alert()
setTimeout()
setInterval()
scroll(x, y)	// 滚动窗口至文档中的特定位置，不带单位
```

---



##### 常用事件

- load 事件

  ```js
  // 当文档内容完全加载完成会触发该事件
  window.onload = function() {}										// 只能写一次
  window.addEventListener('load', function() {})	// 可以写多个监听器
  ```

- DOMContentLoaded 事件

  ```js
  // 只要DOM加载完成就会触发该事件，不包括图片、样式表等。优先load事件
  window.addEventListener('DOMContentLoaded', function() {})
  ```

- resize 事件

  ```js
  // 只要浏览器窗口大小发生变化，就会触发该事件，常用于响应式布局
  window.addEventListener('resize', function() {})
  ```

- pageshow事件

  ```js
  // 页面显示时触发该事件.persisted默认false，true表示页面是从缓存中读取
  window.addEventListener('pageshow', function(e) {e.persisted})
  ```

  

---



#### 定时器

window对象提供了两个定时器。

---

##### setTimeout

```js
window.setTimeout(callback[,delay])					// 延迟delay毫秒后执行函数callback
```

使用：

```js
let timer = setTimeout(fn, 1000);						// 设置定时器对象并赋值给timer
clearTimeout(timer);												// 利用定时器对象timer清除定时器
```

---



##### setInterval

```js
window.setInterval(callback[,delay])				// 每间隔delay毫秒调用一次函数callback
```

使用：

```js
let timer = null;
clearInterval(timer);										// 先清除定时器，再设置，保证元素只有一个定时器
timer = setInterval(fn, 1000);					// 设置定时器
```

---



## 网页特效

### 元素偏移量 offset

元素的offset系列相关属性可以**动态**地获取元素的位置、大小（浏览器窗口大小改变时，offset也会动态改变）。

**DOM 元素 offset系列属性：**

```js
offsetParent			// 返回元素的已定位父元素，没有就返回body元素
offsetLeft				// 返回盒子左边框相对于定位父元素左边框的偏移
offsetTop					// 返回盒子上边框相对于定位父元素上边框的偏移
offsetWidth				// 返回盒子包括内容、内边距、边框的宽度
offsetHeight			// 返回盒子包括内容、内边距、边框的高度
```

**注意：**

- ==偏移的数值都不带单位==
- 如果元素是固定定位，则定位父元素为null（浏览器窗口是父元素）

---

**offset和style属性区别：**

| offset                     | style                           |
| -------------------------- | ------------------------------- |
| offset可以得到任意样式的值 | style.width得到的是行内样式的值 |
| 数值                       | 值是带有单位的字符串            |
| offset是只读属性           | style.属性是可读写属性          |

---



### 元素可视区 client

元素的client系列相关属性可以动态地获取元素的边框大小、元素大小。**数值不带单位。**

```js
clientLeft				// 元素左边框大小
clientTop					// 元素上边框大小
clientWidth				// 盒子包括内容、内边距的宽度
clietHeight				// 盒子包括内容、内边距的高度
```

---



### 元素滚动 scroll

元素的scroll系列相关属性可以动态地获取元素的大小、滚动距离。**数值不带单位。**

```js
scrollLeft				// 返回元素滚动的上侧距离
scrollTop					// 返回元素滚动的左侧距离
scrollWidth				// 返回元素实际宽度，包括内容水平溢出部分，不包含边框
scrollHeight			// 返回元素实际高度，包括内容垂直溢出部分，不含边框
```

**注意：**

- scroll系列相关属性常与scroll事件结合使用
- 元素使用scroll。页面滚动的左侧、上侧是
  - window.pageXOffset，window.pageYOffset（IE9兼容）
  - 声明DTD，使用document.documentElement.scrollTop
  - 不声明DTD，使用document.bodyscrollTop

---



### 动画函数(CSS3 代替)

**原理：**==通过定时器不断地改变定位元素的位置、形状、颜色等，可以达到与CSS animation 属性同样的效果。==

将 JS 动画效果封装成函数，只要将函数参数设置为定位元素要改变的样式，就可以让多个定位元素使用。但要注意的是：

- 通过清除定时器，可以达到动画完成的效果
- 由于需要清除定时器，必须设置定时器标识符。然而存在多个定位元素使用动画函数时，定时器标识符就会存在多个，不仅重名，还浪费内存。因为定位元素是函数参数，可以通过设置定位元素的属性timer作为定时器的标识符
- 为了保证元素只有一个定时器，可以在给元素设置定时器之前先清除定时器

---

**缓动效果：**元素运动的速度有所变化（每次移动距离不一样）。

可以给动画函数加上各种缓动效果，这样一来元素就能实现各种运动（加速、减速等）。也可以给元素的颜色、形状等样式设置各种各样的效果。

**注意：**

- 由于除法会出现大约数，就达不到预想的效果（实际的移动距离变小等），所以需要取整

---



### 轮播图

**功能划分：**

- 鼠标经过/离开，显示/隐藏左右按钮
- 点击左/右按钮，播放上/下一张图片
  - 变量控制
- 下方小圆圈随着播放一起变化
  - 变量控制
- 点击不同的小圆圈，显示不同的图片
  - 同步所有变量
- 自动播放
  - 模仿点击右按钮
- 鼠标经过/离开，自动停止/播放

---

移动端轮播图：

- 自动播放
- 下方小圆圈随着播放一起变化
- 手指滑动回弹/播放另一张图片

---

**注意事项：**

- 防止轮播图连续点击导致播放过快，需要使用节流阀

  - 定义全局变量

    ```js
    let flag = true;
    if(flag) {					// 触发事件就设为false
      flag = false;
      do something...
    }
    flag = true;				// 只有此次事件完成后，通过回调函数把flag设为true
    ```

    



---



### 选项卡











---

















---



## AJAX









---



## 其他

### JS 注释

```js
// 单行注释。ctrl+/
/* 多行注释。ctrl+shift+/ */
```

---



### JS 引入方式

- 行内式

  ```html
  <div onclick="alert('hello js')"></div>		<!-- 事件属性 -->
  ```

- 内嵌式

  ```html
  <script>
  	alert('hello js');
  </script>
  ```

- 外链式

  ```html
  <script src="my.js"></script>
  ```

---



### JS 断点调试

谷歌浏览器---console---source---点击文件---行号设置断点---刷新页面。

watch用于观察变量的值的变化

---



### JS 预解析

JavaScript引擎在执行代码的过程中分为两步：

- **预解析：**JavaScript引擎检测语法错误，并且发生变量提升、函数提升
- **代码执行：**从上往下执行代码，进行变量赋值，函数调用等

**变量提升、函数提升：**JS引擎将所有变量和函数的声明（`var和function`）提升到当前作用域的顶部。

**总结：**

- 变量预解析就是变量提升、函数预解析就是函数提升
- 命名函数可以先调用，再声明；匿名函数不能先调用，因为存在变量的赋值
- 严格模式不允许使用未声明的变量

---



### JS 执行机制

JavaScript 语言的一大特点是单线程，这与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时JS引擎就会执行出错。

但是单线程就意味着代码只能自上而下执行,如果上一行解析时间过长，那么下面的代码就会被阻塞。所以 JS 有了异步的概念。

**JS 的任务分为同步任务和异步任务：**

- **同步任务：**前一个任务结束才能执行后一个任务，程序的执行顺序与任务的排列顺序一致

- **异步任务：**可以在前一个任务等待间隔去执行下一个任务，==是通过回调函数实现的。==



<img src="E:\HTML源代码\imagesrc\js.jpg" style="zoom:50%;" />

**JS 执行机制：**

- 异步任务进入 **Event Table**；指定动作完成后，回调函数进入 **Event Queue**（任务队列）
- 主线程执行完毕后，会去读取 **Event Queue** 中的回调函数，进入主线程执行
- 不断的重复这个过程，就是 **Event Loop**（事件循环）

**注意：**

- **任务队列是先进先出的数据结构**，前面的任务优先被主线程读取，只要主线程一清空任务，就会去任务队列读取任务，进入主线程执行，会不断的重复这个过程。这种机制叫做事件循环
- ==JS 的执行机制就是Event Loop==

---



### JS 内存分配

简单数据类型存放在栈内存；复杂数据类型存放在堆内存

---



### JS 正则表达式

**正则表达式是用于匹配字符串中字符组合的模式，也是对象。**[测试工具](http://c.runoob.com/)

```js
// 格式
let 变量 = /正则表达式/修饰符(可选)
```

```js
// 使用
/black/i.test('i am BLACK');	// true
```

**边界符**

```js
^n			// 以n开头
n$			// 以n结尾
```

**范围符**

```js
[...]		// 匹配其中一个字符
```

**元字符**

```js
\d			// 数字
\w			// 字母、下划线、数字
```

**量词**

```js
n?			// 出现0或1次
n+			// 至少1次
n*			// 至少0次
{n}			// 出现n次
{n,}		// 至少出现n次
{n, m}	// 出现n到m次
```

**修饰符**

```js
i				// 忽略大小写
g				// 全局匹配，默认只匹配一个
```

**正则方法**

```js
regex.test(str)						// 测试str是否匹配正则表达式regex，匹配就返回true
regex.exec(str)						// 检索字符串中的正则匹配，返回存放匹配结果的数组，否则返回null
str.replace(regex, rep)		// 将符合正则表达式regex的字符串str中的字符用字符rep替换，返回新字符串
```

---



### JS 立即执行函数

**立即执行函数：**创建匿名函数的同时执行该函数，只能调用一次。

**作用：**用于创建一个函数作用域（局部作用域），减少命名冲突问题。

```js
// 格式
(function(形参) {})(实参)		// 常用
(function fn() {}())			// 也可以是命名函数
```

---



### JS 闭包

闭包函数就是一个函数引用另一个函数的局部变量，因为局部变量被引用着，所以不会被回收。

缺点：增加了内存的消耗

```js
var add = (function() {				// 形成闭包，add就是一个闭包函数
  var a = 0;
  return function() {return a}
})();
```

---



### JS 函数调用方式

| 函数类型     | 调用方式            |
| ------------ | ------------------- |
| 全局函数     | 函数()、函数.call() |
| 对象方法     | 对象.方法()         |
| 构造函数     | new 构造函数()      |
| 事件函数     | 触发事件            |
| 定时器函数   | 到时调用            |
| 立即执行函数 | 自动调用            |

---



### JS this指向

**this的指向是在调用函数的时候确定的，一般指向调用它的对象，可以通过 JS 提供的方法更改this指向。**

| this所在位置   | this指向         |
| -------------- | ---------------- |
| 全局作用域     | window           |
| 全局函数       | window           |
| 立即执行函数   | window           |
| 定时器函数     | window           |
| 构造函数       | 新创建的实例对象 |
| 原型对象方法   | 新创建的实例对象 |
| 自定义对象方法 | 自定义对象       |
| 事件监视器函数 | 绑定事件对象     |

**更改this指向的方法：**

- call()

  ```js
  // call方法可以改变函数的this指向，并且执行函数；返回值就是函数的返回值
  fn.call(thisObj], arg1, arg2, ...])
  ```

- apply()

  ```js
  // 改变函数的this指向，并执行函数
  fn.apply(thisObj[, arr])
  ```

- bind()

  ```js
  // bind方法返回一个改变this指向的原函数，不会执行函数
  fn.bind(thisObj], arg1, ...])
  ```

---



### JS 严格模式

“use strict”指令用于声明代码在严格条件下执行。

**用法：**

```js
// 在脚本或函数的头部添加"use strict"，表明脚本或函数开启严格模式
<script>
	"use strict";
	...
</script>

function fn() {
  "use strict";
  ...
}
```

**严格模式中的变化：**

- 不允许使用未声明的变量
- 不允许删除变量、函数、对象
- 不允许变量、参数重名
- ==禁止this指向全局对象，全局作用域中的this是undefined==
- 构造函数不能当做普通函数使用，只能与new一起用
- 禁止在非函数的代码块中声明函数



---



### JS 规范

- 变量一般用名词
- 函数一般用动词
- 操作符左右两侧要有一个空格
- JS使用单引号，HTML使用的是双引号
- 

---



### JS 问题/方法

#### 结束程序运行

由于JS 是单线程语言，代码需要可以异步执行，所以没有设置 exit 功能。因此需要模拟一个 exit 功能。

- 在立即执行函数中使用 return
  - 缺点是麻烦，而且 return 只能结束最近一层的函数
- 利用错误来结束运行
  - `return new Error('exit')`

结论：JS 的主线程同步任务可以通过抛出错误的方式立即中止，但是异步任务并不会受到影响。

---



### 计算机语言

**计算机语言：**也叫编程语言，分类：机器语言、汇编语言、高级语言。

**高级语言：**C、C++、Java、C#、Python、PHP、JavaScript、Go、Swift等。

**标记语言**：不用向计算机发出指令，通常用于格式化和链接。

**编程语言**：用于向机器发出指令，有很强的逻辑性。需要编译器翻译，把程序编译为机器语言文件(可执行文件)。

**脚本语言**：是一种解释性的语言，是**解释运行**而不用编译，由解释器来负责解释。

**计算机是不能直接理解高级语言的，必须翻译成机器语言。翻译有编译、解释。**需要编译的语言就是编程语言；需要解释的语言就是脚本语言。

js引擎执行代码时逐行解释每一行源码（转换为机器语言），然后由计算机去执行一行源码。解释的优点是灵活方便，缺点是执行速度慢

---

**计算机：**

- 硬件
  - 输入设备，鼠标、键盘等
  - 输出设备：显示器、打印机等
  - CPU
  - 硬盘
  - 内存
- 软件
  - 系统软件，Windows、Linux等
  - 应用软件，QQ、WeChat、VSCOde等

**计算机网络：**两台以上的计算机通过通信线路连接到一起时，这就可以说是一个网络。

**互联网（internet）：**由多个计算机网络互连而成的网络，连上网络就是上网。因特网是最大的互联网。

**因特网（Internet）：**专有名词，指当前全球最大的、开放的、由众多网络互连而成的特定计算机网络。提供的									   主要服务有万维网(WWW)、文件传输(FTP)、电子邮件(E-mail)、远程登录(Telnet)等。

**万维网(World Wide Web)：**万维网是互联网最主要的服务，用于提供网页服务。浏览器可让计算机连上万维网。

**HTTP(Hyper Text Transfer Protocol)：**超文本传输协议，**是因特网最广泛的网络传输协议**，用于浏览器与服务																	   器之间的通信

**URL(Uniform Resource Locator)：**统一资源定位符，信息资源在互联网上都有唯一的地址。浏览器通过HTTP																将URL发给服务器（发起请求），服务器根据URL查找对应资源，再将资源																响应给浏览器。

---



