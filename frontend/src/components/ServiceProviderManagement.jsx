import React, { useEffect, useState } from "react";
import "../styles/ServiceProviderManagement.css"; // Import the CSS file
import {
    getAllServiceProviders,
    deleteServiceProviderById,
    getReviewsByServiceProvider,
    deleteReviewById,
} from "../controller/apiController";

const ServiceProviderManagement = () => {
    const [serviceProviders, setServiceProviders] = useState([]);
    const [expandedProviderId, setExpandedProviderId] = useState(null); // To track expanded providers
    const [expandedReviewId, setExpandedReviewId] = useState(null); // To track expanded reviews
    const [reviews, setReviews] = useState([]); // State for reviews

    useEffect(() => {
        const fetchServiceProviders = async () => {
            const token = localStorage.getItem("token");
            const data = await getAllServiceProviders(token);
            setServiceProviders(data);
        };

        fetchServiceProviders();
    }, []);

    const toggleProviderDetails = (id) => {
        setExpandedProviderId(expandedProviderId === id ? null : id);
    };

    const toggleReviews = async (id) => {
        if (expandedReviewId === id) {
            setExpandedReviewId(null);
            setReviews([]);
        } else {
            setExpandedReviewId(id);
            const token = localStorage.getItem("token");
            const reviewsData = await getReviewsByServiceProvider(id, token);
            console.log(reviewsData);
            setReviews(reviewsData);
        }
    };

    const deleteServiceProvider = async (id) => {
        const token = localStorage.getItem("token");
        await deleteServiceProviderById(id, token);
        setServiceProviders(
            serviceProviders.filter((provider) => provider._id !== id)
        );
    };

    const deleteReview = async (reviewId) => {
        const token = localStorage.getItem("token");
        await deleteReviewById(reviewId, token);
        setReviews(reviews.filter((review) => review._id !== reviewId));
    };

    return (
        <div className="service-provider-management-container">
            <h2>Manage Service Providers</h2>
            <ul className="service-provider-list">
                {serviceProviders.map((provider) => (
                    <li key={provider._id}>
                        <div className="provider-header">
                            <span
                                onClick={() =>
                                    toggleProviderDetails(provider._id)
                                }
                            >
                                {provider.name}
                            </span>
                            <div className="provider-actions">
                                <button
                                    className="show-reviews-button"
                                    onClick={() => toggleReviews(provider._id)}
                                >
                                    {expandedReviewId === provider._id
                                        ? "Hide Reviews"
                                        : "Show Reviews"}
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() =>
                                        deleteServiceProvider(provider._id)
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        {/* Conditionally show provider details */}
                        {expandedProviderId === provider._id && (
                            <div className="provider-details">
                                <p>Email: {provider.email}</p>
                                <p>
                                    KYC Approved:{" "}
                                    {provider.kycApproved ? "Yes" : "No"}
                                </p>
                                <p>Services Offered:</p>
                                <ul>
                                    {provider.servicesOffered.map((service) => (
                                        <li
                                            key={service._id}
                                            className="service-offered-item"
                                        >
                                            {service.name}
                                        </li>
                                    ))}
                                </ul>
                                <p>Booking History:</p>
                                <ul>
                                    {provider.bookingHistory.map((booking) => (
                                        <li
                                            key={booking._id}
                                            className="booking-history-item"
                                        >
                                            <p>
                                                Customer:{" "}
                                                {booking.customer?.name ||
                                                    "N/A"}
                                            </p>
                                            <p>
                                                Service:{" "}
                                                {booking.service?.name || "N/A"}
                                            </p>
                                            <p>Status: {booking.status}</p>
                                            <p>
                                                Payment Status:{" "}
                                                {booking.paymentStatus}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Conditionally show reviews */}
                        {expandedReviewId === provider._id && (
                            <div className="reviews-section">
                                <h3>Reviews:</h3>
                                <ul>
                                    {reviews.length > 0 ? (
                                        reviews.map((review) => (
                                            <li
                                                key={review._id}
                                                className="review-item"
                                            >
                                                <div>
                                                    <p>
                                                        <strong>Rating:</strong>{" "}
                                                        {review.rating}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            Comment:
                                                        </strong>{" "}
                                                        {review.feedback}
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            By Customer:
                                                        </strong>{" "}
                                                        {review.customer
                                                            ?.name || "N/A"}
                                                    </p>
                                                </div>
                                                <button
                                                    onClick={() =>
                                                        deleteReview(review._id)
                                                    }
                                                >
                                                    Delete Review
                                                </button>
                                            </li>
                                        ))
                                    ) : (
                                        <p>
                                            No reviews found for this provider
                                        </p>
                                    )}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceProviderManagement;
