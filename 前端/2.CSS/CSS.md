#  CSS

## 概述

CSS是层叠样式表（Cascading  Style Sheets），用来定义如何显示HTML元素。

在HTML4.0中，将结构和样式进行了分离。

**CSS规则组成：**

- 选择器：HTML元素

- 样式声明：属性、值的集合

  ```css
  selector {property: value}
  ```

**CSS三大特性：**

- 层叠性
- 继承性
- 优先级

**注意：**

- CSS对换行、空格、缩进不敏感

---



## 引入方式

- 行内式

  ```html
  <p style="color: #fff; margin: 20px"></p>
  ```

- 内嵌式

  ```html
  <style>
    @import 'mystyle.css';	// 	导入式
    div {}
  </style>
  ```

- 外链式

  ```html
  <link rel="stylesheet" type="text/css" href="mystyle2.css">
  ```

---



## Emmet语法

emmet语法用于提高HTML/CSS编写速度，vscode集成了该语法。

- 快速生成HTML标签

  ```html
  1. 生成标签：div + tab
  2. 多个标签：span*7
  3. 包含关系：ul>li*7
  4. 并列关系：div+p
  5. 类名和id：div.class | .class、p#id
  6. 自增：$
  7. 文字：div{$}*7
  ```

- 快速生成CSS样式

  ```css
  // 样式名首字母 + tab键
  w200 -> width: 200px;
  tac  -> text-align: center;
  ti2em-> text-indent: 2em;
  lh26 -> line-height: 26px;
  ```

---



## 选择器

### 基础选择器

#### 通配符选择器

```css
* {						/* 通配符选择器会选择所有标签 */
  margin: 0;
  padding: 0;
}
```

---



#### 标签选择器

```css
div {}				/* 也叫元素选择器 */
```

```html
<div></div>
```

---



#### 类选择器

```css
.red {}				/* 定义一个类名为red的选择器 */
.font-twelve {}
```

```html
<p class="red font-twelve"></p>
```

---



#### id选择器

```css
#nav {}				/* 定义一个id为nav的选择器 */
```

```html
<div id="nav"></div>
```

---



### 复合选择器

#### 后代选择器

```css
/* 基础选择器 基础选择器 {} */
div img {}
```

```html
<div>
  <p><img /></p>
</div>
```

---



#### 交集选择器

```css
/* 基础选择器... {} */
div.info {}
div.info#user {}
p.info.bar {}
```

```html
<div class="info bar" id="user"></div>
```

---



#### 并集选择器

```css
/* 任何选择器, 任何选择器 {} */
div,
.list #item {}
```

```html
<div></div>
<ul class="list">
  <li id="item"></li>
</ul>
```

---



#### 子元素选择器

```css
/* 基础选择器>基础选择器 {} */
div > p {}
```

---



#### 伪类选择器

根据标签不同的状态，使用不同的样式。用冒号（:）表示

**分类：**

- **链接伪类选择器**

  ```css
  a:link {}				// 未访问的链接
  a:visited {}		// 已访问的链接
  a:hover {}			// 悬停时的链接（常用）
  a:active {}			// 已选中的链接
  由于CSS的层叠性，声明的顺序为：link -> visited -> hover -> active
  ```

- **表单伪类选择器（:focus）**

  ```css
  /* 用于选取获得焦点的表单元素 */
  input:focus {background-color: #000}
  ```

---



## Dimension（尺寸）

CSS dimension属性定义元素的宽度、高度和行高

```css
width					/* 设置元素的宽度 */
height				/* 设置高度 */
line-height		/* 设置行高。单位：px、% */
```

---



## Font（字体）

CSS fonts字体属性用于定义字体系列、大小、粗细、样式

```css
font-family		// 指定文本的字体系列。默认Microsoft YaHei
font-size			// 字体大小。单位：px、em、%
font-weight		// 字体粗细。100~900，默认400（normal），700（bold）
font-style		// 字体样式。默认normal，italic（斜体）
font					// 复合属性。必须写size和family
```

```html
div {
	font-family: Arial, "Microsoft YaHei", "微软雅黑";
  font-size: 20px;
  font-weight: 700;
  font-style: italic;
}
div {
	font: italic 700 16px "Microsoft YaHei";
}
```

---



## Text（文本）

CSS text文本属性用于定义文本的外观，如文本的颜色、对齐、修饰、缩进、行高等

```css
color						/*  设置文本颜色，常用十六进制 */
text-align			/* 文本水平对齐。默认left  */
text-decoration	/* 文本修饰。默认none，underline（下划线）  */
text-indent			/* 文本首行缩进。单位：px、em、% */
line-height			/* 行高。单位：px、% */
```

```css
/* white-space：对元素文本中的空白如何处理。属性值： */
normal					/* 空白折叠，文本自动换行 */
nowrap					/* 空白折叠，文本不换行 */
```

```html
a {
	color: #000;
	text-align: center;
	text-decoration: none;
	text-indent: 2em;
	line-height: 16px;
}
```

---



## Background（背景）

CSS background背景属性用于定义HTML元素的背景

