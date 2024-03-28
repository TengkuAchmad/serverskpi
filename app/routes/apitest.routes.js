const apitest = require("../controllers/apitest.controller")

const router = require("express").Router()

router.get("/", apitest.test)

module.exports = router