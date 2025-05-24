const router = require("express").Router();
const userRoutes = require("./userRoutes");
const swagger = require("./swagger");
router.use("/users", userRoutes);
router.use("/", swagger);

module.exports = router;
