// controllers/apiController.js
import axiosInstance from "../axiosconfig";

// Get all customers
export const getAllCustomers = async (token) => {
    try {
        const response = await axiosInstance.get("/api/customer/get", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting customers:", error);
        throw error;
    }
};

// Delete a customer
export const deleteCustomerById = async (id, token) => {
    try {
        const response = await axiosInstance.delete(`/api/customer/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error(`Error deleting customer with ID ${id}:`, error);
        throw error;
    }
};

// Get all service providers
export const getAllServiceProviders = async (token) => {
    try {
        const response = await axiosInstance.get("/api/service-providers/get", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error getting service providers:", error);
        throw error;
    }
};

// Delete a service provider
export const deleteServiceProviderById = async (id, token) => {
    try {
        const response = await axiosInstance.delete(
            `/api/service-providers/${id}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error(`Error deleting service provider with ID ${id}:`, error);
        throw error;
    }
};

// Get all services
export const getAllServices = async () => {
    try {
        const response = await axiosInstance.get("/api/services/get");
        return response.data;
    } catch (error) {
        console.error("Error getting services:", error);
        throw error;
    }
};

// Add a new service
export const addService = async (serviceData, token) => {
    try {
        const response = await axiosInstance.post(
            "/api/services/add",
            serviceData,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error adding service:", error);
        throw error;
    }
};

// Update an existing service
export const updateServiceById = async (id, serviceData, token) => {
    try {
        const response = await axiosInstance.put(
            `/api/services/${id}`,
            serviceData,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error(`Error updating service with ID ${id}:`, error);
        throw error;
    }
};

// Get reviews by service provider
export const getReviewsByServiceProvider = async (providerId, token) => {
    try {
        const response = await axiosInstance.get(
            `/api/review/get/${providerId}`,
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error(
            `Error getting reviews for provider ID ${providerId}:`,
            error
        );
        throw error;
    }
};

// Delete review by ID
export const deleteReviewById = async (reviewId, token) => {
    try {
        await axiosInstance.delete(`/api/review/${reviewId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error(`Error deleting review with ID ${reviewId}:`, error);
        throw error;
    }
};
