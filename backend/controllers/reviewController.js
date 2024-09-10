const Review = require("../models/Review");
const ServiceProvider = require("../models/ServiceProvider");

const addMultipleReviews = async (req, res) => {
    try {
        const { reviews } = req.body;

        // Validate that the reviews array is provided
        if (!reviews || !Array.isArray(reviews)) {
            return res.status(400).json({
                message: "Invalid input. Provide an array of reviews.",
            });
        }

        // Insert multiple reviews at once
        const insertedReviews = await Review.insertMany(reviews);

        // Update each service provider with their corresponding reviews
        for (const review of insertedReviews) {
            await ServiceProvider.findByIdAndUpdate(review.serviceProvider, {
                $push: { reviews: review._id },
            });
        }

        return res.status(201).json({
            message: "Reviews added successfully",
            insertedReviews,
        });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

const getReviewsByServiceProvider = async (req, res) => {
    try {
        const serviceProviderId = req.params.id;
        console.log(serviceProviderId);

        // Find all reviews for the specific service provider and populate only customer details
        const reviews = await Review.find({
            serviceProvider: serviceProviderId,
        }).populate("customer", "name"); // Populate only the customer's name

        if (!reviews.length) {
            return res.status(404).json({
                message: "No reviews found for this service provider.",
            });
        }

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

const deleteReviewById = async (req, res) => {
    try {
        const reviewId = req.params.id;

        // Find and delete the review by ID
        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            return res.status(404).json({ message: "Review not found." });
        }

        res.status(200).json({
            message: "Review deleted successfully.",
            review: deletedReview,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = {
    addMultipleReviews,
    getReviewsByServiceProvider,
    deleteReviewById,
};
