const express = require("express");
require("dotenv").config();
const productRoutes = require("./routes/productRoutes");
const pageRoutes = require("./routes/pageRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const bodyParser = require("body-parser");

const app = express();
const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use("/api/product", productRoutes);

app.use("/api/category", categoryRoutes);

app.use("/api/page", pageRoutes);

app.get("*", (req, res) => {
  const img = req.path.split("/");

  res.sendFile(`${__dirname}/uploads/${img[img.length - 1]}`, (err) => {
    if (err) {
      return res.status(500).send("file not found");
    }
  });
});

module.exports = { app };
