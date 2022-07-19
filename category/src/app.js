const express = require("express");
require("dotenv").config();
const categoryRoutes = require("./routes/categoryRoutes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/category", categoryRoutes);

module.exports = { app };
