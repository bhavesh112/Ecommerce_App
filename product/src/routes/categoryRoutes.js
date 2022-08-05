const express = require("express");
const { body } = require("express-validator");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../categoryswagger.json");

const router = express.Router();

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerDocument));

// const categoryValidations = require("../validations/categoryValidations");
const {
  createCategory,
  deleteCategory,
  getCategory,
} = require("../controllers/category.controller");
const adminAuth = require("../middlewares/auth");

router.post(
  "/create",
  adminAuth,
  body("name").notEmpty().withMessage("Name is required"),
  createCategory
);
router.delete("/delete/:id", adminAuth, deleteCategory);
router.get("/", getCategory);
module.exports = router;
