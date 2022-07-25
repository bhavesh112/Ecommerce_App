const express = require("express");
const { addItemToCart,getCartItems } = require("../controllers/cart");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/addtocart", auth, addItemToCart);

router.get("/getCartItems",getCartItems);

// router.post("/user/cart/removeItem",removeCartItems);

module.exports = router;