```css
background-color			/* 设置元素的背景颜色。默认transparent。边框以内 */
background-image			/* 把图像设置为背景，默认平铺。默认边框以内 */
background-repeat			/* 背景图像平铺。repeat(默认) | no-repeat | repeat-x | repeat-y */
background-position		/* 背景图像位置。值：方位名词 | 百分数，可以混合使用 */
background-attachment	/* 背景图像固定。值：scroll(默认) | fixed */
background						/* 复合属性，以空格隔开 */
```

```html
div[class^="test"] {
	background-color: #000;
	background-image: url(img/1.jpg)	<!-- 页面元素可以同时添加颜色和图像，但是图像会压盖颜色 -->
	background-repeat: no-repeat;
	background-attachment: fixed;
	background-position: left;				<!-- y默认center -->
	background-size: 10px;						<!-- 宽度10px，高度默认auto -->
	background: $000 url(2.jpg) no-repeat fixed center top;
}
```

---

**背景的渲染范围：**

- 背景色的渲染范围是整个盒子，包括边框
- 背景图像的渲染范围默认包括边框（repeat）
  - 当repeat-x，只渲染左右边框以及内部
  - 当repeat-y，只渲染上下边框以及内部
  - 当no-repeat，不渲染边框（常用）

---

**body和html元素的背景：**

- 当两者之中只有一个设置背景，背景会渲染两个元素
- 都设置背景时，自己的背景不会影响另一个元素
- 不管html有没有设置宽高、内外边距，背景都会渲染整个浏览器可视窗口

==所以，当只设置body的背景时，html元素也会被渲染。==

---

**背景图和插入图用法：**

- 背景图可以指定位置，用于精灵图、大型图片居中、h1元素中的logo使用背景图，加上关键字（缩进或margin设置负值）
- 插入图用于banner居中

---



## ul（列表）

清除列表默认样式

```css
ul {
  list-style: none;
}
```

---



## Table（表格）

表格边框

```css
table,
th,
td {
  border: 1px solid #000;
}
```

折叠边框

```css
table {
  border-collapse: collapse;
}
```

---



## Cursor（光标）

CSS cursor属性定义鼠标光标的样式。

```css
default			/* 默认，箭头 */
pointer			/* 链接指针（小手） */
move				/* 移动 */
text				/* 文本 */
wait				/* 等待 */
not-allowed	/* 禁止 */
```

```css
div {
  cursor: text;
}
```

---



## Display（显示模式）

**HTML元素可分为：**

- 块级元素（block）：div、h1~h6、p、table、tr、ul、li、ol、dl、dt、dd、form
  - 独占一行
  - 可设置宽高、边距
  - 默认宽度继承父级元素宽度
  - 可以放置任何元素
  - ==p、h元素中不能放块级元素==
  - ==垂直的块级元素之间外边距存在margin塌陷==
- 行内元素（inline）：a、span、b、i、u、s、...
  - 并排一行
  - 不能设置上下内外边距、宽高
  - 默认宽度由内容撑开
  - 只能放置文本或行内元素
  - ==a元素中可以放块级元素和有宽高的盒子（最好转块），不能再放a元素==
- 行内块元素（inline-block）：img、td、input、button等表单元素
  - 并排一行
  - 可设置宽高、边距
  - 默认宽度由内容撑开
  - ==行内块元素之间存在空白缝隙==

**显示模式：**元素在网页中如何显示。

**显示模式转换：**

```css
display: block					/* 以块级显示 */
display: inline					/* 以行内显示 */
display: inline-block		/* 以行内块显示 */
display: none						/* 不显示，页面上不占用空间 */
```

---

visibility（可见性）：用于指定元素可见或隐藏。值：visible(默认) | hidden

---

## Overflow（溢出模式）

CSS overflow属性用于指定溢出元素的内容如何显示。hidden、auto、scroll都能清除浮动。

```css
overflow						/* 值：visible(默认) | hidden | auto | scroll */
```

**注意：**

- 没有定位的元素的overflow属性对已定位（绝对、固定）的子元素无效

---



## Box model（盒模型）

==CSS将所有的HTML元素都看作是盒子。==盒模型规定了HTML元素的组成：

- content（内容）
- padding（内边距）
- border（边框）
- margin（外边距）

盒模型图：

![image-20200112195758795](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200112195758795.png)

---



### padding（内边距）

CSS padding属性定义元素边框和内容之间的空白区域。==当盒子没有指定width时，width+padding=父width==

```css
padding						/* 复合属性，可以是4、3、2、1个值，不能是负值 */
```

```html
div {
	padding: 2px 4px 7px;
}
```

单边设置

```css
padding-top
padding-right
padding-bottom
padding-left
```

---



### border（边框）

CSS border属性可以指定元素边框的宽度、样式、颜色。

```css
border-width		/* 设置边框的宽度 */
border-style		/* 设置边框的样式。none(默认) | solid | dashed | dotted */
border-color		/* 设置边框的颜色 */
border					/* 复合属性 */
```

```html
div {
	border-width: 1px;
	border-style: solid;
	border-color: transparent;
	border: 1px solid #000;
}
<!-- 边框的宽度、样式、颜色都可以有4、3、2、1个值，分别指定上、右、下、左 -->
border-width: 2px 5px 9px 6px;
border-style: solid dashed dotted;
border-color: #f00 #f00
```

