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
router.get('/', function(req, res, next) {
  const {id} = req.query;
  if(isNaN(id)) {res.send(gerResponse(null ,403, false, '参数有误')); return};
  UserModel.findOneById(id).then(body => {
    if(body){
      res.send(gerResponse(body));
      return;
    };
    res.send(gerResponse(null ,404, false, '数据不存在'));
  }).catch(e => next(e))
});

/** 更新用户基本信息 */
router.put('/', function(req, res, next) {
  const { userId, ...restParams } = req.body;
  UserModel.updateOneById(userId, restParams).then(body => {
    if(body){
      res.send(gerResponse());
      return;
    };
    res.send(gerResponse(null ,404, false, '数据更新失败'));
  }).catch(e => next(e))
});

/** 获取用户组成员列表 */
router.get('/groups', function(req, res, next) {
  const {groupId} = req.query;
  UserModel.findAllByGroupId(groupId).then(body => {
    if(body){
      res.send(gerResponse({results: body}));
      return;
    };
    res.send(gerResponse(null ,404, false, '数据不存在'));
  }).catch(e => next(e))
});

/** 新增用户组成员 */
router.post('/groups', function(req, res, next) {
  const {groupId, userId} = req.body;
  UserModel.updateOneById(userId, {groupId}).then(body => {
    if(body){
      res.send(gerResponse());
      return;
    };
    res.send(gerResponse(null ,404, false, '数据更新失败'));
  }).catch(e => next(e))
})

/** 删除用户组成员 */
router.delete('/groups', function(req, res, next) {
  const { groupId, userId } = req.query;
  UserModel.deleteOneGroupMemeberById(userId, groupId).then(body => {
    if(body){
      res.send(gerResponse());
      return;
    };
    res.send(gerResponse(null, 404, false, '删除成员失败'));
  })
})

module.exports = router;
