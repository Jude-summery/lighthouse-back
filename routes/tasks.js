const express = require('express');
const router = express.Router();

const TaskModel = require('../models/tasks');
const getResponse = require('../util/getResponse');

/** 获取所有任务 */
router.get('/', function(req, res, next) {
    TaskModel.findAll().then(body => {
        if(body) {
            res.send(getResponse(body));
            return;
        };
        res.send(getResponse(null, 404, false, '数据不存在'))
    }).catch(e => next(e))
});

/** 创建任务  */
router.post('/', function(req, res, next) {
    const { body } = req;
    TaskModel.create(body).then(() => {
        res.send(getResponse('创建成功'));
    }).catch(e => next(e))
});

/** 修改任务 */
router.put('/:id', function(req, res, next) {
    const { id } = req.params;
    TaskModel.updateOneById(id, req.body).then(body => {
        if(body) {
            res.send(getResponse());
            return;
        };
        res.send(getResponse(null, 404, false, '数据更新失败'));
    }).catch(e => next(e))
});

/** 删除任务 */
router.delete('/:id', function(req, res, next) {
    const { id } = req.params;
    TaskModel.deleteOneById(id).then(body => {
        if(body) {
            res.send(getResponse());
            return;
        };
        res.send(getResponse(null, 404, false, '删除任务失败'));
    })
})

module.exports = router;
