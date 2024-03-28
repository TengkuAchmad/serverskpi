// CONTROLLER
const users = require("../controllers/user.controller");

// MIDDLEWARE
const middleware = require("../middleware/middleware");

// ROUTER
const router =  require("express").Router();

router.post("/", users.create);
router.post("/auth", users.auth);
router.get("/", middleware.authenticateToken, users.findAll);
router.get("/:id", middleware.authenticateToken, users.findOne);
router.put("/:id", middleware.authenticateToken, users.update);
router.delete("/",  middleware.authenticateToken, users.deleteAll);
router.delete("/:id", middleware.authenticateToken, users.deleteOne);

module.exports = router;