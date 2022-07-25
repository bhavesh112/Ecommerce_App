const { validationResult } = require("express-validator");
const { default: slugify } = require("slugify");
const CategoryModel = require("../models/category");

const createCategory = async (req, res) => {
  const errors = validationResult(req);
  const { name } = req.body;
  if (errors.isEmpty()) {
    const exist = await CategoryModel.findOne({ name });
    if (!exist) {
      await CategoryModel.create({ name, slug: slugify(name) });
      return res
        .status(201)
        .json({ message: "Your category has created successfully!" });
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: `${name} category is already exist` }] });
    }
  } else {
    return res.status(400).json({ errors: errors.array() });
  }
};
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    await CategoryModel.deleteOne({ _id: id });
    return res
      .status(200)
      .json({ message: "Category has deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server internal error!");
  }
};
const getCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    return res.status(200).json(categories);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Server internal error!");
  }
};
module.exports = {
  deleteCategory,
  createCategory,
  getCategory,
};
