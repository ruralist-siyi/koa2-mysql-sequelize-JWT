const ObjectiveService = require("../services/objective");

class ObjectiveController {
  /**
   * 创建目标
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async create(ctx) {
    await ObjectiveService.create(ctx);
  }

  /**
   * 分页查询
   */
  static async queryForPage(ctx) {
    await ObjectiveService.queryForPage(ctx);
  }

  /**
   * 删除目标
   */
  static async delete(ctx) {
    await ObjectiveService.delete(ctx);
  }

  /**
   * 置顶操作
   */
  static async setTop(ctx) {
    await ObjectiveService.setTop(ctx);
  }
}

module.exports = ObjectiveController;
