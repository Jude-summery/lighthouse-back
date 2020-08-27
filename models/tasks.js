const { Task } = require('../lib/mysql');

module.exports = {
    create: function create (task) {
        return Task.create({
            taskName: task.name, //任务名称
            taskContent: task.content, //任务内容
            taskType: task.type, //任务分类
            taskStatus: task.status, //任务状态 ['未招领','处理中','处理完毕','已删除']
            taskPlanEndTime: task.planEndTime, //计划结束时间
            creatorId: task.creatorId, //创建人id
            creatorName: task.creatorName, //创建人昵称
        })
    },

    findAll: function findAll () {
        return Task.findAll()
    },

    updateOneById: function updateOneById (id, params) {
        return Task.update({
            taskName: params.name, //任务名称
            taskContent: params.content, //任务内容
            taskType: params.type, //任务分类
            taskStatus: params.status, //任务状态 ['未招领','处理中','处理完毕','已删除']
            taskPlanEndTime: params.planEndTime, //计划结束时间
            creatorId: params.creatorId, //创建人id
            creatorName: params.creatorName, //创建人昵称
        }, {
            where: { id: id }
        })
    },

    deleteOneById: function deleteOneById (id) {
        return Task.destroy({
            where: { id: id }
        })
    }
}