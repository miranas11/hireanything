const express = require("express");

const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const { getAdminDashboard } = require("../controllers/adminController");
// Admin dashboard route
router.get("/dashboard", verifyToken, getAdminDashboard);

module.exports = router;
