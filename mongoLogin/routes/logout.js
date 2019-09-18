const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/logout')
  .delete( async  (req, res, next) => {

    const result = await db.user.del(req.body)

    res.render('logout', {

      data: JSON.stringify({

        info: result.info,

        status: result.status
      })
    })

  })

module.exports = router;