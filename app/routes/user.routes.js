// CONTROLLER
const users = require("../controllers/user.controller");

// MIDDLEWARE
const { authenticateToken } = require("../middleware/middleware");

// ROUTER
const router =  require("express").Router();

router.post("/", users.create);
router.post("/auth", users.auth);
router.get("/", authenticateToken, users.findAll);
router.get("/:id", authenticateToken, users.findOne);
router.put("/:id", authenticateToken, users.update);
router.delete("/", authenticateToken,  users.deleteAll);
router.delete("/:id", authenticateToken, users.deleteOne)

module.exports = router;