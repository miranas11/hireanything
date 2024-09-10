const express = require("express");
const {
    addReview,
    addMultipleReviews,
    getReviewsByServiceProvider,
    deleteReviewById,
} = require("../controllers/reviewController");
const router = express.Router();

router.post("/add-multiple", addMultipleReviews);
router.get("/get/:id", getReviewsByServiceProvider);
router.delete("/:id", deleteReviewById);

module.exports = router;
