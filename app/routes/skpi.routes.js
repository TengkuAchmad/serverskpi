// CONTROLLER
const skpi = require("../controllers/skpicontroller");

// MIDDLEWARE
const { authenticateToken } = require("../middleware/middleware");

// ROUTER
const router =  require("express").Router();

router.get("/", middleware.authenticateToken, skpi.findAll);
router.get("/:id", middleware.authenticateToken, skpi.findOne);
router.post("/",  middleware.authenticateToken, skpi.create);
router.put("/:id", middleware.authenticateToken, skpi.update);
router.delete("/", middleware.authenticateToken, skpi.deleteAll);
router.delete("/:id", middleware.authenticateToken, skpi.deleteOne);

module.exports = router