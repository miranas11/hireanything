const Review = require("../models/Review");
const ServiceProvider = require("../models/ServiceProvider");

const addMultipleServiceProviders = async (req, res) => {
    try {
        const serviceProviders = req.body.serviceProviders;

        if (!Array.isArray(serviceProviders)) {
            return res
                .status(400)
                .json({ message: "Service Providers data should be an array" });
        }

        const createdProviders = await ServiceProvider.insertMany(
            serviceProviders
        );

        res.status(201).json({
            message: "Service providers created successfully",
            serviceProviders: createdProviders,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
};

// Get all service providers
const getAllServiceProviders = async (req, res) => {
    try {
        const providers = await ServiceProvider.find()
            .populate({
                path: "bookingHistory",
                populate: [
                    {
                        path: "customer",
                        select: "name",
                    },
                    {
                        path: "service",
                        select: "name",
                    },
                ],
            })
            .populate({
                path: "servicesOffered",
                select: "name",
            });

        res.status(200).json(providers);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Update service provider
const updateServiceProvider = async (req, res) => {
    try {
        const updatedProvider = await ServiceProvider.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedProvider);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Delete service provider
const deleteServiceProvider = async (req, res) => {
    try {
        await ServiceProvider.findByIdAndDelete(req.params.id);
        res.json({ message: "Service provider deleted" });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getAllServiceProviders,
    addMultipleServiceProviders,
    updateServiceProvider,
    deleteServiceProvider,
};
