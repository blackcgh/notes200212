# touch 事件

## 触摸事件

```js
touchstart					// 手指触摸 DOM 元素时触发
touchmove						// 手指在 DOM 元素上滑动时触发
touchend						// 手指离开 DOM 元素时触发
```

---



## 触摸事件对象

TouchEvent 是触发触摸事件时，系统创建的对象，记录了与触摸相关的信息，比如触摸点的位置、数量等。

**TouchEvent 属性/方法**

```js
touches							// 获取含有屏幕上所有触摸点的列表，类似数组
targetTouches				// 获取正在触摸的 DOM 元素上所有触摸点的列表（重点）
changedTouches			// 获取触摸点从无到有、从有到无的状态的列表
```

**注意：**

- 手机屏幕有默认的屏幕滚动事件，手指移动会触发该事件，可以阻止该默认行为e.preventDefault()，使屏幕不动，元素移动









