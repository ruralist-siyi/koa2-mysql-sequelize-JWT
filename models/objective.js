const db = require('../utils/db');
const Sequelize = db.sequelize;
const Objective = Sequelize.import('../schema/objective');

// 启动重建数据表
Objective.sync({ force: false });

class ObjectiveModel {
  static async createObjective(data) {
    console.log(333, data);
    return await Objective.create({
      objectiveId: data.objectiveId,
      startTime: data.startTime,
      endTime: data.endTime,
      weight: data.weight,
      content: data.content
    });
  }

  static async getObjectiveDetail(id) {
    return await Objective.findOne({
      where: {
        objectiveId: id
      }
    });
  }

  static async queryForPage(data) {
    const {size, page} = data;
    return await Objective.findAndCountAll({
      limit: size,
      offset: size * (page - 1),
    })
  }
}

module.exports = ObjectiveModel;
