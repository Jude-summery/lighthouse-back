const { Sequelize, DataTypes } = require('sequelize');
const debug = require('debug')('lighthouse-back:server');

// 连接到数据库
const sequelize = new Sequelize('lighthouse', 'root', 'root', {
    host: 'localhost',
    port: '3306',
    dialect: 'mysql'
});

exports.User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    nickname: DataTypes.STRING, // 昵称
    password: DataTypes.STRING, // 密码
    gender: DataTypes.TINYINT, // 性别 ['保密', '男性', '女性']
    birthday: DataTypes.DATE, // 出生日期 时间戳
    provice: DataTypes.STRING, //省份id
    city: DataTypes.STRING, //城市id
    signature: DataTypes.STRING, //用户签名
    groupId: DataTypes.INTEGER, //用户组id，多个用
    groupRole: DataTypes.TINYINT, //用户角色
    status: DataTypes.TINYINT, // ['离线', '在线']
});

exports.Task = sequelize.define('Task', {
    id: {
        type: DataTypes.BIGINT(11),
        primaryKey: true,
        allowNull: false,
        unique: true,
        autoIncrement: true
    },
    taskName: DataTypes.STRING, //任务名称
    taskContent: DataTypes.STRING, //任务内容
    taskType: DataTypes.TINYINT, //任务分类
    taskStatus: DataTypes.TINYINT, //任务状态 ['未招领','处理中','处理完毕','已删除']
    taskPlanEndTime: DataTypes.DATE, //计划结束时间
    taskEndTime: DataTypes.DATE, //任务结束时间
    creatorId: DataTypes.STRING, //创建人id
    creatorName: DataTypes.STRING, //创建人昵称
    createTime: DataTypes.DATE, //创建时间
    executorId: DataTypes.BIGINT(11), //执行人id
    executorName: DataTypes.STRING, //执行人昵称
    executeTime: DataTypes.DATE, //接手任务时间
    process: DataTypes.STRING, //任务流转轨迹，用户id，使用逗号分隔
});

// 测试连接
async function checkDatabase() {
    try {
        await sequelize.authenticate();
        debug('连接成功');
    } catch (error) {
        debug('连接失败：', error)
    }
}

// 同步数据（强制同步，会清空现有数据）
async function syncDatabaseForce() {
    try {
        await sequelize.sync({force: true})
        debug('所有模型均已成功同步（强同步）');
    } catch (error) {
        debug('模型同步失败', error)
    }
}

// 同步数据（弱同步，不会清空现有数据）
async function syncDatabase() {
    try {
        await sequelize.sync()
        debug('所有模型均已成功同步');
    } catch (error) {
        debug('模型同步失败', error)
    }
}

if(process.env.IS_NEW){
    checkDatabase().then(()=>{
        syncDatabaseForce()
    })
} else if(process.env.IS_UPDATE) {
    syncDatabase()
} else {
    checkDatabase()
}

