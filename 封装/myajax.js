/**
 * 功能：模拟jQuery Ajax发送简单请求
 * @param {*} options
    键名:
      type:String，get或post，默认get
      url:String，必须
      data:String，key1=value1&key2=valur2
      success:Function，必须
 */
function myajax(options) {
  // options必须传入且是对象
  if (options instanceof Object) {
    // 判断url
    if (options.url) {
      // 判断type
      if (!options.type) {
        options.type = 'get';
      }

      // 判断data
      if(!options.data) {
        options.data = null;
      }

      // 创建xhr对象
      let xhr = new XMLHttpRequest();
      if(options.type === 'get' && options.data) {
        options.url+='?'+options.data;
      } else if(options.type === 'post') {
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded")
      }
      xhr.open(options.type, options.url);
      xhr.onreadystatechange = function() {
        if(xhr.readyState === 4 && xhr.status === 200) {
          let type = xhr.getResponseHeader('Content-Type');
          if(type.indexOf('xml') != -1) {
            options.success(xhr.responseXML);
          } else if(type.indexOf('json') != -1) {

            options.success(JSON.parse(xhr.responseText));
          } else {
            options.success(xhr.responseText);
          }
        }
      }
      xhr.send(options.data);

    } else {
      throw new Error('There was no the prop url')
    }
  } else {
    throw new Error('The param of this function must be a object!')
  }
}
