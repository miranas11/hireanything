import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/utils/Navbar"; // Import the Navbar component
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import CustomerManagement from "./components/CustomerManagement";
import ServiceProviderManagement from "./components/ServiceProviderManagement";
import ServiceManagement from "./components/ServiceManagement";

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="main-content">
                {" "}
                {/* Add padding to avoid overlap with fixed Navbar */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/customers" element={<CustomerManagement />} />
                    <Route
                        path="/service-providers"
                        element={<ServiceProviderManagement />}
                    />
                    <Route path="/services" element={<ServiceManagement />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
