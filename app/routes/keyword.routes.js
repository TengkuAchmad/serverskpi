// CONTROLLER
const keyword = require("../controllers/keyword.controller");

// MIDDLEWARE
const { authenticateToken } = require("../middleware/middleware");

// ROUTER
const router =  require("express").Router();

router.post("/", authenticateToken, keyword.create);
router.get("/:id", authenticateToken, keyword.findOne);
router.get("/", authenticateToken, keyword.findAll);
router.put("/:id",authenticateToken, keyword.update);
router.delete("/", authenticateToken, keyword.deleteAll);
router.delete("/:id", authenticateToken, keyword.deleteOne);

module.exports = router