单边设置

```css
border-top: 1px solid #000;
/* 还有border-right、border-bottom、border-left */ 
```

单边的单一属性设置

```css
border-top-style: dashed;
/* 还有border-right-width、border-left-color等 */
```

---

**表格边框合并**

```css
border-collapse		/* 值：separate(默认) | collapse */
```

```html
table {
	border-collapse: collapse;
}
```

---



### margin（外边距）

CSS margin属性定义元素周围的空白区域。==margin没有背景色，是绝对透明的。==

```css
margin				/* 复合属性，值：长度、负数，左右外边距可以设置auto */
```

```html
div {
	margin: 10px 5px;
}
```

单边设置

```css
margin-top
margin-right
margin-bottom
margin-left
```

---

**外边距合并（margin塌陷）：**==垂直方向的块级元素之间存在相邻的margin时，两者实际的间距是较大的margin==

```html
<!-- 并列关系 -->
<div></div>
<div></div>
```

```html
<!-- 包含关系 -->
<div>
	<div></div>
</div>
```

**块级元素之间是包含关系时，子元素不能使用上下方向的外边距。**

包含关系的margin塌陷解决：

- 父元素添加对应的边框
- 父元素定义内边距
- 父元素添加`overflow: hidden`
- 浮动、绝对、固定定位的元素没有塌陷现象

---

外边距可以让块级元素水平居中。只要块级元素==指定了宽度、左右外边距设置为auto、==

```css
div {
  width: 690px;
  margin: 0 auto;
}
```

---

**负值的margin**

- 负值的上外边距会让元素向上移动，会影响其他元素的位置（类似绝对定位）
- 负值的左外边距会让元素外形向左移动，但本体不动，不会影响其他元素的位置（类似相对定位）
- 负值的下外边距会让下侧元素向上移动
- 负值的右外边距会让右侧元素先左移动

---



## Float（浮动）

CSS float属性可以让==子元素在父元素内容区域中左右平移==，直到**碰到父盒子边框或另一个浮动元素的边框为止**。

**浮动的特性：**

- ==浮动元素会脱离标准流（半脱离），不占据空间。==漂浮在标准流之上，覆盖标准流。
- 浮动元素具有行内块元素的特性。
- 浮动元素只会影响后面的标准流，不会影响前面的标准流。

- ==标准流中的块级元素会无视浮动元素，但是内容会围绕在浮动元素周围
- ==非块级元素会围绕浮动元素（看做行块内元素）。==

**浮动的作用：**让元素在水平方向上并排排列，又能设置宽高，浮动元素之间还没有空白缝隙。

```css
float					/* 指定元素是否浮动。值：none(默认) | left | right */
```

```html
选择器 {
  float: left;
}
```

---

**清除浮动**

元素都是在父元素内部浮动的。由于浮动元素脱标，不会撑开父元素，所以父元素必须指定高度。但是有时候，父元素高度最好由子元素撑开，或不清楚高度的值。但是父元素不指定高度（高度为0），就会影响下面的标准流。

==清除浮动是清除浮动元素对标准流造成的影响。==清除浮动之后，父元素就能根据浮动元素自动设置高度，不会影响标准流。

**清除浮动原理：**闭合浮动。

**清除浮动方法：**父元素没有指定高度才要清除浮动。

- 隔墙法（==必须是块级元素设置clear属性==）

  ```css
  clear			/* 清除浮动元素对标准流的影响。值：none(默认) | left | right | both(常用) */
  
  /* clear清除浮动原理：通过给清除元素自动加上外边距实现的。属性值说明：
  	 left：将左侧所有浮动元素的最大高度值作为清除元素的上外边距。右浮动使用无效
  	 right：将右侧所有浮动元素的最大高度值作为清除元素的上外边距。左浮动无效
  	 both：将父盒子中所有浮动元素的最大高度值作为清除元素的上外边距
  	 -->必须先渲染浮动元素，clear属性才有效<--
  */
  ```

  ```html
  .clearfix {
  	clear: both;	<!-- 清除左右的浮动元素影响 -->
  	clear: left;	<!-- 清除左侧的浮动影响 -->
  	clear: right;	<!-- 清除右侧的浮动影响 -->
  }
  <div class="clear"></div>
  ```

- 父元素添加overflow属性

  ```css
  .fu {
    overflow: hidden | auto | scroll;
  }
  ```

- 父元素添加after伪元素

  ```css
  .clearfix:after {
    content: "";
    display: block;		/* 伪元素是行内元素，转块才能使用clear */
    height: 0;
    clear: both;
    visibility: hidden;
  }
  .clearfix {
    *zoom: 1;					/* IE6、7 */
  }
  ```

- 父元素添加双伪元素

  ```css
  .clearfix:before,.clear:after {
    content: "";
    display: table;
  }
  .clearfix:after {
    clear: both;
  }
  .clearfix {
    *zoom: 1;
  }
  ```

---



## Position（定位）

浮动可以让多个元素在一行没有缝隙排列显示，用于横向排列元素。

定位可以让元素自由地移动位置或者固定在屏幕中某个位置，并且可以压住其他元素。

