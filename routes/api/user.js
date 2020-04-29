const express = require("express");
const router = express.Router();
const userController = require("../../controller/api/user_controller");

router.post("/sign-up", userController.signUp);
router.post("/create-session", userController.createSession);

module.exports = router;
