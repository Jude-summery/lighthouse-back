const express = require('express');
const router = express.Router();

const UserModel = require('../models/users');
const gerResponse = require('../util/getResponse');

/** 用户注册 */
router.get('/signup', function(req, res, next) {
  UserModel.create().then(()=>{
    res.send(gerResponse('创建成功'));
  }).catch(e => next(e))
});

/** 获取用户基本信息 */
router.get('/info', function(req, res, next) {
  const {id} = req.query
  UserModel.findOne(id).then(body => {
    if(body){
      res.send(gerResponse(body));
    };
    res.send(gerResponse(null ,404, false, '数据不存在'));
  }).catch(e => next(e))
});

module.exports = router;
