# jQuery

## 概述

**JavaScript 库：**即 library，是一个封装好的特定的集合。JS 库是对原生JS的封装，内部都是使用 JS 实现的。

**常见的 JavaScript 库：**

- jQuery
- Prototype
- YUI
- Ext JS
- 移动端的zepto

**jQuery是一个轻量级、快速简洁的 JavaScript 库，封装了 JavaScript 常用的功能代码。**

**特点：**

- 轻量
- 兼容所有主流浏览器
- 链式编程、隐式迭代
- 多插件
- 免费、开源

**功能：**

- HTML 元素获取/操作
- DOM 遍历/修改
- CSS 操作
- JS 特效/动画
- 事件函数
- Ajax
- Utilities

---



## 安装

- **CDN引入：**[jquery.min.js](https://cdn.staticfile.org/jquery/1.10.2/jquery.min.js)

- **下载：** [jquery.com](http://jquery.com/download/)

- **引入：**jQuery文件是一个立即执行函数，在引入时就会执行，它会定义一个函数jQuery，挂载到window下的jQuery、$属性

查看jQuery的安装版本：浏览器控制台

```js
>$.fn.jquery
```

---



## 语法

jQuery 语法是选取 HTML 元素，并对元素进行操作。

```js
$(selector).action()					// $(selector)返回一个伪数组对象
```

- ==$： jQuery 的顶级对象，代指jQuery。同时也是一个函数==
- selector：选择器，查找 HTML 元素
- action()：功能函数

---



## 入口函数

```js
$(function() {					// 在DOM加载完运行，等于原生JS的DOMContentLoaded，但可以定义多个入口函数
  ...
})
jQuery(function() {})
```

---



## jQuery 对象

```js
$("div")
```

- ==jQuery 对象实质是封装了 DOM 元素的伪数组对象，内部元素都是 DOM 元素。==

- jQuery对象不能使用原生 JS 的属性和方法

---

**DOM 对象转为 jQuery 对象：$(DOM对象)**

```js
let dom = document.querySelector("#box");
let jq = $(dom);
```

**jQuery 对象转为 DOM 对象：jQuery对象[index]**

```js
let dom2 = jq[0]
```

---



## 选择器

jQuery 选择器用于选取 HTML 元素。语法：

```js
$("选择器")
$(this)					// 选取当前 HTML 元素
```

---

### 基础选择器

| 名称       | 用法                   | 描述                      |
| ---------- | ---------------------- | ------------------------- |
| ID选择器   | $("#myid")             | 选取指定ID的元素          |
| 类选择器   | $(".myclass")          | 选取同一类class的所有元素 |
| 标签选择器 | $("div")               | 选取同一类标签的所有元素  |
| 全选选择器 | $("*")                 | 选取所有元素              |
| 并集选择器 | $(".class, div, p")    | 选取多个元素              |
| 交集选择器 | $("#myid.myclass.div") | 选取交集元素              |

---

### 层级选择器

| 名称         | 用法       | 描述                   |
| ------------ | ---------- | ---------------------- |
| 子元素选择器 | $("ul>li") | 选取元素所有的子元素   |
| 后代选择器   | $("div p") | 选取元素所有的后代元素 |

---



### 子元素选择器

| 语法            | 用法                  | 描述                          |
| --------------- | --------------------- | ----------------------------- |
| :first-child    | $("p:first-child")    | 选取父元素的第一个子元素是p   |
| :last-child     | $("p:last-child")     | 选取父元素的最后一个子元素是p |
| :nth-child(n)   | $("p:nth-child(2)")   | 选取父元素的第二个子元素是p   |
| :first-of-type  | $("p:first-of-type")  | 选取p类元素的第一个           |
| :last-of-type   | $("p:last-of-type")   | 选取p类元素的最后一个         |
| :nth-of-type(n) | $("p:nth-of-type(2)") | 选取p类元素的第二个           |

---



### 表单选择器

| 语法      | 用法                        | 描述                            |
| --------- | --------------------------- | ------------------------------- |
| :input    | $(":input")                 | 选取所有的表单元素              |
| :text     | $(":text")                  | 选取所有的文本框                |
| :password | $(":password")              | 选取所有的密码框                |
| :button   | $(":button")                | 选取所有的按钮                  |
| :radio    | $(":radio")                 | 选取所有的单选按钮              |
| :checkbox | $(":checkbox")              | 选取所有的复选框                |
| :checked  | $("input:checked")          | 选取被选中的radio、checkbox元素 |
| :selected | $("select option:selected") | 选取被选中的option元素          |

---



### 过滤选择器

| 语法       | 用法                | 描述                                     |
| ---------- | ------------------- | ---------------------------------------- |
| :first     | $("ol li:first")    | 选取某类元素的第一个                     |
| :last      | $("ul>li:last")     | 选取某类元素的最后一个                   |
| :eq(index) | $("li:eq(0)")       | 选取某类元素指定编号的元素，index从0开始 |
| :odd       | $("li.myclass:odd") | 选取某类元素编号为偶数的元素             |
| :even      | $("li#myid:even")   | 选取某类元素编号为奇数的元素             |
| :focus     | $("li:focus")       | 选取获得焦点的元素                       |

---



### 内容选择器

| 名称              | 用法                    | 描述                   |
| ----------------- | ----------------------- | ---------------------- |
| :contains("text") | $("div:contains('aa')") | 选取含有文本'aa'的元素 |
| :empty            | $("td:empty")           | 选取内容为空的td元素   |
| :has(selector)    | $("div:has(p)")         | 选取含有p元素的div元素 |

---



### 属性选择器

| 名称                 | 用法                   | 描述                         |
| -------------------- | ---------------------- | ---------------------------- |
| [attribute]          | ${"div[id]"}           | 选取含有指定属性的元素       |
| [attribute='value']  | ${"div[class='box']"}  | 选取含有指定属性和值的元素   |
| [attribute^='value'] | ${"div[title='ab']"}   | 选取属性值以某些值开始的元素 |
| [attribute$='value'] | ${"input[name='yz']"}  | 选取属性值以某些值结尾的元素 |
| [attribute*='value'] | ${"input[value='fg']"} | 选取属性值含有某些值的元素   |

---



## 元素操作

### 获取内容

```js
html(["content"])					// 获取/设置元素的文本内容，识别HTML标签
text(["content"])					// 获取/设置元素的文本内容，不识别HTML标签
val(["content"]) 					// 获取/设置表单元素的内容
```

---



### 获取属性

```js
prop("name"[, "value"])		// 获取/设置元素的内置属性
attr("name"[, "value"])		// 获取/设置元素的自定义属性
removeAttr("name1 ...")		// 移除元素若干个属性

$("p").prop("id")
$("p").prop("class", "myclass")
$("p").prop({							// 设置元素多个属性
  "title": "hi",
  "id": "myid"
})
$("p").attr("data-index", 1)
```

==注意：attr()方法不能获取元素的布尔类型的属性，如checked、selected、disabled等。==

---



### CSS 样式

- **行内样式**

  ```js
  $("div").css("backgroundColor")		// 获取属性值
  $("div").css("width", "200px")		// 设置属性
  $("div").css({										// 对象形式，数值可以不加单位和引号
    "color": "#fff",
    fontSize: 20
  })
  ```

- **类名样式**

  ```js
  $("p").addClass("class1 class2")	// 添加多个类
  $("li").removeClass("c1")					// 移除类。没有参数会溢出元素所有类
  $("div").toggleClass("d1 d2")			// 切换类
  $("div").hasClass("e1")						// 判断类是否存在
  ```

---



### 遍历对象

由于隐式迭代，jQuery 对象中的所有元素都做了同样的操作。遍历可以给元素做不同的操作。

```js
// 设置每一个 DOM 元素要执行的函数。参数：index是元素索引，DOMElement是选取的 DOM 元素
each(function(index, domElement))

$("div").each(function(index, dom) {
  $(dom).hide();											// DOM 元素 转为 jQuery 对象
})
```

````js
$.each(obj, function(index, dom))			// 用于遍历对象和数组
````

---



### 创建元素

```js
$("html")															// 动态创建元素

$("<p id='prop'>文本内容</p>")
```

jQuery创建元素的方式：

- $("html")
- html()：使用数组拼接（push方法）多个创建的元素，再使用join("")生成字符串，最后添加到元素中

---



### 添加元素

要添加的元素可以是 HTML字符串、jQuery 、 DOM 创建的元素。

- **内部添加**

  ```js
  append("content")									// 向元素内部追加内容
  prepend("content")								// 向元素内容前置内容
  
  $("p").prepend("单纯的内容")				 // 可添加单纯的文本内容
  let ele1 = "<b>内容</b>";          // 使用 HTML 创建元素
  let ele2 = $("<i></i>").text("内容");  // 使用 jQuery 创建元素
  let ele3 = document.createElement("内容");  // 使用 DOM 创建元素
  $("body").append(ele1, ele2, ele3);        // 追加若干个元素
  
  ```

- **外部添加**

  ```js
  after("content")					// 在元素之后追加内容
  before("content")					// 在元素之前插入内容
  ```

==注意：如果添加的元素是文档中已存在的，则是剪切后再添加。==

---



### 删除元素

```js
remove()											// 删除元素
empty()												// 清空元素内部内容，包括事件等
html("")											// 清空元素，不包括事件等
```

---



### 克隆元素

```js
clone()												// 深拷贝元素，参数为true时可拷贝事件
```

---



### 元素尺寸

元素的尺寸方法获取/设置的值是数字，==不带单位。==（类似原生 JS 的offset、client、scroll系列）

```js
width([n])										// 获取/设置元素宽度
height()											// 获取/设置元素高度
innerWidth()									// 获取/设置元素包含padding的宽度。设置时padding不变，宽度调整
innerHeight()									// 获取/设置元素包含padding的高度
outerWidth()									// 获取/设置元素包含padding、border的宽度
outerHeight()									// 获取/设置元素包含padding、border的高度
outerWidth(true)							// 获取/设置元素包含padding、border、margin的宽度
outerHeight(true)							// 获取/设置元素包含padding、border、margin的高度

$("p").width();
$("div").height(300);
```

---

### 元素位置

元素的尺寸方法获取/设置的值是数字，==不带单位。==

```js
// 都会无视父元素的内边距
offset([offsetObj])						// 获取/设置元素相对于文档的偏移坐标对象，该对象有top、left属性
position()										// 获取元素相对于定位父元素的偏移坐标对象，否则以文档为准
scrollLeft([n])								// 获取/设置元素相对垂直滚动条顶部的偏移
scrollTop([n])								// 获取/设置元素相对水平滚动条左部的偏移

$("div").offset().top;
$("div").offset({top: 10, left: 30});
$("div p").position();

if($(document).scrollTop() >= 100) {
  $("html, body").stop().animate({
  	scrollTop: 0
	})
}
```

---



## 效果

jQuery 效果都是使用display属性完成的：

- 显示、下滑动、淡入等都是display: block

- 隐藏、上滑动、淡出等都是display: none

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200123141705094.png" alt="image-20200123141705094" style="zoom:67%;" />

### 显示/隐藏

```js
hide(["speed", "easing", callback])				// 隐藏元素，相当于display: hidden
show(["speed", "easing", callback])				// 显示元素
toggle(["speed", "easing", callback])			// 在显示和隐藏之间切换
/* 参数说明：
	 speed：速度，值： normal(默认) | slow | fast | 1000(毫秒值)
	 easing：缓动，值： swing(默认) | linear(匀速)
	 callback：完成效果时执行的函数，每个元素执行一次
*/
$("div").hide()														// 一般不加参数
```

---



### 滑动

```js
slideDown(["speed", "easing", callback])	// 下滑动显示元素
slideUp(["speed", "easing", callback])		// 上滑动隐藏元素
slideToggle(["speed", "easing", callback])// 在上滑动、下滑动之间切换
```

---



### 淡入/淡出

```js
fadeIn(["speed", "easing", callback])			// 淡入显示元素
fadeOut(["speed", "easing", callback])		// 淡出隐藏元素
fadeToggle(["speed", "easing", callback])	// 在淡入、淡出之间切换
fadeTo("speed", opacity[, "easing", callback])	// 渐变到指定的不透明度
```

---



### 动画

```js
animate(param,[speed, easing, callback])				// 创建自定义动画，过渡到对象param中的目标样式

$("div").animate({
  width: 100,
  opacity: .4
})
```

==animate只支持数值样式，而且不支持css3样式，但可以通过callback来实现==

```js
$("div").animate({}. function() {
	$(this).css({
  	transition: "all .3s",
  	transform: "translateX(10px)"
	})
})
```

多段动画也可以通过callback实现

```js
$("div").animate({
  height: 0
}. function() {
	$(this).animate({
  	width: 100
	})
})
```



---



### 停止动画

**动画队列：**动画或者效果一旦触发就会执行，如果多次触发，动画或者效果就会进入队列排队，等待执行。

==stop() 方法用于停止正在执行动画或效果，适用于所有 jQuery 效果函数。==

```js
stop([stopAll,goToEnd])
/* stopAll：是否清除动画队列，默认false
	 goToEnd：是否跳转到最终效果，默认false
*/
$("div").stop().slideDown()								// 通常在使用效果之前使用stop方法，停止之前的动画
```

---



## 事件

### 注册事件

- **事件函数**

  ```js
  内置事件(function() {...})							// 可注册多个相同的事件，不会覆盖。而且不是动态注册
  ```

- **on方法**

  ```js
  on("events"[, selector], callback)	// 可设置若干个事件。selector是元素的后代元素
  
  $("div").on({													// 不同事件有各自的处理函数
    mouseover: function() {...},
    mouseup: function() {...}
  })
  $("div").on("mouseover mouseup", function() {})		// 相同的处理函数
  
  ```

$("div").on("click", "p, img", function() {})			// 事件委托，也只有这种方式支持动态注册
  ```

  **on方法优势：**
  
  - 可同时绑定多个事件
- 可实现事件委托操作，事件适用于当前及未来的元素
  
**注意：**
  
  - 参数 selector 是注册事件的元素的后代元素
    - 如果没有selector，由该元素触发事件，this指向该元素；而且不支持动态注册
    - 如果存在selector，由该元素的后代元素触发事件，this指向后代元素；支持动态注册

---



### 解绑事件

​```js
off("events"[, selector], callback)			// 

$("div").off()													// 解除元素的所有事件
$("div").off("click")										// 解除元素的click事件
$("ul").off("click", "li")							// 解除事件委托
  ```

---



### 触发事件

```js
元素.事件名();							 // 触发一次该事件
trigger("type")						// 触发事件以及默认行为
triggerHandler("type")		// 触发事件，不触发默认行为
```

==trigger、triggerHandler方法常用于触发自定义事件。==

---



### 事件对象

事件被触发，就会有事件对象的产生。jQuery的事件对象是对原生 JS 的事件对象的封装，不用担心兼容性问题。

```js
元素.on("events"[, selector], function(event) {})

// event对象属性/方法
type
pageX
pageY
target
keyCode
preventDefault()
stopPropagation()

return false;			// 既能阻止事件冒泡，还能阻止浏览器的默认行为(a链接、表单)
```

---



### 事件函数

**大多数 DOM 事件都有一个等效的 jQuery 方法。方法的参数就是事件的处理函数。**

**所有事件方法的处理函数是可选的：**

- 有处理函数时，该方法用于给元素添加事件
- 无处理函数时，该方法用于触发元素的事件

**jQuery 事件方法：**

- **鼠标事件**

  ```js
  click([callback])		// 添加/触发 click 事件
  dblclick()					// 添加/触发 dblclick 事件
  mouseover()					// 添加/触发 mouseover 事件
  mouseout()					// 添加/触发 mouseout 事件
  mouseenter()				// 添加/触发 mouseenter 事件
  mouseleave()				// 添加/触发 mouseleave 事件
  mousedown()					// 添加/触发 mousedown 事件
  mouseup()						// 添加/触发 mouseup 事件
  mousemove()					// 添加/触发 mousemove 事件
  hover(fn1[, fn2])		// fn1、fn2是mouseover、mouseout事件的执行函数；可简写为一个callback
  ```

- **键盘事件**

  ```js
  keydown()						// 添加/触发 keydown 事件
  keyup()							// 添加/触发 keyup 事件
  keypress()					// 添加/触发 keypress 事件
  ```

- **表单事件**

  ```js
  focus()							// 添加/触发 focus 事件
  blur()							// 添加/触发 blur 事件
  submit()						// 添加/触发 submit 事件
  change()						// 添加/触发 change 事件
  select()						// 添加/触发 select 事件
  
  ```

- **window 事件**

  ```js
  resize()						// 添加/触发 resize 事件
  scroll()						// 添加/触发 scroll 事件，元素也可以设置该事件
  ```

- **其他事件**

  ```js
  on("type1 ..."[, "selector"], fn)			// 给元素及子元素添加一个或多个事件
  off("type1 ..."[, "selector"], fn)		// 移除通过 on() 方法添加的事件
  one("type1 ...", fn)									// 只会触发一次
  ```

---



## Ajax

AJAX：异步 JavaScript 和 XML（Asynchronous JavaScript and XML），是与服务器交换数据的技术，它在不重载全部页面的情况下，实现了对部分网页的更新。

jQuery AJAX 方法能够使用 HTTP Get 和 HTTP Post 从远程服务器上请求文本、HTML、XML 或 JSON - 同时能够把这些外部数据直接载入网页的被选元素中。

```js
$.ajax(options)
$.get(url[, data, callback])
$.post(url[, data, callback])
```

**配置项options：**

```js
url								// URL字符串，如"http://www.hzhuti.com"
type							// 请求方式，值：get(默认) | post
method						// 同type
data							// Object，要发送的数据，将自动转换为请求字符串格式
dataType					// string，服务器返回的数据类型，值：JOSN/HTML/TEXT/SCRIPT/XML...
async							// Boolean，设置异步和同步，默认true（异步）
contentType				// 发送的数据的内容编码类型。默认: application/x-www-form-urlencoded
cache							// Boolean，设置GET请求下是否建立缓存，默认true
timeout						// 设置请求超时时间(ms)
success						// callback，请求成功后调用函数，参数：result, status, xhr, 可选
error							// callback，请求失败时调用此函数，参数：xhr, textstatus, error，可选
complete					// callback，无论成功失败都会调用的函数，参数：xhr，type(请求类型)，可选
beforeSend		 	  // callback，请求前的处理 ，参数：xhr 
```

---



## 其他

### jQuery 核心函数

- **jQuery("selector")**

  ```js
  // 该函数接收一个包含 CSS 选择器的字符串selector，默认在HTML文档中匹配一组元素
  $(".selector")
  ```

- **jQuery("html")**

  ```js
  // 根据提供的 HTML 字符串，动态创建由 jQuery 对象包装的 DOM 元素。可设置属性、事件等。
  $("<div>Hello</div>")
  ```

- **jQuery(callback)**

  ```js
  // jQuery(document).ready(callback)的简写。在DOM加载完成后再执行该函数
  ```

---



### jQuery 顶级对象

- **jQuery.each(obj, function(index, element))**

  ```js
  $.each({name: "black", age: 18}, function(i, e))		// i是索引，e是索引对应的值
  ```

- **jQuery.extend([deep, ]targetObj, obj)**

  ```js
  /* 参数：
  		deep：true为深拷贝，默认为false
  		targetObj：拷贝的目标对象
  		obj：被拷贝的对象 */
  $.extend(true, {}, {name: "black", age: 18})				// 返回targetObj
  ```

- **jQuery.noConfilict()**

  ```js
  let j = $.noConflict()					// 用于更改标识符 $
  ```

- **jQuery.ajax()**

  ```js
  $.ajax(url[,options])
  ```

---



### jQuery 隐式迭代

**隐式迭代：不用手动遍历内部 DOM 元素。当对 jQuery 对象的操作是：**

- 设置操作，自动给内部所有 DOM 元素添加相同的操作
- 获取操作，获取第一个 DON 元素的值

---



### jQuery 链式编程

**由于很多 jQuery 方法最后会返回当前对象，所以可以接着使用对象属性、方法。**

**注意：**

- val()、html()、text()、attr()返回的是文本字符串，不是 jQuery 对象
- width()、height()、offset()、position()等返回的是数值
- parent()、children()、find()、siblings()、eq(n)......返回的是新的 jQuery 对象

---



### jQuery 对象属性/方法

#### 属性

```js
length										// 返回 jQuery 对象中元素的数目
```

---



#### 方法

- **HTML 方法**

  ```js
  parent()									// 查找父级
  parents(["selector"])				// 返回所有或指定祖先元素
  children(["selector"])		// = $("ul>li")，子元素
  find("selector")					// = $("ul li")，后代元素
  siblings(["selector"])		// 选取同级元素，不包括自身
  eq(index)									// = $("p:eq(1)")，index从0开始
  nextAll()									// 查找元素之后的同级元素
  prevtAll()								// 查找元素之前的同级元素
  html()										// 获取/设置元素的内容，识别 HTML 元素
  text()										// 获取/设置元素的非 HTML 内容
  val() 										// 获取/设置表单元素的内容
  append()									// 向元素内部追加内容
  prepend()									// 向元素内部前置内容
  after()										// 元素之后追加内容
  before()									// 元素之前插入内容
  remove()									// 删除元素
  empty()										// 清空元素
  clone()										// 克隆元素
  width()										// 操作元素宽度
  height()									// 操作元素高度
  innerWidth()							// 操作元素的width + padding
  innweHeight()							// 操作元素的height + padding
  outerWidth()							// 操作元素的width + padding + border
  outerHeight()							// 操作元素的height + padding + border
  offset([offsetObj])				// 获取/设置元素相对于文档的偏移
  position()								// 获取元素相对于定位父元素的位置，否则以文档为准
  scrollLeft()							// 获取/设置元素相对垂直滚动条顶部的偏移
  scrollTop()								// 获取/设置元素相对水平滚动条左部的偏移
  ```

- **CSS 方法**

  ```js
  css("prop"[, "value"])		// 设置/获取元素样式，对象形式可以设置多个样式
  hasClass("class")					// 判断元素是否含有类
  addClass("c1 c2 ...")			// 元素添加一个或多个类
  removeClass("class1")			// 移除元素一个或多个类
  toggleClass()							// 切换元素一个或多个类
  ```

- **效果方法**

  ```js
  show()										// 显示元素
  hide()										// 隐藏元素
  toggle()									// 在显示、隐藏之间切换元素
  slideDown()								// 下滑显示元素
  slideUp()									// 上滑隐藏元素
  slideToggle()							// 在下滑、上滑之间切换元素
  fadeIn()									// 淡入显示元素
  fadeOut()									// 淡出隐藏元素
  fadeToggle()							// 在淡入、淡出之间切换
  fadeTo(speed, opacity)		// 元素渐变到指定的不透明度
  animate(propObj)					// 给元素创建动画
  stop()										// 停止正在执行的动画
  ```

- **事件方法**

  ```js
  click([fn])								// 添加/触发 click 事件
  mouseover()
  mouseleave()								
  mousedown()
  hover(fn1[, fn2])
  keydown()
  focus()
  resize()
  scroll()
  on("type"[, "selector"], fn)
  off("type"[, "selector"], fn)
  one("type", fn)
  trigger
  ```

- **其他方法**

  ```js
  index()										// 获取元素相对于同级元素的索引，没有找到元素就返回-1
  each(function(index,domElement))	// 显示迭代，设置每一个 DOM 元素要执行的函数
  data("name"[, "value"])		// 获取/设置元素的数据，不会改变HTML 结构
  ```

---



### jQuery 多库共存

$ 这个标识符也许会被其他 js 库使用，所以会与 jQuery 库引起冲突。多库共存可以避免这个问题。

- **$ 与 jQuery 等价**

  ```js
  // jQuery 源码：
  window.$ = window.jQuery = jQuery
  jQuery.fn = jQuery.prototype;
  ```

- **jQuery.noConfilict()**

  ```js
  let j = jQuery.noConflict();		// 此时 $ 无法使用或指向上一个引入的jQuery版本
  j("div");
  ```

---



### jQuery 插件

jQuery 插件是使用 jQuery 库编写的插件，所以必须先引入 jQuery 文件，才能使用 jQuery 插件。[jQuery 插件库](http://www.htmleaf.com/)

**常用插件：**

- 瀑布流
- 图片懒加载（EasyLazyload）
- 全屏滚动（fullpage.js）
- bootstrap JS
- ...

**可自定义插件：**

```js
// myPlugin.js
(function($) {
  $.fn.myPlugin = function() {							// 实例方法
    console.log("i am a jQuery plugin!");
    return this;
  }
  $.add = function() {}											// 静态方法
}(jQuery))
```

```html
<!-- my.html-->
<script src="jQuery.js"></script>
<script src="myPlugin.js"></script>
```



