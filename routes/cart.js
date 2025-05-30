const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cart");
const { auth } = require("../middleware/auth");

router.get("/", auth, cartController.getCart);
router.post("/add", cartController.addToCart);
router.post("/increase", auth, cartController.increaseQty);
router.post("/decrease", auth, cartController.decreaseQty);

module.exports = router;
