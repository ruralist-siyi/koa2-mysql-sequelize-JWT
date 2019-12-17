const moment = require("moment");

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "objective",
    {
      objectiveId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      startTime: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          return moment(this.getDataValue("start_Time")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
      },
      endTime: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          return moment(this.getDataValue("end_Time")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
      },
      weight: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      status: {
        type: DataTypes.INTEGER(2),
        allowNull: false
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      isTop: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      createTime: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("create_time")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
      },
      updateTime: {
        type: DataTypes.DATE,
        get() {
          return moment(this.getDataValue("update_time")).format(
            "YYYY-MM-DD HH:mm:ss"
          );
        }
      }
    },
    {
      freezeTableName: true,
      deletedAt: 'destroyTime',
      paranoid: true
    }
  );
};
