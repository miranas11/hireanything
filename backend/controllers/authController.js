const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Admin Registration (Optional)
const registerAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingAdmin = await Admin.findOne({ email });

        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const admin = new Admin({ email, password });
        await admin.save();

        const token = generateToken(admin._id);

        res.status(201).json({
            token,
            admin: {
                id: admin._id,
                email: admin.email,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

// Admin Login
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res
                .status(404)
                .json({ message: "Invalid email or password" });
        }

        const isMatch = await admin.matchPassword(password);

        if (!isMatch) {
            return res
                .status(404)
                .json({ message: "Invalid email or password" });
        }

        const token = generateToken(admin._id);

        res.json({
            token,
            admin: {
                id: admin._id,
                email: admin.email,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    registerAdmin,
    loginAdmin,
};
