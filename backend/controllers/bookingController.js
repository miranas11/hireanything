const Booking = require("../models/Booking");
const Customer = require("../models/Customer");
const ServiceProvider = require("../models/ServiceProvider");

// Add multiple bookings and update booking histories for customers and service providers
const addMultipleBookings = async (req, res) => {
    try {
        const bookings = req.body.bookings;

        if (!Array.isArray(bookings)) {
            return res
                .status(400)
                .json({ message: "Bookings data should be an array" });
        }

        // Insert multiple bookings at once
        const createdBookings = await Booking.insertMany(bookings);

        // Loop through each created booking and update the booking histories
        for (const booking of createdBookings) {
            // Update the customer's booking history
            await Customer.findByIdAndUpdate(booking.customer, {
                $push: { bookingHistory: booking._id },
            });

            // Update the service provider's booking history
            await ServiceProvider.findByIdAndUpdate(booking.serviceProvider, {
                $push: { bookingHistory: booking._id },
            });
        }

        res.status(201).json({
            message: "Bookings created successfully",
            bookings: createdBookings,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = {
    addMultipleBookings,
};
