# HTML

## 	概述

HTML（Hyper Text Markup Language：超文本标记语言）是用来描述网页的一种语言，包括一系列标签。

特点：

- ==HTML是标记语言，不是编程语言==
- HTML文档（网页）包含了HTML标签、文本内容

---



## web标准

由W3C组织制定的一系列标准的集合。网页主要由三部分组成： 

- 结构（Structure）---XHTML和XML
- 表现（Presentation）---CSS
- 行为（Behavior） ---DOM、ECMAScript

重要的W3C标准：

- HTML
- CSS
- XML
- XSL
- DOM

---



## HTML 版本

- HTML4.01

  - 将结构和样式进行了分离

- XHTML1.0

  - 在4.01版本基础上进行了严格化和扩展升级，严格规定标签必须小写，属性必须用双引号包裹，结束标签必须写’/‘

  - 4.01和1.0都包含3个小规范：

    - Strict 严格版：不能使用font等废弃标签、框架集，结构	和样式分离

    - Transitional 过渡版（通用版）：可以使用font等废弃标签，	不能使用框架集

    - Frameset 框架集版：可以使用框架集

- HTML5

  - 取消了三个小版本，常用

---



## <!DOCTYPE>声明

DTD（document type definition：文档类型定义），用于告知浏览器，HTML文件使用的版本规范。

==<!DOCTYPE>不是HTML标签，是文档类型声明标签。==

---



## 基本骨架

```html
<!DOCTYPE html>					<!--声明HTML5文档-->
<html lang="zh-CN">			<!--web页面的根元素-->
  <head>								<!--文档头部，用于配置元数据-->
    <meta charset="UTF-8">
    <title>标题</title>	<!--文档标题-->
  </head>
  <body>内容</body>			<!--文档主体-->
</html>
```

解释：

```html
lang="zh-CN"		<!--SEO优化-->
charset					<!--字符集，规定HTML文档的字符编码，没有就按浏览器或编辑器的默认编码打开-->
```

注意：==charset规定的字符集必须与文件的保存字符集类型保持一致。==

---



## HTML 头部

`<head>` 定义了文档信息。其中可以插入脚本（scripts）、样式文件（CSS）、及各种meta信息。

可添加的标签为:

- **`<base>`元素**

  ```html
  <!-- 作为HTML文档中a标签的默认链接，默认是根目录: -->
  <!-- href修改默认链接，target设置统一以新页面打开 -->
  <base href="http://www.runoob.com/images/" target="_blank">
  ```

- **`<meta>`元素（单标签）**

  ```html
  <!-- 指定网页的描述、关键词、文件的最后修改时间、作者等 -->
  <meta name="description" content="免费 Web & 编程 教程">
  <meta name="keywords" content="HTML, CSS, XML, XHTML, JavaScript">
  <meta name="author" content="Runoob">
  <meta http-equiv="refresh" content="30">	<!--每30s刷新页面-->
  ```

- **`<title>`元素**

  ```html
  <!-- 定义文档标题，有利于SEO优化 -->
  <title>我是标题</title>
  ```

- **`<style>`元素**

  ```html
  <!-- 引用css文件或添加样式 -->
  <style>
  	@import './my.css'
    p {...}
  </style>
  ```

- **`<link>`元素（单标签）**

  ```html
  <!-- 定义文档与外部资源的关系。通常用于链接到样式表: -->
  <link rel="stylesheet" type="text/css" href="mystyle.css">
  <link rel="shortcut icon" href="图片url">
  ```

- **`<script>`元素**

  ```html
  <!-- 加载脚本文件 -->
  <script src="myscript.js"></script>
  ```

- **`<noscript>`元素**

---



## HTML 标签

- 标签语义：标签的含义。==div和span没有标签语义==

- 双标签：由开始标签、结束标签组成

- 单标签：`<br />`
- 文本内部所有的空格、tab、换行被折叠成一个空格（空白折叠现象），多空格可以使用`&nbsp;`
- 标签之间对空格、tab、换行不敏感

- 标签属性不加单位

---

### h1~h6

heading，标题标签。

块级元素

```html
<h1></h1>		<!-- 有利于SEO优化，常用于logo -->
<h2></h2>
<h3></h3>
<h4></h4>
<h5></h5>
<h6></h6>
```

