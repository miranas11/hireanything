const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    subcategory: {
        type: String,
        required: true,
    },
    provider: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ServiceProvider",
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
