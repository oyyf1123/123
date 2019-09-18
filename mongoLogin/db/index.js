//   index 开头带包了这个文件或文件夹的作用
// 好处是可以省略index

// 模块的创建   对象。函数。字符。。
//mongoose使用流程
//require('./connect')
const mongoose = require('mongoose');
const connect = require('./connect')

connect.init();
// 创建骨架
const { userSchema } = require('./schema')

//创建模型

//const userModel = mongoose.model(集合名称【复数】，对应的骨架)
const userModel = mongoose.model('yyfs', userSchema);


const db = {
  user: {
    // 增加用户
    add(data) {
      return new Promise((resolve, reject) => {
        console.log(data);
        const user = new userModel(data);
        //限定条件
        userModel.find({}, (error, docs) => {
          // console.log(docs);//数组 里面存放着数据库里面的数据
          if (docs.length != 0) {
            const temp = docs.some(item => item.tel === data.tel)
            console.log(temp);
            if (temp) {
              resolve({
                info: '用户名重复',
                status: 0
              })
            } else {
              user.save(error => {
                if (error) {
                  resolve({
                    info: error,
                    status: 1
                  })
                } else {
                  resolve({
                    info: '注册成功',
                    status: 2
                  })
                }
              })
            }
          } else {
            //没有数据
            user.save(error => {
              if (error) {
                resolve({
                  info: error,
                  status: 1
                })
              } else {
                resolve({
                  info: '注册成功',
                  status: 2
                })
              }
            })
          }

        })
      })
    },
    //删除用户
    del(data) {
      return new Promise((resolve, reject) => {
        userModel.find({}, (error, docs) => {
          if (docs.length != 0) {
            docs.map(item => {
              if (item.tel === data.tel) {
                userModel.findById(item._id, (error, doc) => {
                  doc.remove(error => {
                    if (error) {
                      resolve({
                        info: '注销失败',
                        status: 0
                      })
                    } else {
                      resolve({
                        info: '您已注销',
                        status: 1
                      })
                    }
                  })
                })
              }
            })
          }
        })
      })
    },
    //修改密码
    change(data) {
      return new Promise((resolve, reject) => {
        userModel.find({}, (error, docs) => {
          if (docs.length != 0) {
            docs.map(item => {
              if (item.tel === data.tel) {
                userModel.findById(item._id, (error, doc) => {
                  doc.pass = data.pass
                  doc.save(error => {
                    if (error) {
                      resolve({
                        info: '修改失败',
                        status: 0
                      })
                    } else {
                      resolve({
                        info: '修改成功',
                        status: 1
                      })
                    }
                  })
                })
              }
            })
          }
        })
      })
    },
    //用户登录---用户查询
    query(data) {
      return new Promise((resolve, reject) => {
        userModel.find({}, (error, docs) => {
          if (docs.length != 0) {
            const temp = docs.some(item => item.tel === data.tel && item.pass === data.pass)
            console.log(temp);
            if (temp) {
              resolve({
                info: '登录成功',
                status: 1,
                usertel: data.tel
              })
            } else {

              const temp2 = docs.some(item => item.tel === data.tel)
              if (temp2) {
                resolve({
                  info: '账号或密码错误',
                  status: 2
                })
              } else {
                resolve({
                  info: '该手机号还没注册,是否注册',
                  status: 3
                })
              }

            }
          } else {
            resolve({
              info: '欢迎第一个加入我们，请先行注册',
              status: 0
            })
          }
        })
      })
    }
  }
}


module.exports = db;