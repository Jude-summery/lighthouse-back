const User = require('../lib/mysql').User;

module.exports = {
    create: function create (user) {
        return User.create({
            gender: 1, // 性别 ['保密', '男性', '女性']
            nickname: '太空云', // 昵称
            provice: '重庆', //省份id
            city: '重庆', //城市id
            signature: 'no-one', //用户签名
            status: 1, // ['离线', '在线']
        })
    },

    findOne: function findOne (id) {
        return User.findOne({
            where: { id: +id },
            attributes: {
                excludeL: ['password']
            }
        })
    }
};
