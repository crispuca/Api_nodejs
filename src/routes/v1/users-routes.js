const express = require("express");
const { isAuth, isValidHostname, isAdmin } = require("../../middlewares/auth")

const userController = require("../../controllers/v1/users-controller");

const router = express.Router();

router.post("/login", userController.login);
router.post("/create", userController.createUser);
router.post("/update", isValidHostname, isAuth, userController.updateUser);
router.post("/delete", isAuth, isAdmin, userController.deleteUser);
router.get("/get-all", isAuth, isAdmin, userController.getUser);


module.exports = router;