```css
position			/* 指定元素的定位模式。static(默认) | relative | absolute | fixed */
top						/* 定义元素上外边距和父元素上边界的距离 */
right					/* 定义元素右外边距和父元素右边界的距离 */
left					/* 定义元素左外边距和父元素左边界的距离 */
bottom				/* 定义元素下外边距和父元素下边界的距离 */
```

**注意：**

- ==当盒子设置宽高时，上下/左右各自只能出现一个，如果都出现，不管书写顺序，有效的都是上/左==
- ==如果没有或者只设置其中之一，那么top/bottom/left/right视情况的不同来决定是否有效==

---



### 相对定位

相对定位：参照自己原来的位置移动元素。相对定位的元素不会脱离标准流，继续保留原来的位置（形影分离）

用途：微调、子绝父相。

```css
div {
  position: relative;
  top: 10px;
  left: 10px;
}
```

---



### 绝对定位

绝对定位：参照离自己最近的（相对、绝对、固定）定位父元素移动元素，==如果没有定位父元素，那么参照document文档（浏览器可视窗口）==。以边框为边界（无视父元素内边距）。绝对定位的元素会脱离标准流，不占有空间。

用途：居中、压盖、遮罩（半透明）。

```css
div {
  position: absolute; 
  bottom: 10px;
  right: 3px;
}
```

---



### 固定定位

固定定位：参照浏览器可视窗口移动元素。固定定位的元素会脱离标准流，不占有空间，也不会随滚动条滚动。

```css
div {
  position: fixed;
  top: 10px;
  right: 7px;
}
```

---

**粘性定位：**依赖滚动位置来定位，是相对定位和固定定位的结合。

特点：

- 参照浏览器可视窗口来移动元素（固定定位）
- 不脱标，占有空间（相对定位）
- 只能使用一个边偏移，否则当做相对定位

```css
div {
  position: sticky;
  top: 0;		/* 到顶就会固定不动 */
}
```

---

**叠放次序：**==定位元素拥有z-index属性，==用于设置定位元素的叠放次序

```css
z-index				/* 数值越大，盒子越靠上；数值相同，后写的压盖先写的。值：auto(默认0) | 整数 */
```

```html
选择器 {
  z-index: 1;
}
```

默认叠放次序：定位 > 浮动 > 标准流。与书写顺序无关。

---



## CSS3 新特性

注意：IE9以上才兼容CSS3 新特性。

### 新增选择器

#### 属性选择器

根据元素的**属性及属性值**来选择元素

```css
/* 任何选择器[属性][属性]... {} */
*[title] {}						/* 选择包含title属性的元素 */
a[href] {}						/* 选择有href属性的a元素 */
a[href="#"][title] {}	/* 选择href为#、有title属性的a元素 */
div[class^="test"] {}	/* 选择class以"test"开头的a元素 */
div[class$="test"] {}	/* 选择class以"test"结尾的a元素 */
div[class*="test"] {}	/* 选择class包含"test"的a元素 */
```

---



#### 结构伪类选择器

```css
E:first-child		/* 如果父元素第一个元素是E，就会选中E */
E:last-child		/* 如果父元素最后一个元素是E，就会选中E */
E:nth-child(an+b)/* 根据表达式的值，判断父元素的这些子元素，如果是E，就会选中E，，n从0开始 */
E:first-of-type	/* 选中E类型的第一个 */
E:last-of-type	/* 选中E类型的最后一个 */
E;nth-of-type(n)/* 选择类型E的第n个 */
```

---



#### 伪元素选择器

可以利用CSS创建元素，而不需要使用HTML元素，从而简化HTML结构（创建的元素在文档中以选择器名显示）。==CSS创建的元素默认是行内元素，但可以通过display改变。==

```css
/* 伪元素都有content属性 */
::before								/* 在元素内容的前面插入新内容 */
::after								/* 在元素内容的后面插入新内容 */
```

```html
h2:before {
	content: '';
}
span:hover::after {		<!-- 悬停时使用伪元素 -->
	content: '';
}
```

==伪元素选择器可以结合伪类选择器一起使用。==

**用途：**

- 结合字体图标
- 多个相同的元素具有相同的结构，可以给这些元素添加伪元素，从而简化HTML结构
- 清除浮动

---



### 新增属性

#### box

- **box-sizing**

  ```css
  /* 定义盒模型的组成模式。属性值： *//*  */
  content-box				/* 默认 */
  border-box				/* 元素的内边距和边框占据宽高 */
  ```

- **box-shadow**

  ```css
  /* 盒子阴影。属性值：水平阴影(Y) 垂直阴影(Y) 模糊距离 阴影大小 阴影颜色  */
  box-shadow: 3px 3px 3px 3px rgba(0, 0, 0, .3)
  ```

---



#### border

- **border-radius**

  ```css
  /* 定义元素边框圆角。可以有4、3、2、1个值，表示左上角、右上角、右下角、左下角 */
  border-radius: 50%;
  ```

---



#### background

- **background-size**

  ```css
  /* 设置背景图像大小，只设置一个，另一个是auto */
  background-size: 100px;
  ```

---



#### text

- **text-shadow**

  ```css
  /* 添加文本阴影。属性值：水平阴影(Y) 垂直阴影(Y) 模糊距离  阴影颜色 */
  text-shadow: 3px 3px 3px rgba(0, 0, 0, .5);
  ```

