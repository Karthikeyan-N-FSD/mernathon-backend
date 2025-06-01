const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/review");
const { auth } = require("../middleware/auth");

router.get("/:productId", reviewController.getProductReviews);
router.get("/user", auth, reviewController.getUserReviews);
router.post("/", auth, reviewController.createReview);

module.exports = router;
