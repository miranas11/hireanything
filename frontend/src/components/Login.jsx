import React, { useState } from "react";
import axiosInstance from "../axiosconfig";
import { useNavigate } from "react-router-dom";

import "../styles/Login.css"; // Import the CSS file

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/api/auth/login", {
                email,
                password,
            });
            console.log(res);
            localStorage.setItem("token", res.data.token); // Store the JWT token
            navigate("/dashboard"); // Redirect to dashboard
        } catch (err) {
            setError("Invalid credentials");
        }
    };

    return (
        <div className="login-container">
            {" "}
            {/* Add the class here */}
            <h2>Admin Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {error && <p>{error}</p>}
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
