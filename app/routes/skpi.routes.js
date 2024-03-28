// CONTROLLER
const skpi = require("../controllers/skpicontroller");

// MIDDLEWARE
const { authenticateToken } = require("../middleware/middleware");

// ROUTER
const router =  require("express").Router();

// router.get("/", authenticateToken, skpi.findAll);
// router.get("/:id", authenticateToken, skpi.findOne);
// router.post("/", authenticateToken,  skpi.create);
// router.put("/:id", authenticateToken, skpi.update);
// router.delete("/", authenticateToken, skpi.deleteAll);
// router.delete("/:id", authenticateToken, skpi.deleteOne);

router.get("/", skpi.findAll);
router.get("/:id", skpi.findOne);
router.post("/",  skpi.create);
router.put("/:id", skpi.update);
router.delete("/", skpi.deleteAll);
router.delete("/:id", skpi.deleteOne);

module.exports = router