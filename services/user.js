const UserModel = require('../models/user');

class  UserService {
  static async logout(ctx) {
    ctx.body = {
      code: "000000",
      msg: "退出成功",
      data: null
    };
  }
}

module.exports = UserService;
