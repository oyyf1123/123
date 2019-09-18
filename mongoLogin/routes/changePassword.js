const express = require('express');
const router = express.Router();
const db = require('../db');

router.route('/changePassword')
  .put( async  (req, res, next) => {

    const result = await db.user.change(req.body)

    res.render('changePassword', {

      data: JSON.stringify({

        info: result.info,

        status: result.status
      })
    })

  })

module.exports = router;