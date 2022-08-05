const express = require("express");
const { addOrder, getOrders } = require("../Controllers/orderController");
const auth = require("../middleware/auth");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const router = express.Router();

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

router.post("/", auth, addOrder);

router.get("/", auth, getOrders);

module.exports = router;
