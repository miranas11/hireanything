const express = require("express");
const {
    addService,
    getServicesByProvider,
    addMultipleServices,
    updateService,
    getAllServices,
} = require("../controllers/servicesController");

const router = express.Router();
// Route to get all services
router.get("/get", getAllServices);
router.post("/add", addService);
router.get("/provider/:providerId", getServicesByProvider);

router.post("/multiple", addMultipleServices);
router.put("/:id", updateService);

module.exports = router;
