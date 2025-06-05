const express = require("express");
const { GetDashboard } = require("../controller/dashboardController");
const router = express.Router();

router.get("/", GetDashboard);

module.exports = router;
