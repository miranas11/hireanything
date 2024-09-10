import React, { useEffect, useState } from "react";
import axiosInstance from "../axiosconfig";

import "../styles/Dashboard.css"; // Import the CSS file

const Dashboard = () => {
    const [customers, setCustomers] = useState(0);
    const [serviceProviders, setServiceProviders] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem("token");

            const customerRes = await axiosInstance.get("/api/customer/get", {
                headers: { Authorization: `Bearer ${token}` },
            });
            const serviceProviderRes = await axiosInstance.get(
                "/api/service-providers/get",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            setCustomers(customerRes.data.length);
            setServiceProviders(serviceProviderRes.data.length);
        };

        fetchData();
    }, []);

    return (
        <div className="dashboard-container">
            {" "}
            {/* Added class here */}
            <h2>Admin Dashboard</h2>
            <div className="stats-box">
                {" "}
                {/* Added class here */}
                <h3>Total Customers: {customers}</h3>
                <h3>Total Service Providers: {serviceProviders}</h3>
            </div>
        </div>
    );
};

export default Dashboard;
