import React, { useEffect, useState } from "react";
import {
    getAllCustomers,
    deleteCustomerById,
} from "../controller/apiController";

import "../styles/CustomerManagement.css"; // Import the CSS file

const CustomerManagement = () => {
    const [customers, setCustomers] = useState([]);
    const [expandedCustomerId, setExpandedCustomerId] = useState(null); // Track expanded customer
    const [paymentVisibleCustomerId, setPaymentVisibleCustomerId] =
        useState(null); // Track the customer whose payment details are visible

    useEffect(() => {
        const fetchCustomers = async () => {
            const token = localStorage.getItem("token");
            const data = await getAllCustomers(token);
            setCustomers(data);
        };

        fetchCustomers();
    }, []);

    const toggleCustomerDetails = (id) => {
        setExpandedCustomerId(expandedCustomerId === id ? null : id);
    };

    const togglePaymentDetails = (id) => {
        setPaymentVisibleCustomerId(
            paymentVisibleCustomerId === id ? null : id
        );
    };

    const deleteCustomer = async (id) => {
        const token = localStorage.getItem("token");
        await deleteCustomerById(id, token);
        setCustomers(customers.filter((customer) => customer._id !== id));
    };

    return (
        <div className="customer-management-container">
            <h2>Manage Customers</h2>
            <ul className="customer-list">
                {customers.map((customer) => (
                    <li key={customer._id}>
                        <div className="customer-header-container">
                            <div
                                className="customer-header"
                                onClick={() =>
                                    toggleCustomerDetails(customer._id)
                                }
                            >
                                <span>{customer.name}</span>
                            </div>
                            <div className="customer-actions">
                                <button
                                    className="payment-button"
                                    onClick={() =>
                                        togglePaymentDetails(customer._id)
                                    }
                                >
                                    Payment History
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteCustomer(customer._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>

                        {/* Conditionally show customer details */}
                        {expandedCustomerId === customer._id && (
                            <div className="customer-details">
                                <p>Email: {customer.email}</p>
                                <p>Phone: {customer.phone}</p>
                            </div>
                        )}

                        {/* Conditionally show payment details */}
                        {paymentVisibleCustomerId === customer._id && (
                            <div className="payment-history">
                                <p>Payment History:</p>
                                <ul>
                                    {customer.bookingHistory.map((booking) => (
                                        <li
                                            key={booking._id}
                                            className="booking-history-item"
                                        >
                                            <p>
                                                Service Provider:{" "}
                                                {booking.serviceProvider
                                                    ?.name || "N/A"}
                                            </p>
                                            <p>
                                                Service:{" "}
                                                {booking.service?.name || "N/A"}
                                            </p>
                                            <p>
                                                Price:{" "}
                                                {booking.service?.price
                                                    ? `$${booking.service.price}`
                                                    : "Price N/A"}
                                            </p>
                                            <p>
                                                Payment Status:{" "}
                                                {booking.paymentStatus}
                                            </p>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerManagement;