- **text-overflow**

  ```css
  /* 指定当文本溢出包含元素时要做的事情，要结合overflow: hidden使用 */
  text-overflow: ellipsis;		/* 省略号显示溢出部分 */
  ```

---



#### opacity

```css
/* 设置盒子的不透明度。默认是1（完全不透明） */
opacity: .5;
```

---



#### filter（滤镜）

定义元素的可视效果。属性值是一个函数

```css
filter: blur(15px);		/* 数值越大越模糊 */
```

---



#### resize

```css
/* 定义是否可以调整元素大小。默认不可以 */
```

---



### transition（过渡）

CSS3 过渡是元素从一种样式逐渐改变为另一种的效果，**常与:hover结合使用。**

```css
transition										/* 复合属性 */
transition-property						/* 过渡属性的名称。all是所有属性 */
transition-duration						/* 花费时间(s) */
transition-timing-function		/* 可选，运动曲线。值：ease(默认) | linear(匀速) */
transition-delay							/* 可选，何时开始(s)。默认是0 */
```

```css
div {
  transition: width .5s;
	transition: all 1s linear;
	transition: border 3s ease-in 3s;
}
div:hover {
  ...;		/* 悬停时可以看到过渡效果 */
}
```

**多个样式过渡:**

```css
  transition; padding .5s ease-out .5s, margin 1s ease 4s;	/* 多个样式 */
```

---



### transform （转换）

转换：改变元素的形状、大小和位置的效果。

CSS3 转换可以对元素进行移动、缩放、旋转、拉长或拉伸。**分为2D 转换和3D 转换。**

```css
transform					 	/* 定义元素2D、3D转换，属性值：translate | scale | rotate | skew等 */
```

**设置元素转换的中心点**

```css
transform-origin		/* 默认中心点是元素的中心点，可设置为任何位置。值：px、%、方位名词 */
```

```css
div {
  transform-origin: 50% 50%;				/* 默认 */
  transform-origin: left bottom;		/* 设置转换中心点是左下角 */
  transform-origin: 0 1000px;					/* 中心点是左上角垂直向下1000px的位置 */
}
```

**注意：**

- ==transform属性不会影响其他元素的位置（类似相对定位）。==
- ==transform属性只对行内元素无效==

---



#### 2D 转换

**2D转换：**改变元素在**二维平面**上的位置和形状。

**二维坐标系：**

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200116083545963.png" alt="image-20200116083545963" style="zoom: 80%;" />

**2D 转换方法：**

- **translate（移动）**

  - margin负值、position、translate都可以移动元素

    ```css
    /* 定义2D 移动。单位：px、% */
    transform: translate(x, y);				/* x轴、y轴移动元素 */
    transform: translateX(n);					/* x轴移动元素 */
    transform: translateY(n);					/* y轴移动元素 */
    ```

    ```css
    div {
      transform: translate(50%, 7px);	/* 沿着x、y轴正方向移动元素 */
      transform: translateX(-5px);		/* 沿着x轴反方向移动元素 */
      transform: translateY(-50%)			/* 沿着y轴反方向移动元素 */
    }
    ```

  ---

- **scale（缩放）**

  - 缩放元素不会影响其他元素，而且可以设置缩放的中心点

    ```css
    /* 值默认是1，不缩放；大于1是放大；小于1是缩小 */
    transform: scale(x, y);								/* 改变元素的宽度和高度 */
    transform: scaleX(n);									/* 改变元素的宽度 */
    transform:: scaleY(n);								/* 改变元素的高度 */
    ```

    ```css
    div {
      transform: scale(1, 1);
      transform: scaleX(2);
      transform: scaleY(0.5);
      transform-origin: right top;				/* 右上角是缩放中心点，中心点位置不变，元素缩放 */
    }
    ```

  ---

- **rotate（旋转）**

  - 结合边框可以制作 ^

  - 让元素做圆周运动

    ```css
    /* 定义2D 旋转，默认旋转中心是元素中心点。单位：deg */
    transform: rotate(n);									/* 正数是顺时针旋转元素，负数是逆时针旋转元素 */
    ```

    ```css
    div {
      transform: rotate(45deg);
      transfrom: rotate(-30deg);
      transform-origin: left top;					/* 改变元素旋转的中心点 */
    }
    ```

---

**2D 转换复合写法：**

```css
div {
  transform: translate(5px, 7px) scale(2, 1.5) rotate(90deg);		/* 先写translate */
}
```

---



#### 3D 转换

**3D转换：**改变元素在**立体空间**上的位置和形状。

**三维坐标系：**

<img src="E:\HTML源代码\imagesrc\transform.jpg" alt="3D 转换" style="zoom:67%;" />

---

**透视属性perspective**

**透视：**也叫视距，是眼睛到屏幕的距离。

```css
/* 该属性让元素的子元素开启立体效果（近大远小）。单位：px。数值越大，距离越小，元素越大 */
body {
  perspective: 800px;
}
```

==3D 转换必须使用perspective属性才能看到效果。==

---

**3D 转换常用方法：**

