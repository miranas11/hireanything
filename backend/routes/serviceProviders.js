const express = require("express");
const {
    getAllServiceProviders,
    updateServiceProvider,
    deleteServiceProvider,
    addMultipleServiceProviders,
} = require("../controllers/serviceProviderController");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

//Service provider management routes
router.get("/get", verifyToken, getAllServiceProviders);
router.put("/:id", verifyToken, updateServiceProvider);
router.delete("/:id", verifyToken, deleteServiceProvider);

router.post("/multiple", addMultipleServiceProviders);

module.exports = router;
