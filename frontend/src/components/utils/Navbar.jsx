import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Navbar.css"; // Import the CSS file for styling

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/customers">Customers</Link>
                </li>
                <li>
                    <Link to="/service-providers">Service Providers</Link>
                </li>
                <li>
                    <Link to="/services">Services</Link>
                </li>
                <li>
                    <Link to="/login">Logout</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
