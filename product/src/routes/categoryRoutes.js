const express = require("express");
const router = express.Router();
const categoryValidations = require("../validations/categoryValidations");
const {
  createCategory,
  deleteCategory,
} = require("../controllers/category.controller");
const adminAuth = require("../middlewares/auth");

router.post("/create", categoryValidations, adminAuth, createCategory);
router.delete("/delete/:id", adminAuth, deleteCategory);

module.exports = router;
