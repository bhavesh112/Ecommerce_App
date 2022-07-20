const mongoose = require("mongoose");

const pageSchema = mongoose.Schema({
  banners: [
    {
      name: { type: String, required: true },
      img: { type: String },
      navigateTo: { type: String },
    },
  ],
});

module.exports = mongoose.model("Page", pageSchema);
