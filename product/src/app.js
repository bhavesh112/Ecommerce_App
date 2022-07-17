const express = require("express");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const app = express();

app.use(express.json());

app.use("/api/v1/product", productRoutes);

app.get("*", (req, res) => {
  const img = req.path.split("/");

  res.sendFile(`${__dirname}/uploads/${img[img.length - 1]}`);
});

module.exports = { app };
