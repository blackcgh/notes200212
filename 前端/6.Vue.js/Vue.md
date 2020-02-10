# Vue

## 介绍

Vue是一套用于构建用户界面的**渐进式框架**。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层。

**Vue的生态系统：**

- vue：用于构建用户界面的前端开发框架
- vue router：vue的路由管理器插件（前端路由）
- vuex：vue的状态管理插件
- vue-cli：vue的项目构建工具

**Vue特点：**

- js框架
- 声明式渲染
- 简化DOM操作
- 响应式数据驱动

---



## 安装

[CDN引入](https://cdn.jsdelivr.net/npm/vue/dist/vue.js)、NPM下载

---



## MVVM

MVVM 是 Model-View-ViewModel 的缩写。Model 转化成 View：数据绑定。View 转化成 ModelDOM：事件监听。这两个方向都实现的，就是数据的双向绑定

 <img src="https://img3.sycdn.imooc.com/5b9e13fc0001b19705560423.jpg" alt="img" style="zoom:67%;" /> 

```te
1. 各部分之间的通信，都是双向的
2. View 与 Model 不发生联系，都通过 ViewModel 传递
3. View 非常薄，不部署任何业务逻辑，而 ViewModel 非常厚，所有逻辑都部署在那里。
```

MVVM采用双向绑定（data-binding）：View 的变动，自动反映在 ViewModel，反之亦然

==MVVM 与 MVC 最大的区别：MVVM 实现了 View 和Model 的自动同步==

---

**Vue中的MVVM**

![image-20191220173745609](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20191220173745609.png)

---

**MVC模式**

- 视图（View）：用户界面
- 控制器（Controller）：业务逻辑
- 模型（Model）：数据保存

 <img src="http://www.ruanyifeng.com/blogimg/asset/2015/bg2015020105.png" alt="img" style="zoom: 67%;" /> 

```tex
1. View 传送指令到 Controller
2. Controller 完成业务逻辑后，要求 Model 改变状态
3. Model 将新的数据发送到 View，用户得到反馈
```

**MVC的所有通信都是单向的，View跟Model必须通过Controller来承上启下**

---



## Vue选项

==在Vue实例中，不能使用箭头函数定义==

Vue实例的作用范围是挂载元素及其内部元素；一般使用id选择器；可以设置除了html和body之外的其他双标签，但建议使用div

```js
let app = new Vue({	// Vue是一个构造函数，接受一个对象作为参数
  el: '#app',
  
  data: {
    name: 'black',
    age: 18,
  },
  
  computed: {
    getAge() {}
  },
  
  props: {
    height: [Number, String],		// 指定多种数据类型
    figure: {
      type: Object,
      default() {
        return {}
      }
      required: true
    }
  },
  
  methods: {
    plus() {}
  },
  
  filters: {
    myFilter(value) {}
  },
  
  components: {
    componentName: {
      template:`<div>hi</div>`
    }
  },
  
  watch: {
    dataName(new, old) {}
  },
  
  template: `<div>hi</div>`,
  
  render(h) {
    return h(App)
  }
  
}).$mount('#app')
```

### el

- 类型：`string | Element`

- 说明：用于挂载、管理元素。

  提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。在实例挂载之后，元素可以用 `app.$el` 访问。
  
  如果在实例化时存在el属性，实例将立即进入编译过程，否则，需要调用 `app.$mount()` 手动开启编译。
  
  如果 `render` 函数和 `template` 属性都不存在，挂载 DOM 元素的 HTML 会被提取出来用作模板，此时，必须使用 Runtime + Compiler 构建的 Vue 库

---



### data

- 类型：`Object | Function`

- 说明：用于存储数据

  Vue实例创建后，可以通过app.data访问data属性。Vue 实例也代理了data对象上所有的属性，因此访问vm.a等价于访问vm.$data.a。

  组件的data属性是返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果data是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！而data函数每次创建新实例后，都能调用data函数，从而返回一个全新的数据对象。另外，组件的data不要使用箭头函数定义

---



### computed

- 类型：`{ [key: string]: Function | { get: Function, set: Function } }`

- 说明：对于任何复杂逻辑，应当使用计算属性，而不是methods属性 。

  不同于methods属性，计算属性是基于响应式依赖进行缓存的。如果使用到该属性，只要依赖的响应式属性发生变化，就会调用函数重新计算。注意，如果某个依赖 (非响应式属性) 在该实例范畴之外，则计算属性是不会被更新的。
  
  如果在使用计算属性时要传入参数，可以在定义计算属性时发挥一个函数
  
  ```js
  computed: {							// 定义
    increment() {
      return function(param) {}
    }
  }
  
  {{increment(1)}}				// 使用
  ```

---



### props

- 类型：`Array<string> | Object`
- 作用：常用于组件，用于接收来自父组件的数据。数据用小写字母命名，否则在传递数据时要用 - 指代大写
- 对象配置选项
  - type：指定数据类型，支持多种原生构造函数：`String`、`Number`、`Boolean`、`Array`、`Object`、`Date`、`Function`、`Symbol`和任何自定义构造函数
  - default：指定默认值，==对象或数组的默认值必须从一个工厂函数返回==
  - required：是否必填
  - validator：自定义验证函数
- 说明：props用于接收来自父组件的数据，子组件使用其值而不要修改；data存储组件本身的数据，可修改；

---



### methods

- 类型：`{ [key: string]: Function }`
- 说明：methods将被混入到 Vue 实例中。可以直接通过实例访问这些方法，或者在指令表达式中使用。方法中的 `this` 自动绑定为 Vue 实例

---



### watch

- 类型：`{ [key: string]: Function | string | Object | Array }`
- 说明：一个对象，键是需要观察的表达式（data里面的数据），值是对应回调函数（参数是newvalue、oldvalue），也可以是方法名，或者包含选项的对象。用于观察和响应 Vue 实例上的数据变动

---



### filters

- 类型：`Object`
- 说明：过滤器由“|”符号指示，mustache插值和 v-bind 表达式都可以使用

```js
{{ mes | myMethod }} //mes作为过滤函数的第一个参数
<div :id="mes | 函数名"></div>

filters: { 
	myMethod(value) {}
}
```

---



### components

- 类型：`Object`
- 说明：Vue实例注册局部组件

---



### template

- 类型：`string`

- 说明：template模板会替换el管理的元素。如果 Vue 选项中包含渲染函数render，该模板将会被忽略。 ==如果存在template属性，必须使用 Runtime + Compiler 构建的 Vue 库==

  ```js
// 需要运行时+编译器
  new Vue({
    template: `<div>{{ hi }}</div>`
  })
  ```

---



### render

- 类型：
- 说明：渲染函数接收一个 `createElement` 方法作为第一个参数用来创建 `VNode`，render创建的元素也会替换挂载元素

```js
// 不需要编译器runtime-compiler
new Vue({
  render (createElement) {
    return createElement('div', this.hi)
  }
})
```

```js
createElement('标签名'[, {标签属性}], [标签文本])
```

---



### mixins

- 类型：`Array<Object>`
- 说明：该选项接受一个混入对象的数组。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项

---



### hook--生命周期钩子函数

- **befortCreate**：实例创建之前执行

- **created**：实例创建后执行，`$el` 属性还不可见

- **befortMount**：挂载开始之前执行：相关的 `render` 函数首次被调用。 该钩子在服务器端渲染期间不被调用

- **mounted**：`el`被新创建的`vm.$el`替换，并挂载到实例后调用该钩子

- **befortUpdate**：数据更新时调用

- **updated**：由于数据更改导致虚拟DOM重新渲染和，更新后调用。该钩子在服务器端渲染期间不被调用

- **befortDestroy**：Vue实例销毁之前调用。此时实例仍然可用

- **destroyed**：实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，

  ​                       所有的子实例也会被销毁

- **activated**：keep-alive 组件激活时调用

- **deactivated**：keep-alive 组件停用时调用

---



## 实例属性

```js
$el					// 挂载元素，用来访问挂载当前组件实例的DOM元素
$data				// 对象，Vue实例观察的数据对象。Vue实例代理了对其data对象属性的访问
$props			// 当前组件接收到的props对象。Vue实例代理了对其props对象属性的访问
$options		// 用来访问组件实例化时的初始化选项对象
$root				// 用来访问当前组件树的根实例。如果当前实例没有父实例，此实例将会是其自己
$parent			// 用来访问当前组件实例的父实例
$children		// Vue实例数组，用来访问当前组件实例的直接子组件实例。不保证顺序，也不是响应式的
$refs				// 对象，用来访问使用了v-ref指令的子组件
$attrs			// 
```

---



## 实例方法

```js
$mount([elementOrselector])		// 如果实例没有el选项，可以使用该方法手动挂载一个未挂载的DOM元素
$on('event', callback)				// 监听实例的自定义事件event。callback会接收事件触发函数的额外参数
$off(['event', callback])			// 移除自定义事件event，如果没有event，将移除实例的所有事件
$emit('eventName'[, ...args])		// 用来触发事件eventNmae，args是传递给监听函数的参数
$once('event', callback)			  // 用来监听实例上的自定义事件，但只触发一次，触发后会被移除
```

---



## 全局API

```js
Vue.extend(options)							// Vue构造函数创建一个子类（构造器）。参数是一个包含组件选项的对象
Vue.component(id[,definition])	// 注册或根据id获取全局组件。id是组件的名称
Vue.use(plugin)									// 安装Vue插件。如果plugin是对象，必须提供install方法。如果是																	   函数，它就是install方法。调用install时，默认将Vue当参数传入
Vue.set(tar,prop/ind,val)				// tar是数组或对象，向tar添加一个响应式的属性或元素
Vue.delete(tar,prop/ind)				// 删除tar的属性或元素
```

---



## 特殊属性

- **key属性管理可复用的元素**

  ```html
  <!-- Vue会高效地渲染元素(经过虚拟DOM，再渲染到浏览器)，通常会复用已有元素而不是从头开始渲染。这么做除了使Vue变得非常快之外，还有其它一些好处。例如，如果允许用户在不同的登录方式之间切换 -->
  <!-- key说明：具有唯一值，用于强制替换元素/组件，而不是重复使用它 -->
  <!-- key和v-if -->
  <template v-if="isTrue"><!-- 该例不会清除已经输入的内容，因为使用元素相同 -->
    <label>Username</label><input placeholder="username">
  </template>
  <template v-else>
    <label>Email</label><input placeholder="email">
  </template>
  
  <!-- 使用key表示不要复用input元素，而label元素仍然可以高效复用 -->
  <template v-if="isTrue">
    <label>Username</label><input placeholder="username" key="username">
  </template>
  <template v-else>
    <label>Email</label><input placeholder="Enter your email address" key="email">
  </template>
  
  <!-- key和v-for -->
  <li v-for="item in items" :key="item.id">...</li>
  ```

- **ref**

```html
<!-- 用来给元素或子组件注册引用信息。引用信息将会注册在父组件的 $refs 对象上。如果在DOM元素上使用，引用指向的就是DOM元素；如果用在子组件上，引用就指向组件实例 -->
<p ref="p">hello</p><!-- app.$refs.p === 该元素 -->
<child-component ref="child"></child-component><!--app.$refs.child === 该子组件  -->
```

---



## 内置组件

### keep-alive

```html
<!-- 属性：
			include - 字符串或正则表达式。只有名称匹配的组件会被缓存，默认全部缓存。
			exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。
			max - 数字。最多可以缓存多少组件实例。
-->
<!-- 用法：
			1. 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。<keep-alive> 是一个抽象组件：它						 自身不会渲染DOM元素，也不会出现在父组件链中
			2. 当组件在 <keep-alive> 内被切换，它的 activated 和 deactivated 生命周期钩子函数				   	   将会被对应执行
				 2.1 当使用kepp-alive的组件处于激活状态，执行activated函数
				 2.2 当组件不处于激活状态，执行deactivated函数
-->
<keep-alive exclude="a,b">
  <a></a>
  <b></b>
  ...
</keep-alive>
```

---



### slot

```html
<!-- 属性：
			name - string，用于命名插槽，默认名字是default
-->
<!-- 用法：
			<slot> 元素作为组件模板之中的内容分发插槽。<slot> 元素自身将被替换
-->
<slot name="slotName"><slot>	<!-- 定义一个有名字的插槽 -->
```

---



## 模板语法

### 插值

```html
<!-- 数据绑定“Mustache”语法： {{}}  双大括号会将数据解释为普通文本，而非HTML代码-->
<span>{{ msg }}</span>
<!-- 对于所有的数据绑定，Vue支持简单的JS表达式 -->
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div v-bind:id="'list-' + id"></div>
```

---



### 指令

- **v-text**

  ```html
  <!-- 替换元素的文本。局部更新使用插值{{}} -->
  <span v-text="msg"></span>
  ```

- **v-html**

  ```html
  <!-- 更新元素的innerHTML，识别HTML标签 -->
  <div v-html="html"></div>
  ```

- **v-once**

  ```html
  <!-- 表示元素或组件只渲染一次，以后不会随着数据的改变而改变 -->
  <span v-once>{{msg}}</span>
  ```

- **v-pre**

  ```html
  <!-- 不解析该标签的内容，原封不动的输出 -->
  ```
  
- **v-show**

  ```html
  <!-- 切换元素的 display 属性 -->
  <div v-show="isTrue"></div>
  ```

- **v-if、v-else-if、v-else**

  ```html
  <!-- 根据表达式的值的真假条件渲染、销毁元素 -->
  <div v-if="type === 'A'"></div>
  <div v-else-if="type === 'B'"></div>
  <div v-else></div>
  ```

- **v-for**

  ```html
  <!-- 类型： Array | Object | number | string | Iterable -->
  <!-- 基于源数据多次渲染元素或模板块,当和v-if一起使用时，v-for的优先级更高 -->
  <div v-for="(item, index) in items"></div>
  <div v-for="(val, name, index) in object"></div>
  <!--一般v-for结合key属性使用-->
  <!--key是为了高效的更新虚拟DOM（key是唯一标识）-->
  <div v-for="item in items" :key="item.id">{{ item.text }}</div>
  ```

- **v-bind**

  ```html
  <!-- 缩写 : -->
  <!-- 动态绑定属性 -->
  <!--  -->
  <img :src="imageSrc">
  <button :[key]="value"></button><!-- 动态绑定 -->
  <img :src="'/path/' + fileName"><!-- 字符串拼接 -->
  <!-- class 绑定语法：{类名: boolean}，还可以与普通的class共存-->
  <div class="active" :class="{ red: isRed }"></div>
  <div :style="{ fontSize: size + 'px' }"></div><!-- style绑定语法：{css属性: 变量} -->
  ```

- **v-on**

  ```html
  <!-- 缩写 @ -->
  <!-- 预期：Function | Inline Statement | Object -->
  <!-- 绑定事件监听器。事件类型由参数指定。表达式可以是一个方法的名字或一个内联语句 -->
  <!-- v-on:参数 = Function -->
  <button v-on:click="doThis"></button>
  <button @[event]="doThis"></button><!-- 动态事件 -->
  <button @click.stop.prevent="doThis"></button><!--  串联修饰符 -->
  <button v-on="{ mousedown: doThis, mouseup: doThat }"></button><!-- 对象语法 -->
  <!-- 修饰符：
  			.stop - 调用event.stopPropagation()
  			.prevent - 调用 event.preventDefault()。
  			.self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
  			.{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
  			.native - 监听组件根元素的原生事件，在父组件里子组件添加事件时使用
  			.once - 只触发一次回调。
  -->
  <!-- 定义函数的参数时：
  			1.没有参数，事件调用时函数可以不用写()
  			2.有一个参数，事件调用函数
  				2.1不写 () 时，Vue会将浏览器生成的event事件对象作为参数传递
  				2.2写 () 时，函数的参数都是undefined
  				2.3有实际参数时，函数的形参就是实参
  			3.多个参数，事件调用函数
  				3.1不写()时，默认第一个是event，其余为undefined
  				3.2写()时，参数都是undefined
  				3.3实参传给形参，没有实参的都是undefined
  			4.如果想手动获取事件对象event作为参数传递，使用$event
  -->
  ```

- **v-model**

  ```html
  <!-- 实现表单元素和数据的双向绑定。根据控件类型自动选取正确的方法来更新元素 -->
  <!-- 忽略表单元素的value、checked、selected属性的初始值，总是将Vue实例的数据作为数据来源 -->
  <!-- v-model为根据元素的不同，而使用不同的属性和事件：
  			text、textarea元素使用value属性和input事件；
  			checkbox、radio元素使用checked属性和change事件；
  			elect元素使用value属性和change事件
  -->
  <input type="text" v-model="message">
  <!-- 等同于 -->
  <input type="text" :value="message" @input="messaeg=$event.target.value">
  
  <!-- 单选按钮 -->
  <div id="exa"><!--绑定到空字符串，被单选按钮的value属性替代，而且v-model可以代替name属性-->
    <input type="radio" id="one" value="One" v-model="picked">
    <input type="radio" id="two" value="Two" v-model="picked">
  </div>
  
  <!-- 复选框 -->
  <input type="checkbox" id="checkbox" v-model="checked"><!--单个复选框，绑定到布尔值-->
  <div id="exa"><!-- 多个复选框，绑定到数组，存放复选框的value属性 -->
    <input type="checkbox" id="jack" value="Jack" v-model="checkedNames">
    <input type="checkbox" id="john" value="John" v-model="checkedNames">
  </div>
  
  <!-- 选择框 -->
  <div id="exa"><!-- 绑定空字符串，存放选择框的value属性 -->
    <select v-model="selected">
      <option>A</option>
      <option>B</option>
    </select>
  </div>
  <!-- multiple属性可以实现多选，绑定到空数组 -->
  <!-- 修饰符：
  			.lazy - v-model默认input事件触发后值与数据进行同步，而lazy使用change事件（失焦、回车）
  			.number - v-model默认传递的值类型是字符串，number可以将值类型转为数值类型
  			.trim - 过滤用户输入的值的首尾空白字符
  
  -->
  ```

- **v-slot**

  ```html
  <!-- 缩写是 # -->
  <!-- 作用：指定具名插槽或需要接收 prop 的插槽 -->
  <!-- 限制：v-slot只能添加在<template>标签上 -->
  <base-layout>
  <template v-slot:header>content</template>	<!-- 指定名字为header的插槽 -->
    <template v-slot:item="slotProps">	<!-- 接收 prop 的具名插槽 -->
      <div>{{ slotProps.item.text }}</div>
    </template>
  </base-layout>
  ```
  
- **动态参数**

  ```html
  <!-- 使用中括号 [] 括起来的JS表达式作为一个指令的参数，表达式里不能有空格和引号 -->
  <a :[attributeName]="url">...</a>
  <a @[eventName]="doSomething">...</a>
  ```

---



## Vue组件

### 介绍

组件 (Component) 是Vue最强大的功能之一。

组件既是自定义标签，也是可复用的Vue实例（Vue()和Vue.extend()，而且==组件继承于Vue类的原型==），

组件和Vue实例一样，接受相同的选项对象，例如data、methods以及生命周期钩子等。只是没有 el 这样根实例特有的选项。

```js
Vue.component('my-cpn', {
  template: ``,
  data() {return {}},
  computed: {},
  methods: {},
  ...
})
```

组件的API：

```js
Vue.extend(选项对象)	// 创建组件构造器
Vue.component('标签名', 组件构造器)	// 将构造器注册为组件，组件名必须字母全小写且包含一个连字符
```

组件的使用：==组件模板必须放在div内==

```js
const cpnC = Vue.extend({				// 1.创建组件构造器
  template: `<div>hello component</div>`	// 模板都要放在一个div里
})
Vue.component('cpn', cpnC)		// 2.注册组件，这里是注册的是全局组件

// <cpn></cpn>	3.在HTML文件Vue实例管理的元素内使用组件

// 语法糖
Vue.component('cpn', {		// 对象默认作为Vue.extend方法的参数
  template: `<div>hello component</div>`
})

const app = Vue({
  components: {
    cpn: {
  		template: `<div>hello component</div>`
		}
  }
})
```

```html
<!-- 最终写法：模板分离结合ES6 -->
<template>
	<div>
    hello component
  </div>
</template id="cpn">
<script>
  const cpn = {
    template: '#cpn'
  }
	let app = new Vue({
    components: {
      cpn
    }
  })
</script>
```

---



### 全局组件和局部组件

全局组件：通过Vue.component()注册的组件，可以在任意一个Vue实例管理的元素内使用

局部组件：在Vue实例的components选项注册的组件，只能在该Vue实例管理的元素内使用

```js
const app = Vue({
  components: {
    cpn: cpnC	// 组件cpn只能在实例管理的元素内使用
  }
})
```

==注意：全局组件必须注册在Vue实例之前。==另外注册时组件名称单词首字母大写，使用时大写字母改为小写加-

---



### 父组件和子组件

Vue组件的实质也是Vue实例，所以也有components选项。在组件的components选项注册的组件是子组件。

在哪里注册就只能在哪里使用，根组件不能使用子组件的子组件，因为：

父组件会在components选项查找是否注册子组件，找不到就去查找全局组件，再找不到就报错。而且在编译期间父组件就将子组件的模板替换了子组件标签名，所以根组件不能使用子组件的子组件

```html
<template id="mycpn1">
	<div>i am mycpn1</div>
</template>
<template id="mycpn2">
	<div>i am mycpn2</div>
</template>
<script>
	Vue.component('my-cpn2', {
    template: '#mycpn2',
    components: {
      'my-cpn1': {			// my-cpn1是my-cpn2的子组件
      	template: '#my-cpn1'
   	 }
    }
  })
</script>
```

==注意：子组件的模板最外层必须用div标签==

---



### 组件的data选项

组件不能访问Vue实例的data数据，所以组件要有自己存储数据的地方（data选项）。

==组件的data选项必须是一个函数，返回一个存放数据的对象==，因为：

因为组件是可复用的。如果data写成对象形式，就使得所有组件实例共用了一份`data`，就会造成一个变了全都会变的结果。而data是一个函数的话，每复用一次组件，就会返回一份新的`data`，相当于给每个组件实例创建一个私有的数据空间，确保每个组件实例维护各自的数据，互不影响。

```js
let app = new Vue({
  components: {
    'my-cpn': {					// 组件my-cpn
     template: '#mycpn',
     	data() {				// data是一个函数
 				return {
    			name: 'black',
    			age: 18,
 				}
			}
    }
  }
})
```

---



### 组件通信

因为子组件不能访问父组件或Vue实例的数据，所以组件之间必须要通信。

==Vue实例和子组件的通信与父组件和子组件的通信是一样的==

#### 父子组件的通信

- **父组件通过props向子组件传递数据**。props只能由父组件修改，子组件使用其中的数据而不能修改

  ```html
  <div id="app">
    <cpn :cmes="mes" />		<!-- 父组件把数据传给子组件 -->
  </div>
  <template id="cpn">
  	<div>{{cmes}}</div>
  </template>
  <script>
  	const cpn = {
      template: '#cpn',
      data() {return {}},
      props: {
        cmes: {
          type: [String, Array],
          default: 'default'
        }
      }
    }
    const app = new Vue({
      el: '#app',
      data: {
        mes: 'communication'
      },
      components: {
        cpn
      }
    })
  </script>
  ```

- **子组件通过自定义事件向父组件传递数据**。==自定义事件没有事件对象event，默认接收$emit的参数==

  ```html
  <div id="app">
    <cpn @myevent="cpnClick" />	<!-- 自定义myEvent事件 -->
  </div>
  <template id="cpn">
  	<div>
    	<button @click="btnClick">发给父组件</button>
    </div>
  </template>
  <script>
  	const cpn = {
      template: '#cpn',
      data() {
        return {
          mes: 'i come from Son'
        }
      },
      methods: {
        btnClick() {
          this.$emit('myevent', this.mes)	//触发自定义事件myEvent，并把参数mes传过去
        }
      }
    }
    const app = new Vue({
      el: '#app',
      components: {
        cpn
      },
      methods: {
        cpnClick(mes) {}		// 子组件触发事件的处理函数
      }
    })
  </script>
  ```

---



#### 非父子组件通信

涉及到非父子组件的通信，可以使用事件总线bus，也可以使用vuex。

属性$bus默认是不存在的，需要手动创建

```js
Vue.prototype.$bus = new Vue();		// 向Vue注入总线属性$bus，$bus也是一个Vue实例
this.$bus.$emit('myEvent');				// this是组件，触发该实例上的事件
this.$bus.$on('myEvent', () => {})// 监听该实例上的自定义事件
```

---



### 组件访问方式

- **父组件访问子组件**

  - 实例属性$children：是一个数组，存放子组件实例（标签）

  - 实例属性$refs：是一个对象，存放定义了ref属性的子组件实例（标签）

    ```html
    <div id="app">
      <cpn ref="son"></cpn>
      <button @click="btnClick">按钮</button>
    </div>
    <template id="cpn"><div>子组件</div></template>
    <script>
      const cpn = {
        template: '#cpn'
      }
    	const app = new Vue({
        el: '#app',
        components: {
          cpn
        },
        methods: {
          btnClick() {
            console.log(this.$refs)	// {son: Vuecomponent}，refs存放有ref属性的子组件
          }
        }
      })
    </script>
    ```

- 子组件访问父组件
  
- $parent，是父组件对象或Vue实例，不常用
  
- 访问根组件
  
  - $root，是Vue实例，不常用

注意：

- 组件继承自Vue，所以组件都可以使用Vue实例的属性和方法（原型链）
- html标签和组件一样，也有ref属性。所有标签都有load事件，offset等属性

---



### slot插槽

#### 介绍

slot是Vue的内置组件，作用是==替换指定的任意内容。而且无论有没有替换，编译后自身是不存在的==

```html
<!-- 之前使用组件，里面都是没有内容的或内容是无效的 -->
<cpn>这里的内容是无效的</cpn>

<!-- 现在，组件模板内放置的slot标签用于接受上面的无效内容 -->
<slot></slot>

<!--  -->
<!--  -->
```

---



#### 插槽默认值

slot标签内可以设置默认内容，如果使用组件时不提供插槽内容，就会显示插槽的默认内容

```html
<slot>我是默认内容</slot>

<!-- 不提供插槽内容 -->
<cpn></cpn>		<!-- 我是默认内容 -->

<!-- 提供插槽内容 -->
<cpn>我是提供内容</cpn>		<!-- 我是提供内容 -->
```

---



#### 具名插槽

 `<slot>`元素有一个属性：`name`。用来定义具名插槽。

 不带 `name` 的`<slot>`，默认名字“default”，名字可以重复。

```html
<template v-slot:header>			<!-- v-slot指令只能在template标签上使用 -->
  <h1>Here might be a page title</h1>
</template>
<p>another</p>							  <!-- 也可以使用v-slot:default -->

<!-- 组件模板的插槽 -->
<div>
  <slot name="header"></slot>	<!-- 名字为header的插槽 -->
  <slot></slot>								<!-- 默认插槽，名字是default -->
</div>
```

---



#### 编译作用域

==父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的==

```html
<div id="app">
  <cpn v-show="isTrue">i am {{name}}</cpn>	<!-- 变量isTrue、name的作用域都是父组件 -->
</div>
<!-- 编译后，父组件里没有<cpn>标签，有的只是子组件内的标签，<cpn>的属性过渡到子组件的最外层div标签 -->
```

---



#### 作用域插槽

有时候，希望使用插槽的默认值，但是默认值的展示结构不符合要求，也就是说，只要插槽中的数据，不要插槽中数据的默认展示。这时可以使用作用域插槽。

绑定在slot标签的属性被称为插槽属性（slot prop），属性名自定义，可定义多个插槽属性，所有的插槽属性都会存放在v-slot指定的对象内，父组件通过v-slot指令可以使用插槽属性。

作用域插槽的使用：通过v-slot找到指定的具名插槽，指定对象会收集该具名插槽的所有插槽属性

```html
<template v-slot:a="propName">					<!-- 将包含所有插槽属性的对象命名为propName -->
  {{ propName.dataNmae }}								<!-- propName.dataNmae 等于 data -->
  {{father = propName.dataNmae}}				<!-- 还可以将子组件数据这样传给父组件 -->
</template>

<!-- 组件模板的插槽 -->
<slot name:"a" v-bind:dataNmae="data">	<!--dataName是插槽属性，指向子组件数据data-->
  子组件data的默认展示											<!-- 只要数据，不要展示 -->
</slot>
```

---



#### 总结

**插槽有两类：**

- 具名插槽。slot标签有name属性
- 作用域插槽。slot标签除了有name属性，还有插槽属性（绑定自定义属性）

**插槽有三种使用方式：**

- 使用提供的插槽内容

  ```html
  <cpn>提供内容</cpn>
  ```

- 使用插槽的默认内容

  ```html
  <slot>默认内容</slot>
  ```

- 两者结合，使用提供的插槽展示结构、默认的插槽内容数据

  ```html
  <cpn v-slot:slotName="propName">{{propName.dataName}}</cpn>
  -----------------------------------------------------------
  <slot name="slotName" :dataName="data">data的默认展示</slot>
  ```

---



## 模块化开发

### js模块化规范

- **CommonJS规范（同步加载）**

  ```js
  // 常用于服务器端（Node）
  module.exports = {									// 导出
    demo: 1,
    text: true,
  }
  exports.myMethod = function() {}
  let {demo, text} = require('文件名')	// 导入
  ```

- **ES6的Module**

  ```js
  export = {										// 导出
    demo: 1,
  }
  export default function() {}
  import {demo } from '文件名'		// 导入
  <script src="js文件" type="module"></script>	// HTML文件导入js模块格式
  ```

- **CMD（异步加载）**
- **AMD（异步加载）**

---



### 打包工具Webpack

#### 概述

==webpack是 JavaScript 应用程序的静态模块化打包工具。==

**模块化：**浏览器只支持ES6模块化规范。利用Webpack，可以使用任何一种前端模块化规范，Webpack会将其转				为浏览器支持的格式。

**打包：**将各种资源模块合成一个或多个包。包括压缩图片、scss转css、ES6转ES5、TypeScript转JavaScript等。

Webpack要做的事情：分析项目结构，递归地构建一个依赖关系图，里面包含应用程序需要的每个模块，然后将这些模块打包成一个或多个包。

==Webpack主要是模块化，文件压缩、预处理都是附带功能。==

---

**安装**

Webpack是基于Node环境运行的，所以要先安装Node.js。

全局安装Webpack（vue-cli2依赖3.6.0版本）

```shell
npm install webpack@3.6.0 -g		// -g表示全局安装
```

局部安装Webpack

```shell
npm install webpack@3.6.0 --save-dev	// 开发依赖，打包后不再需要
```

==在终端界面使用webpack命令都是指向全局webpack==

---

**使用**

在终端下，进入项目文件夹

```shell
>webpack ./src/main.js ./dist/bundle.js		// 全局webpack将main.js打包bundle.js
```

---



#### 工作方式

通过给定的主文件（main.js），Webpack将从这个文件开始找到项目的所有依赖文件，使用各种loader处理它们，最后打包为一个浏览器可识别的JavaScript文件（bundle.js），HTML文件引入的就是bundle.js。

把webpack想像成一个工厂，各种loader就是一个个负责不同工作的工人，有的会处理 svg，有的会压缩 css 或者图片，有的会处理 less，有的会将 es6 转换为 es5。完成自己工作后，把自己处理的结果交给下一个工人，直到最后由webpack将他们的劳动成果生成 dist 目录下的文件

---



#### webpack.config.js

使用webpack时，要在项目下创建配置文件webpack.config.js。在终端运行webpack命令，webpack会在项目下查找配置文件并执行。

```js
const path = require('path')	// path包是node的内置模块，所以要先初始化npm init
module.exports = {
  entry: './src/main.js',			// 设置入口文件，webpack会根据入口文件查找所有依赖
  output: {										// 设置输出
    path: path.resolve(__dirname, dist),	// path是绝对路径，指向项目下的dist文件夹
    filename: bundle.js				// 设置输出的文件名
  }
}
```

设置好配置文件后，终端直接输入webpack就可以打包

```shell
>webpack
```

---



#### package.json

在npm的配置文件package.json设置script，这样在终端可以通过执行npm命令来指向webpack命令

```js
{
  ...
  "script": {
    "build": "webpack"
  }
  "devDependencies": {}	// 开发依赖，局部安装webpack使用的是开发依赖
  "dependencies": {}		// 运行依赖
}
```

```js
--save			// 运行依赖
--save-dev	// 开发依赖
```

这样在终端就可以运行

```shell
npm run build		// 使用的是本地webpack
```

---



#### loader

webpack本身只识别js文件。loader让webpack能够去处理那些非js文件。loader将所有类型的文件转换为webpack能够处理的模块，再利用webpack对它们进行打包。

下载的各种loader都在node_modules文件夹，就像node的第三方模块。

**使用：**

- npm安装

  ```js
  // css文件的loader
  npm install --save-dev css-loader
  npm install --save-dev style-loader
  ```

- 配置webpack.config.js

  ```js
  module.exports = {
    ...
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]//从右到左解析
        }
      ]
    }
  }
  ```

**其他的loader：**

- less文件的loader

  ```js
  npm install --save-dev less-loader less		// less文件的loader
  ```

- 图片文件的loader

  ```js
  npm install --save-dev url-loader
  npm install file-loader --save-dev
  ```

- ES6转ES5

  ```js
  npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
  ```

- vue文件的loader

  ```js
  npm install vue-loader vue-template-compiler --save-dev
  // 14.0.0以上的vue-loader版本要结合插件使用，修改vue-loader版本 “^13.0.0”,npm install安装
  ```

https://www.webpackjs.com/loaders/

---



#### plugin插件

plugin让webpack增加更多的功能（webpack只有打包功能）。loader让webpack识别除js文件以外的其他文件（loader加载其他文件），webpack能识别加载后的文件。==loader是加载器，plugin是扩展器==

**使用：**

- npm安装（内置插件不用安装）

  ```js
  npm install html-webpack-plugin --save-dev
  ```

- 配置webpack.config.js

  ```js
  const webpack = require('webpack')
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  module.exports = {
    ...
    plugins: [
      new webpack.BannerPlugin('版权'),// BannerPlugin是webpack内置插件，用于添加版权声明
      new HtmlWebpackPlugin(					// 将指定HTML文件当做模板，在dist生成新的HTML文件，
      	template: './index.html'			// 在body最后添加script，用于引入打包生成的bundle.js
      ),
    ]
  }
  ```

  

**其他的plugin：**

- webpack-dev-server（本地服务）

  ```js
  npm install webpack-dev-server	// 1.安装
  
  module.exports = {							// 2.配置webpack.config.js
    devServer: {
      contentBase: './dist'
    }
  }
  
  {																// 3.配置package.json
    ...
    "script": {
      "dev": "webpack-dev-server"
    }
  }
  
  npm run dev											// 4.运行
  ```

- webpack-merge（合并配置文件）

  将webpack.config.js分为base.config.js、dev.config.js、prod.config.js

  ```js
  npm install webpack-merge --save-dev	// 安装
  
  // 生产配置prod.config.js和开发配置dev.config.js
  const webpackMerge = require('webpack-merge')
  const baseConfig = require('./base.config')	// 导入公共配置
  module.exports = webpackMerge(baseConfig, {
    plugins:[...]
  })
  
  // 配置package.json
  {
    "script": {
    	"build": "webpack --config ./build/prod.config.js",
    	"dev": "webpack-dev-server --config ./build/dev.config.js"
  	}
  }
  // 由于配置文件在build目录，base.config.js中的output的path是(__dirname, ‘dist’)，导致__dirname指向build，打包后的bundle.js放在build中。所以要设置path：(__dirname,‘../dist’)
  ```

---



#### webpack中使用Vue

npm下载的vue模块会放在node_modules。

安装：

```js
npm install vue --save		// 运行依赖
```

导入：

```js
import Vue from 'vue'
```

---



## vue-cli脚手架

#### 概述

使用vue-cli可以快速的搭建Vue开发环境和webpack配置。脚手架相当于集成了webpack、各种loader、plugin。

==vue-cli也是基于Node环境工作的==

**安装：**

```shell
npm install @vue/cli -g				// cli3
npm install @vue/cli-init -g	// cli2
```

**初始化：**

```js
vue create 项目名				// cli3，不能大写
vue init webpack 项目名	// cli2
```

---



#### runtime-compiler、runtime-only

vue有两个构建版本，runtime-compiler和runtime-only，两者的区别在main.js

```js
// runtime-compiler
new Vue({
  el: '#app',
  template: '<App />',
  components: {App}
})

// runtime-only
new Vue({
  el: '#app',
  render: h => h(App)
})
```

runtime-compiler是全功能的vue文件，可以编译template、render。构建过程：

```js
template-->ast-->render-->vdom-->UI
```

runtime-only只能编译render。构建过程：

```js
render-->vdom-->UI
```

render是渲染函数

```js
render(createElement) {  //h的参数可以是标签、组件（不用注册）
return creatElement(‘div’ , {class: box} , [ ‘文本内容’, ... ])
}
常用render: h => h(组件对象)
```

在将 .vue 文件编译成js的过程中，组件中的template会被vue-template-compiler编译为render函数，所以导入的组件是render函数的版本，已经没有template了。

**runtime-only优点：性能更高、代码量更少**

总结：

- 如果使用的是runtime-only，就不能再使用template

- runtime-compiler允许使用template

---



#### alias别名

配置webpack.base,config.js（cli2）可以给文件夹起别名

```js
module.exports = {
  ...
  resolve: {
    extensions: ['.js', '.vue', '.json'],	// 导入时可忽略扩展名
    alias: {
      '@': resolve('src'),	// 给src目录起别名@
      'assets': resolve('@/assets'),
      'components': resolve('@/components'),
      'views': resolve('@/views')
    }
  }
}

import Home from 'components/Home'
<img src="~assets/image.svg">				// img标签的路径前要加~
```

---



####  cli打包文件

在终端执行打包命令npm run build，cli项目下会生成dist目录，里面存放打包生成的

- index.html
- css
- js
- img
- 页面图标

---



#### cli2目录结构

![image-20200104105555170](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200104105555170.png)

---



#### cli3目录结构

- Vue CLI 3基于webpack 4的，Vue CLI基于webpack 3

- CLI 3看不到配置目录build、config。但提供了可视化界面用于设置配置

  ```js
  >vue ui		//启动配置的web页面
  ```

- CLI 3移除了static目录，增加了public目录，将index.html移到public目录下，该目录也是原封不动的打包到dist目录

---



## vue-router路由

### 前端渲染、后端渲染

**后端渲染**

以前Web是由HTML和CSS构建的静态页面，没有太多的交互性。每个用户行为要求服务器来创建和提供一个完整的页面。后端渲染HTML的情况下，浏览器接收到的页面是经过服务器渲染的呈现给用户的最终的HTML字符串。过程：

- 浏览器发送URL请求
- 后端使用模板引擎生成HTML；向数据库请求数据，并插入HTML中；将HTML响应给前端
- 前端接收到HTML后，在浏览器中显示

国企网站都是使用服务端渲染，就是点击一下，就会打开新页面，然后从后台请求新的页面数据。

好处：前端耗时少（前端只负责展示HTML+CSS），有利于SEO，模板统一在后端。前端相对省事，不占用客户端			资源（不用解析模板）

坏处：网络传输数据量大，占用部分服务器运算资源



**前端渲染**

前端渲染起源于JavaScript的兴起，ajax更是让前端渲染更加成熟，前端渲染实现了前后端分离，前端只专注于UI的开发，后端只专注于逻辑的开发，前后端交互只通过约定好的API来交互，后端提供json数据，前端利用预先写的html模板，循环读取JSON数据，拼接字符串，并插入页面。

过程：

- 浏览器向静态资源服务器发送URL请求
- 静态资源服务器响应对应的HTML+CSS+JS（前端）
- 浏览器接收到HTML+CSS+JS并解析，如果在执行js代码中遇到JAJAX请求就向服务器发送数据请求（后端）
- 浏览器将数据插入HTML中，将渲染好的页面显示

好处：网络传输数据量小。不占用服务端运算资源，模板在前端（可能是部分在前端）

坏处：前端要渲染页面耗时较多，不利于SEO。占用客户端运算资源用于解析模板

==爬虫可以爬取后端渲染的数据，但不能爬取前端渲染的数据==

---



### 前端路由、后端路由

**后端路由**

通过用户请求的**url**导航到具体的**html**页面；每跳转到不同的**URL**，都是重新访问服务端，然后服务端返回页面，页面也可以是服务端获取数据，然后和模板组合，返回HTML（**后端渲染**），也可以是直接返回模板**HTML**，然后由前端js再去请求数据，使用前端模板和数据进行组合，生成想要的HTML（**前端渲染**）

特点：浏览器会刷新页面，网速慢可能导致屏幕全白再有新内容。后端路由最大的问题就是**前后端不分离**。



**前端路由**

在单页面应用，大部分页面结构不变，只改变部分内容。由前端来根据不同的URL跳转到对应的内容（组件）

模式：hash模式和history模式

==特点：页面不刷新==

两者对比：

- 后端路由每次访问新页面都要向服务器发送请求，然后服务器再响应请求，这个过程会有延迟。前端路由访问新页面仅仅是变换了路径，没有网络延迟，用户体验好
- 前端路由使用浏览器的前进，后退键的时候会重新发送请求，没有合理地利用缓存
- vue-router是前端路由；koa-router是后端路由

---



### 改变URL不刷新页面的方式

- URL的hash，也就是锚点（#），本质是改变window.location.hash

  ```js
  >location.href
  <"http://192.168.1.101/example/"
  >location.hash = 'bar'
  >location.href
  <"http://192.168.1.101/example/#bar"
  ```

- H5的history模式。URL指向栈中最新的地址

  ```js
  history.pushState()			// 入栈
  history.back()					// 后退，相当于出栈，等价于history.go(-1)
  history.forward()				// 向前，相当于入栈，等价于history.go(1)
  history.replaceState()	// 不具有前进、后退
  history.go()						// 既可以入栈，也可以出栈
  
  >history.pushState({}, '', 'home')
  >location.href
  <"http://192.168.1.101/example/home"
  >history.pushState({}, '', 'about')
  >location.href
  <"http://192.18.1.101/example/about"
  >history.pushState({}, '', 'profile')
  >location.href
  <"http://192.168.1.101/example/profile"
  >history.back()
  >location.href
  <"http://192.168.1.101/example/about"
  >hitory.forward()
  >location.href
  <"http://192.168.1.101/example/profile"
  >history.go(-2)
  >location.href
  <"http://192.168.1.101/example/home"
  >history,go(2)
  >location.href
  <"http//192.168.1.101/example/profile"
  ```

  ```js
  >history.replaceState([], '', 'home')
  >location.href
  <"http://192.168.1.101/example/home"
  ```

---



### 概述

单页面富应用SPA：Single Page Application，SPA是在前后端分离的基础上加了前端路由。

vue-router是Vue.js集成的官方插件，用于构建SPA。

vue-router基于路由和组件：

- 路由用于设定访问路径，将路径和组件形成一一映射的关系
- ==路径的改变就是组件的切换，而且切换是创建和销毁组件==

==vue-router是前端路由，改变URL不会刷新页面，只是不同组件的切换==

**安装：**

```js
npm install vue-router --save
```

**使用：**

```js
// router/index.html
import VueRouter from 'vue-router'
import Vue from 'vue'
Vue.use(VueRouter)
cosnt routes = []
const router = new VueRouter({
  routes,						// 用于配置路由和组件的映射关系，是个数组，存放对象，每一个对象都是一个映射关系
  mode: 'history',	// 修改模式，默认hash模式
  linkActiveClass: 'active',	// 统一设置router-link标签生成的类名
})
export default router
```

在Vue实例中挂载

```js
import router from './router'		// 默认找index.html
new Vue({
  router		// 挂载后，所有组件都能使用$router、$route
})
```

router实例的routes属性：用于配置映射关系，是一个存放路由的数组

```js
const Home = () => import('../components/Home')
routes: [
  {
    path: '/',				// 默认路由
    redirect: '/home',// 当页面路径是'/'时，重定向到'/home'
  },
  {
    path: '/home',		// 将'/home'映射Home的路由
    component: Home
  },
  ...
]
```

通过组件router-link和router-view使用路由

```vue
// App.vue
<router-link to="/home">首页</router-link>
<router-link to="/about">关于</router-link>
<router-view></router-view>
```

---



### Router选项

```js
new VueRouter({
  routes: [{psth: '/home', component: Home}, ...],
  mode: 'history',
  linkActiveClass: 'active'
})
```

#### routes

- 类型：Array
- 说明：用于配置路由的相关信息
- 成员对象属性：
  - path：路径
  - redirect：重定向
  - component：组件
  - children：嵌套路由，是个存放子路由的数组
  - beforeEnter：Function，路由守卫
  
  - meta：路由元信息，用于存放各种状态信息， 供组件或路由钩子函数使用
  
    ```js
    this.$route.meta	// 组件
    to.meta						// 钩子函数
    // 遍历 $route.matched 来访问路由记录中的 meta 字段
    ```
  
  - name：命名路由，可以使用router-link标签的name属性指定
  
  - alias：path的别名，如`/a` 别名是 `/b`，当访问 `/b` ，URL 是 `/b`，但路由匹配为 `/a`，就像访问 `/a` 一样

---



#### mode

- 类型：string
- 默认值: `"hash" (浏览器环境) | "abstract" (Node.js 环境)`
- 可选值: `"hash" | "history" | "abstract"`

---



#### linkActiveClass

- 类型：string
-  默认值: `"router-link-active"` 
-  说明：全局组件<router-link>默认激活的class

---



### 实例属性

```js
app						// 配置了router的Vue根实例
mode					// 路由使用的模式
currentRoute	// 当前路由对应的路由信息对象
```

---



### 实例方法

```js
push(location)		// 用于导航到指定的URL，该方法会向 history 栈添加一个新的记录，所以可以前进、后退
replace(location)	// 替换掉当前的 history 记录，不能前进、后退
go(n)			// 在 history 记录中向前或后退n次
back()		// 后退
forward()	// 前进
```

App.vue

```js
this.$router.push('/home')
this.$router.push({path: '/home', query: { plan: 'private' }})
this.$router.replace('/about')
this.$router.go(3)
```

---



### 注入属性

通过在 Vue 根实例挂载router实例，将会注入以下属性，所有子组件都能使用

```js
this.$router		// 创建的router实例
this.$route			// 当前激活的路由信息对象，是一个只读属性
```

$router方法

```js
$router.push
$router.replace
```

$route属性

```js
$route.path		// 获取路由的路径
$route.params	// 动态路由参数的集合，一开始是空对象
$route.query	// 获取router-link的to属性的查询参数，一开始是空对象
$route.name		// 获取路由的名称
$route.hash		// 获取路由的hash值（带#）
$route.matched// 数组，包含当前路由的所有嵌套路径片段的路由记录
// 导航守卫的参数to、from是路由对象
```

---



### 内置组件

安装vue-router时会注册两个全局组件：router-link和router-view

#### router-link

<router-link>组件用于在具有路由功能的应用中点击导航。 通过 to 属性指定目标路由，默认渲染成a标签，路由匹配成功会自动添加一个类名router-link-active。

**属性：**

- to：string || Object

  - 跳转到目标路由对应的组件。点击后会把 `to` 的值传到 `router.push()`

    ```html
    <--! 对象形式要使用v-bind绑定to，有path、name、query、params等属性-->
    <router-link :to="{path: 'home'}"></router-link>
    ```

    

- tag：string

  - 指定<router-link>渲染成某种标签，默认<a>

    ```html
    <router-link to="/home" tag="li">首页</router-link>
    ```

- replace：boolean

  - 点击时调用`router.replace()` 而不是 `router.push()`，不会留下 history 记录，不能后退

    ```html
    <router-link :to="{ path: '/home'}" replace>首页</router-link>
    ```

- active-class：当路由匹配成功，设置生成的类名

  ```html
  <router-link to="/home" active-class="active"></router-link>
  ```

---



#### router-view

<router-view>组件是一个容器。会根据路径的改变，动态渲染匹配的组件

---



### 动态路由

一般路由都是一个路径对应一个组件，但有时会有多个路径对应一个同一个组件。如果每一个路径都要配置一个路由，就显得繁琐，这时可以使用动态路由。

动态路由：将不同页面路径path映射同一个组件，只需要配置一个路由。==动态路由是路由传递数据的一种方式。==

例如对于User组件，不同ID导致页面路径path不同，但都是使用User组件来渲染，比如user/foo和user/bar可以映射到相同的路径user

```js
// 一般路由需要配置两个路由
const routes = [
  {
    path: '/user/foo',
    component: User
  },
  {
    path: '/user/bar',
    component: User
  }
]

// 动态路由只需要配置一个路由
const routes = [
  {
    path: '/user/:userId',	// 可以同时匹配/user/foo和/user/bar，所以是动态的
    component: User
  }
]
```

动态路由的路径参数使用 `:` 标记，表示该段路径是动态的，可以匹配任何字符。还可以设置多段路径参数

```js
'/user/:userNmae'
'/user/:userName/:userId'
```

当匹配到路由时，`this.$route.params`对象存在属性【路径参数: 参数值】，可以在每个组件内使用

```js
/user/black--------{userName: 'black'}
/user/white/77-----{userName: 'white', userId: '77'}
```

---



### 嵌套路由

应用界面通常由多层嵌套的组件组合而成，即路由中还有子路由，这就是嵌套路由。 

==以 / 开头的嵌套路径会被当作根路径，所以嵌套路由不能以 / 开头。==

例如Home组件除了有自己的内容外，还可以拥有子组件HomeNews、HomeMessage

```js
const routes = [
  {
    path: '/home',		//路由
    component: Home,
    children: [				// 子路由
      {
        path: '',			// 不能写 /
        redirect: 'news'
      },
      {
        path: 'news',
        component: HomeNews
      },
      {
      	path: 'message',
      	component: HomeMessage
      }
    ]
  }
]
```

配置好路由后，在Home组件中使用<router-link>和<router-view>来渲染对应的子组件

```vue
// Home.vue
<router-link to="/home/news"></router-link>		// 该组件的路径都是这么写
<router-link to="/home/message"></router-link>
<router-view></router-view>
```

---



### 路由组件传参

在不同路由组件之间跳转过程中可以传递参数，传递方法有两种：

#### params

动态路由可以让路由组件之间传递参数，通过this.$route.params.参数名来获取参数值。

例如App.vue向User.vue传递参数

```js
// router/index.js
const routes = [
  {
    path: '/user/:name',
  }
]
```

```vue
// App.vue
<router-link to="/user/black"></router-link>
// 等同于
<button @click="$router.push('/user/black')"></button>

<router-view></router-view>
```

```vue
// User.vue
<p>{{$route.params.name}}</p>
```

---



#### query

<router-link>标签的to属性使用对象形式（v-bind绑定），有个query属性，是一个存放参数的对象。

例如App.vue向Profile.vue传递参数

```vue
// App.vue,跳转到组件Profile时，把query也传递过去
<router-link :to="{path: '/prodile', query: {name: 'aa', age: 18}}"></router-link>
//等同于
<button @click="$router.push({path: '/profile', query: {name: 'aa', age: 18}})"></button>

<router-view></router-view>
```

```vue
// Profile.vue
<p>{{$route.query.name}}</p>
```

---



### 导航守卫

==“导航”表示路由跳转，导航守卫可以看做是 vue-router 的生命周期钩子==

- 只要发生路由跳转，就会调用全局守卫
- 只有跳转到指定的路由，才会调用路由守卫

完整的导航过程：

- 触发导航
- 调用全局守卫beforeEach
- 调用路由守卫beforeEnter
- 调用全局守卫afterEach

#### 全局守卫

全局守卫由路由实例调用创建。有三种：

- beforeEach：导航之前执行，必须调用next()才能完成导航

- beforeResolve：

- afterEach：导航之后执行，没有next方法

  ```js
  // router/index.js
  const router = new VueRouter({...})
  router.beforeEach((to, from, next) => {
    ...
    next();
  })
  /* to: Route，即将要进入的路由
  	 from: Route，当前导航正要离开的路由
  	 next: Function，函数最后要调用该方法，因为是导航之前执行该函数，只有调用next()才能继续导航 */
  
  router.afterEach((to, from) => {
    ...
  })
  ```

---



#### 路由守卫

路由守卫在配置路由中定义

- beforeEnter：跳转到指定路由之前执行

  ```js
  const routes = [
    {
      path: '/about',
      component: 'About',
      beforeEnter: (to, from, next) => {
        ...
        next();
      }
    }
  ]
  ```

---



#### 组件守卫

组件守卫在组件属性中定义

- beforeRouteEnter：在渲染该组件的对应路由被 confirm 之前调用

- beforeRouteUpdate：在当前路由改变，但是该组件被复用之前调用

- beforeRouteLeave：导航离开该组件的对应路由之前调用

  ```js
  const Foo = {		// 组件Foo
    template: `...`,
    beforeRouterEnter(to, from, next) {...},	// 不能访问this
    beforeRouterUpdate(to, from, next) {...},
    beforeRouterLeave(to, from, next) {...}
  }
  ```

  ```vue
  // vue文件
  <script>
  	export default {
      name: 'Home',		// name用于keep-alive的exclude属性
      created() {...},
      activated() {...},
      beforeRouterLeave(to, from, next) {...}
    }
  </script>
  ```

---



### 路由懒加载

当打包应用时，js文件可能很大，这就会影响页面加载。可以把不同路由对应的组件各自打包成js文件，当路由被访问时才加载对应组件

```js
const Home = () => import('../components/Home')	//一个组件对应一个打包js文件
```

---



### keep-alive结合router-view

keep-alive是Vue的内置组件，可以使被包含的组件保留状态，不会被重新渲染。

router-view是安装插件vue-router时内置的组件，所有路径匹配到的视图组件都会被缓存，而不是被销毁

```vue
// Home.vue
<router-link to="/home/news"></router-link>
<router-link to="/home/message"></router-link>
<keep-alive exclude="User,Profile">
	<router-view></router-view>
</keep-alive>

activated() {}		// Home处于激活状态时调用
deactivated() {}	// Home处于不激活状态时调用
```

---



## vuex状态管理

### 概述

vuex是一个专为 Vue.js 应用程序开发的**状态管理模式**。它采用**集中式存储**管理应用的所有组件的状态。

实质：将需要多个组件共享的变量全部存储在一个对象，再将这个对象放在Vue原型中，这样所有组件都能使			用，而且==vuex是响应式的==。

vuex也是一个插件，提供在多个组件间共享状态（如登录状态）。如果需要多个组件之间传值就要使用vuex。

**单一状态树：**vuex是用一个对象包含了所有的状态，该对象就是唯一数据源。==即每个应用只有一个store实例==

**安装：**

```js
npm install vuex --save
```

**使用：**

```js
// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {},			// 共享数据
  getters: {},		// 计算属性
  mutations: {},	// 同步方法
  actions: {},		// 异步方法(网络请求)
  modules: {}			// 模块化vuex
})
export default store
```

在Vue实例中挂载

```js
// main.js
import store from './store'
new Vue({
  store		// 挂载后，所有组件都能使用$store
})
```

---



### Vuex.Store选项

#### state

state用于存储基本数据。==不能直接修改state，而是通过mutation来修改state。==

vuex使用单一状态树，即用一个对象包含了全部的状态。`state`作为构造器选项，定义了所有基本状态参数。

```js
state: {
  count: 0,
  ...
}

this.$store.state.count		// 在组件中使用
```

---



#### getters

getters是store的计算属性。

方法参数：state对象、getters对象（可选）

```js
getters: {
  decrement(state, getters) {},
  increment(state) {
    return function(p) {}
  }
}

this.$store.getters.decrement			// 在组件中使用
this.$store.getters.increment(1)	// 传参
```

---



#### mutations

mutations用于定义同步方法。因为devtools无法追踪mutation的异步操作，所以异步要写在actions。

==提交mutation是更改state的唯一方法。==

mutation类似于事件，包括两部分：

- 字符串的事件类型（type）
- 回调函数（handler），参数：state对象、payload（可选）

```js
mutations: {
  increment(state) {},		// increment是事件类型
  decrement(state, payload) {}
}

this.$store.commit('increment')		// 使用
this.$store.commit('decrement', {name: 'aa', age: 18})// 传参
this.$store.commit({			// 对象形式提交，对象传给payload
  type: 'increment',
  name: 'aa',
  age: 18
})
```

store实例中的state是响应式的：当通过mutation更改状态时，监视状态的组件也会自动刷新。但要注意：

- 使用Vue.set(对象, 属性, 属性值)给state添加新的属性
- 使用Vue.delete(对象, 属性)删除state的属性

---



#### actions

actions用于定义异步方法，actions不更改state，而是通过提交mutation来更改state。

action接受一个context对象作为参数，是一个store实例，与store实例具有相同的属性和方法。

==action里面可以提交多个mutation。==

```js
actions: {
  increment(context) {
    if(网络请求) context.commit('myMutation1')	// 网络请求是否成功
    else context.commit('myMutation2')
  },
  decrement({commit, dispatch}, payload) {	// 对象解构
    commit('myMutation')		// action提交mutation
    dispatch('increment')		// action也可以分发action
  }
}

this.$store.dispatch('increment')		// 使用
this.$store.dispatch({							// 对象形式分发
  type: 'decrement0',
  name: 'aa',
  age: 18
})
```

context参数：

```js
context = {
  state,		// 对象
  getters,	// 对象
  commit,		// 函数
  dispatch	// 函数
}
```

**异步操作的处理流程：**组件 ---> 分发action ---> 提交mutation ---> 操作state

---

**结合Promise：**

action是异步的，有些操作需要知道 action 什么时候结束才能执行。因为`store.dispatch` 可以处理action返回的 Promise。所以组件分发action，action再返回Promise给组件，组件通过then执行之后的操作

```js
actions: {
  actionA({commit, dispatch}) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation');
        resolve()			// 异步完成时通知组件
      }, 1000)
    })
  }
}

this.$store.dispatch('actionA').then(() => {
  // 异步完成后要执行的操作
})
```

==action的返回值如果不是Promise，那么会被包含在一个Promise，再返回该Promise==

---



#### modules

vuex使用单一状态树，所有状态会集中到一个对象。当应用变得非常复杂时，store 对象就会变得难于管理。所以vuex允许将 store 分割成**模块**。每个模块都可以拥有自己的 state、getters、mutations、actions、modules

```js
const moduleA = {
  state: {},
  getters: {},
  mutations: {},
  actions: {}
}
const moduleB = {		// 也可以没有一些属性
  state: {},
  mutations: {}
}
...
const store = new Vuex.Store({		// store实例模块化后就变得很清晰了
  modules: {
    moduleA,
    moduleB,
    ...
  }
})
```

---

**模块的局部状态**

- 局部state

  store实例的state选项会将模块名作为自己的属性，是一个对象，该模块的局部state全部放在该对象中

  ```js
  this.$store.state.moduleA.属性		// moduleA作为state的属性
  ```

- 局部getters

  接受三个参数：局部state、局部getters（可选）、根节点状态rootState（可选）

  ```js
  add(state[, getters, rootState]) {}
  this.$store.getters.add		// 使用
  ```

- 局部mutations

  接受两个参数：局部state、载荷payload（可选）

  ```js
  sub(state[, payload]) {}
  this.$store.commit('increment')		// 使用
  ```

- 局部actions

  参数：是一个store实例，包含本模块的属性state、getters等，只能提交、分发本模块的mutation、action

  ```js
  ajax(context) {}
  this.$store.dispatch('ajax')			// 使用
  ```

  context参数

  ```js
  context = {state,getters,commit,dispatch,
    rootGetters,	// 根节点getters
    rootState			// 根节点state
  }
  ```

---



### 注入属性

通过在Vue根实例中挂载store实例，将会以下属性，所有组件都能使用

```js
this.$store		// 创建的store实例
```

$store属性和方法

```js
$store.state
$store.getters
$store.commit()
$store.dispatch()
```





---



### 调试工具devtools

devtools是Vue官方开发的一个浏览器插件，用于捕捉mutation操作state的快照。

<img src="C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20200107004421242.png" alt="image-20200107004421242" style="zoom:80%;" />

---



### 遵守规则

- 共享的状态要集中到单个store实例中

- 提交mutation是更改状态的唯一方法，并且这个过程是同步的

- 异步逻辑都应该封装到 action里面

---



### vuex目录结构

 如果store文件太大，可以将 action、mutation 和 getter 分割到单独的文件，modules放在文件夹里。

```bash
├── main.js
├── api
│   └── ... # 抽取出API请求
└── store
    ├── index.js          # 创建store实例，导入getters.js、mutations.js、actions.js
    ├── actions.js        # action
    ├── mutations.js      # mutation
    └── modules
        ├── cart.js       # 购物车模块
```

---



## axios网络请求

### 概述

网络请求方式：

- 原生Ajax（基于XMLHttpRequest(xhr)）

- jQuery-Ajax

- vue-resource（废弃）

- fetch

- axios

  **特点：**

  - 在浏览器中发送XMLHttpRequests
  - 在node.js中发送http请求
  - 支持Promise API
  - 拦截请求和响应
  - 转换请求数据和响应数据
  - 自动转换JSON数据
  - 客户端支持防御XSRF
  - 等等

  **安装：**

  ```js
  npm install axios --save
  ```

  **使用：**

  ```js
  import axios from 'axios'		//导入axios全局实例
  axios({
    url: '',
    method: 'get',params: {},
    
  }).then(res => {})
  
  axios.get(url[, config])
  axios.post(url[, data, config])
  axios.all([axios(...), axios(...)]).then(axios.spread((res1, res2) => {}))//并发请求
  
  axios.default.baseURL = 'http://123.207.23.23:8000'		// 全局配置
  ```

  通常不使用导入的axios实例，而是创建自己的axios实例

  ```js
  const instance = axios.create({		// 创建
    baseURL: 'http://123.207.23.23:8000',
    timeout: 100
  })
  
  instance({		// 使用
    url: '/home/data'
  })
  
  // 拦截器
  instance.interceptors.request.use(config => {		// 请求拦截
    console.log('请求成功的拦截');
    return config;
  }, err => {
    console.log('请求失败的拦截');
    return err;
  })
  
  instance.interceptors.response.use(response => {
    console.log('响应成功的拦截');
    return response.data;
  }, err => {
    console.log('响应失败的拦截');
    return err;
  })
  ```

---



### axios目录结构

```js
├── main.js
├── api
│   └── ... 	# 抽取出API请求
└── network   # 每个js文件封装一个视图组件的所有网络请求函数
    ├── request1.js
    ├── request2.js
    └── ...
```

```js
// request.js
export function request(config) {
  const instance = axios.create({...});
  return instance
}
...
```



---



### 跨域

浏览器的同源策略



---



## 项目开发

- cli3创建项目

  ```shell
  >vue create 项目名称
  ```

- GitHub托管

  ```shell
  
  ```

- 项目结构

  ```js
  src								// 源码目录
  ├── api						// 抽取出API请求
  ├── assets				// 静态资源
  │   ├── css
  │   ├── img
  ├── common				// 公共js方法
  ├── components		// 公共组件
  │   ├── common
  │   ├── content
  ├── network				// 网络请求
  │   ├── request.js// 面向axios。如果不再使用axios，只要修改该文件
  │   ├── viewXXX.js// 面向request.js。如果url改变，只要修改该文件；项目面向viewXXX.js开发
  ├── router				// 路由
  ├── store					// 状态管理
  ├── views					// 唯一视图组件
  │   ├── viewComponent
  │   │   ├── childComponents
  │		│		└── component.vue
  ├── App.vue
  └── main.js
  ```

- css文件引入

  ```js
  /* 在css目录引入normalize.css和base.css
     normalize.css：用于规范化HTML元素在不同浏览器的样式
     base.css：用于定义css变量、原子类、重置默认样式、基础样式
  */
  App.vue引入base.css；base.css引入normalize.css
  ```

- 配置路径别名

  ```js
  // vue.config.js
  module.exports = {
    configureWebpack: {
      resolve: {	// cli3默认配置好省略文件扩展名
        alias: {	// 默认@是src；img标签要加上~
          'assets': '@/assets',
          'common': '@/common',
          'components': '@/compponents',
          'network': '@/network',
          'views': '@/views'
        }
      }
    }
  }
  // 在项目下创建.editorconfig文件，用于规范代码风格
  ```

- 修改图标

  ```js
  项目>public>index.html>link标签：修改href属性
  ```

- 方法

  - 在created钩子函数中写网络请求
  - 在mounted中操作DOM元素和属性
  - 当使用对象时，先判断对象是否存在，再判断属性是否存在。。。最后再使用
  - 

---



## Vue生命周期

![image-20191219173010960](C:\Users\Administrator\AppData\Roaming\Typora\typora-user-images\image-20191219173010960.png)

---



## 组件通信

组件通信有六种方式。

- 父子通信
  - 父传子：props属性、`$children`、`$refs`
  - 子传父：自定义事件、`$parent`

- 兄弟通信
  - bus
  - vuex

- 跨级通信
  - bus
  - vuex
  - provide / inject API
  - `$attrs/$listeners`

---



## 响应式原理





- 在Vue实例初始化过程中，data属性中的数据会被添加到响应式系统中，响应式系统会监听这些数据的变化。当数据发生变化时，响应式系统会通知界面中所有用到该数据的地方，让数据发生刷新。

- 而在方法等地方新添加的数据不会响应式的在界面刷新：
  - 数组通过索引操作数组元素是不会响应式的
  - 对象通过obj[‘属性’] = 属性值方式添加的属性不是响应式的

  - delete操作也不是响应式的

- 下列接口都是响应式的：
  - Vue.set(数组，索引值，修改值)
  - Vue.set(对象，属性，属性值)
  - Vue.delete(对象， 属性)
  - 数组的push、pop、splice等方法

---



## 其他

### 导入CSS文件

```js
@import '文件路径'
```

---



### 防抖debounce

触发事件等待指定时间内只执行一次函数

```js
// 触发事件，就将处理函数fn传进来，等待wait毫秒
function debounce(fn, wait) {
  let timeout = null;
  return function() {
    if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn.apply(this, arguments)  //fn是触发事件要执行的函数
      }, wait);
  }
}
this.debounce(this.$refs.scroll.refresh, 1000)		// 使用
```

应用场景：

- 搜索框输入查询
- 表单验证
- 按钮提交事件
- 浏览器窗口缩放

---



### 节流throttle

触发事件后在指定时间内只执行一次函数

应用场景：

- 按钮点击事件
- onscroll
- 计算鼠标移动距离
- 拖拽事件

---


