const express = require("express");
const {
    getAllCustomers,
    updateCustomer,
    deleteCustomer,
    addMultipleCustomers,
} = require("../controllers/customerController");

const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.get("/get", verifyToken, getAllCustomers);
router.put("/:id", verifyToken, updateCustomer);
router.delete("/:id", verifyToken, deleteCustomer);

router.post("/multiple", addMultipleCustomers);

module.exports = router;
