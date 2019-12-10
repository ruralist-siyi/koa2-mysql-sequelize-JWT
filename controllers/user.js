const UserModel = require("../models/user");
const jwt = require('jsonwebtoken');

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
        const data = await UserModel.getUserDetail(ret.userId);
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
    const id = ctx.query.userId;
    if (id) {
      try {
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
      return ctx.body = {
        code: 416,
        msg: "用户ID必须传"
      };
    }
  }

  static async login(ctx) {
    const req = ctx.request.body;
    if(!req.userPassword && (!req.email || !req.phone || !req.userName)) {
      return ctx.body = {
        code: '000001',
        data: null,
        msg: '参数不合法'
      }
    }
    const result = await UserModel.login(req);
    if(result) {
      const token = jwt.sign({
        userName: result.userName,
        userPassword: result.userPassword
      }, 'siyi-token', { expiresIn: '2h' });
      return ctx.body = {
        code: '000000',
        data: {
          token,
          ...result.dataValues,
          createTime: result.createTime,
          updateTime: result.updateTime
        },
        msg: '登录成功'
      }
    }else {
      return ctx.body = {
        code: '000002',
        data: null,
        msg: '用户名或密码错误'
      }
    }
  }
}

module.exports = userController;
