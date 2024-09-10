import React, { useState, useEffect } from "react";
import {
    getAllServiceProviders,
    getAllServices,
    addService,
    updateServiceById,
} from "../controller/apiController";
import FormField from "./utils/FormField";
import ActionButton from "./utils/ActionButton";

import "../styles/ServiceManagement.css";

const ServiceManagement = () => {
    const [services, setServices] = useState([]);
    const [providers, setProviders] = useState([]);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [providerId, setProviderId] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [editServiceId, setEditServiceId] = useState(null);

    useEffect(() => {
        const fetchProviders = async () => {
            const data = await getAllServiceProviders();
            setProviders(data);
        };
        fetchProviders();
    }, []);

    useEffect(() => {
        const fetchServices = async () => {
            const data = await getAllServices();
            setServices(data);
        };
        fetchServices();
    }, []);

    const addOrEditService = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");
        const serviceData = {
            name,
            price,
            category,
            subcategory,
            provider: providerId,
        };

        if (editServiceId) {
            await updateServiceById(editServiceId, serviceData, token);
            setServices(
                services.map((service) =>
                    service._id === editServiceId
                        ? { ...service, ...serviceData }
                        : service
                )
            );
        } else {
            const res = await addService(serviceData, token);
            setServices([...services, res.service]);
        }

        resetForm();
    };

    const resetForm = () => {
        setName("");
        setPrice("");
        setCategory("");
        setSubcategory("");
        setProviderId("");
        setIsFormVisible(false);
        setEditServiceId(null);
    };

    const startEditingService = (service) => {
        setEditServiceId(service._id);
        setName(service.name);
        setPrice(service.price);
        setCategory(service.category);
        setSubcategory(service.subcategory);
        setProviderId(service.provider._id);
        setIsFormVisible(true);
    };

    return (
        <div className="service-management-container">
            <h2>Manage Services</h2>
            <div className="add-service-button-container">
                <ActionButton
                    label={isFormVisible ? "Cancel" : "Add a Service"}
                    onClick={() => setIsFormVisible(!isFormVisible)}
                    styleClass="add-service-button"
                />
            </div>

            {isFormVisible && (
                <form className="service-form" onSubmit={addOrEditService}>
                    <FormField
                        label="Service Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <FormField
                        label="Price"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <FormField
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <FormField
                        label="Subcategory"
                        value={subcategory}
                        onChange={(e) => setSubcategory(e.target.value)}
                    />
                    <FormField
                        label="Service Provider"
                        value={providerId}
                        onChange={(e) => setProviderId(e.target.value)}
                        options={providers}
                    />
                    <ActionButton
                        label={editServiceId ? "Edit Service" : "Add Service"}
                        type="submit"
                        styleClass="form-submit-button"
                    />
                </form>
            )}

            <table className="service-table">
                <thead>
                    <tr>
                        <th>Service Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Subcategory</th>
                        <th>Provider</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <React.Fragment key={service._id}>
                            <tr>
                                <td>{service.name}</td>
                                <td>{service.price}</td>
                                <td>{service.category}</td>
                                <td>{service.subcategory}</td>
                                <td>{service.provider.name}</td>
                                <td>
                                    <ActionButton
                                        label="Edit"
                                        onClick={() =>
                                            startEditingService(service)
                                        }
                                        styleClass="edit-button"
                                    />
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceManagement;
