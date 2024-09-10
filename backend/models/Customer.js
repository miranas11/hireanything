const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bookingHistory: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Customer =
    mongoose.models.Customer || mongoose.model("Customer", customerSchema);

module.exports = Customer;
