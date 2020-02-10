# ECMAScript 6

## let和const

### let

- let 声明的变量，只在`let`命令所在的代码块内有效

- 在for循环中， 设置循环变量的部分是一个父作用域，而循环体内部是一个单独的子作用域

```js
for (let i = 0; i < 3; i++) {		// 小括号内是一个父作用域，大括号内是一个子作用域
  let i = 'abc';
  console.log(i);	// 输出abc
}
```

- ==不存在变量提升==
  -  `var`命令会发生“变量提升”现象，即变量可以在声明之前使用，值为`undefined` 
- 暂时性死区：
  - 只要区块中存在`let`和`const`，所声明的变量就绑定(binding)这个区域，该变量不再指向外部同名变量
  - 如果区块中存在`let`和`const`，那么在let或const之前都是该变量的死区，不可使用
- 不能重复声明

---



### 块级作用域

- 在块级作用域，声明函数要使用函数表达式

```js
{
  let f = function () {};
}

{
  function() {};	// 错误
}
```

-  js引擎执行到{},就会产生块级作用域；如果没有大括号，js引擎就认为不存在块级作用域

```js
// 报错，在单行的条件语句中，如果省略{}，就不允许使用let表达式
if (true) let x = 1;
if (true) function f() {}

// 不报错
if (true) {
  let x = 1;
}
if(true) {
  function() {}
}
```

---



### const

-  只声明不赋值，就会报错
-  `const`的作用域与`let`相同：只在声明所在的块级作用域内有效
-  `const`声明的常量也是不提升；暂时性死区，只能在声明的位置后面使用；不可重复声明

 ==let、const、class命令声明的全局变量，不属于顶层对象window的属性==

---

### globalThis

 `globalThis`作为顶层对象 :

-  在浏览器里面，指向顶层对象`window`
-  在Node 里面，指向顶层对象是`global`

---



## 解构赋值

==解构赋值的拷贝是浅拷贝，即如果一个键的值是复合类型的值（数组、对象、函数），那么拷贝的是值的引用，而不是值的副本==

---



### 字符串

```js
({} = 'abc');	// 字符串会被转换成一个类似数组的对象，也就是说，字符串 = 伪数组 = 对象
// 'abc' = {0: 'a', 1:'b', 2: 'c', length: 3}
let [x, y, z] = 'abc';	// x = 'a', y = 'b', z = 'c'
let {length : len} = 'abc';	// len = 3
```

### 数组

```js
/**
* 数组按‘位置匹配’解构
* 解构不成功则为undefined
* 如果等号的右边不是数组，将会报错
**/
// 基本
let [a, b, c] = [1, 2, 3] //  a=1, b=2, c=3

// 可嵌套
let [d, [e], f] = [1, [2], 3] // d=1, e=2, f=3

// 剩余运算符
let [g, ...h] = [1, 2, 3] // g=1, h=[2, 3]

// 可忽略
let [i,,j] = [1, 2, 3] // i=1, j=3

// 不完全解构
let [k,p] = [1, 2, 3] // k=1, p=2

// 默认值
// ES6使用严格相等运算符（===），判断一个位置是否有值。只有严格等于undefined，默认值才会生效
let [a = 2] = [undefined]; 	 // a = 2
let [x = 1] = [null];				 // x = null
let [a = 3, b = a] = [];     // a = 3, b = 3
let [a = 3, b = a] = [1];    // a = 1, b = 1
let [a = 3, b = a] = [1, 2]; // a = 1, b = 2
let [x = y, y = 1] = [];     // ReferenceError: y is not defined
```

---



### 对象

```js
/**
* 对象按‘属性名匹配’解构，可以重复匹配
* 其他和数组解构一样
**/
let {a = 10, b = 5} = {a: 3};  // a = 3; b = 5

// 如果变量名c与属性名a不一致，可以：
let { a: c } = { a: 'aaa', b: 'bbb' };
// c = "aaa"，是先找到同名属性a，然后再赋值给对应的变量c，a没有被赋值

const node = {
  loc: {
    start: {line: 1, column: 5}
  }
};
let { loc, loc: { start }, loc: { start: { line }} } = node;
// loc = { start: { line: 1, column: 5 } }
// start = { line: 1, column: 5 }
// line = 1
// 有三次解构赋值，分别是对loc、start、line三个属性的解构赋值
// 注意，最后一次对line属性的解构赋值之中，只有line是变量，loc和start都没有被赋值

/**
* 由于数组本质是特殊的对象，因此可以对数组进行对象属性的解构
* let arr = [1, 2, 3] = {0: 1, 1: 2, 2: 3, length: 3}
* arr.length，arr[0]都是对象的访问方式
**/
({} = []);	//要加圆括号，不然js引擎会将{}当做代码块
let arr = [1, 2, 3];
let {0 : first, [arr.length - 1] : last} = arr;		// first = 1;last = 3
```

---



## 字符串

### for/of

```js
for...of	// item
for...in
```

---



### 模板字符串

```js
// 使用反引号(`)标识，支持js变量、字符串、表达式、函数、嵌套、多行、标签等，可以进行运算、引用对象属性、    调用函数等
`${a}`, `${a + b}`, `${'hello'}`, `${function()}` 
```

---



### 新增方法

```js
// ES5
indexOf(str[, from]) // 返回str出现位置，否则返回-1
charAt(index)	// 返回指定位置的字符
concat([str1, str2, ...])	// 返回合并的字符串
replace(str, newstr)	// newstr替换str
split(str[, n])	// 以str分割字符串，保留n个子串，返回数组
toLowerCase()	// 把字符串转换为小写
toUpperCase()	// 把字符串转换为大写
substr(start[, length])	// 从索引start开始截取length数目的字符
trim()	// 去除两边空格

// ES6 新方法
includes(str[, from])	// 返回布尔值，表示是否找到了字符串
startsWith(str[, from])	// 返回布尔值，表示字符串是否在原字符串的头部
endsWith(str[, from])	// 返回布尔值，表示字符串是否在原字符串的尾部

repeat(n)	// 返回新字符串，表示将原字符串重复n次（n是正整数）
```

---



## 函数

### 参数默认值

-  ES6 允许为函数的参数设置默认值

```js
// 使用参数默认值时，函数不能有同名参数
function foo(x, x, y) {}	// 不报错

function foo(x, x, y = 1) {}	// 报错
```

- 参数的默认值可以是表达式， 每次调用函数都重新计算表达式的值 

-  参数默认值与解构赋值的默认值结合起来使用 

```js
function fetch(url, { body = '', method = 'GET', headers = {} } = {}) {
  console.log(method);
}
fetch('http://example.com')	// 输出"GET"
// fetch有两个参数：url、对象，url必传，对象有一个默认值，可以不传，同时对象里还有解构赋值，且有默认值
```

- 如果最后一个参数有默认值，可以不传该参数；如果非尾部参数有默认值，无法只省略该参数，而不省略它后面的参数

```js
function f(x, y = 5, z) {	// 非尾部参数
  return [x, y, z];
}
f() // [undefined, 5, undefined]
f(1) // [1, 5, undefined]
f(1, ,2) // 报错，无法只省略该参数
f(1, undefined, 2) // [1, 5, 2]
```

---

### 参数作用域

一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的

```js
let x = 1;
function foo(x = x) {}	// 圆括号内形成一个块级作用域，x = x相当于let x = x，由于暂时性死区，
foo()										// 该作用域内的x也不会指向外部的同名变量x

var x = 1;
function foo(x, y = function() { x = 2; }) {
  var x = 3;
  y();
  console.log(x);
}
foo()	// 3
console.log(x)	// 1
```

==类似for循环，也是圆括号内形成一个块级作用域，该作用域内由{}再形成一个块级作用域==

---



### length属性

 函数的`length`属性，将返回第一个具有默认值之前的参数个数，不包括rest参数

```js
function demo(a, b = 1, c) {}
console.log(demo.length);	// 1

function demo2(a, b, c = 1) {}
console.log(demo2.length);	// 2

// arguments是传入的‘实参’伪数组对象，length是‘形参’个数
```

---



### rest参数

ES6 引入 rest 参数（形式为`...变量名`），用于获取函数的多余参数，这样就不需要使用`arguments`对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中

arguments是一个伪数组对象，不能使用数组的方法，而rest参数是数组

```js
function add(...values) {	// values是一个数组
  let sum = 0;
  for (var val of values) { sum += val; }
  return sum;
}
add(2, 5, 3) // 10
```

---



### 箭头函数

由于大括号被解释为代码块，所以如果箭头函数直接返回一个对象，必须在对象外面加上括号，否则会报错

```js
let foo = () => ({ a: 1 });
console.log(foo())	// 输出{a: 1}
```

箭头函数的一个用处是简化回调函数

```js
[1,2,3].map(function (x) {	// 正常写法
  return x * x;
});
[1,2,3].map(x => x * x);	// 箭头函数写法
```

**注意：**

- 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。==普通函数中的 this 对象的指向是可变的，但是在箭头函数中，它是固定的。==

  - 不可以当作构造函数
  - 不能用`call()`、`apply()`、`bind()`去改变`this`的指向

- 不可以使用`arguments`对象，函数体内不存在该对象。如果要用，可以用 rest 参数代替

- 不可以使用`yield`命令，因此箭头函数不能用作 Generator 函数

- 箭头函数中有些变量是不存在的，指向外层函数的对应变量：`arguments`、`super`、`new.target`

---



## 数组

### 扩展运算符

扩展运算符（spread）是三个点（`...`），它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列

```js
// 扩展运算符不像rest参数必须在最后，扩展运算符的位置不受限制
function add(x, y, z, w) {
  return x + y;
}
const numbers = [4, 38];
add(1, ...numbers, 2) // 输出5

// 扩展运算符后面还可以放置表达式，返回数组就行
const arr = [
  ...(x > 0 ? ['a'] : []),
  'b',
];
```

应用：

- 复制数组

```js
const a1 = [1, 2];
const a2 = [...a1];	// 写法一
const [...a2] = a1;	// 写法二
```

- 合并数组

```js
[...arr1, ...arr2]	// 注意是浅拷贝，如果数组元素是对象，那么拷贝的只是引用
```

- 与解构赋值结合使用

```js
let list = [1, 2, 3]
[a, ...rest] = list	// a = 1, rest = [2, 3]
```

- 将字符串转为数组

```js
[...'hello']	// [ "h", "e", "l", "l", "o" ]
```

---



### Array.from()

用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括 ES6 新增的数据结构 Set 和 Map）

常见的伪数组对象有 DOM 操作返回的 NodeList 集合，以及函数内部的`arguments`对象

 伪数组对象的本质就是有length属性，所有任何有`length`属性的对象，都可以通过`Array.from`方法转为数组 

```js
let arrayLike = {
    '0': 'a',
    '1': 'b',
    length: 2
};
let arr2 = Array.from(arr); // arr2 = ['a', 'b']
```

---



### Array.of()

用于将一组值，转换为数组

```js
Array.of() // []
Array.of(3, 11, 8) // [3,11,8]
```

---



### 新增方法

```js
// ES5
indexOf()	// 返回指定元素的索引
valueOf()	// 返回指定索引的元素
push()	// 数组追加元素，数目不限
pop()		// 删除数组最后一个元素
unshift()	// 数组头部加入元素，数目不限
shift()	// 删除数组的第一个元素
join([symbol])	// 连接数组元素，默认以逗号隔开，返回字符串
concat([arr, value, ...])	// 可以是数组、值，数目不限
reverse()	// 将原数组的元素颠倒并返回，不会创建新数组
splice(start, length[, item1, ...])	// 从start索引开始，删除length数目的元素，再添加item...
sort([callback])	// 对数组元素进行排序，默认字母升序，返回排序后的原数组，要想数字排序，必须传入函数
{
  let arr = [1, 4, 3, 89, 2];
  let arr2 = arr.sort((a, b) => a - b)	// a - b表示数字升序
  let arr3 = arr.sort((a, b) => b - a)	// b - a表示数字降序
  console.log(arr === arr2, arr2 === arr3)	//true，true
}

/** ES6
* 都有参数：回调函数
* value：必需，数组元素
* index：可选，元素索引
* arr：可选，原数组
**/
includes(value)	// 判断数组是否包含给定的值，返回布尔值

