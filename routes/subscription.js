const express = require("express");
const router = express.Router();
const { subscribe } = require("../controllers/subscription");

router.post("/", subscribe);

module.exports = router;