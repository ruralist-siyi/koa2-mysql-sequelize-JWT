const moment = require("moment");

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "user",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: true
      },
      userPassword: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        field: "email",
        // validate: {
        //   isEmail: true
        // }
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
      freezeTableName: true // 如果为 true 则表的名称和 model 相同，is user no users
    }
  );
};
