const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const cartRoutes = require("./routes/cart");
const app = express();

app.use(bodyParser.json());
app.use("/api/user/cart", cartRoutes);

module.exports = { app };
