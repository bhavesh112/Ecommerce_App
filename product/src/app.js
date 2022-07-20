const express = require("express");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/product", productRoutes);
app.use("/api/category", categoryRoutes);
app.get("*", (req, res) => {
  const img = req.path.split("/");

  res.sendFile(`${__dirname}/uploads/${img[img.length - 1]}`, (err) => {
    if (err) {
      return res.status(500).send("file not found");
    }
  });
});

module.exports = { app };
