// CONTROLLER
const keyword = require("../controllers/keyword.controller");

// MIDDLEWARE
const { authenticateToken } = require("../middleware/middleware");

// ROUTER
const router =  require("express").Router();

router.post("/", middleware.authenticateToken, keyword.create);
router.get("/:id", middleware.authenticateToken, keyword.findOne);
router.get("/", middleware.authenticateToken, keyword.findAll);
router.put("/:id", middleware.authenticateToken, keyword.update);
router.delete("/", middleware.authenticateToken, keyword.deleteAll);
router.delete("/:id", middleware.authenticateToken, keyword.deleteOne);


module.exports = router