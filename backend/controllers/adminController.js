const Customer = require("../models/Customer");
const ServiceProvider = require("../models/ServiceProvider");
const Booking = require("../models/Booking");

const getAdminDashboard = async (req, res) => {
    try {
        const totalCustomers = await Customer.countDocuments();
        const totalServiceProviders = await ServiceProvider.countDocuments();
        const totalBookings = await Booking.countDocuments();

        res.json({
            totalCustomers,
            totalServiceProviders,
            totalBookings,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = {
    getAdminDashboard,
};
