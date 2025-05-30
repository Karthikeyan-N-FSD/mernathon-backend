const express = require("express");
const router = express.Router();
const {
  createOrder,
  getOrders,
  getOrderById,
} = require("../controllers/order");
const { auth } = require("../middleware/auth");

router.post("/", auth, createOrder);
router.get("/", auth, getOrders);
router.get("/:id", auth, getOrderById);

module.exports = router;
