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
      img: { type: String },
      navigateTo: { type: String },
    },
  ],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Page", pageSchema);
