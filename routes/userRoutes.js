const router = require("express").Router();
const userController = require("../controllers/userController");
const util = require("../utils");

router.get("/", userController.getAll);
router.get("/:id", userController.getSingle);
router.post("/createaccount", util.inputValidator, userController.createUser);
router.delete("/deleteaccount/:id", userController.deleteUser);
router.put("/update/:id", util.inputValidator, userController.updateUser);

module.exports = router;
