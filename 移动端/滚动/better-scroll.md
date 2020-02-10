# better-scroll

## 概述

better-scroll 是一款重点解决移动端（已支持 PC）各种滚动场景需求的插件。核心是借鉴的iscroll的实现。

特点：

- ==基于原生 JS 实现的，不依赖任何框架==

- 轻量的 JS lib

官网： https://ustbhuangyi.github.io/better-scroll/doc/zh-hans

---



## 滚动原理

<img src="https://better-scroll.github.io/docs/assets/images/schematic.png" alt="原理图" style="zoom: 25%;" /> 

==content必须是wrapper的第一个子元素==，当content的高度超过wrapper，content就能滚动。所有滚动条件：

- 设置wrapper高度

- content高度超过wrapper

  ```js
  // better-scroll对外暴露了BScroll函数，参数：元素el、配置对象options
  new BScroll(el[, options])
  
  const scroll = new BScroll(document.querySelector('.wrapper'))
  ```

---



## 配置项

### probeType

- 类型： Number
- 默认值：0（不监听）
- 可选值
  - 1：滑动一段时间派发scroll事件
  - 2：滑动时刻派发scroll事件
  - 3：滑动+滚动时刻监听scroll事件

- 作用：监听scroll事件，常用 3 结合scroll事件使用

---



### click

- 类型：Boolean
- 默认值： false
- 作用：better-scroll默认阻止浏览器的原生click事件，除了button标签

---



### pullDownRefresh

- 类型：Boolean | Object
- 默认值：false
- 作用：下拉刷新，为true或对象时，会开启下拉刷新。结合pullingDown事件使用

---



### pullUpLoad

- 类型：Boolean | Object
- 默认值：false
- 作用：上拉加载，为true或对象时，会开启上拉加载。结合pullingUp事件使用

---







---



## 实例属性

```js
scrollHeight	// 实例最重要的属性，记录了content的高度，常结合refresh()使用
```

---



## 实例方法

```js
refresh()					// 用于刷新scrollHeight属性，确保滚动效果正常
scrollTo(x,y,time)// 滚动到指定位置,用时time毫秒
on(type, fn)			// 监听实例的事件scroll等，fn参数position：上下文环境
finishPullDown()	// 当下拉刷新数据加载完成后，调用此方法可再次触发下拉刷新
finishPullUp()		// 当上拉加载数据加载完成后，调用此方法可再次触发上拉加载
```

---



### 事件

```js
scroll				// 滚动时触发，取决于probeType
pullingDown		// 顶部第一次下拉时触发，调用finishPullDown()可再次触发，取决于pullDownRefresh
pullingUp			// 底部第一次上拉时触发，调用finishPullUp()可再次触发，取决于PullUpLoad
```

---



## 在Vue中使用

**安装：**

```shell
>npm install better-scroll --save
```

**封装：**

```vue
// MyScroll.vue
1.导入better-scroll并挂载
2.模板：<div class="wrapper" ref="wrapper"><div class="content"><slot/></div></div>
3.定义数据scroll
4.mounted函数中创建BScroll实例并指向scroll
5.其他组件导入MyScroll使用时定义高度<my-scroll class="customheight">滚动内容</my-scroll>
```

**使用：**

```js
import Scroll from 'components/common/myscroll/MyScroll'

mounted() {		// 在组件的mounted钩子函数中使用Scroll
  this.scroll = new Scroll(this.$refs.wrapper, {
    probeType: 3,			// 监听scroll事件
    pullUpLoad: true,	// 监听pullingUp事件
  })
  this.scroll.on('scroll', (position) => {})	// position是坐标对象
  this.scroll.on('pullingUp', () => {})
}
// 如果子元素或父元素 DOM 结构发生改变，必须调用scroll.refresh()方法重新计算来确保滚动效果
```

---



## scrollerHeight问题

实例的scrollHeight属性用于记录content的高度。但对于图片，有时候图片还未加载完，scrollHeight属性记录的高度不报考图片高度，等到图片加载完成，scrollHeight却没有刷新。解决：

因为所有标签都有load事件，标签加载完成会触发该事件。所以可以给img标签添加load事件，在处理函数中手动调用refresh()刷新scrollHeight属性。

==better-scroll插件出现的问题大多是scrollHeight问题==

































