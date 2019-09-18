var express = require('express');
var db = require('../db');
var router = express.Router();

router.route('/login')
  .post(async (req, res, next) => {

    // console.log('req.body',req.body); //收到一个对象 { tel: '18879966669', pass: '111' }
    const result = await db.user.query(req.body);
    console.log('result', result);


    res.render('login', {
      data: JSON.stringify({    //检验是否配置成功,提示信息
        status: result.status,
        info: result.info,
        usertel: result.usertel
      })
    })
  })

module.exports = router;