// 查找数组
find()	// 找出第一个返回值为true的元素并返回。如果没有符合条件的元素，则返回undefined
findIndex()	// 与find方法类似，返回第一个符合条件的元素索引，如果所有元素都不符合条件，则返回-1

// 遍历数组
forEach()	// 遍历数组，不能中断遍历，没有返回值
map()	//映射数组，map将所有的返回值存在数组并返回
filter()	// 过滤数组，包含满足条件的数组项，返回一个新数组

reduce(callback[, init])
/**
* callback参数：
* 	total：必需，初始值（上一次回调返回的值），或者计算结束后的返回值
* 	value：必需，数组元素
* 	index：可选，元素索引
* 	arr：可选，远数组
* init：可选，传给total的初始值
* 注意：当提供了初始值init，则第一次执行回调函数时total就是init，则value是数组第一项
* 		 如果没有提供初始值init，则total是数组第一项，value是数组第二项
**/
```

---



## 对象

### 属性和方法的增强写法

ES6 允许在大括号里面，直接写入变量和函数，作为对象的属性和方法。常用于模块化导出和导入

==注意：对象的大括号{}不会形成单独的作用域，索引在对象里面的箭头函数的this指向外层作用域的this==

```js
let a = 1;
const obj = {
  a,
  method() {
    return "Hello!";
  }
};
// 等同于
const obj = {
  a: a,
  method: function() {
    return "Hello!";
  }
};
```

---



### 属性名表达式

js定义对象的属性，有两种方法

```js
obj.foo = true;	// 方法一
obj['a' + 'bc'] = 123;	// 方法二
```

使用字面量定义对象只能使用方法1

```js
var obj = {
  foo: true,
  abc: 123
};
```

ES6 允许字面量定义对象时，属性名和方法名可以用属性名表达式

```js
let prop = 'foo';
let attr = 'show'
let obj = {
  // 现在，对象属性和方法的定义方式有3种
  name: 'black',
  ['age']: 18,
  [prop]: true,	// 表达式的值就是属性名，foo: true
  call() {},
  ['be' + 'at']() {},
  [attr]() {}
};
// 访问方式
obj.foo
obj['foo']
obj[prop]
obj.show()
obj['show']()
obj[attr]()
```

---



###  新增方法

```js
Object.create(obj[,propobj])	// 创建对象并返回，obj就是创建的对象的原型,propobj是要添加的属性
Object.defineProperty(obj, prop, descriptor)	// 添加或更改对象属性

Object.is()	// 比较两个值是否严格相等，与（===）的差别是+0不等于-0，NaN等于自身
Object.keys(obj)	// 以数组的形式返回所有可遍历属性的键名，原型上的属性不能遍历
Object.values(obj)	// 以数组的形式返回所有可遍历属性的键值，原型上的属性不能遍历
Object.entries()	// 返回数组，成员是参数对象可遍历属性的键值对数组
Object.fromEntries()	// 是Object.entries()的逆操作，用于将一个键值对数组转为对象

__proto__	// 对象的原型，有些环境不支持该属性，而是使用Object.setPrototypeOf()（写操作）、		 						// Object.getPrototypeOf()（读操作）、Object.create()（生成操作）代替

Object.setPrototypeOf(obj, prototype) // 设置obj的原型并返回obj，obj不能是null/undefined
Object.getPrototypeOf(obj)	// 返回obj的原型
Object.assign(target[, source1, ...])
// 将所有可遍历属性从源对象浅拷贝到目标对象，返回目标对象，同名属性会被后面的覆盖
// 用途1:合并对象
const merge = (...sources) => Object.assign({}, ...sources);
// 用途2：克隆对象
function clone(origin) {
  let originProto = Object.getPrototypeOf(origin);
  return Object.assign(Object.create(originProto), origin);
}
// 用途3：添加属性和方法
class Point {
  constructor(x, y) { Object.assign(this, {x, y}); }
}
Object.assign(SomeClass.prototype, {
  someMethod(arg1, arg2) {}
});
```

---



### super 关键字

 `this`关键字总是指向函数所在的当前对象，ES6 又新增了另一个类似的关键字`super`，指向当前对象的原型对象 

 注意：`super`关键字表示原型对象时，只能用在对象的方法之中，用在其他地方（属性）都会报错 

```js
const proto = {foo: 'hello' };
const obj = {
  foo: 'world',
  foo2: () => super.foo,	// 报错
  find() { return super.foo; }
};
Object.setPrototypeOf(obj, proto);
obj.find() // "hello"
const obj = {
  foo
}
```

JavaScript引擎内部，`super.foo`等同于`Object.getPrototypeOf(this).foo`（属性）

```javascript
const proto = {
  x: 'hello',
  foo() { console.log(this.x); },
};
const obj = {
  x: 'world',
  foo() { super.foo(); }
}
Object.setPrototypeOf(obj, proto);
obj.foo() // "world"
// super.foo`指向原型对象`proto`的`foo方法，但是绑定的this却还是当前对象obj，因此输出的就是world
```

---



### 对象的扩展运算符

- 与解构赋值结合使用

1. ==不能复制继承自原型对象的属性，例如对象的create方法，就不能使用扩展运算符获取原型对象的属性==

2. 变量声明语句之中，如果使用解构赋值，扩展运算符后面必须是一个变量名，而不能是一个解构赋值表达式 

```js
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
// x = 1、y = 2、z = { a: 3, b: 4 }

let { x, ...{ y, z } } = o;	// 报错
```

- （...）用于取出参数对象的所有可遍历属性，浅拷贝到当前对象之中

```js
let z = { a: 3, b: 4 };
let n = { ...z };	// z = a: 3, b: 4、n = { a: 3, b: 4 }

// 数组也是对象
let foo = { ...['a', 'b', 'c'] };	// foo = {0: "a", 1: "b", 2: "c"}

// 如果扩展运算符后面不是对象(数字、null、undefined等)，则会自动将其转为空对象
{...1} // 等同于{...Object(1)} => {...{}} => {}

// 如果字符串，它会自动转成一个伪数组对象，因此返回的不是空对象
{...'hi'}	// {0: "h", 1: "i"}

// 如果想要完整克隆一个对象，还拷贝对象原型的属性，可以
const clone2 = Object.assign(
  Object.create(Object.getPrototypeOf(obj)),
  obj
);
```

- 合并对象

```js
 let ab = { ...a, ...b };
```

---



## Symbol

### 数据类型

- ES6 引入了一种新的原始数据类型`Symbol`，表示独一无二的值，==可以当做是一种类似于字符串的数据类型== 。它是 JavaScript 语言的第七种数据类型，前六种是：
  - `undefined`（未定义值）
  - `null`（空值）
  - `Boolean`（布尔值）
  - `String`（字符串）
  - `Number`（数字）
  - `Object`（对象）
- Symbol 值通过`Symbol`函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的 Symbol 类型

```js
let s = Symbol();
console.log(s)	// Symbol()
console.log(typeof s)	// symbol

// Symbol函数可以有一个参数字符串，表示对实例的描述，注意描述可以一样，但每一个Symbol实例都是唯一的
let s2 = Symbol('my symbol');
console.log(s2)	// Symbol(my symbolb)
```

-  Symbol 实例不能与其他类型的值进行运算，会报错 

```js
"your symbol is " + s;	// 报错

// Symbol 值可以显式转为字符串、布尔值，但不能转为Number
let sym = Symbol('My symbol');
let str = String(sym) // str = 'Symbol(My symbol)'
let boo = Boolean(sym) // boo = true
```

---



### Symbol.prototype.description

Symbol()是一个函数，也有自己的原型对象prototype，description原型上的属性

```js
// ES2019 提供了一个实例属性description，直接返回 Symbol 的描述
const sym = Symbol('foo');
console.log(sym.description) // "foo"
```

---



### Symbol.for()/Symbol.keyfor()

`Symbol.for()`方法接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建一个以该字符串为名称的 Symbol 值，并将其登记到全局

```javascript
// Symbol.for()与Symbol()都会生成新的 Symbol,区别是：前者会被登记在全局环境中供搜索，后者不会
// 当描述一样时，Symbol()返回的还是不同的实例，而Symbol.for()返回都是同一个实例
Symbol.for("bar") === Symbol.for("bar")	// true
Symbol("bar") === Symbol("bar")	// false
```

`Symbol.keyFor()`方法返回一个已登记的 Symbol 类型值的`key`

```javascript
let s1 = Symbol.for("foo");
Symbol.keyFor(s1) // "foo"
let s2 = Symbol("foo");
Symbol.keyFor(s2) // undefined，s2属于未登记的 Symbol 值，所以返回undefined
```

---



### 内置的Symbol值

- **Symbol.hasInstance**

对象的`Symbol.hasInstance`属性，指向一个内部方法。当使用`instanceof`运算符时，会调用这个方法

```javascript
class MyClass {
  [Symbol.hasInstance](foo) {
    return foo instanceof Array;	//返回值如果不是Boolean，会转为Boolean
  }
}

[1, 2, 3] instanceof new MyClass() // true
// instanceof的实质就是调用右边对象的[Symbol.hasInstance]方法，左边的变量是它的参数
```

- **Symbol.iterator**

对象的`Symbol.iterator`属性，指向该对象的默认遍历器方法

```javascript
const myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
  yield 3;
};
[...myIterable] // [1, 2, 3]，...默认使用对象的iterator
```

对象进行`for...of`循环时，会调用`Symbol.iterator`方法，返回该对象的默认遍历器



---



### 应用

#### 作为对象属性名

由于每一个 Symbol 值都是不相等的，这意味着 Symbol 值可以作为标识符，用于对象的属性名，就能保证不会出现同名的属性。这对于一个对象由多个模块构成的情况非常有用，能防止某一个键被不小心改写或覆盖。

```js
let mySymbol = Symbol();
let a = {};
a[mySymbol] = 'Hello!';	// 写法一

let a = {
  [mySymbol]: 'Hello!'	// 写法二
};

let a = {};
Object.defineProperty(a, mySymbol, { value: 'Hello!' });	// 写法三
a[mySymbol] // "Hello!"

// 注意：使用Sumbol值作为对象属性名时，不能用点运算符添加、访问该属性
a.mySymbol = 'Hello!';
a[mySymbol] // undefined
// 因为mySymbol只是Symbol实例的别名，对象a的属性名并不是mySymbol，而是该实例（唯一值）
```

而且Symbol 作为属性名，遍历对象的时候，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回，但是它也不是私有属性，有一个`Object.getOwnPropertySymbols()`方法，可以获取指定对象的所有 Symbol 属性名。该方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。可以把一些不需要对外操作和访问的属性使用Symbol来定义

```javascript
const obj = {};
let a = Symbol('a');
let b = Symbol('b');
obj[a] = 'Hello';
obj[b] = 'World';
obj.c = 'js';
const objectSymbols = Object.getOwnPropertySymbols(obj);
console.log(objectSymbols)	// [Symbol(a), Symbol(b)] 

// Reflect.ownKeys(obj)方法可以返回所有类型的键名，包括常规键名和 Symbol 键名
Reflect.ownKeys(obj)	// [Symbol(a), Symbol(b), c] 
```



---



#### 替代常量

Symbol 类型可以用于定义常量，保证这些常量的值都是不相等的

```javascript
const COLOR_RED = Symbol();
const COLOR_GREEN  = Symbol();
function getComplement(color) {
  switch (color) {
    case COLOR_RED:
      return COLOR_GREEN;
    case COLOR_GREEN:
      return COLOR_RED;
    default:
      throw new Error('Undefined color');
    }
}
```

---



## Set

### 概述

ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值

`Set`本身是一个构造函数，用来生成 Set 数据结构

```javascript
const set = new Set();
[2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));
for (let i of s) {
  console.log(i);	// 2 3 5 4
}
```

`Set`函数可以接受数组、伪数组、字符串（具有 iterable 接口的其他数据结构）作为参数，用来初始化

```javascript
const set = new Set([1, 2, 3, 4, 5, 5, 5]);
set.size // 5

new Set(document.querySelectorAll('div'));

