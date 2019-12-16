const Sequelize = require("sequelize");
const reqLogger = require('../utils/log').logger('request');

/**
 * 数据库配置
 * host: 数据库地址,默认本机
 * type: 数据库类型
 * database: 库名
 * user: 用户名
 * password：用户密码
 */
const config = {
  host: "47.98.40.154",
  type: "mysql",
  database: "lazyNote",
  user: "root",
  password: "Zsy960914."
};

// 连接数据库，配置线程池等
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: config.type,
  logging: (sql) => {
    reqLogger.debug(sql);
  },
  pool: {
    max: 5, // 连接池中最大连接数量
    min: 0, // 连接池中最小连接数量
    acquire: 30000,
    idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，那么就释放线程
  },
  define: {
    timestamps: true,
    createdAt: "createTime",
    updatedAt: "updateTime",
    underscored: true,
    dialectOptions: {
      // 字符集
      charset: "utf8mb4",
      collate: "utf8mb4_unicode_ci",
      supportBigNumbers: true,
      bigNumberStrings: true
    },
  },
  timezone: "+08:00" //东八时区
});

module.exports = {
  sequelize
};
