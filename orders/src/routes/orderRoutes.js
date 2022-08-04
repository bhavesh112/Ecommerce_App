const express = require("express");
const { addOrder, getOrders } = require("../Controllers/orderController");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, addOrder);

router.get("/", auth, getOrders);

module.exports = router;
