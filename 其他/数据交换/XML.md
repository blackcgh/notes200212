# XML

## 概述

- XML 指可扩展标记语言（EXtensible Markup Language），类似 HTML 的标记语言
- XML 的设计目的是传输数据，而不是显示数据（HTML）
- XML 标签没有被预定义。需要自行定义标签
- XML 被设计为具有自我描述性
- XML 是 W3C 的推荐标准

**XML 语言的主要目的是跨不同系统共享数据，如互联网。**

---



## 树结构

```xml
<!-- XML文档必须包含根元素,是所有其他元素的父元素。所有元素形成文档树,从根部开始，并扩展到树的最底端 -->
<root>
	<child>
		<subchild>数据</subchild>
	</child>
</root>
```

XML 将数据组织成为一棵树，DOM 通过解析 XML 文档，为 XML 文档在逻辑上建立一个树模型，树的节点都是对象。这样通过操作这棵树和节点对象就可以完成对 XML 文档的操作。

---



## 语法

- **XML声明**

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>		<!-- 定义 XML 的版本和使用的编码，不是标签 -->
  ```

- **XML 文档必须含有根元素**

- **所有的 XML 元素都必须有关闭标签**

  ```xml
  <p>content</p>
  <br />
  ```

- **区分大小写**

- **必须正确嵌套 XML 元素**

- **区分大小写**

- **必须正确嵌套 XML 元素**

- **属性值必须加引号空格会被保留（不常用）**

- **空格会被保留**

---



## 命名规则

- 名称可以包含字母、数字以及其他的字符
- 名称不能以数字或者标点符号开始
- 名称不能以字母 xml（或者 XML、Xml 等等）开始
- 名称不能包含空格
- 避免使用`- . :`字符

---



## XML 解析器

所有现代浏览器都有内建的 XML 解析器。它会把 XML 文档转换为 XML DOM 对象（ JavaScript 可操作的对象）

**Ajax 解析 XML 字符串**

```js
xhr.responseXML;		// #doxument
// XMLHttpRequest 对象的 responseXML 属性可以将服务器响应的 XML 字符转换为 XML DOM 对象，结合 JS 的 querySelector 等方法操作该对象，获取里面的数据
```

---



## 使用

- 获取 XML 文档
- 使用 XML DOM 迭代循环文档
- 把数据解析出来复制给变量

```xml
<?xml version="1.0" encoding="ISO-8859-1"?>
<note>
	<to>b</to>
	<from>l</from>
	<heading>a</heading>
	<body>ck!</body>
</note>
```









