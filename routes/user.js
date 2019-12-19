const router = require("koa-router")();
const UserController = require("../controllers/user");

router.prefix("/user");

router.post("/create", UserController.create);

router.get("/queryDetail", UserController.detail);

router.post('/login', UserController.login);

router.delete('/logout', UserController.logout);

module.exports = router;
