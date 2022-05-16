const router = require("express").Router();

const homeRoutes = require("./homeroutes");
router.use("/", homeRoutes);

module.exports = router;
