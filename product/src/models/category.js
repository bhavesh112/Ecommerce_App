const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  categoryImage: {
    type: String,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Category", categorySchema, "Categories");
