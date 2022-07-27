const express = require("express");
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
  updateCartItems,
} = require("../Controllers/cart");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/addtocart", auth, addItemToCart);

router.get("/getCartItems", auth, getCartItems);

router.delete("/remove/:id", auth, removeCartItems);

router.patch("/update/:id", auth, updateCartItems);
module.exports = router;
