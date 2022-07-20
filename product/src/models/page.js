const mongoose = require("mongoose");

const pageSchema = mongoose.Schema({
  banners: [
    {
      name: { type: String, required: true },
      img: { type: String },
      navigateTo: { type: String },
    },
  ],
  categories: [
    {
      category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    },
  ],
});

module.exports = mongoose.model("Page", pageSchema);
