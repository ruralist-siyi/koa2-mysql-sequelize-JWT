const log4js = require("log4js");
const fs = require("fs");
const path = require("path");
const reqFilePath = path.join(__dirname, '../logs/request/request');
const resFilePath = path.join(__dirname, '../logs/response/response');
const errFilePath = path.join(__dirname, '../logs/error/error');

const levels = {
  trace: log4js.levels.TRACE,
  debug: log4js.levels.DEBUG,
  info: log4js.levels.INFO,
  warn: log4js.levels.WARN,
  error: log4js.levels.ERROR,
  fatal: log4js.levels.FATAL
};

log4js.configure({
  appenders: {
    request: {
      type: "dateFile",
      filename: reqFilePath,
      alwaysIncludePattern: true,
      pattern: "yyyy-MM-dd.log",
      daysToKeep: 15,
      compress: true
    },
    response: {
      type: "dateFile",
      filename: resFilePath,
      alwaysIncludePattern: true,
      pattern: "yyyy-MM-dd.log",
      daysToKeep: 15,
      compress: true
    },
    error: {
      type: "dateFile",
      filename: errFilePath,
      alwaysIncludePattern: true,
      pattern: "yyyy-MM-dd.log",
      daysToKeep: 30,
      compress: true
    },
    console: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: ["console", "console"], level: "info" },
    request: { appenders: ["request", "console"], level: "debug" },
    response: { appenders: ["response", "console"], level: "debug" },
    error: { appenders: ["error", "console"], level: "error" }
  }
});

exports.logger = function(name, level) {
  const logger = log4js.getLogger(name);
  logger.level = levels[level] || levels["debug"];
  return logger;
};
