const express = require("express");
const {
  addItemToCart,
  getCartItems,
  removeCartItems,
  updateCartItems,
  removeAllItems,
} = require("../Controllers/cart");
const auth = require("../middleware/auth");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const router = express.Router();

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.post("/addtocart", auth, addItemToCart);

router.get("/getCartItems", auth, getCartItems);

router.delete("/remove/:id", auth, removeCartItems);

router.patch("/update/:id", auth, updateCartItems);
router.delete("/removeAll", auth, removeAllItems);
module.exports = router;