- **translate3d**

  ```css
  /* 定义3D 移动 */
  tranlate3d(x, y, z);		/* x、y、z轴移动元素 */
  translateX(x);					/* x轴移动元素 */
  translateY(y);					/* y轴移动元素 */
  translateZ(z);					/* z轴移动元素，必须借助perspective属性 */
  ```

  ```css
  div {
    transform: translate3d(0, 3px, 7px);
    transformL translateZ(7px);					/* translateZ一般用px单位 */
  }
  ```

  ---

- **rotate3d**

  ```css
  /* 定义3D 旋转，可以让元素沿着x、y、z轴或者自定义轴旋转。单位：deg */
  rotate3d(x, y, z, n);	/* 沿着自定义的矢量轴旋转n度，不常用 */
  rotateX(n);							/* x轴旋转*/
  rotateY(n);							/* y轴旋转 */
  rotateZ(n);							/* z轴旋转，类似2D 旋转 */
  ```

  ```css
  div {
    transform: rotateX(45deg);
    transform: rotateY(-90deg);
    
  }
  ```

  **左手准则判定旋转方向：**

  - 大拇指指向正轴方向
  - 其余手指的弯曲方向就是元素**正数**旋转的方向

---

**3D 呈现transform-style**

当元素设置transform属性后，该元素的子元素默认关闭 3D立体效果。所以当父子元素都转换时，父元素必须设置子元素保持立体效果。

```css
/* 子元素如何在 3D 空间中显示。属性值： */
flat									/* 默认，子元素以 2D 平面呈现 */
preserve-3d						/* 子元素以 3D 空间呈现 */
```

---



#### 转换属性

```css
transform							/* 定义 2D 或 3D 转换 */
transform-origin			/* 设置转换元素的中心点 */
transform-style				/* 设置子元素如何在 3D 空间中显示 */
perspective						/* 开启立体效果 */
backface-visibility		/* 当元素背面向屏幕时是否可见。值：visible(默认) | hidden */
```

**总结：**

- perspective：**子孙元素**都开启近大远小
- transform-style：**子元素**默认以平面显示，遮挡元素绝对看不到；当以立体显示时，可以看到
- 有多种转换时，移动要写在其他转换之前；否则，要注意移动的方向是否改变

- 当元素使用 3D 转换时，父元素要用perspective属性开启立体效果；如果父元素也使用转换时，那么要使用transform-style属性保持子元素的立体效果。

---



### animation（动画）

CSS3 animation属性可以创建动画，它可以取代许多网页动画图像、Flash 动画和 JavaScript 实现的效果。

**与过渡相比，动画可以实现更多变化、控制、连续自动播放等效果。**

CSS3 动画可设置多个节点来精确控制一个或一组动画，常用来实现复杂的动画效果。

```css
@keyframes									/* 定义动画 */
animation										/* 复合属性，不包括animation-play-state */
animation-name							/* 动画名称 */
animation-duration					/* 花费时间(s) */
animation-timing-function		/* 可选，速度曲线。值：ease(默认) | linear | steps(n) */
animation-delay							/* 可选，何时开始(s)，默认是0 */
animation-iteration-count		/* 可选，播放次数。默认是1，infinite */
animation-direction					/* 可选，播放方向。值：normal | alternate(交替) */
animation-fill-mode					/* 结束时的状态。值：forwards(结束状态) | backwards(起始状态) */
animation-play-state				/* 可选，用于播放/暂停动画，值：running(默认) | paused */
```

---

**使用动画步骤（类似选择器，先定义，再使用）：**

- **定义动画**

  ```css
  @keyframes animationName {
    0% {width: 10px};				/* 等同于from */
    ...
    100% {width: 50px};			/* 等同于to，所有状态的属性是相对于0%状态的属性设置 */
  }
  ```

- **元素使用动画**

  ```css
  div {											/* div元素使用动画 */
    animation: animationName 2s;
    animation: animationName 1.5s linear 2s infinite alternate forwards;
    animation-play-state: paused;			/* 常与:hover使用 */
  }
  div {
    animation: name1 .5s, name2 2s;		/* 元素使用多个动画 */
  }
  ```

---

**速度曲线之步长steps()**

```css
animation-timing-function: steps(10);		/* 指定步长为10，在播放时间内分10步完成动画 */
```

```css
div {
  animation: name 4s steps(5) forwards;	/* forwards是保留动画结束时的状态 */
}
```

---

**注意：**

- @keyframes所有状态的属性都是相对于0%状态的属性设置
- 动画默认结束时跳回起始位置；可以使用animation-direction: alternate改变
- 动画停留在结束位置animation-fill-mode: forwards
- steps()可以设置元素的背景图移动次数，达到动画的效果

---



## 其他

### CSS 高级技巧

---

**CSS 精灵图**

**Sprites 精灵图是为了减少浏览器发送请求次数、减少服务器压力、提高页面的加载速度。**

核心原理：将网页中的一些**小背景图像**整合到一张大图中，这样服务器只需要接收一次请求就可以了。

使用：用于背景图，通过移动大图片的位置来显示不同的小图像

```css
span {
  backgorund: url(img/sprites.png) no-repeat;
  background-position: -7px -7px;			/* 使用负值，是向左、向上移动 */
}
```

缺点：图片文件较大、图片放大缩小会失真，修改麻烦

