const express = require("express");
require("dotenv").config();

const bodyParser = require("body-parser");
const cartRoutes = require("./routes/cart");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/cart", cartRoutes);

module.exports = { app };
