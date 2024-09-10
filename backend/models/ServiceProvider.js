const mongoose = require("mongoose");

const serviceProviderSchema = new mongoose.Schema({
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
    kycApproved: {
        type: Boolean,
        default: false,
    },
    servicesOffered: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
        },
    ],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
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

const ServiceProvider = mongoose.model(
    "ServiceProvider",
    serviceProviderSchema
);

module.exports = ServiceProvider;
