const express = require('express');
const router = express.Router();

const UserModel = require('../models/users');
const getResponse = require('../util/getResponse');

/** 用户注册 */
router.post('/signup', function (req, res, next) {
  UserModel.create().then(() => {
    res.send(getResponse('创建成功'));
  }).catch(e => next(e))
});

/** 获取用户基本信息 */
router.get('/info/:id', function (req, res, next) {
  const { id } = req.params;
  if (isNaN(id)) { res.send(getResponse(null, 403, false, '参数有误')); return };
  UserModel.findOneById(id).then(body => {
    if (body) {
      res.send(getResponse(body));
      return;
    };
    res.send(getResponse(null, 404, false, '数据不存在'));
  }).catch(e => next(e))
});

/** 更新用户基本信息 */
router.put('/info/:id', function (req, res, next) {
  const { id } = req.params;
  UserModel.updateOneById(id, req.body).then(body => {
    if (body) {
      res.send(getResponse());
      return;
    };
    res.send(getResponse(null, 404, false, '数据更新失败'));
  }).catch(e => next(e))
});

/** 获取用户组成员列表 */
router.get('/groups/:groupId', function (req, res, next) {
  const { groupId } = req.params;
  UserModel.findAllByGroupId(groupId).then(body => {
    if (body) {
      res.send(getResponse({ results: body }));
      return;
    };
    res.send(getResponse(null, 404, false, '数据不存在'));
  }).catch(e => next(e))
});

/** 新增用户组成员 */
router.put('/groups/:groupId', function (req, res, next) {
  const { groupId } = req.params;
  const { userId } = req.body;
  UserModel.updateOneById(userId, { groupId }).then(body => {
    if (body) {
      res.send(getResponse());
      return;
    };
    res.send(getResponse(null, 404, false, '数据更新失败'));
  }).catch(e => next(e))
})

/** 删除用户组成员 */
router.delete('/groups/:groupId', function (req, res, next) {
  const { groupId } = req.params;
  const { userId } = req.query;
  UserModel.deleteOneGroupMemeberById(userId, groupId).then(body => {
    if (body) {
      res.send(getResponse());
      return;
    };
    res.send(getResponse(null, 404, false, '删除成员失败'));
  })
})

module.exports = router;
