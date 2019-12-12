const Koa = require("koa");
const app = new Koa();
const views = require("koa-views");
const json = require("koa-json");
const onerror = require("koa-onerror");
const bodyparser = require("koa-bodyparser");
// const koajwt = require("koa-jwt");
const Jwt = require('./utils/jwt');
const errLogger = require('./utils/log').logger('error');
const reqLogger = require('./utils/log').logger('request');

const index = require("./routes/index");
const users = require("./routes/user");
const jwt = new Jwt();
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

app.use(async (ctx, next) => {
  const result = jwt.verifyToken(ctx);
  if(!result) {
    ctx.status = 401;
    ctx.body = {
      code: '000003',
      msg: '未授权',
      data: null
    };
    errLogger.error('401 Authorization fail handle');
    return ;
  }
  await next();
})

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

// error-handling
app.on("error", (err, ctx) => {
  errLogger.error("server error", err, ctx);
});

module.exports = app;
