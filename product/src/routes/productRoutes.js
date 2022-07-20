const express = require("express");
const {
  createProduct,
  getProduct,
} = require("../controllers/product.controller");
const router = express.Router();

const adminAuth = require("../middlewares/auth");
const validateRequest = require("../middlewares/validateRequest");
const { check } = require("express-validator");
const { upload } = require("../services/storage");

router.post(
  "/create",
  upload.array("productPicture"),
  adminAuth,
  check("name").notEmpty().withMessage("Name is required"),
  validateRequest,
  createProduct
);

router.get("/:slug", getProduct);

module.exports = router;
