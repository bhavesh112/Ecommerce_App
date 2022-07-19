const { validationResult } = require("express-validator");
const CategoryModel = require("../models/category");

class Category {
  async create(req, res) {
    const errors = validationResult(req);
    const { name } = req.body;
    if (errors.isEmpty()) {
      const exist = await CategoryModel.findOne({ name });
      if (!exist) {
        await CategoryModel.create({ name });
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
  }
  async deleteCategory(req, res) {
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
  }

}

module.exports = new Category;