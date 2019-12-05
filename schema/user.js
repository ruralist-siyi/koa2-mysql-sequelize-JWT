const moment = require('moment');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    'user',
    {
      // 用户ID
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: true,
        autoIncrement: true
      },
      // 名
      name: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'name'
      },
      // email
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'email'
      },
      // email
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password'
      },
      // 手机号
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        field: 'phone'
      },
      createTime: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          return moment(this.getDataValue('createTime')).format(
            'YYYY-MM-DD hh:mm:ss'
          );
        },
        set(createTime) {
            return moment(this.getDataValue('createTime', createTime)).valueOf();
        }
      },
      updateTime: {
        type: DataTypes.DATE,
        allowNull: false,
        get() {
          return moment(this.getDataValue('updateTime')).format(
            'YYYY-MM-DD hh:mm:ss'
          );
        },
        set(updateTime) {
          return moment(this.getDataValue('updateTime', updateTime)).valueOf();
        }
      }
    },
    {
      // 如果为 true 则表的名称和 model 相同，即 user
      // 为 false MySQL创建的表名称会是复数 users
      // 如果指定的表名称本就是复数形式则不变
      freezeTableName: true,
      timestamps: true,
      // 将createdAt对应到数据库的created_at字段
      createdAt: 'createTime',
      // 将updatedAt对应到数据库的updated_at字段
      updatedAt: 'updateTime'
    }
  );
};
