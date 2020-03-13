const http = require('http')
const slice = Array.prototype.slice;

class Express {
  constructor() {
    this.routes = {
      all: [],
      get: [],
      post: []
    }
  }

  use() {
    const info = this.register.apply(this, arguments);
    this.routes.all.push(info);
  }

  get() {
    const info = this.register.apply(this, arguments);
    this.routes.get.push(info);
  }

  post() {
    const info = this.register.apply(this, arguments);
    this.routes.post.push(info);
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }

  // 处理use、get、post的参数，返回一个对象
  register(path) {
    // 不传参数
    if(arguments.length === 0) {
      throw new Error('There must be params!')
    }

    let type = typeof path;

    // path是其他类型
    if (type !== 'string' && type !== 'function') {
      throw new Error(path + 'is not a string or function!');
    }

    const info = {};

    // path是路径
    if (type === 'string') {
      info.path = path;
      info.middleware = slice.call(arguments, 1);
      return info;
    }

    // path是函数
    info.path = '/';
    info.middleware = slice.call(arguments, 0);
    return info;
  }

  // 响应请求的函数
  callback() {
    // 要使用箭头函数，绑定this指向Express对象，或者声明一个指向Express对象的变量
    return (req, res) => {
      //添加json响应
      res.json = function (data) {
        res.setHeader('content-type', 'application/json');
        res.end(JSON.stringify(data));
      }

      const method = req.method.toLowerCase();
      const url = req.url;
      const mwArr = this.getMiddleware(method, url);
      this.execute(req, res, mwArr);
    }
  }

  // 获取要执行的中间件
  getMiddleware(method, url) {
    let mwArr = [];
    if (url === 'favicon.ico') {
      return mwArr;
    }
    // 万能匹配
    this.routes.all.forEach(item => {
      if (url.indexOf(item.path) === 0) {
        mwArr = mwArr.concat(item.middleware);
      }
    });
    // 精确匹配
    this.routes[method].forEach(item => {
      if (url === item.path) {
        mwArr = mwArr.concat(item.middleware);
      }
    });
    return mwArr;
  }

  // 执行所有的中间件, next函数的实现
  execute(req, res, mwArr) {
    function next() {
      if (mwArr.length !== 0) {
        let fn = mwArr.shift();
        fn(req, res, next)
      }
    }
    next();
  }
}

module.exports = () => {
  return new Express();
}
