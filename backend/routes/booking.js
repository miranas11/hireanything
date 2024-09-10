const express = require("express");
const { addMultipleBookings } = require("../controllers/bookingController");

const router = express.Router();

// Route to handle adding multiple bookings
router.post("/multiple", addMultipleBookings);

module.exports = router;
