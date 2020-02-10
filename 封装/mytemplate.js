/**
 *  功能：模拟art-template模板引擎的替换
 * @param {*} id 字符串
 * @param {*} data 对象
 */
function mytemplate(id, data) {
  let str = document.getElementById(id).innerHTML;
  let regex = /{{(\w+)}}/;
  let keyword = regex.exec(str);
  while(keyword) {
    str = str.replace(keyword[0], data[keyword[1]]);
    keyword = regex.exec(str);
  }
  return str;


}
