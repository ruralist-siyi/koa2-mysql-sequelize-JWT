const jwt = require("jsonwebtoken");
const errLogger = require('./log').logger('error');

class Jwt {
  constructor() {
    this.data = null;
    this.secretKey = "test-token";
    this.validTimeCount = 120 * 60 * 1000;
    this.whiteList = ["/user/login", "/user/create"];
    this.refreshTimeCount = 30 * 60 * 1000;
  }

  generateToken(data) {
    this.data = data || this.data;
    const createTime = Date.now();
    const token = jwt.sign(
      {
        data,
        createTime
      },
      this.secretKey,
      {expiresIn: this.validTimeCount / (60 * 60 * 1000) + 'h'}
    );
    return token;
  }

  verifyToken(ctx) {
    const {
      header: { authorization },
      url
    } = ctx.request;
    const originalUrl = url && url.split("?")[0];
    if (!this.whiteList.includes(originalUrl)) {
      try {
        const token =
        authorization && authorization.split("Bearer ").length > 1
          ? authorization.split("Bearer ")[1]
          : null;
      const result = jwt.verify(token, this.secretKey) || {};
      this.data = result.data;
      if(result.exp * 1000 < (Date.now() + this.refreshTimeCount)) {
        const newToken = this.generateToken({
          data: result.data
        })
        ctx.set('authorization', newToken);
      }
      ctx.state.user = this.data;
      return true;
      } catch(err) {
        errLogger.error('JWT authorization fail', err);
        return false;
      }
    } else {
      return true;
    }
  }
}

module.exports = Jwt;
