const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const orderRoutes = require("./routes/orderRoutes");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/api/order", orderRoutes);

module.exports = { app };