---



### p

paragraph，段落标签，只能放文本、图片、表单元素。

块级元素

```html
<p>段落</p>		<!-- 结合<br />实现段落换行 -->
```

---



### a

anchor，链接标签。

行内元素

```html
<a href="http://www.runoob.com">外部链接</a>
<a href="core.html" target="_blank">内部链接</a>		<!-- 相对路径 -->
<a href="#">空链接</a>
<a href="javascipt:;"></a>
<a href="download.zip">下载链接</a>		<!-- 对于文件或压缩包地址，会下载文件 -->
<a href="..."><img src="..." /></a>		 <!-- 音频、视频等都可以添加超链接 -->
```

属性：

```js
href		// 目标URL
target	// 目标页面的打开方式，默认_self，_blank是新页面打开
```

锚点跳转

```html
<ahref="#标签id">页面内锚点链接</a>		<!-- 跳转到本页面指定标签 -->
<ahref="URL#标签id">跨页面锚点链接</a>		<!-- 跳转到该标签 -->
```

---



### img

image，图像标签，单标签。

行内元素

```html
<img src="/images/logo.png" title="提示" alt="替代文本" width="258" height="39" />
```

属性：

```js
src			// 图像URL
title		// 提示文本
alt			// 替代文本
width		// 图像宽度。一般只修改宽或高
height	// 图像高度
```

---



### 空元素

没有闭合标签的元素、单标签

```html
<hr />	<!-- 水平线 -->
<br />	<!-- 换行 -->
<meta />
<link />
<img />
<input />
```

---



### 文本格式化

行内元素

```html
<b></b>		<strong></strong>	<!-- 加粗 -->
<i></i>		<em></em>					<!-- 斜体 -->
<u></u>		<ins></ins>				<!-- 下划线 -->
<s></s>		<del></del>				<!-- 删除线 -->
```

---



### div&span

没有标签语义的盒子，用来装载内容。

div：块级元素。 常见用途是文档布局，它取代了使用表格定义布局的老式方法。  

span：行内元素。

```html
<div>任何标签</div>
<span>文本</span>
```

---



### 表格

table、tr是块级元素；td、th是行内块元素

```html
<table></table>	<!-- 表格 -->
<tr></tr>				<!-- 行 -->
<td></td>				<!-- 单元格 -->
<th></th>				<!-- 表头单元格（加粗、居中） -->
```

**表格结构标签：**

```html
<caption></caption>	<!-- 表格标题 -->
<thead></thead>			<!-- 表格头部 -->
<tbody></tbody>			<!-- 表格主体 -->
```

**合并单元格：**

```html
<!-- 单元格属性 -->
rowspan		<!-- 跨行合并单元格个数 -->
colspan		<!-- 跨列合并单元格个数 -->
<td rowspan="2"></td>		<!-- 要删除多余的单元格 -->
```

**总结：**

```html
<table border="1" cellspacing="0">
  <thead>
    <tr>
      <th>
  <tbody>
    <tr>
      <td>
```

---



### 列表

列表的所有元素都是块级元素

- **无序列表**

  ```html
  <ul>
    <li>任何标签</li>
  </ul>
  ```

- **有序列表**

  ```html
  <ol>
    <li>列表项</li>
  </ol>
  ```

- **自定义列表**

  ```html
  <!-- 对术语或名词进行解释和描述 -->
  <dl>
    <dt>术语</dt>
    <dd>描述1</dd>
    <dd>描述2</dd>
  </dl>
  <!-- dt和dd是并列关系，都可以放任何标签 -->
  ```

---



### 表单

一个完整的表单由三部分组成：表单域、表单元素、提示信息。

**表单属性：**

```html
name				<!-- 元素名称，提交表单时会传递name的值 -->
value				<!-- 元素值，与name结合传递。不适用于file -->
checked			<!-- 适用于radio和checkbox -->
disabled		<!-- 禁用元素，而且不能提交 -->
maxlength		<!-- 元素的最大字符数 -->
```

**表单元素：**

