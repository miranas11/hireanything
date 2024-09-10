import axios from "axios";

// Create an Axios instance and set the base URL
const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
});

export default axiosInstance;
