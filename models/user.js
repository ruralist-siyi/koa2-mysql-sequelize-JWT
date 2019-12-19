const db = require('../utils/db');
const Sequelize = db.sequelize;
const User = Sequelize.import('../schema/user');

// 启动重建数据表
User.sync({ force: false });

class UserModel {
  static async createUser(data) {
    return await User.create({
      userName: data.userName,
      email: data.email,
      phone: data.phone,
      userPassword: data.userPassword
    });
  }

  static async getUserDetail(id) {
    return await User.findOne({
      where: {
        userId: id
      }
    });
  }

  static async login(data) {
    return await User.findOne({
      where: {
        userName: data.userName,
        userPassword: data.userPassword
      }
    });
  }

  /**
   * 查询是否有重名的人
   */
  static async findSameNameUser(data) {
    return await User.findOne({
      where: {
        userName: data.userName
      }
    })
  }
}

module.exports = UserModel;
