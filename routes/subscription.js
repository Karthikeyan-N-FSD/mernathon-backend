const express = require("express");
const router = express.Router();
const { subscribe, validateCoupon } = require("../controllers/subscription");

router.post("/", subscribe);
router.post("/validate", validateCoupon);

module.exports = router;