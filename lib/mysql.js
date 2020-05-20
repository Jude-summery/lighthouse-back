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

// 测试连接&同步数据
(async function sync() {
    try {
        await sequelize.authenticate();
        debug('连接成功');
        await sequelize.sync()
        debug('所有模型均已成功同步');
    } catch (error) {
        debug('连接失败：', error)
    }
})();