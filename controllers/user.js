const UserModel = require("../models/user");

class userController {
  /**
   * 创建用户
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async create(ctx) {
    let req = ctx.request.body;
    if ((req.userName || req.email) && req.userPassword) {
      try {
        const ret = await UserModel.createUser(req);
        const data = await UserModel.getUserDetail(ret.id);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: "创建成功",
          data
        };
      } catch (err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 200,
          msg: "创建失败",
          data: err
        };
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 200,
        msg: "参数不齐全"
      };
    }
  }
  /**
   * 获取用户详情
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async detail(ctx) {
    const id = ctx.query.id;

    if (id) {
      try {
        // 查询文章详情模型
        let data = await UserModel.getUserDetail(id);
        ctx.response.status = 200;
        ctx.body = {
          code: 200,
          msg: "查询成功",
          data
        };
      } catch (err) {
        ctx.response.status = 412;
        ctx.body = {
          code: 412,
          msg: "查询失败",
          data
        };
      }
    } else {
      ctx.response.status = 416;
      ctx.body = {
        code: 416,
        msg: "用户ID必须传"
      };
    }
  }
}

module.exports = userController;
