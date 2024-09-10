const Service = require("../models/Service");
const ServiceProvider = require("../models/ServiceProvider");

const getAllServices = async (req, res) => {
    try {
        const services = await Service.find().populate({
            path: "provider",
            select: "name",
        });
        res.status(200).json(services);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Add a new service
const addService = async (req, res) => {
    try {
        const { name, price, category, subcategory, provider } = req.body;

        const newService = new Service({
            name,
            price,
            category,
            subcategory,
            provider, // Link the service to the service provider
        });

        const savedService = await newService.save();

        // Optionally update the service provider's list of services
        await ServiceProvider.findByIdAndUpdate(provider, {
            $push: { servicesOffered: savedService._id },
        });

        res.status(201).json({
            message: "Service created successfully",
            service: savedService,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get all services by a provider
const getServicesByProvider = async (req, res) => {
    try {
        const providerId = req.params.providerId;
        const services = await Service.find({ provider: providerId });

        res.status(200).json({ services });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Add multiple services and update service providers' servicesOffered
const addMultipleServices = async (req, res) => {
    try {
        const services = req.body.services;

        if (!Array.isArray(services)) {
            return res
                .status(400)
                .json({ message: "Services data should be an array" });
        }

        // Insert multiple services at once
        const createdServices = await Service.insertMany(services);

        // Loop through each created service and update the service providers
        for (const service of createdServices) {
            // Update the service provider's list of services
            await ServiceProvider.findByIdAndUpdate(service.provider, {
                $push: { servicesOffered: service._id },
            });
        }

        res.status(201).json({
            message: "Services created successfully",
            services: createdServices,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const updateService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const updates = req.body;

        // Find and update the service
        const updatedService = await Service.findByIdAndUpdate(
            serviceId,
            updates,
            {
                new: true, // Return the updated document
                runValidators: true, // Ensure the updates adhere to the schema validation
            }
        );

        if (!updatedService) {
            return res.status(404).json({ message: "Service not found" });
        }

        res.status(200).json({
            message: "Service updated successfully",
            service: updatedService,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

module.exports = {
    getAllServices,
    addService,
    getServicesByProvider,
    addMultipleServices,
    updateService,
};
