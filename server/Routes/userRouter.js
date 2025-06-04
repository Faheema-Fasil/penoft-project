const express = require("express");
const router = express.Router();

const { register, loginUser, forgotPassword, resetPassword } = require("../controller/userController");

router.post("/register", register);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
