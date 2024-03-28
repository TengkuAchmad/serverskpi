// CONTROLLER
const users = require("../controllers/user.controller");

// MIDDLEWARE
const middleware = require("../middleware/middleware");

// ROUTER
const router =  require("express").Router();

// router.post("/", users.create);
// router.post("/auth", users.auth);
// router.get("/", authenticateToken, users.findAll);
// router.get("/:id", authenticateToken, users.findOne);
// router.put("/:id", authenticateToken, users.update);
// router.delete("/", authenticateToken,  users.deleteAll);
// router.delete("/:id", authenticateToken, users.deleteOne);

router.post("/", users.create);
router.post("/auth", users.auth);
router.get("/", users.findAll);
router.get("/:id", users.findOne);
router.put("/:id", users.update);
router.delete("/",  users.deleteAll);
router.delete("/:id", users.deleteOne);

module.exports = router;