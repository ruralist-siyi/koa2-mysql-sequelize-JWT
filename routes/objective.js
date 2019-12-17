const router = require("koa-router")();
const ObjectiveController = require("../controllers/objective");

router.prefix("/objective");

router.post("/create", ObjectiveController.create);
router.get("/queryForPage", ObjectiveController.queryForPage);
router.delete("/delete", ObjectiveController.delete);
router.post("/setTop", ObjectiveController.setTop);

module.exports = router;
