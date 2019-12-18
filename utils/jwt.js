const jwt = require("jsonwebtoken");
const errLogger = require("./log").logger("error");

/**
 * JWT class
 * secretKey：密钥
 * validTimeCount： 有效时间
 * refreshTimeCount： refresh 检测时间
 * whiteList： 接口白名单
 */
class Jwt {
  constructor() {
    this.secretKey = "test-token";
    this.validTimeCount = 120 * 60 * 1000;
    this.whiteList = ["/user/login", "/user/create"];
    this.refreshTimeCount = 30 * 60 * 1000;
  }

  generateToken(data) {
    const createTime = Date.now();
    const token = jwt.sign(
      {
        data,
        createTime
      },
      this.secretKey,
      { expiresIn: this.validTimeCount / (60 * 60 * 1000) + "h" }
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
        if (result.exp * 1000 < Date.now() + this.refreshTimeCount) {
          const newToken = this.generateToken(result.data);
          ctx.set("authorization", newToken);
        }
        ctx.state.user = result.data;
        return true;
      } catch (err) {
        errLogger.error("JWT authorization fail", err);
        return false;
      }
    } else {
      return true;
    }
  }
}

module.exports = Jwt;
