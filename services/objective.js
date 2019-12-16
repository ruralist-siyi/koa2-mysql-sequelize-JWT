const ObjectiveModel = require('../models/objective');

class ObjectiveService {
  static async create(ctx) {
   const req = ctx.request.body;
    try {
      if (!req.startTime || !req.endTime || !req.weight || !req.content) {
        ctx.response.status = 200;
        ctx.body = {
          code: "000001",
          msg: "参数不全",
          data: null
        };
        return;
      }
      const data = await ObjectiveModel.createObjective(req);
      ctx.response.status = 200;
      ctx.body = {
        code: "000000",
        msg: "创建成功",
        data
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 412;
      ctx.body = {
        code: "000002",
        msg: "请求错误",
        data: null
      };
    }
  }

  static async queryForPage(ctx) {
    const page = Number(ctx.query.page) || 1;
    const size =  Number(ctx.query.size) || 10;
    try {
      const data = await ObjectiveModel.queryForPage({page, size});
      ctx.response.status = 200;
      ctx.body = {
        code: "000000",
        msg: "创建成功",
        data
      };
    } catch (error) {
      console.log(error);
      ctx.response.status = 412;
      ctx.body = {
        code: "000002",
        msg: "请求错误",
        data: null
      };
    }
  }
}

module.exports = ObjectiveService;