---

**CSS 字体图标**

**Iconfont 字体图标解决了精灵图的缺点。字体图标虽然展示的是图标，但本质是字体。**

**优点：**

- 更加轻量。一个字体图标比图像还要小
- 更加灵活。因为是字体，所以可以添加颜色、阴影、旋转等效果
- 兼容性。几乎所以浏览器都支持

**使用：**

- [字体图标下载]( https://icomoon.io/ )
- 引入fonts文件夹。粘贴`style.css`文件的`@font-face`类用于声明字体图标
- 使用该字体`font-family: icomoon`
- 追加。网站---import icons---选择之前下载的文件---selection.json---追加---下载---替换之前的fonts文件夹

**总结：**==如果是结构和样式相对简单的小图标，使用字体图标；否则使用精灵图。==

---

**CSS 三角**

三角形直接使用CSS做出来就可以，不必使用精灵图或者字体图标。

```css
.box {
  width: 0;
  height: 0;
  line-height: 0;
  font-size: 0;
  border: 50px solid transparent;
  border-top-color: blue;
}
```

---

**CSS 默认样式**

```CSS
border:0;						/* 取消默认边框 */
outline: none;			/* 取消表单轮廓 */
resize: none;				/* 防止文本域拖拽 */
```

---

**CSS vertical-align**

vertical-align属性设置**行内、行内块元素**垂直对齐方式。

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200114165640081.png" alt="image-20200114165640081" style="zoom:67%;" />

```css
/* vertical-align属性值 */
baseline					/* 默认，元素底线和父元素基线对齐 */
middle						/* 中线对齐（常用） */
top								/* 顶线对齐 */
bottom						/* 底线对齐 */
```

```css
img, input {
  vertical-align: middle;
}
```

用途：

- 用于设置图片、表单和文字垂直居中对齐。
- 图片底侧空白缝隙。是由于行内块元素和基线对齐，解决：
  - 元素添加属性`vertical-align: middle | top | bottom`
  - 元素转块`display: block`

---

**CSS 省略显示溢出文字**

单行文本省略显示：

```css
div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;		/* CSS3 */
}
```

多行文本省略显示：

```css
div {
  overflow:hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;			/* 在第二行省略显示 */
  -webkit-box-orient: vertical;
}
```

---

**CSS 布局技巧**

- **margin负值的运用**

  - 并排显示有边框的盒子时，使用`margin-left: -边框宽度`可以重叠盒子之间的边框
  - 悬停显示边框时，伪类可以使用相对定位来显示被压盖的边框；如果已有定位，就使用z-index

- **文字围绕浮动元素**

  - 并排显示图片+文字说明时，图片使用浮动，p标签里的文字会自动围绕图片

- **行内块元素的运用**

  - 可以使用行内块元素（a元素）用于并排显示的分页按钮

- **三角强化**

  ```css
  div {
    width: 0;
    height: 0;
    border-top: 100px solid transparent;
    border-right: 50px solid #0f0;
  }
  ```

---



### CSS 初始化

不同浏览器对标签的默认样式可能不同，为了消除这种差异，需要重设样式，这就是CSS 初始化（CSS reset）。

**常用normalize.css**

---



### CSS 文件组织

**分级引入：**

```css
reset.css				/* 重设样式 */
base.css				/* 原子类，一个类只设置一个属性 */
common.css			/* 公共样式，大部分页面共有 */
page.css				/* 专有样式，每个页面专属 */
```

---



### CSS 注释

```css
/* 我是注释 */
```

---



### CSS 单位

- **相对单位**

  | 相对单位 | 描述                                      |
  | -------- | ----------------------------------------- |
  | em       | 相对于元素的字体大小。em = px / font-size |
  | rem      | 根元素的font-size                         |
  | vw       | 视口宽度。100vw = 100%                    |
  | vh       | 视口高度。100vh = 100%                    |
  | %        | 所占区域                                  |

- 绝对单位

  | 绝对单位 | 描述      |
  | -------- | --------- |
  | px       | pixel像素 |

---



### CSS 颜色

CSS 颜色由红色、绿色、蓝色组合而成。

CSS 颜色指定方法：

- 十六进制：#fff

- 颜色名：red

- rgb：rgb(255, 0, 0)

- rgba：rgba(255, 0, 0, .5)

---



### CSS 函数

| CSS 函数 | 描述                                                 |
| -------- | ---------------------------------------------------- |
| attr()   | 返回选择元素的属性值                                 |
| calc()   | 响应式计算CSS 的属性值，比如width: calc(100% - 50px) |
| rgb()    | 使用red、green、blue生成颜色                         |
| rgba()   | 使用red、green、blue、alpha（透明度）生成颜色        |
| var()    | 插入自定义的属性值，类似于变量                       |

---



### CSS 三大特性

#### 层叠性

元素的相同选择器设置相同的样式属性时，就会发生样式冲突。==层叠性主要解决样式冲突的问题。==

层叠性原则：就近原则。发生样式冲突时，后面的样式层叠前面的样式。

---



#### 继承性

子元素会继承父元素的某些文字样式。恰当地使用继承可以简化代码。

**可继承样式：**

- font-
- text-
- color
- line-height
- list-style
- cursor

**注意：**

- h标签不会继承font-size
- a标签不会继承color、text-decoration

---



#### 优先级

元素指定多个选择器时，就会产生优先级。

- 多个选择器相同时，执行层叠性
- 多个选择器不同时，执行优先级（权重）

| 选择器                              | 权重    |
| ----------------------------------- | ------- |
| !important                          | 无穷大  |
| 行内样式                            | 1,0,0,0 |
| id选择器                            | 0,1,0,0 |
| 类、伪类(:)、属性([])               | 0,0,1,0 |
| 标签、伪元素选择器(::)              | 0,0,0,1 |
| 通配符(*)、子元素(>)、相邻选择器(+) | 0,0,0,0 |
| 继承样式                            | 次低    |
| 浏览器默认样式                      | 最低    |

**冲突样式的层叠流程：**

- 选择器是否选中元素
  - 选中元素，比较选择器的权重。权重相同根据就近原则
  - 不选中，比较选中元素与目标元素的距离。距离相同再比较选择器的权重。权重相同再根据就近原则

注意：==只要不是冲突的样式，不管选中还是继承，都会有效。==

---



### CSS 网页布局

网页布局本质：用CSS来摆放盒子的方式。CSS提供了三种PC端的布局方式：

- 标准流（文档流、普通流）：存在块级、行内元素、行内块元素，用于上下排列盒子。
- 浮动：半脱离标准流，默认宽高由内容撑开，用于左右排列盒子。
- 定位：绝对、固定定位脱离标准流，默认宽高由内容撑开，用于盒子自由移动

---

### CSS 属性书写顺序

- 布局定位属性：display / position / float / overflow
- 盒子属性：width / height / margin / padding / border / background
- 文本属性：text / font / color / line / vertical-align
- 其他属性（CSS3）：border-radius / box-shadow / cursor

---



### CSS 预处理器语言

CSS预处理器定义了一种新的语言。基本思想是，==用一种专门的编程语言，为CSS增加了一些编程的特性==，将CSS作为目标生成文件，开发者就只要使用这种语言进行编码工作，无需考虑浏览器的兼容问题

---

**Sass**

`Sass(Syntactically Awesome Stylesheets)`基于`Ruby`语言开发而成，因此安装`Sass`前需要[安装Ruby](http://rubyinstaller.org/downloads)。 

**特性：**

- Sass 是一个 CSS 预处理器语言
- Sass 是 CSS 扩展语言，可以帮助我们减少 CSS 重复的代码，节省开发时间
- Sass 完全兼容所有版本的 CSS

**了解：**

- Sass 扩展了 CSS3，增加了**规则、变量、混入、选择器、继承、内置函数等**特性
- Sass 生成良好格式化的 CSS 代码，易于组织和维护
- Sass 文件后缀为 **.scss**。==sass和scss其实是同一种东西==

---

**Less**

Less是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。

Less 可以运行在 Node 或浏览器端。

---

**Stylus**

`Stylus`由`Javascript`编译，相较于`Sass`更加简洁，甚至冒号也都可以省略，仅仅以空格分隔属性名和多个属性值就可以生成想要的CSS，而且还可以拼接字符串等等。

`Stylus`基于Node.js运行，所有要先安装Node环境。

---



### PS 基本操作

- ctrl+r，使用像素单位的标尺
- ctrl+（+）、ctrl+（-）放大缩小视图
- 按住空格键，移动视图
- 选取工具用于测量大小

---

**切图**

- 图层切图
  - 右击---快速导出为png
  - 选择所需的图层---图层菜单---合并图层---右击导出
- 切片切图
- 切片工具选中---文件菜单---导出---存储为文本格式---选择导出格式（JPEG）---存储
- PS插件切图

---



### 图片格式

常见的图片格式：

- jpg图像格式
  - 特点：色彩丰富、高清、可压缩、可调整品质
  - 缺点：不能保存图层、不支持透明和半透明
  - 用途：产品类图片、背景图、插入图、banner

- gif图像格式
  - 动图、保存图层、支持透明、文件小
  - 缺点：只有256种色值
  - 用途：图片小动画

- png图像格式（结合jpg和igf的优点）
  - 特点：色彩较丰富、保存图层、支持透明和半透明
  - 缺点：一般文件太大
  - 用途：精灵图、背景透明图、logo

- PSD图像格式
  - PhotoShop的专用格式，用于存放图层、制作图片等

---

图标文件ico格式是Windows的图标文件格式的一种。可用于HTML文档（网页）的图标。

使用：

- png图片转换为ico图标：[比特虫网站](http://www.bitbug.net/)

- 引入

  ```html
  <link rel="shortcut ico" href="favicon.ico" />
  ```

---



### 浏览器私有前缀

浏览器厂商通常都是在属性名称前添加私有前缀，来测试这些尚未成为标准的属性。因此，可以借助私有前缀，来解决浏览器对CSS3的兼容性问题。

```css
-moz-						/* firefox私有属性 */
-ms-						/* IE私有属性 */
-webkit-				/* safari、chrome私有属性 */
-o-							/* Opera私有属性 */
```

提倡的写法

```css
div {
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  -o-border-radius: 10px;
  border-radius: 10px;
}
```



