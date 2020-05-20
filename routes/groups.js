var express = require('express');
var router = express.Router();

/* 获取用户基本信息 */
router.get('/info', function(req, res, next) {
  res.send('users info');
});

module.exports = router;
