const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
const koajwt = require("koa-jwt");
const errLogger = require('./utils/log').logger('error');
const reqLogger = require('./utils/log').logger('request');

const index = require("./routes/index");
const users = require("./routes/user");

// error handler
onerror(app);

// middlewares
app.use(
  bodyparser({
    enableTypes: ["json", "form", "text"]
  })
);
app.use(json());
app.use(require("koa-static")(__dirname + "/public"));

app.use(
  views(__dirname + "/views", {
    extension: "pug"
  })
);

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  reqLogger.info(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// Authorization fail handle
app.use((ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        code: '000003',
        msg: '未授权',
        data: null
      };
      errLogger.error('401 Authorization fail handle');
    } else {
      errLogger.error(`${err.status}:${err.message}`);
    }
  });
});

// jwt verify
app.use(
  koajwt({
    secret: "siyi-token"
  }).unless({
    path: [/\/user\/login/, /\/user\/create/]
  })
);

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  errLogger.error("server error", err, ctx);
});

module.exports = app;
