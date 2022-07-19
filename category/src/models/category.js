const mongoose = require("mongoose");
const categoryModel = require("../models/category")

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique:true,
  },
});

module.exports = mongoose.model("Category", categorySchema, "Categories");
