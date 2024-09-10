const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin");
const customerRoutes = require("./routes/customer");
const serviceProviderRoutes = require("./routes/serviceProviders");
const serviceRoutes = require("./routes/services");
const bookingRoutes = require("./routes/booking");
const reviewRoute = require("./routes/review");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:3000",
    })
);

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI, {})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error(err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/service-providers", serviceProviderRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/review", reviewRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