- **`form`元素**

  ```html
  <!-- 表单域：把内部的表单元素信息提交服务器 -->
  <form action="demo.php" method="post" id="formNmae" enctype="multipart/form-data">
  <!-- enctype：表明提交数据的格式。如果需要上传文件，必须设置enctype为该值 -->
  ```

- **`input`元素（单标签）**

  ```html
  <!-- 输入域，type属性决定控件的类型 -->
  <input type="text" name="username">
  <input type="passwork" name="pwd" value="123" maxlength="7">
  <input type="button" value="我是按钮上的字" disabled>
  <input type="radio" name="gender" value="男" checked>
  ```

  **type属性值：**

  ```html
  text				<!-- 文本框 -->
  passwork		<!-- 密码框 -->
  button			<!-- 按钮 -->
  reset				<!-- 重置按钮，清除表单数据 -->
  submit			<!-- 提交按钮，负责将表单数据发送到服务器，并且跳转到新页面 -->
  file				<!-- 文件浏览按钮，供文件上传 -->
  image				<!-- 图像形式的按钮 -->
  radio				<!-- 单选按钮。具有相同的name，才能多选一。必需value -->
  checkbox		<!-- 复选框。也要相同的name。必需value -->
  ```
```
  
- `textarea`元素

  ```html
  <!-- 文本域 -->
  <textarea></textarea>
```

- `select`元素

  ```html
  <!-- 下拉列表 -->
  <select multiple>
    <option selected>选项</option>
  </select>
  ```

- `label`元素

  ```html
  <!-- 标注，不是表单元素，用于绑定表单元素 -->
  <label for="male">男</label>
  <input type="radio" name="sex" value="男" id="male">
  ```

---



## HTML 全局属性

```html
id			<!-- 唯一标识 -->
class		<!-- 类名 -->
style		<!-- 行内样式 -->
title		<!-- 提示文本 -->
lang		<!-- 元素内容的语言 -->
```

---



## HTML 框架

```html
<!-- 定义内联框架 -->
<iframe src="demo2.html" name="myiframe" width="200" height="200"></iframe>
```

---



## HTML 颜色

HTML颜色由红色、绿色、蓝色混合而成。

```html
十六进制：#fff、#f6f6f6
rgb(255, 255, 0)
颜色名：red、skyblue
rgba(0, 0, 0, .5)		<!-- CSS3 -->
```

---



## HTML 脚本

有`script`和`noscript`元素

```html
<script src="myscript.js"></script>
<script>
	document.write('直接写语句')
</script>
<noscript>当浏览器不支持或禁用脚本时，才会显示这里的内容</noscript>
```

---



## HTML5 新特性

### 语义化标签

```html
<header>			<!-- 头部标签 -->
<nav>					<!-- 导航标签 -->
<artical>			<!-- 内容标签 -->
<section>			<!-- 块级标签，取代div标签 -->
<aside>				<!-- 侧边栏标签 -->
<footer>			<!-- 尾部标签 -->
```

**注意：**

- 这些新标签针对搜索引擎、可使用多次
- 在IE9是行内元素，所以需要转块。但移动端不需要考虑兼容问题

---



### 多媒体标签

**媒体资源source（单标签）**

```html
<!-- 为video、audio定义媒体资源。属性： -->
src						<!-- 媒体文件URL -->
type					<!-- 媒体资源的MIME类型 -->
```

使用：

```html
<source src="sound.ogg" type="audio/ogg">
```

---

**视频video**

```html
<video src="movie.mp4" controls="controls" muted="muted" loop="loop"></video>
```

属性：

```js
src						// 视频URL。支持的视频格式：MP4(常用)、WebM、Ogg
width	        // 宽度
height				// 高度
controls			// 显示视频控件
autoplay			// 自动播放(谷歌禁止自动播放，需要添加muted)
loop					// 循环播放
muted					// 静音播放
poster				// 加载等待时的画面图片
```

兼容写法：

```html
<video controls="controls" autoplay="autoplay" width="300" poster="image.jpg">
	<source src="movie.ogg" type="video/ogg">
  <source src="movie.mp4" type="video/mp4">
	您的浏览器不支持video元素
</video>
```

---

**音频audio**

 ```html
