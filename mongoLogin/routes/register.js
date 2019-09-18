var express = require('express');
var db = require('../db');
var router = express.Router();

router.route('/register')
  .post(async (req,res,next) => {

   // console.log('req.body',req.body); //收到一个对象 { usertel: '18879966669', userpass: '111' }


  const result = await db.user.add(req.body);
  console.log('result',result);


    res.render('register',{
      data:JSON.stringify({    //检验是否配置成功
        status:result.status,
        info:result.info
      })
    } )
  })

module.exports = router;