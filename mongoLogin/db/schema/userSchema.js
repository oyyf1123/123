const mongoose = require('mongoose');

//创建骨架的模块

// options 表示一个对象。对象中存储的是字段和字段类型
//const userSchema = new mongoose.Schema(options);
const userSchema = new mongoose.Schema({
  tel:String,
  pass:String
});
module.exports = userSchema;