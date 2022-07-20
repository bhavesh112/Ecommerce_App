const mongoose = require("mongoose");

const pageSchema = mongoose.Schema({
  banners: [
    {
      img: { type: String },
      navigateTo: { type: String },
    },
  ],
  products: [
    {
      product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    },
  ],
});

module.exports = mongoose.model("Page", pageSchema);
