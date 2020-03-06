const db = require('../utils/db');
const Sequelize = db.sequelize;
const Objective = Sequelize.import('../schema/objective');

// 启动重建数据表
Objective.sync({ force: false });

class ObjectiveModel {
  /**
   * 新建一条小目标
   * @param {*} data data
   */
  static async createObjective(data) {
    return await Objective.create({
      objectiveId: data.objectiveId,
      startTime: new Date(data.startTime),
      endTime: new Date(data.endTime),
      weight: data.weight,
      content: data.content,
      userId: data.userId,
      status: data.status
    });
  }

  /**
   * 查询单条小目标详情
   * @param {*} id objectiveId
   */
  static async getObjectiveDetail(id) {
    return await Objective.findOne({
      where: {
        objectiveId: id
      }
    });
  }

  /**
   * 分页查询
   * @param {*} data data
   */
  static async queryForPage(data) {
    const {size, page} = data;
    return await Objective.findAndCountAll({
      limit: size,
      offset: size * (page - 1),
      order: [['isTop', 'DESC'], ['weight', 'DESC']]
    })
  }

  /**
   * 删除小目标
   * @param {*} id objectiveId
   */
  static async deleteObjectiveById(id) {
    return await Objective.destroy({
      where: {
        objectiveId: id
      }
    })
  }

  /**
   * 取消所有置顶
   */
  static async cancelAllSetTop() {
    return await Objective.update({isTop: false},{
      where: {
        isTop: true
      }
    })
  }

  /**
   * 置顶
   */
  static async setTopById(id) {
    return await Objective.update({isTop: true}, {
      where: {
        objectiveId: id
      }
    })
  }
}

module.exports = ObjectiveModel;