// 去除重复成员
[...new Set([1, 2, 2])]	// [1, 2]
[...new Set('ababbc')].join('')	// "abc"
```

向 Set 加入值的时候，不会发生类型转换，所以`5`和`"5"`是两个不同的值

Set 内部判断两个值是否不同，使用的算法叫做“Same-value-zero equality”，它类似于（`===`），主要的区别是向 Set 加入值时认为`NaN`等于自身，而精确相等运算符认为`NaN`不等于自身

```javascript
let a = NaN;
let b = NaN;
set.add(a);
set.add(b);
console.log(set) // Set {NaN}
```

而且两个对象总是不相等的，哪怕是空对象

```javascript
set.add({});
set.size // 1
set.add({});
set.size // 2
```

---



### 属性

原型对象上的方法，Set实例直接使用constructor、size

- `Set.prototype.constructor`：构造函数，默认就是`Set`函数
- `Set.prototype.size`：返回`Set`实例的成员总数

---



### 方法

Set 实例的方法分为两大类：

操作方法（用于操作数据）

- `Set.prototype.add(value)`：添加值，返回 Set 实例
- `Set.prototype.delete(value)`：删除值，返回一个布尔值，表示删除是否成功
- `Set.prototype.has(value)`：返回一个布尔值，表示该值是否为`Set`的成员
- `Set.prototype.clear()`：清除所有成员，没有返回值

```js
let set = new Set();
set.add('a').add(18);	// 链式调用
console.log(set);	// Set(2) {"a", 18}
console.log(set.delete(18));	// true
console.log(set);	// Set(1) {"a"}
console.log(set.has(18));
set.clear();	// false
console.log(set);	// Set(0) {}

// 数组和Set相互转化
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
// 去除数组重复成员
function dedupe(array) {
  return Array.from(new Set(array));
}
```

遍历方法（用于遍历成员） 

- `Set.prototype.keys()`：返回键名的遍历器
- `Set.prototype.values()`：返回键值的遍历器
- `Set.prototype.entries()`：返回键值对的遍历器
- `Set.prototype.forEach()`：使用回调函数遍历每个成员

`Set`的遍历顺序就是插入顺序，这个特性有时非常有用，比如使用 Set 保存一个回调函数列表，调用时就能保证按照添加顺序调用

`keys()`、`values()`、`entries()`返回的都是Iterator 对象， Set 结构可以说键名和键值是同一个值，所以`keys()`和`values()`的行为完全一致

```javascript
let set = new Set(['red', 'green', 'blue']);
for (let item of set.keys()) {
  console.log(item);	// red green blue
}
for (let item of set.values()) {
  console.log(item);	// red green blue
}
for (let item of set.entries()) {
  console.log(item);	// ["red", "red"] ["green", "green"] ["blue", "blue"]
}
// 可以省略values方法，默认会使用values方法
for (let x of set) {
  console.log(x);	// red green blue
}
// Set和数组一样，也有forEach方法
set.forEach(item => console.log(item))
```

使用 Set 可以很容易地实现并集（Union）、交集（Intersect）和差集（Difference）

```javascript
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
let union = new Set([...a, ...b]);	// 并集		Set {1, 2, 3, 4}
let intersect = new Set([...a].filter(x => b.has(x)));	// 交集		set {2, 3}
let difference = new Set([...a].filter(x => !b.has(x)));	// 差集		Set {1}
```

---



### WeakSet

WeakSet 结构也是不重复的值的集合。但是它与 Set 有两个区别。

- 首先，WeakSet 的成员只能是对象，而不能是其他类型的值
-  WeakSet 中的对象都是弱引用，垃圾回收机制不考虑 WeakSet 对对象的引用,  ES6 规定 WeakSet 不可遍历 

方法：

- **WeakSet.prototype.add(value)**：向 WeakSet 实例添加一个新成员。
- **WeakSet.prototype.delete(value)**：清除 WeakSet 实例的指定成员。
- **WeakSet.prototype.has(value)**：返回一个布尔值，表示某个值是否在 WeakSet 实例之中

---



## Map

### 概述

JavaScript 的对象（Object），本质上是键值对的集合（Hash 结构），==只能使用字符串当作键==。

ES6 提供了 Map 数据结构。它也是键值对的集合，但是各种类型的值（包括对象）都可以当作键。

Object 结构提供了“字符串--值”的对应，Map 结构提供了“值--值”的对应，是一种更完善的 Hash 结构实现。如果需要“键值对”的数据结构，Map 比 Object 更合适

```javascript
const m = new Map();
const o = {p: 'Hello World'};
m.set(o, 'content')	// 使用对象当做键
console.log(m)	// Map(1) {{…} => "content"}
m.get(o) // "content"
m.has(o) // true
m.delete(o) // true
m.has(o) // false
```

Map 也可以接受一个数组(具有 Iterator 接口、且每个成员都是一个双元素的数组的数据结构)作为参数。该数组的成员必须是一个个表示键值对的数组，不能传对象

```javascript
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);
map.size // 2
map.get('name') // "张三"
// 实际上执行的是
[
  ['name', '张三'],
  ['title', 'Author']
].forEach(
  ([key, value]) => map.set(key, value)
);

// Set和Map都可以用来生成新的 Map
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1
const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3
```

只有对同一个对象的引用，Map 结构才将其视为同一个键

```javascript
map.set(['a'], 555);
map.get(['a']) // undefined，实际是又创建了一个数组['a']，两个数组的内存地址是不一样的
```

由上可知，Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名

如果 Map 的键是一个简单类型的值（数字、字符串、布尔值），则只要两个值严格相等，Map 将其视为一个键，比如`0`和`-0`就是一个键，布尔值`true`和字符串`true`则是两个不同的键。另外，`undefined`和`null`也是两个不同的键。==Map将NaN视为同一个键==

---



### 属性

- size 属性： 返回 Map 实例的成员总数

---



### 方法

操作方法：

- Map.prototype.set(key, value)： 设置键名`key`对应的键值为`value`，然后返回该Map实例。如果`key`已经存在，则键值会被更新，否则就新生成该键

```javascript
map.set(undefined, 'nah')	// 键是 undefined
```

- Map.prototype.get(key)： 读取`key`对应的键值，如果找不到`key`，返回`undefined`

- Map.prototype.has(key)： 返回一个布尔值，表示该键是否在 Map 对象之中

- Map.prototype.delete(key)： 删除某个键，成功返回`true`，失败返回`false`

- Map.prototype.clear()：清除所有成员，没有返回值

遍历方法：

- `Map.prototype.keys()`：返回键名的遍历器
- `Map.prototype.values()`：返回键值的遍历器
- `Map.prototype.entries()`：返回所有成员的遍历器
- `Map.prototype.forEach()`：遍历 Map 的所有成员

==Map的遍历顺序就是插入顺序==

```javascript
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);
for (let key of map.keys()) {
  console.log(key);	// "F"	"T"
}
for (let value of map.values()) {
  console.log(value);	// "no"	"yes"
}
for (let [key, value] of map.entries()) {
  console.log(item[0], item[1]);	// "F" "no"		"T" "yes"
}
// 可以省略entries()，默认会使用该方法
for (let [key, value] of map) {
  console.log(key, value);	// "F" "no"		"T" "yes"
}
```

Map结构转为数组结构，可以使用数组的方法，再转回Map结构

```javascript
const map = new Map([[1, 'one'], [2, 'two'], [3, 'three']]);
[...map.keys()]	// [1, 2, 3]
[...map.values()]	// ['one', 'two', 'three']
[...map.entries()]	// [[1,'one'], [2, 'two'], [3, 'three']]
[...map]	// [[1,'one'], [2, 'two'], [3, 'three']]
const map1 = new Map(
  [...map].filter(([k, v]) => k < 3)
);
```

---



### WeakMap

`WeakMap`也是用于生成键值对的集合

`WeakMap`与`Map`的区别有两点：

- `WeakMap`与`Map`的区别有两点
- `WeakMap`的键名所指向的对象，不计入垃圾回收机制

WeakMap 与 Map 在 API 上的区别主要是两个：

- 没有遍历操作（即没有`keys()`、`values()`和`entries()`方法），也没有`size`属性
- 不支持`clear`方法

因此，`WeakMap`只有四个方法可用：`get()`、`set()`、`has()`、`delete()`

---



### 数据结构转换

```js
let arr = [
  [true, 7],
  [{foo: 3}, ['abc']]
]
// 数组转为Map
let map = new Map(arr);
// Map转为数组
let arr2 = [...map];
// Map转为对象：非字符串的键名会被转成字符串，再作为对象的键名
let obj = Object.create(null);
for (let [k,v] of map) {
  obj[k] = v;
}
// 对象转为Map
let map2 = new Map();
for(let k of Object.keys(obj)) {
  map2.set(k, obj[k]);
}
// Map转为JSON对象：Map先转为对象，再使用JSON.stringify()
let json = JSON.stringify(obj)
// JSON对象转为Map：先解析为对象，再转为Map
let map3 = 
```

---



## Proxy代理

### 概述

Proxy 可以理解成在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写

ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例

```javascript
let proxy = new Proxy(target, handler);
// new Proxy()返回一个新创建的代理对象--Proxy实例，有两个参数
// target：表示所要拦截的目标对象
// handler：用来定制拦截行为的对象
let proxy = new Proxy({}, {
  get(target, property) {	// 重写对象属性的get方法
    return 35;
  }
});
proxy.time // 35
proxy.name // 35
proxy.title // 35

// 注意
// 如果handler是个空对象，那么会使用默认的方法，这时目标对象的属性方法也是代理对象的属性方法
```

---



### 方法

- get(target, prop[, receiver])：拦截对象属性的读取；`proxy.foo`：target是第一个参数对象，foo是prop，receive是代理对象proxy

```javascript
let proxy = new Proxy({name: "张三"}, {
  get(target, property) {
    if (property in target) {return target[property];}
    else {throw new ReferenceError(property + " does not exist");}
  }
});
proxy.name // "张三"
proxy.age // 抛出一个错误
```

- set(target, prop, value[, receiver])：拦截对象属性的设置，返回一个布尔值；`proxy.foo = v`：foo是prop，v是value，proxy是receive

- apply(target, context, args)：拦截 Proxy 实例作为函数调用的操作 、`call`和`apply`操作 ，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`

...

---



## Reflect反射

### 概述

`Reflect`对象与`Proxy`对象一样，也是 ES6 为了操作对象而提供的新 API。`Reflect`对象的设计目的有这样几个

- 将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`），放到`Reflect`对象上。现阶段，某些方法同时在`Object`和`Reflect`对象上部署，未来的新方法将只部署在`Reflect`对象上。也就是说，从`Reflect`对象上可以拿到语言内部的方法

-  修改某些`Object`方法的返回结果，让其变得更合理。比如，`Object.defineProperty(obj, name, desc)`在无法定义属性时，会抛出一个错误，而`Reflect.defineProperty(obj, name, desc)`则会返回`false`

```javascript
try {	// 老写法
  Object.defineProperty(target, property, attributes);
} catch (e) {...}

if (Reflect.defineProperty(target, property, attributes)) {	// 新写法
  ...
} else {...}
```

- 让`Object`操作都变成函数行为。某些`Object`操作是命令式，比如`name in obj`和`delete obj[name]`，而`Reflect.has(obj, name)`和`Reflect.deleteProperty(obj, name)`把它们包装成了函数

```javascript
'assign' in Object // 老写法
Reflect.has(Object, 'assign') // 新写法
```

- 只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为

有了`Reflect`对象以后，很多操作会更易读

```javascript
// 老写法
Function.prototype.apply.call(Math.floor, undefined, [1.75]) // 1
// 新写法
Reflect.apply(Math.floor, undefined, [1.75]) // 1
```

---



### 静态方法

`Reflect`对象的静态方法与`Proxy`对象的方法是一一对应的

- Reflect.get(target, name[, receiver])：查找并返回`target`对象的`name`属性，没有该属性则返回`undefined`

```javascript
// 如果name属性部署了读取函数（getter），则读取函数的this绑定receiver
let myObject = {
  foo: 1,
  bar: 2,
  get baz() {return this.foo + this.bar;}
};
let myReceiverObject = {foo: 4,bar: 4};
Reflect.get(myObject, 'baz', myReceiverObject) // 8
```

- Reflect.set(target, name, value[, receiver])：设置`target`对象的`name`属性等于`value`，设置成功返回true

```javascript
// 如果name属性设置了赋值函数（setter），则赋值函数的`his绑定receiver
let myObject = {
  foo: 4,
  set bar(value) {return this.foo = value;}
};
let myReceiverObject = {foo: 0};
Reflect.set(myObject, 'bar', 1, myReceiverObject);
myObject.foo // 4
myReceiverObject.foo // 1