<audio src="sound.mp3" controls="controls"></audio>
 ```

属性：

```js
src						// 音频URL。支持的音频格式：MP3(常用)、Wav、Ogg
controls			// 显示音频控件
autoplay			// 自动播放(谷歌禁止自动播放)
loop					// 循环播放
muted					// 静音播放
```

兼容写法：

```html
<audio controls="controls">
  <source src="sound.ogg" type="audio/ogg">
  <source src="sound.mp3" type="audio/mpeg">
  您的浏览器不支持 audio 元素。
</audio>
```

---

**总结：**

- 谷歌浏览器禁止视频和音频的自动播放。视频可加muted自动播放，音频可通过js解决

---



### 表单元素

**新增input类型**

```html
<!-- type新属性值： -->
color					<!-- 颜色选择框 -->
date					<!-- 日期选择框 -->
time					<!-- 时间选择框 -->
email					<!-- 邮箱格式 -->
url						<!-- URL格式 -->
search				<!-- 搜索框，常用 -->
number				<!-- 数字格式，常用 -->
tel						<!-- 手机号码，常用 -->
```

---

**新增form元素属性**

```html
autocomplete	<!-- 显示输入框输入过的内容，输入框必须有name属性且成功提交。值：on(默认) | off -->
```

**新增input元素属性**

```html
required			<!-- 必填。值：required -->
autofocus			<!-- 自动获得焦点。值：autofocus -->
placeholder		<!-- 占位符 -->
multiple			<!-- 多选文件提交。值：multiple -->
```

---



## 其他

### HTML 注释

```html
<!-- 注释 -->
```

---



### HTML 路径

**相对路径：**以引用文件为参考的路径。==相对路径不能跨盘符。==

- 同级查找：./ 或省略
- 上级查找：../
- 下级查找：/

**绝对路径：**从盘符开始的路径

- 计算机形式：`C:\windows\1.jpg`，正反斜杠都行
- 网址形式：`http://black//2.jpg`

---



### HTML 特殊字符

```html
空格		&nbsp;
<			 &lt;
>			 &gt;
```

---

### SEO优化

SEO（Search Engine Optimization）是搜索引擎优化，是一种利用搜索引擎的规则提高网站在有关搜索引擎内自然排名的方式。

SEO的目的是对网站进行深度的优化，从而帮助网站获取免费的流量，进而在搜索引擎上提升网站的排名，提高网站的知名度。

==注意：注册页面等隐秘信息页面不需要做SEO优化。==

**有利于SEO优化的标签和属性：**

- title、description、keywords

  ```js
  title					// 网站标题
  description		// 网站说明
  keyword				// 网站关键词
  ```

  ```html
  <meta name="description" content="..." />
  <meta name="keywords" content="..." />
  <title>...</title>
  ```

- h1标签用于logo

  ```html
  <h1>
  	<a href="index.html" title="网站关键字">网站关键字</a>
  </h1>
  ```

  ```css
  a {
    display: block;
    width: --;
    height: --;
    background: url(logo.png) no-repeat;
    text-indent: -9999px;  		/* 或者font-size: 0; */
    overflow: hidden;
  }
  ```

  

  

---



### XML

**介绍：**

-  XML指可扩展标记语言，被设计用来传输和存储数据

-  XML标签没有被预定义。需要自定义标签
- XML只是纯文本，能够读懂XML的应用程序可以有针对性地处理XML标签
- XML是各种应用程序之间进行数据传输的常用工具

- XML是W3C的推荐标准

**XML和HTML：**

- XML 和 HTML 为不同的目的而设计
- XML是传输信息

- HTML是显示信息

---



### XHTML

- XHTML指可扩展超文本标记语言，是以XML格式编写的HTML

- XHTML是W3C的推荐标准

- ==XHTML是更严格更纯净的HTML版本==

  - 不允许属性简写

    ```html
    <input disable>							// 错误
    <input disabled="disabled">	// 正确
    ```

- HTML转为XHTML

  - 添加一个 XHTML <!DOCTYPE> 到网页中

  - 添加 xmlns 属性添加到每个页面的html元素中

    ```html
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
    "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    	<head>
      	<meta charset="utf-8">
      	<title>文档标题</title>
    	</head>
    	<body>
    		文档内容
    	</body>
    </html>
    ```

---

 