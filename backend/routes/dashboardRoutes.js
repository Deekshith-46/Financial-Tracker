const express = require("express");

const { protect } = require("../middleware/authMiddleware");

const { getDashboardData } = require("../controllers/dashboardController"); // Fixed import

const router = express.Router(); // Fixed spacing

router.get("/", protect, getDashboardData);

module.exports = router;
