const db = require('../config/db');
const Sequelize = db.sequelize;
const User = Sequelize.import('../schema/user');

// 启动重建数据表
User.sync({force: false});

class UserModel {
    static async createUser(data) {
        return await User.create({
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password
        })
    }

    static async getUserDetail(id) {
        return await User.findOne({
            where: {
                id,
            },
        })
    }
}

module.exports = UserModel