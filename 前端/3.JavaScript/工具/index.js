(function flexible(window, document) {
    //获取html元素
    var docEl = document.documentElement
        //dpr物理像素比
    var dpr = window.devicePixelRatio || 1

    // adjust body font size 设置body的字体大小
    function setBodyFontSize() {
        //如果页面有body这个元素，就设置body的字体大小
        if (document.body) {
            document.body.style.fontSize = (12 * dpr) + 'px'
        }
        //如果没有body，就等着页面主要的DOM元素加载完毕再去设置body
        else {
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();

    // set 1rem = viewWidth / 10
    //设置html元素的字体大小
    function setRemUnit() {
        var rem = docEl.clientWidth / 10
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()

    // reset rem unit on page resize
    //当页面尺寸大小发生变化时，重新设置rem的大小
    window.addEventListener('resize', setRemUnit)
        //pageshow是重新加载页面触发的事件
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) { //返回true，就是该页面时从缓存取过来的页面，也需要重新计算rem的大小
            setRemUnit()
        }
    })

    // detect 0.5px supports
    //有些移动端的浏览器不支持0.5像素的写法
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))