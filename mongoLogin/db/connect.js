const mongoose = require('mongoose');
const DBNAME = 'oyyf';
//mongodb: //127.0.0.1:27017/数据库名称
// mongoose.connect( 数据库地址  错误优先的回调函数 )

const connect = {
  init() {
    mongoose.connect(`mongodb://127.0.0.1:27017/${DBNAME}`, error => {
      if (error) {
        console.log(error);
      } else {
        console.log('连接成功');
      }
    })
  }
};

module.exports = connect;