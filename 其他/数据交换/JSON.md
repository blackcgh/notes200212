# JSON

## 概述

- JSON 是指 JavaScript Object Notation(JavaScript 对象表示法)。轻量级的文本数据交换格式，类似 XML
- JSON 独立于语言。虽然 JSON 使用 Javascript 语法来描述数据对象，但是 JSON 仍然独立于语言和平台。JSON 解析器和 JSON 库支持许多不同的编程语言。 很多动态编程语言（PHP，JSP，.NET）都支持JSON
- JSON 具有自我描述性，更易理解
- ==JSON 比 XML 更小、更快，更易解析==
- JSON 数据格式主要由对象 `{ }` 和数组`[ ]` 组成，**对象和数组可以相互嵌套**

---



## JSON 对象

在大括号 {} 内写数据。由若干个`key: value`组成：

- key必须是字符串

- value可以是字符串、数字、对象、数组、布尔值、null
- 数据之间以逗号分隔，最后一个数据不能跟逗号

**JSON 对象**

```json
{
  "name": "black",
  "age": 18,
  "site": null
}
```

**JSON 字符串**

```js
let json = '{"name": "black", "age": 18}';
```

---



## JSON 数组

在中括号 [] 中写数据，值可以是字符串、数字、对象、数组、布尔值、null

**JSON 数组**

```json
["black", 18]
```

**JSON 字符串**

```js
let json = '["black", 18]';
```

---



## JSON 对象方法

JS 中内置了 JSON 对象，JSON 通常用于与服务端交换数据（服务器响应的数据一般是字符串），所以可以使用 JSON.parse() 方法将数据转换为 JS 对象/数组。

### JSON.parse()

```js
JSON.parse(text[, fn])		// text是json字符串，转换而成的对象/数组的成员将会调用函数fn

JSON.parse('{"name": "black", "age": 18}');		// {name: 'black', age: 18}
JSON.stringify('["black", 18]');							// ["black", 18]	
```

---



### JSON.stringify()

可以使用 JSON.stringify() 方法将 JS 对象/数组转换为字符串，再发送给服务器。

```js
JSON.stringify(value[, replacer[, space]])		// value是对象或数组

JSON.stringify({name: 'black', age: 18});			// '{"name": "black", "age": 18}'
JSON.stringify(['black', 18]);								// '["black", 18]'
```

---



## JSON 使用

- 获取 JSON 字符串
- JSON.parse 解析 JSON 字符串

```json
[
  {
    "name": "black",
    "age": 18
  },
  {
    "name": "white",
    "age": 7
  }
]
```

---



## JSON与XML

**相同点：**

- 都是纯文本
- 都有"自我描述性"（人类可读）
- 都有层级结构（值中存在值）
- 都能通过 JavaScript 进行解析
- 都能使用 AJAX 进行传输

---

**不同点：**

- JSON 不需要结束标签
- JSON 更加简短
- JSON 读写速度更快
- JSON 可以使用数组
- XML 需要使用 XML 解析器来解析，JSON 使用 JS函数来解析







