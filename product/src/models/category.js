const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  categoryImage: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Category", categorySchema, "Categories");