// Proxy对象和 Reflect对象联合使用，前者拦截赋值操作，后者完成赋值的默认行为
// 而且如果传入了receiver，那么Reflect.set会触发Proxy.defineProperty拦截
```

- Reflect.has(target, name)：返回布尔值，target对象是否存在name属性，对应`‘name’ in obj`的`in`运算符

- Reflect.deleteProperty(target, name)：等同于`delete target[name]`，用于删除对象的属性，返回布尔值

- Reflect.construct(target, args)：等同于`new target(...args)`，args是数组，不用`new`就能调用构造函数

```javascript
function Greeting(name) {
  this.name = name;
}
const instance = new Greeting('张三');	// new 的写法
const instance = Reflect.construct(Greeting, ['张三']);	// Reflect.construct 的写法
```

- Reflect.getPrototypeOf(obj)：obj不是对象会报错，对应`Object.getPrototypeOf(obj)`

```javascript
const myObj = new FancyThing();
Object.getPrototypeOf(myObj) === FancyThing.prototype;	// 旧写法
Reflect.getPrototypeOf(myObj) === FancyThing.prototype;	// 新写法
```

- Reflect.setPrototypeOf(obj, prototype)：返回一个布尔值，表示是否设置成功，obj不是对象会报错

- Reflect.defineProperty(target, prop, desc)： 以后使用`Object.defineProperty`定义对象属性 

```javascript
function MyDate() {...}
Object.defineProperty(MyDate, 'now', {		// 旧写法，不再使用
  value: () => Date.now()
});
Reflect.defineProperty(MyDate, 'now', {		// 新写法，target必须是对象
  value: () => Date.now()
});
```

---



### 观察者模式简单实现

```js
// 每次修改对象属性值都会输出属性名--属性值
const queuedObservers = new Set();
const observe = fn => queuedObservers.add(fn); //fn是观察者函数
const observable = obj => new Proxy(obj, {set});
function set(target, key, value, receiver) {
   Reflect.set(target, key, value, receiver);
   queuedObservers.forEach(observer => observer());
}
const person = observable({	// 创建代理对象
   name: '张三',
   age: 20
});
function print() {	//观察者函数
   console.log(`${person.name}, ${person.age}`)
}
observe(print);
person.name = '李四';		// 李四，20
// 先定义了一个Set集合，所有观察者函数都放进这个集合。然后，observable函数返回原始对象的代理，拦截赋值  // 操作。拦截函数set之中，会自动执行所有观察者
```

---



## Promise对象

### 概述

Promise 是异步编程的一种解决方案，比传统的解决方案---回调函数和事件，更合理和更强大

js原生提供了`Promise`对象，特点：

- 对象的状态不受外界影响。对象代表一个异步操作，有三种状态：
  - `pending`（进行中）
  - `fulfilled`（已成功）
  - `rejected`（已失败）

- 一旦状态改变，就不会再变 ，任何时候都可以得到这个结果。状态的改变只有两种可能：
  - 从`pending`变为`fulfilled`
  - 从`pending`变为`rejected`

`Promise`对象可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，`Promise`对象提供统一的接口，使得控制异步操作更加容易

`Promise`也有一些缺点：

- 无法取消`Promise`，一旦新建它就会立即执行，无法中途取消
- 如果不设置回调函数，`Promise`内部抛出的错误，不会反应到外部
- 当处于`pending`状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）

如果某些事件不断地反复发生，一般来说，使用 [Stream](https://nodejs.org/api/stream.html) 模式是比部署`Promise`更好的选择

---



### 用法

```js
Promise([resolve, reject])	// 两个参数都是可选
```

`Promise`对象是一个构造函数，用来生成`Promise`实例

```javascript
const promise = new Promise(function(resolve, reject) {
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
promise.then(value => {...},	// resolve函数
  error => {...}	//reject函数，可选
);
// 构造函数接受一个函数作为参数,该函数在实例创建时就会执行，函数有两个参数：
// resolve函数：将Promise对象从pending变为resolved，在异步操作成功时调用，并将异步操作的结果，							     作为参数传递出去，resolve就是then的第一个参数
// reject函数：将Promise对象从pending变为rejected，在异步操作失败时调用，并将异步操作报出的错误，               作为参数传递出去，reject就是then的第二个参数
// Promise实例的then方法有两个参数，都是函数																											第一个函数：实例执行resolve后，会将回调函数放在任务队列																				第二个函数：可选，实例执行reject后，会将该函数放在任务队列
```

resolve和reject可以改变Promise实例的状态，还可以传递参数，参数可以是任何值，当参数是

- Promise实例时，原Promise实例的状态无效，由该参数实例的状态决定是执行then还是catch
- 其他值时，原Promise实例的状态决定执行谁，该值就是传递值

then和catch的参数是一个回调函数，该函数可以有参数和返回值，当返回值是

- Promise实例时，那么实例中必须有resolve或reject，才能触发后续的then或catch
- 其他值时，那么该值作为后续的then或catch的参数callback的参数
- 没有返回值时，就返回undefined

then和catch都会返回一个新的Promise实例，所以可以链式调用Promise实例来执行异步操作



**Promise的执行机制：**

new promise(callback)一旦创建，其内部的匿名函数会自动执行，当遇到异步操作，都会放入到任务队列；等执行到resolve或reject时，就将then或catch内部的匿名函数放入任务队列；创建完promise对象后继续执行后面的代码，直到主线程的任务执行完毕，再去任务队列查找异步任务

当执行异步任务时，不管中途是否遇到resolve或者reject，都会执行完异步任务里面的全部代码，遇到resolve或reject（只会生效一次）时，就会执行相应的then或catch（没有then或catch就报错）；如果没有遇到，那么then和catch不会执行

---



### Promise.prototype.then(callback)

`then`方法是定义在原型对象`Promise.prototype`上的，它的作用是为 Promise 实例添加状态改变时的回调函数

`then`方法的第一个参数是`resolved`状态的回调函数，第二个参数（可选）是`rejected`状态的回调函数

`then`方法返回的是一个新的`Promise`实例（不是原来那个`Promise`实例）。因此可以采用链式写法，即`then`方法后面再调用另一个`then`方法

```javascript
getJSON("/post/1.json").then(
  post => getJSON(post.commentURL)
).then(
  comments => console.log("resolved: ", comments),
  err => console.log("rejected: ", err)
);
```

---



### Promise.prototype.catch(callback)

该方法用于指定发生错误时的回调函数

`then`方法指定的回调函数，如果运行中抛出错误，也会被`catch`方法捕获，所以then和catch一起使用

==reject方法的作用，等同于抛出错误==

```javascript
// 如果Promise状态已经变成resolved，再抛出错误是无效的，因为Promise的状态一旦改变，就永久保持该状态
const promise = new Promise(function(resolve, reject) {
  resolve('ok');
  throw new Error('test');	// 抛出的错误不会被捕获
});
promise
  .then(function(value) { console.log(value) })		// 输出ok
  .catch(function(error) { console.log(error) });
```

==then/catch只能接受前面的then/catch==，如果代码因为没有报错，跳过了`catch`方法，直接执行后面的`then`方法。此时，要是`then`方法里面报错，就与前面的`catch`无关

---



### Promise.prototype.finally(callback)

不管 Promise 对象最后状态如何，都会执行的方法，实质也是then方法包含两个参数

---



### Promise.all([p1, p2, ...])

用于将多个 Promise 实例，返回成一个新的Promise实例

参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例

这个新的Promise实例状态由数字中所有的Promise实例决定，分成两种情况：

- 只有所有的Promise实例状态都是成功，新实例的状态才会是成功，此时所有的Promise实例的返回值组成一个数组，传递给新实例的回调函数。

- 只要有一个是失败，新实例的状态就变成失败，此时第一个被`reject`的实例的返回值，会传递给新实例的回调函数

```js
let p1 = new Promise((res, rej) => re(1));
let p2 = new Promise((res, rej) => res(2));
Promise.all([p1, p2])
.then(([re1, re2]) => console.log(re1, re2))
.catch(err => console.log(err))
```

注意，如果作为参数的 Promise 实例，自己定义了then/catch方法，那么它一旦被resolve/rejected，并不会触发Promise.all()的then/catch方法，但是只要resolve/reject的时候有返回值，all方法的then就会接收这些返回值

```javascript
const p1 = new Promise((resolve, reject) => {
  resolve('hello');
})
.then(result => result)	// 虽然有then，但是返回result
.catch(e => e);	// 也有返回值

const p2 = new Promise((resolve, reject) => {
  throw new Error('报错了');
})
.then(result => result)
.catch(e => e);

Promise.all([p1, p2])
.then(result => console.log(result))	// ["hello", Error: 报错了]
.catch(e => console.log(e));
```

上面代码中，`p1`会`resolved`，`p2`首先会`rejected`，但是`p2`有自己的`catch`方法，该方法返回的是一个新的 Promise 实例，`p2`指向的实际上是这个实例。该实例执行完`catch`方法后，也会变成`resolved`，导致`Promise.all()`方法参数里面的两个实例都会`resolved`，因此会调用`then`方法指定的回调函数，而不会调用`catch`方法指定的回调函数

---



### Promise.resolve()

```javascript
// 返回一个Promise实例
Promise.resolve('foo')	// 等价于
new Promise(resolve => resolve('foo'))
```

`Promise.resolve`方法的参数分成四种情况：

-  `Promise`实例，`Promise.resolve`方法返回该实例

-  `thenable`对象：具有`then`方法的对象。`Promise.resolve`方法会将这个对象转为 Promise 对象，然后就立即执行`thenable`对象的`then`方法

- 原始值或不具有`then`方法的对象。直接作为后续方法的参数

- 没有参数。直接返回一个`resolved`状态的 Promise 对象

执行顺序：

​	Promise 新建后立即执行，then 方法指定的回调函数，将在当前脚本所有同步任务执行完才会执行。最后下一	轮“事件循环”开始时执行setTimeout

---



### Promise.reject()

```js
// 返回一个新的 Promise 实例，该实例的状态为rejected
const p = Promise.reject('出错了');	
const p = new Promise((resolve, reject) => reject('出错了'))
```

注意，该方法的参数，就是后续方法的参数。这一点与`Promise.resolve`方法不一致

```javascript
const thenable = {
  then(resolve, reject) {
    reject('出错了');
  }
};
Promise.reject(thenable)
.catch(e => {
  console.log(e === thenable)	// true
})
// catch方法的参数不是reject抛出的“出错了”，而是thenable对象
```

----



## Iterator遍历器

### 概述

- 遍历器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）

- 凡是部署了`Symbol.iterator`属性的数据结构，就称为部署了遍历器接口。调用这个接口，就会返回一个遍历器对象

- 有些数据结构原生具备Iterator接口（部署`Symbol.iterator`属性）：
  - 数组
  - 某些类似数组的对象（字符串）
  - 函数的 arguments 对象 
  - Set和Map

- ==Iterator接口主要供for...of使用==

- 普通对象部署数组的`Symbol.iterator`是无效的；因为该`Symbol.iterator`是针对键名是数字的情况
- 对象的Symbol.iterator属性可以自定义，也可以指向特定的数据结构（例如数组）

---



### Symbol.iterator

对象的`Symbol.iterator`属性就是默认的遍历器生成函数。执行这个函数，就会返回一个遍历器对象。属性名`Symbol.iterator`是一个表达式，返回`Symbol`对象的`iterator`属性，这是一个预定义好的、类型为 Symbol 的特殊值，所以要放在方括号内

```javascript
const obj = {
  [Symbol.iterator] : function () {	// 模拟iterator函数
    return {
      next: function () {
        return {value: 1, done: true};
      }
    };
  }
};
// 对象obj是可遍历的（iterable），因为具有Symbol.iterator属性。执行这个属性，会返回一个遍历器对象。	 该对象的根本特征就是具有next方法。每次调用next方法，都会返回一个代表当前成员的信息对象，具有value和	  done两个属性，value是当前成员的值，done是一个布尔值，表示遍历是否结束。
// 注意：Symbol.iterator属性必须是函数，而且要返回对象，对象里面有next方法，方法内要返回对象
```

Symbol.iterator函数执行后，返回的遍历器对象本身也具有`Symbol.iterator`属性，执行后返回自身

```js
let a = Array.prototype[Symbol.iterator]();
console.log(a[Symbol.iterator]() === a);
```



---



### 默认调用

有一些场合会默认调用 Iterator 接口（即该对象的`Symbol.iterator`属性）

- 解构赋值

```javascript
let set = new Set().add('a').add('b').add('c');
let [x,y] = set;	// x='a'; y='b'
let [first, ...rest] = set;	// first='a'; rest=['b','c'];
```

- 扩展运算符

```javascript
var str = 'hello';
console.log([...str]) //  ['h','e','l','l','o']
// 或
let arr = ['b', 'c'];
console.log(['a', ...arr, 'd'])	// ['a', 'b', 'c', 'd']
```

- yield*

`yield*`后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口



- 其他场合

由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口

- for...of
- Array.from()
- Map(), Set(), WeakMap(), WeakSet()（比如`new Map([['a',1],['b',2]])`）
- Promise.all()

---



### 字符串

字符串也原生具有 Iterator 接口

```javascript
let str = "hi";	// iterator在字符串的原型链上
console.log(typeof str[Symbol.iterator]);	// "function"
let iterator = str[Symbol.iterator]();	// 返回一个遍历器对象
iterator.next()  // { value: "h", done: false }
iterator.next()  // { value: "i", done: false }
iterator.next()  // { value: undefined, done: true }
```

可以覆盖原生的`Symbol.iterator`方法，达到修改遍历器行为的目的

```javascript
var str = new String("hi");
console.log([...str]) // ["h", "i"]
str[Symbol.iterator] = function() {
  return {
    _first: true,
    next: function() {
      if (this._first) {
        this._first = false;
        return { value: "bye", done: false };
      } else {
        return { done: true };
      }
    },
  };
};
console.log([...str]) // ["bye"]
console.log(str)
```

---



### return()/throw()

遍历器对象除了具有`next`方法，还可以具有`return`、`throw`方法。如果手动写遍历器对象生成函数，那么`next`方法是必须部署的，`return`方法和`throw`方法是可选的



---



### for...of 循环

`for...of`循环是遍历所有数据结构的统一的方法。

一个数据结构只要部署了`Symbol.iterator`属性，就被视为具有 iterator 接口，就可以用`for...of`循环遍历它的成员。也就是说，`for...of`循环内部调用的是数据结构的`Symbol.iterator`方法。

使用范围：

- 数组
- 字符串
- Set 和 Map 结构
- 某些类似数组的对象（`arguments`对象、DOM NodeList 对象）
- Generator对象

注意：

- 数组的for...of只返回数字索引的属性，如果有非数字索引的值，for...of会忽略它。这跟`for...in`循环不同

- Set和Map遍历顺序就是添加顺序。而且Set 遍历返回的是一个值， Map 返回的是一个数组，有两个元素

- 数组、Set、Map 都部署了keys、values、entries三个方法，调用后都返回遍历器对象

- 并不是所有伪数组对象都具有 Iterator 接口，但可以使用`Array.from`方法将其转为数组

```javascript
let arrayLike = { length: 2, 0: 'a', 1: 'b' };
for (let x of arrayLike) {console.log(x);}	// 报错
for (let x of Array.from(arrayLike)) {console.log(x);}	//成功
```

- 普通对象不能使用`for...of`，必须部署 Iterator 接口后才能使用。但`for...in`循环依然可以用来遍历键名

---



### 遍历语法的比较

- 原生for循环，写法麻烦
- forEach，无法中途跳出`forEach`循环，`break`、`return`命令都不能奏效
- for...in，主要是为遍历对象而设计的，不适用于遍历数组
- for...of，可以与`break`、`continue`和`return`配合使用

---



## Generator函数

### 概述

Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。可以理解是一个状态机，封装了多个内部状态。

Generator 函数特征：

- `function`关键字与函数名之间有一个星号
- 函数内部使用`yield`表达式，定义不同的内部状态
- 函数的执行不是加括号，而是使用遍历器对象的next方法

```js
function* demo() {	// 普通函数加了 * 就变成了Generator函数
  yield 1;
  yield 2 + 3;
  return 4;
}
let a = demo();	// 不会执行demo函数，而是返回一个指向demo函数内部状态的指针对象（遍历器对象）
let b = a.next();	// 指针对象移向下一个状态并返回一个对象{value,done}
console.log(b);	// {value: 1, done: false}，value是yield后面的值，done代表遍历是否结束
console.log(a.next());	// {value: 5, done: false}
console.log(a.next());	// {value: 4, done: true}
console.log(a.next());	// {value: undefined, done: true}，之后都是这样
```

执行 Generator 函数会返回一个遍历器对象，也就是说，==Generator 函数除了状态机，还是一个遍历器对象生成函数==。返回的遍历器对象，可以通过next()依次遍历 Generator 函数内部的每一个状态。

每次调用`next`方法，内部指针就从函数头部或上一次停下来的地方开始执行，直到遇到下一个`yield`表达式（或`return`语句或函数结束）为止，并返回一个对象。换言之，Generator 函数是分段执行的，`yield`表达式是暂停执行的标记，而`next`方法可以恢复执行。

---



### yield表达式

由于 Generator 函数返回的是遍历器对象，只有调用`next`方法才会遍历下一个内部状态，所以Generator函数其实是一种可以暂停执行的函数。

==yield表达式就是暂停标志==，==遍历器对象的next方法就是继续执行==

每次调用next()都会返回一个含有value和done属性的对象

注意：

- `yield`表达式后面的表达式，只有当调用`next`方法、内部指针指向该语句时才会执行

- yield表达式和return语句区别：return是结束执行，代表该遍历器对象已经执行到尽头了，再next也没用了
- Generator函数可以不用`yield`表达式，只是在执行完函数还会返回一个对象{value,done}
- `yield`表达式只能用在 Generator 函数里面，用在其他地方都会报错

- `yield`表达式如果用在另一个表达式之中，必须放在圆括号里面

- `yield`表达式用作函数参数或放在赋值表达式的右边，可以不加括号

```javascript
function* demo() {
  foo(yield 'a', yield 'b'); // OK
  let input = yield; // OK
}
```

---



###  与 Iterator 接口的关系

因为任意一个对象的`Symbol.iterator`属性就是该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。而 Generator 函数就是遍历器生成函数，因此可以把 Generator 赋值给对象的`Symbol.iterator`属性，从而使得该对象具有 Iterator 接口

```javascript
var myIterable = {};
myIterable[Symbol.iterator] = function* () {
  yield 1;
  yield 2;
};
[...myIterable] // [1, 2]
```

Generator函数执行后，返回一个遍历器对象。该对象本身也具有`Symbol.iterator`属性，执行后返回自身

```javascript
function* gen(){
  // some code
}
let g = gen();
console.log(g[Symbol.iterator]() === g)	// true
```

---



### next方法参数

`yield`表达式本身没有返回值（每次暂停和继续之间的传递值），或者说总是返回`undefined`。`next`方法可以带一个参数，该参数就会被当作上一个`yield`表达式的返回值

```js
// 如果yield表达式在其他表达式中，执行到yield命令就会暂停，而next是从yield之后的下一个命令开始执行      （不是下一行代码），这时yield就消失了，例如a = yield 2 变成 a = undefined
// 而next参数是被暂停的yield的返回值，例如next(true)时，a = yield 2 变成 a = true
function* demo() {
	let a;
	console.log(a);	// undefined
	a = 2 + （yield 2）;
	console.log(a);	// undefined
}
let b = demo();
b.next();
b.next();
```

这个功能有很重要的语法意义。Generator 函数从暂停状态到恢复运行，它的上下文状态（context）是不变的。通过`next`方法的参数，就有办法在 Generator 函数开始运行之后，==可以向函数体内部注入值==。也就是说，可以在 Generator 函数运行的不同阶段，从外部向内部注入不同的值，从而调整函数行为。

```javascript
function* foo(x) {
  var y = 2 * (yield (x + 1));
  var z = yield (y / 3);
  return (x + y + z);
}
var a = foo(5);
a.next() // Object{value:6, done:false}
a.next() // Object{value:NaN, done:false}
a.next() // Object{value:NaN, done:true}

var b = foo(5);
b.next() // { value:6, done:false }
b.next(12) // { value:8, done:false }
b.next(13) // { value:42, done:true }
```

第一次使用`next`方法时，传递参数是无效的。V8 引擎直接忽略第一次使用`next`方法时的参数，只有从第二次使用`next`方法开始，参数才是有效的。从语义上讲，第一个`next`方法用来启动遍历器对象，所以不用带有参数

```javascript
function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`);	// next参数相当于yield = 参数
  console.log(`2. ${yield}`);
  return 'result';
}
let genObj = dataConsumer();
genObj.next();	// Started
genObj.next('a');	// 1. a
genObj.next('b');	// 2. b
```

---



### for...of 循环



```javascript
function* foo() {
  yield 1;
  yield 2;
  yield 3;
  yield 4;
  yield 5;
  return 6;
}
for (let v of foo()) {	// v就是yield返回的值
  console.log(v);
}	// 1 2 3 4 5
```

注意，一旦`next`方法的返回对象的`done`属性为`true`，`for...of`循环就会中止，且不包含该返回对象，所以上面代码的`return`语句返回的`6`，不包括在`for...of`循环之中；

如果返回对象的`done`属性没有true，`for...of`就会一直循环（死循环）。

实现斐波那契数列

```javascript
function* fibonacci() {
  let [prev, curr] = [0, 1];
  for (;;) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}
for (let n of fibonacci()) {
  if (n > 100) break;
  console.log(n);
}
```

==所以for...of实质是需要一个遍历器对象，然后for...of默认执行该对象的next方法，直到返回对象的done为true==

利用`for...of`循环，可以写出遍历任意对象的方法，只需要yield返回的是对象的键--值

```javascript
function* objectEntries(obj) {
  let propKeys = Reflect.ownKeys(obj);
  for (let propKey of propKeys) {
    yield [propKey, obj[propKey]];
  }
}
let jane = { first: 'Jane', last: 'Doe' };
for (let [key, value] of objectEntries(jane)) {
  console.log(`${key}: ${value}`);	// first: Jane	last: Doe
}
```

或者将Generator函数加到对象的`Symbol.iterator`属性上面

```javascript
function* objectEntries() {
  let propKeys = Object.keys(this);

  for (let propKey of propKeys) {
    yield [propKey, this[propKey]];
  }
}
let jane = { first: 'Jane', last: 'Doe' };
jane[Symbol.iterator] = objectEntries;
for (let [key, value] of jane) {
  console.log(`${key}: ${value}`);
}
```

除了`for...of`循环以外，扩展运算符、解构赋值和`Array.from`方法内部调用的，都是遍历器接口。这意味着，它们都可以将 Generator 函数返回的 Iterator 对象，作为参数

也就是说，==for...of、扩展运算符、解构赋值、Array.from接受的参数实质都是遍历器对象，默认调用next方法，输出yield的值，注意return的值不会输出==

```javascript
function* numbers () {
  yield 1
  yield 2
  return 3
  yield 4
}
// 扩展运算符
[...numbers()] // [1, 2]
// Array.from
Array.from(numbers()) // [1, 2]
// 解构赋值
let [x, y] = numbers();	// x = 1，y = 2
// for...of 循环
for (let n of numbers()) {
  console.log(n)
}	// 1	2
```

---



### yield*表达式

`yield*`表达式是用来在一个 Generator 函数里面执行另一个 Generator 函数

```javascript
function* foo() {
  yield 'a';
}
// 使用for...of
function* bar() {
  yield 'x';
  for (let v of foo()) {
    yield v;
  }
  yield 'y';
}
// 使用yield*
function* bar() {
  yield 'x';
  yield* foo();
  yield 'y';
}
// 都等同于
function* bar() {
  yield 'x';
  yield 'a';
  yield 'b';
  yield 'y';
}
```

所以`yield*`表达式后面跟的是一个遍历器对象，表明它返回的是一个遍历器对象。

```js
yield 遍历器;	// 返回的是对象本身
yield* 遍历器;	// 返回的是该对象的内部值
```

`yield*`后面的 Generator 函数（没有`return`语句时），等于在 Generator 函数内部，部署一个`for...of`循环。也就是说，`yield*`后面的 Generator 函数（没有`return`语句时），不过是`for...of`的一种简写形式。反之，在有`return`语句时，则需要用`let value = yield* iterator`的形式获取`return`语句的值。

如果`yield*`后面跟着一个数组，由于数组原生支持遍历器，因此就会遍历数组成员

```javascript
function* gen(){
  yield* ["a", "b", "c"];	// 如果不加星号，返回整个数组作为value的值
}
gen().next() // { value:"a", done:false }
```

实际上，任何数据结构只要有 Iterator 接口，就可以被`yield*`遍历

```javascript
let read = (function* () {
  yield 'hello';
  yield* 'hello';	// 字符串也有iterator接口
})();
read.next().value // "hello"
read.next().value // "h"
```

`yield*`命令可以很方便地取出嵌套数组的所有成员（递归）

```javascript
function* iterTree(tree) {
  if (Array.isArray(tree)) {
    for(let i=0; i < tree.length; i++) {yield* iterTree(tree[i]);}
  } else {yield tree;}
}
const tree = [ 'a', ['b', 'c'], ['d', 'e'] ];
[...iterTree(tree)] // ["a", "b", "c", "d", "e"]
```

---



### 对象属性--Generator函数

```javascript
let obj = {
  * myGeneratorMethod() {}	// 简写
};
```

---



### Generator 函数的this

Generator函数总是返回一个遍历器，这个遍历器是 Generator 函数的实例，也继承了 Generator 函数的`prototype`对象上的方法

```javascript
function* g() {this.a = 1}
g.prototype.hello = function () {console.log('hi')};
let obj = g();	// 生成的对象不是g函数的对象，而是遍历器对象
console.log(obj instanceof g) // true
obj.hello() // 'hi'
console.log(obj.a)	// undefined
// 如果只是普通函数，g()只是执行函数，并不会返回对象
```

==在Generator函数中不能使用this，不能使用new==

```javascript
// 也可以使用this、new
// 将Generator函数中的this绑定在它的原型上
// 将Generator函数放在一个函数里，new该函数就行
function* gen() {
  this.a = 1;
  yield this.b = 2;
}
function F() {return gen.call(gen.prototype);}
let f = new F();
console.log(f.next());  // Object {value: 2, done: false}
console.log(f.next());  // Object {value: undefined, done: true}
console.log(f.a, f.b);	// 1, 2
```

---



### 应用

Generator可以暂停函数执行，返回任意表达式的值。这种特点使得 Generator 有多种应用场景

- **异步操作的同步化表达**

Generator 函数的一个重要实际意义就是用来处理异步操作，不需要写回调函数了。把异步操作写在`yield`表达式里面，等到调用`next`方法时再往后执行

```javascript
// AJAX异步操作
function* main() {
  var result = yield request("http://some.url");	// 响应的next将response传进来
  var resp = JSON.parse(result);
    console.log(resp.value);
}
function request(url) {
  $.ajax(url, { success: response => {it.next(response)} })	// 收到响应再next
}
var it = main();
it.next();
```

- **部署 Iterator 接口**

利用 Generator 函数，可以在任意对象上部署 Iterator 接口

```javascript
function* iterEntries(obj) {
  let keys = Object.keys(obj);
  for (let i=0; i < keys.length; i++) {
    let key = keys[i];
    yield [key, obj[key]];
  }
}// 普通对象通过iterEntries函数，就有了Iterator接口
let myObj = { foo: 3, bar: 7 };
for (let [key, value] of iterEntries(myObj)) {
  console.log(key, value);// foo 3		bar 7
}
```

---



## Generator异步编程

### 介绍

ES6 之前，异步编程的方法，大概有四种：

- 回调函数
- 事件监听
- 发布/订阅
- Promise

Generator函数将 JavaScript异步编程带入了一个全新的阶段

异步：任务不是连续完成的， 可以先执行第一段，转而执行其他任务，等做好准备，再回过头执行第二段 

同步：连续的执行，中间不能插入其他任务，例如读取文件，在操作系统读取过程中，程序只能等着

---



### 回调函数

异步编程的实现就是回调函数。回调函数就是把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数

缺点：当多个回调函数嵌套，形成了强耦合，出现回调地狱（callback hell）

---



### Promise

Promise 对象就是为了解决回调地狱问题而提出的。==它不是新的语法功能，而是一种新的写法，是对回调函数的改进写法==，允许将回调函数的嵌套，改成链式调用

缺点：代码冗余，一大堆then和catch

---



### Generator

协程（coroutine）：协作的线程

Generator函数封装异步任务的根本原因：可以暂停执行和恢复执行

此外，还有两个特性：函数体内外的数据交换和错误处理机制，使它可以作为异步编程的完整解决方案

```javascript
function* gen(x){
  try {
    var y = yield x + 2;
  } catch (e){
    console.log(e);
  }
  return y;
}
let g = gen(1);
console.log(g.next().value);	// 3
console.log(g.next(2).value);	// 2
g.throw('出错了');	// 出错了
```

异步任务的封装

```javascript
let fetch = require('node-fetch');
function* gen(){
  var url = 'https://api.github.com/users/github';
  var result = yield fetch(url);	// 与同步任务相比，只是多了一个yield
  console.log(result.bio);
}

let g = gen();
let result = g.next();
result.value.then(function(data){
  return data.json();
}).then(function(data){
  g.next(data);
});
```

---



## async函数

### 概述

ES2017 标准引入了 async 函数，使得异步操作变得更加方便，它是 Generator 函数的语法糖。

`async`函数就是将 Generator 函数的星号（`*`）替换成`async`，将`yield`替换成`await`，仅此而已

`async`函数对 Generator 函数的改进：

1. 内置执行器

   `Generator 函数的执行必须靠执行器，所以才有了co模块，而async函数自带执行器。也就是说，async`函数的执行，与普通函数一模一样，加括号就行

   ```js
   asyncfunction()
   ```

2. 更好的语义

3. 更广的适用性

   `co`模块约定，`yield`后面只能是Thunk函数或Promise，而`await`命令后面，可以是 Promise 对象和原始类型的值（数值、字符串和布尔值，会自动转成立即 resolved 的 Promise 对象）

4. 返回值是Promise

   `async`函数的返回值是 Promise 对象，这比 Generator 函数的返回值是 Iterator 对象方便多了。可以用`then`方法指定下一步的操作

`async`函数可以看作多个异步操作，包装成的一个 Promise 对象，而`await`命令就是内部`then`命令的语法糖

---



### async用法

`async`函数返回一个 Promise 对象，可以使用`then`方法添加回调函数。当函数执行的时候，一旦遇到`await`就会先返回，等到异步操作完成，再接着执行函数体内后面的语句。==函数体（异步操作）执行完才会执行then==

```javascript
async function getStockPriceByName(name) {		// 股票报价，async关键字表明该函数内有异步操作
  const symbol = await getStockSymbol(name);
  const stockPrice = await getStockPrice(symbol);
  return stockPrice;
}
getStockPriceByName('goog').then(function (result) {console.log(result);});
```

使用形式：

```javascript
async function foo() {}	// 函数声明

const foo = async function () {};	// 函数表达式

let obj = { async foo() {} };	// 对象方法

obj.foo().then(...)	// Class方法
class Storage {
  async getAvatar(name) {}
}

const foo = async () => {};	// 箭头函数
```

语法：

```js
// 格式：async 函数
// 返回值：resolve状态的Promise
// async函数内部return返回的值，会成为then方法回调函数的参数
// async函数内部的错误对象，或者await后面有Promise是reject，其参数会成为catch方法回调函数的参数
async function f() {
  return 'hello';
}
f().then(v => console.log(v))	// "hello"

```

`async`函数内部出错，返回的 Promise 对象就变为`reject`状态。抛出的错误对象会被`catch`方法回调函数捕捉

```js
async function demo() {
	throw new Error('i am a error!')
}
demo().catch(e => console.log(e))	// 'i am a error!'
```

async函数返回的Promise的状态变化：

- 遇到await，就会暂停async函数，等到异步操作完成，再开始执行async函数，函数体执行完返回的Promise状态为resolve

```js
async function demo() {
	await 1;
	await Promise.resolve()
}
demo().then(() => {
	console.log(2);
})
```

- 遇到return，结束函数体，返回的Promise状态为resolve

```javascript
async function getTitle(url) {
  let response = await fetch(url);	// 抓取网页
  let html = await response.text();	// 取出文本
  return html.match(/<title>([\s\S]+)<\/title>/i)[1];	// 匹配页面标题
  await 1;	// 不会执行
}
getTitle('https://tc39.github.io/ecma262/').then(t => console.log(t))
// 函数内部有三个操作，只有这三个操作全部完成，才会执行then里面的回调函数
```

- 任何一个`await`后面的 Promise 变为`reject`状态、或者出错，结束函数体，返回的Promise状态为reject

```js
async function demo() {
  await Promise.reject()
  await 1;	// 不会执行
}
async function demo2() {
  await new Promise(() => {
    throw new Error('err')
  })
  await 1;	// 不会执行
}
```

- 函数体内部抛出错误，结束函数体，返回的Promise状态为reject

```js
aynsc function demo() {
  throw new Error('err');
  await 1;	// 不会执行
}
```

---



### await命令

`await`后面是一个 Promise 对象，返回该对象的结果。如果不是 Promise 对象，就直接返回对应的值

```js
async function demo() {
	let a = await 123;
	console.log(a);
}
demo();	// 123
```

如果`await`后面是一个`thenable`对象，那么`await`会将其等同于 Promise 对象

```js
Promise((res, rej) => {})
obj = {then(res, rej) => {}}
```

如果`await`后面的Promise是`reject`，则`reject`参数被`catch`的回调函数接收到，async返回reject的Promise

```js
async function demo() {
  await Promise.reject();
}
demo().catch(() => {console.log(1)})
```

如果希望前一个异步操作失败时，也不要中断后面的异步操作，可以

```js
// 把await放在try...catch里面
async function f() {
  try {
    await Promise.reject('出错了');
  } catch(e) {}
  return await Promise.resolve('hello world');
}

// await后面的Promise对象跟catch方法
async function f() {
  await Promise.reject('出错了')
    .catch(e => console.log(e));
  return await Promise.resolve('hello world');
}
```

错误处理：

如果`await`后面的异步操作出错，那么等同于`async`函数返回的 Promise 对象被`reject`

注意：

- `await`后面的`Promise`对象，运行结果可能是`rejected`，所以最好把`await`放在`try...catch`代码块中

- 多个`await`命令后面的异步操作，如果不存在继发关系，最好让它们同时触发

```javascript
let [foo, bar] = await Promise.all([getFoo(), getBar()]);	// 写法一

let fooPromise = getFoo();	// 写法二
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
```

- `await`命令只能用在`async`函数之中，如果用在普通函数，就会报错

- async 函数可以保留运行堆栈

```javascript
const a = async () => {
  await b();
  c();
};
// b()运行时，a()是暂停执行，上下文环境都保存着。一旦b()或c()报错，错误堆栈将包括a()
```

发送一组请求：如果只有前一个 URL 返回结果，才会去读取下一个 URL，这样做效率很差，非常浪费时间。最好是并发发出远程请求

```javascript
async function logInOrder(urls) {
  const textPromises = urls.map(async url => {	  // 并发读取远程URL
    const response = await fetch(url);
    return response.text();
  });
  for (const textPromise of textPromises) {	  // 按次序输出
    console.log(await textPromise);
  }
}	// map参数是async声明的异步函数，在发出前一个URL后，就去发送下一个URL，因为只有async函数内部是继发		 执行，外部不受影响
```

---



## Class类

### 概述

ES6 的`class`可以看作构造函数的另一种写法，是构造函数的语法糖，它的绝大部分功能，ES5 都可以做到

```javascript
class Point {
  constructor(x) {	// 构造方法，就是ES5的构造函数
    this.x = x;
  }
  toString() {return this.x;}
}
let a = new Point(1);
console.log(typeof Point) // "function"
console.log(Point === Point.prototype.constructor) // true

```

上述代码表面，类也是使用new命令；类的数据类型就是函数；类本身就指向构造函数

类的所有方法都是定义在类的`prototype`属性上面，跟构造函数一样

```js
class Point {toString(){},toValue()}
// 等同于
Point.prototype = {toString(){}, toValue(){}}
// 在类的实例上面调用方法，其实就是调用原型上的方法
let a = new Point();
console.log(a.toString() === Point.prototype.toString())
```

类的内部所有定义的方法，都是不可枚举的

```javascript
class Point {
  constructor(x, y) {}
  toString() {}
}
Object.keys(Point.prototype)	// []
Object.getOwnPropertyNames(Point.prototype)
```

属性名表达式

```js
let methodName = 'fn';
class Point {
  [methodName]() {}
}
```

Class表达式：与函数一样，类也可以使用表达式的形式定义

```javascript
const MyClass = class Me {	// 类名Me只在Class的内部可用，指代当前类
  getClassName() {return Me.name;}
};
let a = new MyClass();	// 在Class外部，只能用MyClass引用
a.getClassName() // Me
Me.name	// 报错
```

如果类的内部没用到的话，可以省略`Me`

```javascript
const MyClass = class {};
```

采用 Class 表达式，可以写出立即执行的 Class

```javascript
let person = new class {
  constructor(name) {this.name = name;}
  sayName() {console.log(this.name);}
}('张三');
person.sayName(); // "张三"
```

注意：

- 类和模块的内部，默认就是严格模式

- 类不存在提升

- 类只是构造函数的一层封装，也有函数的许多特性，例如name属性（class关键字后面的类名）

  ```js
  let myClass = class Point {}
  console.log(myClass.name);	// Point
  ```

- 类方法之前加上星号（`*`），表示该方法是Generator函数

  ```javascript
  class Foo {
    * [Symbol.iterator]() {}
  }
  ```

- 类方法内如果有`this`，它默认指向类的实例。但是要小心，一旦单独使用该方法，很可能报错

  ```javascript
  class Logger {
    printName() {console.log(this.name);}
  }
  const logger = new Logger();
  const { printName } = logger;
  printName();	// 报错，this指向该方法运行时环境（由于class内部是严格模式，this实际指向的是										 undefined），从而导致找不到print方法而报错
  // 只需要绑定this
  class Logger {
    constructor() {this.printName = this.printName.bind(this);}
  }
  // 或者使用箭头函数
  ```

---



### constructor方法

`constructor`方法是类的默认方法，通过`new`命令生成对象实例时，自动调用该方法。

一个类必须有`constructor`方法，如果没有显式定义，一个空的`constructor`方法会被默认添加

```javascript
class Point {}
// 等同于
class Point {constructor() {}}
```

`constructor`方法默认返回实例对象（`this`），也可以指定返回另外一个对象（对象才有效）

```javascript
class Foo {
  constructor() {return Object.create(null);}
}
new Foo() instanceof Foo	// false
// new命令默认调用constructor，默认返回创建的实例this，也可以手动返回指定实例
```

构造函数和类的主要区别：类必须new调用，而构造函数加括号也能运行

---



### 类实例

实例的属性除非显式定义在其本身（this对象），否则都是定义在原型上（`class`）。

类中的方法也是在原型张定义的。

类的所有实例共享一个原型对象。这就意味着，可以通过实例为“类”添加方法

```js
let p1 = new Point();
let p2 = new Point();
let proto = Object.getPrototypeOf(p1);
proto.print = function() {}
p2.print();	// 通过p1为类添加的方法，p2也能使用
```

---



### getter/setter

在“类”的内部可以使用`get`和`set`关键字，对某个属性设置取值函数和存值函数，拦截该属性的存取行为

```js
get 属性名() {}
set 属性名(value) {}
```

```javascript
class MyClass {
  constructor() {}
  get prop() {
    return 'hi';
  }
  set prop(value) {
    console.log('setter: '+value);
  }
}
let a = new MyClass();
a.prop = 123;	// setter: 123
console.log(a.prop);	// 'hi'
```

存值函数和取值函数是设置在属性的 Descriptor 对象上的

---



### 静态方法

类相当于实例的原型，所有在类中定义的方法，都会被实例继承。

静态方法就是方法前加上`static`关键字，==该方法不是定义在类的原型上，只能通过类访问，而且不会被实例继承==

```javascript
class Foo {
  static classMethod() {return 'hello';}
}
Foo.classMethod() // 'hello'
new Foo().classMethod();	// 报错，静态方法
```

静态方法的`this`，指的是类，而不是实例

```javascript
class Foo {
  static bar() {this.baz();}
  static baz() {console.log('hello');}
  baz() {console.log('world');}	// 由于静态方法不在原型上，可以与实例方法重名
}
Foo.bar() // hello
```

静态方法可以被子类继承，并且其中`super`指向父类，子类可以通过super调用父类的静态方法

```javascript
class Father {
  static classMethod() {return 'hello';}
}
class Son extends Father {
  static classMethod() {return super.classMethod();}
}
Son.classMethod() // 'hello'
```

---



### 实例属性的新写法

实例属性除了定义在`constructor()`方法里面的`this`上面，也可以定义在类的最顶层

```javascript
class foo {
  bar = 'hello';
  baz = 'world';
  constructor() {}
}	// 定义了两个属性
```

---



### 静态属性

静态属性指的是Class本身的属性，即`Class.propName`，而不是定义在实例对象（`this`）上的属性

```javascript
class Foo {
  static prop1 = 1;
}
Foo.prop2 = 2;	// 静态属性
Foo.prop1;	// 1
Foo.prop2;	// 2
```

---



### extends继承

Class可以通过`extends`关键字实现继承，这比 ES5 的通过修改原型链实现继承，要清晰和方便很多。

类实质是构造函数，类继承也就是构造函数的继承，所以可以父类使用构造函数定义，子类使用类定义

```js
function Father() {}
class Son extends Father {}
console.log(Son.__proto__ === Father);	// true
```

ES6 要求，子类的构造函数必须执行一次`super`函数，而且super必须在this之前

```javascript
class Point {
  constructor(x, y) {}
}
class ColorPoint extends Point {
  constructor(x, y, z) {
    this.z = z; // 报错，只有调用super之后，才可以使用this关键字
    super(x, y); // 调用父类的constructor(x, y)
    this.z = z;	// 正确
  }
}
```

类默认会有constructor方法，子类的默认constructor方法里有个super()，==如果重写该方法，必须要调用super==，否则新建实例时会报错。因为子类的`this`对象必须先通过父类的构造函数完成塑造，得到与父类同样的实例属性和方法，然后再加上子类自己的实例属性和方法，也就是说，==子类实例的构建，基于父类实例==。



**super关键字**

既可以当作函数使用，也可以当作对象使用。在这两种情况下，它的用法完全不同

- `super`作为函数调用时，代表父类的构造函数。注意：

  - 子类构造函数必须执行一次`super`，super必须在this之前
  - `super`内部的`this`指的是子类实例

  + ==作为函数时，super()只能用在子类的构造函数之中，用在其他地方就会报错==

- `super`作为对象时

  - 在实例方法中，指向父类的原型对象。注意：

    * 定义在父类实例上的方法或属性，是无法通过`super`调用的

    * 在子类实例方法中通过`super`调用父类的方法时，super内部的`this`指向当前的子类实例

  ```javascript
  class A {
    constructor() {this.k = 2;}
    p() {return 2;}
  }
  class B extends A {
    constructor() {
      super();
      console.log(super.p()); // 2
    }
    get m() {return super.k;}
  }
  let b = new B();
  b.m // undefined
  ```

  - 在静态方法中，指向父类
    + 父类方法内部的`this`指向当前的子类，而不是子类的实例 

super总结：

```js
// 在构造方法，super是父类构造函数，必须在this之前、this是子类实例
super([...args]);	// 父类构造方法
this.a;	// 实例属性
this.b();	// 实例方法

// 在实例方法，super是父类原型对象、this是子类实例
super.methodName();	// 父类原型方法
this.a;	// 实例属性
this.b();	// 实例方法

// 在静态方法，是父类（class后面的类名）、this是子类（class后面的类名）
super.methodName().	// 父类静态方法
this.a;	// 子类静态属性
this.b();	// 子类静态方法
```



**类的prototype属性和`__proto__`属性**

Class 作为构造函数的语法糖，同时有`prototype`属性和`__proto__`属性，因此同时存在两条继承链

- 子类的`__proto__`属性：表示构造函数的继承，指向父类。

- 子类的`prototype`属性的`__proto__`属性：表示方法的继承，指向父类的`prototype`属性。也就是说，子类的prototype属性就像是父类原型的实例

```javascript
class A {}
class B extends A {}
B.__proto__ === A 	// true
B.prototype.__proto__ === A.prototype 	// true

// 类的继承原理
Object.setPrototypeOf(B.prototype, A.prototype);	// 设置B的原型的原型是A的原型
Object.setPrototypeOf(B, A);	// 设置B的原型是A

A.__proto__ === Function.prototype // true
A.prototype.__proto__ === Object.prototype // true
```



**实例的`__proto__`属性**

子类实例的`__proto__`属性，指向子类的`prototype`。

子类实例的`__proto__`属性的`__proto__`属性，指向父类实例的`__proto__`属性，也是父类的`prototype`。

也就是说，可以通过子类原型的原型，修改父类原型的方法

```javascript
b.__proto__.__proto__.printName = () => {console.log('Ha')}
```



**原生构造函数的继承**

原生构造函数是指js内置的构造函数，通常用来生成数据结构。ECMAScript的原生构造函数大致有：

- Boolean()
- Number()
- String()
- Array()
- Date()
- Function()
- RegExp()
- Error()
- Object()

以前原生构造函数是无法继承的。而ES6允许继承原生构造函数定义子类，因为 ES6 是先新建父类的实例对象`this`，然后再用子类的构造函数修饰`this`，使得父类的所有行为都可以继承

```javascript
class MyArray extends Array {	// 自定义数据结构
  constructor(...args) {super(...args);}	// args是传入的参数数组
}
let arr = new MyArray();
arr[0] = 12;
arr.length // 1
arr.length = 0;
arr[0] // undefined
```

---



## Module模块

### 概述

在 ES6 之前，社区制定了一些模块加载方案，最主要的有用于服务器的CommonJS、用于浏览器的AMD。ES6 在语言标准的层面上实现了模块功能，可以取代CommonJS和AMD规范，成为浏览器和服务器通用的模块解决方案

```javascript
// CommonJS模块：运行时加载，把模块当做对象，模块里的所有东西都会加载
let { stat, exists, readFile } = require('fs');

// ES6模块：静态加载（编译时加载），只加载特定的东西，效率高
import { stat, exists, readFile } from 'fs';
```

ES6 的模块自动采用严格模式，例如

- 不能删除变量，只能删除属性
- 禁止`this`指向全局对象
- ...

ES6 模块之中，顶层的`this`指向`undefined`，即不应该在顶层代码使用`this`。

模块功能主要由两个命令构成：`export`和`import`。

- `export`命令用于规定模块的对外接口
- `import`命令用于导入其他模块提供的功能

`export`、`import`命令可以出现在模块顶层的的任何位置。如果处于块级作用域内，就会报错。因为处于条件代码块之中，就没法做静态优化了，违背了 ES6 模块的设计初衷

---



### export命令

一个模块就是一个独立的文件。文件内部的所有变量，外部无法获取。如果希望外部能够读取模块内部的某个变量，就必须使用`export`关键字导出该变量

```javascript
// profile.js，ES6将js文件视为模块，导出2个变量
export let name = 'black';
export let year = 1997;
```

优先使用下面写法

```js
let name = 'black';
let year = 1997;
export {name, year};	// 导出变量
```

导出函数或类

```js
export function add(x, y) {};
export class myClass{}
// 或者
export {add, myClass}
```

使用`as`关键字重命名

```javascript
function v1() {}
function v2() {}
export {
  v1 as alias1,
  v2 as alias2,
  v2 as alias3
};
```

注意写法：

```javascript
export 1;	// 报错
let m = 1;
export m;	// 报错
function f() {}
export f;	// 报错

export let m = 1;	// 写法一
let m = 1;
export {m};	// 写法二
let n = 1;
export {n as m};	// 写法三
```

`export`语句输出的接口，与其对应的值是动态绑定关系；而CommonJS模块输出的是值的缓存，不存在动态更新

```javascript
export let a = 1;
setTimeout(() => a = 2, 500);	//500ms后改变a的值，导出值也会改变
```

---



### import命令

使用`export`命令定义了模块的对外接口以后，其他 JS 文件就可以通过`import`命令加载这个模块。

`import`命令接受一对大括号，里面指定要从其他模块导入的变量名。大括号里面的变量名，必须与被导入模块的对外接口的名称相同

```javascript
// main.js
import { name, year } from './profile.js';
```

使用`as`关键字，将输入的变量重命名

```javascript
import { name as sname } from './profile.js';
```

`import`命令输入的变量都是只读的，不能修改；如果是对象，可以改写属性，但不建议

```js
name = 'white';	//报错
```

`from`指定模块文件的位置，可以是相对路径或绝对路径，`.js`后缀可以省略。如果是模块名，不带有路径，那么必须有配置文件，告诉JS引擎该模块的位置

```javascript
import {myMethod} from 'util';	// 从模块util中加载myMethod
```

==import命令具有提升效果，会提升到模块的头部，首先执行==，因为`import`是编译阶段执行的，在代码运行之前

```javascript
foo();
import { foo } from 'my_module';
```

由于`import`是静态执行，所以不能使用表达式和变量，这些只有在运行时才能得到结果的语法结构

```javascript
import { 'f' + 'oo' } from 'my_module';	// 报错，不能使用表达式
```

注意：

- 如果重复导入同一个模块，该模块只会执行一次
- 不要更改、插入、删除导入对象的属性

- CommonJS 模块的`require`命令和 ES6 模块的`import`命令，最好不要写在同一个模块里面



**模块的整体加载**

 可以使用星号（`*`）接收模块所有导出值，此时 * 是一个对象，可以结合as关键字使用

```js
import {name, year} from './profile';
import * as alias from './profile';	// alias是一个对象,不允许修改该对象
alias.name;alias.year
```

---



### export default 命令

==export defaul命令只能使用一次，所以import命令后面才不用加大括号==，因为唯一对应export default命令

```javascript
// export-default.js
export default function () {console.log('foo');}	// 默认输出一个匿名函数

// import-default.js
import customName from './export-default';	// 对于默认导出，import后面不需要大括号
```

`export default`实质是将后面的变量的值赋给变量`default`，然后系统允许你为它取任意名字

```javascript
// modules.js
function add(x, y) {}
export {add as default};	// 等同于 export default add

// app.js
import { default as foo } from 'modules';	// 等同于 import foo from 'modules';
```

`export default`后面只能跟变量，不能跟变量声明语句

```javascript
export default var a = 1;	// 错误
```

因为`export default`本质是将后面的值赋给`default`变量，所以可以将一个值写在`export default`之后

```javascript
export default 42;	// 正确
export 42;	// 报错
```

在一条`import`语句中，同时导入默认接口和其他接口

```javascript
import _, { each, forEach } from './profile';	// _对应默认接口，{...}对应其他接口
```

---



### 复合写法

模块中如果先输入后输出同一个模块，`import`、`export`语句可以写在一起，但是当前模块相当于对外转发了对外接口，而当前模块不能使用这些接口

```javascript
export { foo, bar } from 'my_module';
// 理解为
import { foo, bar } from 'my_module';
export { foo, bar };
```

模块的接口改名、整体输出、默认接口和具名接口的相互转化，都可以采用这种写法

```javascript
export { es6 as default } from './someModule';	// 具名接口改为默认接口
export { default as es6 } from './someModule';	// 默认接口改为具名接口
```

---



### 跨模块常量

`const`声明的常量只在当前代码块有效，模块外无法访问。如果想设置多个跨模块的常量（即跨多个文件），可以建一个专门的`constants`目录，将各种常量保存在该目录的不同的文件里面

```javascript
// constants/db.js
export const db = {
  url: 'http://my.couchdbserver.local:5984',
  admin_username: 'admin',
  admin_password: 'password'
};
// constants/user.js
export const users = ['root', 'admin', 'staff', 'ceo', 'chief', 'moderator'];
```

再将这些文件输出的常量，合并在constants/index.js

```javascript
export {db} from './db';
export {users} from './users';
```

谁使用就直接加载`index.js`就可以了

```javascript
import {db, users} from './constants/index';
```

---



### 浏览器加载

默认情况下，浏览器（渲染引擎）是同步加载 JavaScript 脚本；两种异步加载的语法：

```html
<script src="./myModule.js" defer></script>	<!--defer是“渲染完DOM再执行”，按顺序加载-->
<script src="./myModule.js" async></script>	<!--async是“下载完文件就执行”，不保证加载顺序-->
```

浏览器加载 ES6 模块，也使用`<script>`标签，但是要加入`type="module"`属性

```html
<script type="module" src="./foo.js"></script>
```

浏览器对于带有`type="module"`的`<script>`，都是异步加载，不会堵塞浏览器，即等到整个页面渲染完，再执行模块脚本，等同于打开了`defer`属性

```html
<script type="module" src="./foo.js"></script>
<!-- 等同于 -->
<script type="module" src="./foo.js" defer></script>
```

如果网页有多个 `<script type="module">`，它们会按照在页面出现的顺序依次执行。

ES6模块允许内嵌在网页中，语法行为与加载外部脚本完全一致

```html
<!--内嵌式-->
<script type="module">
  import $ from "./jquery/src/jquery.js";	// 加载jQuery模块
  $('#mes').text('Hi');
</script>

<!--外链式-->
<script type="module" src="./jquery/src/jquery.js"></script>
```

ES6模块是动态引用，并且不会缓存值，模块里面的变量绑定其所在的模块

```javascript
// m1.js
export var foo = 'bar';
setTimeout(() => foo = 'baz', 500);

// m2.js
import {foo} from './m1.js';
console.log(foo);	// bar
setTimeout(() => console.log(foo), 500);	// baz
```

---



### Node.js加载

Node.js 要求ES6模块采用`.mjs`后缀文件名。Node.js 遇到`.mjs`文件，就认为是ES6模块，默认启用严格模式。如果不希望将后缀名改成`.mjs`，可以在项目的`package.json`文件中，指定`type`字段为`module`

```javascript
{
   "type": "module"
}
```

总结：`.mjs`文件总是以 ES6 模块加载，`.cjs`文件总是以 CommonJS 模块加载，`.js`文件的加载取决于`package.json`里面`type`字段的设置



**main字段**

`main`字段用于指定模块加载的入口文件，默认index.js

```javascript
{
  "type": "module",
  "main": "./index.js"
}

import { something } from 'art-template';
// 实际加载的是./node_modules/art-template/index.js
```



**exports字段**

`exports`字段的优先级高于`main`字段，可以用于给文件取别名

```javascript
{
  "main": "./main-legacy.cjs",
  "exports": {
    ".": "./main-modern.cjs"
  }
}	// 入口文件是main-modern.cjs
```



**内部变量**

ES6模块中，顶层的`this`指向`undefined`；CommonJS模块的顶层`this`指向当前模块，这是一个重大差异

以下这些顶层变量在 ES6 模块之中都是不存在的：

- `arguments`
- `require`
- `module`
- `exports`
- `__filename`
- `__dirname`

---



## 编程风格

### 块级作用域

- let取代var
  - let具有块级作用域
  - let没有变量提升

- 优先使用const

  - `const`符合函数式编程思想，运算不改变值，只是新建值，而且也有利于将来的分布式运算

  - JS编译器会对`const`进行优化，所以多使用`const`，有利于提高程序的运行效率，也就是说`let`和`const`的本质区别，其实是编译器内部的处理不同

    ```javascript
    const a = 1, b = 2;							// good
    const [a, b, c] = [1, 2, 3];		// best
    ```

  - 所有的函数都应该设置为常量

---



### 字符串

静态字符串使用单引号或反引号。动态字符串使用反引号

```javascript
const a = "foobar";										// bad
const a = 'foobar', b = `foo${a}bar`; // good
```

---



### 解构赋值

使用数组和对象成员时，优先使用解构赋值

```javascript
const [first, second] = arr;									// 数组
function getName({ firstName, lastName }) {}	// 对象参数
function process(input) {return { left, right};}// 返回多个值时，优先使用对象的解构赋值
```

---



### 数组

拷贝数组时，使用扩展运算符

```javascript
const itemsCopy = [...items];
```

伪数组对象转数组时，使用Array.from()

```javascript
const nodes = Array.from(document.querySelectorAll('.foo'));
```

---



### 函数

立即执行函数可以写成箭头函数的形式

```javascript
(() => {console.log('hi');})();
```

匿名函数作参数、需要绑定this时，使用箭头函数代替

```javascript
[1, 2, 3].map(x => x * x);
```

所有配置项都应该集中在一个对象，放在最后一个参数，==布尔值不可以直接作为参数==

```javascript
function divide(a, b, { option = false } = {}) {}
```

不要使用arguments，使用 rest 运算符（...）代替。因为rest运算符显式表明你想要获取参数，而且arguments是一个伪数组对象，而rest运算符可以提供一个真正的数组

```javascript
function demo(...args) {return args.join('');}
```

设置函数参数的默认值

```javascript
function demo(opts = {}) {}
```

---



### 对象

```js
const a = { k1: v1, k2: v2 };	// 单行最后不加逗号
const b = {		// 多行最后加逗号
  k1: v1,
  k2: v2,
};
```

对象尽量静态化，一旦定义，就不得随意添加新的属性。如果添加属性不可避免，要使用`Object.assign`方法

```js
const a = {};							// bad
a.x = 3;

const a = {};
Object.assign(a, { x: 3 });

const a = { x: null };		// good
a.x = 3;
```

对象的属性和方法，尽量采用简洁表达法

```js
let ref = 'id';
const atom = {
  ref,
  addValue() {},
};
```

---



### Map结构

只有模拟现实世界的实体对象时，才使用 Object。如果需要`key: value`的数据结构，使用 Map 结构。因为 Map 有内建的遍历机制

```javascript
let map = new Map(arr);
for (let key of map.keys()) {console.log(key);}
```

---



### Class

使用Class取代需要 prototype 的操作，比如在原型上添加方法

```javascript
Queue.prototype.pop = function() {}	// bad
class Queue {												// good
  pop() {}
}
```

---



### 模块

- Module语法是JS模块的标准写法。使用`import`取代`require`；使用`export`取代`module.exports`

- 不要在模块导入中使用通配符

- 模块默认导出一个对象时，对象名的首字母大写

---



## 补充

### Function和Object

- 所有函数都是Function的实例
- 函数都是对象（万物皆对象）
- 函数同时拥有`prototype`、`__proto__`属性；对象拥有`__proto__`属性
- 自定义函数的`__proto__`属性指向Function.prototype
- “函数”原型链根是Function.prototype；“对象”的原型链根是Object.prototype

```js
Object instanceof Object
Function instanceof Function
Object instanceof Function
Function instanceof Object
// 上述都为true，因为																																	      Object.__proto__ === Function.__proto__ === Function.prototype											 Function.__proto__.__proto__ === Object.prototype

// 所有对象和函数 instanceof Object //true																								    所有函数 instanceof Function //true																									    除Object和Function之外的构造函数 instanceof 自身 //false

// Function.prototype的3个注意点：																												 1.不是对象，而是一个函数																																	 2.没有prototype属性																																		 3.不是Function的实例，因为它的__proto__不指向Function.prototype，而是指向Object.prototype
```

---



### 其他

相等运算符

```javascript
0 == null // false
```



数组的空位

```javascript
const a1 = [undefined, undefined, undefined];
const a2 = [, , ,];
a1.length // 3
a2.length // 3
a1[0] // undefined
a2[0] // undefined
a2.map(n => 1) // [, , ,]	// map方法遍历成员时，发现是空位就会直接跳过，不会进入回调函数
```

数组的空位会反映在`length`属性，即空位有自己的位置，但这个位置的值是未定义，读取的结果就是`undefined`

总结：数组空位有length，但没有属性名（数组索引）、属性值



原型链：

![image-20191218113244723](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20191218113244723.png)































