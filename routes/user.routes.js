const express = require("express");

const userController = require("../controllers/user.controller");
const router = express.Router();

router.post("/register", userController.register);
router.post("/image", userController.analyse);
router.get("/progress", userController.getProgress);

module.exports = router;
