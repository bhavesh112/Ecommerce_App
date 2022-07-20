const express = require("express");
const { createProduct } = require("../controllers/product.controller");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const adminAuth = require("../middlewares/auth");
const validateRequest = require("../middlewares/validateRequest");
const { check } = require("express-validator");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

router.post(
  "/create",
  upload.array("productPicture"),
  adminAuth,
  check("name").notEmpty().withMessage("Name is required"),
  validateRequest,
  createProduct
);

module.exports = router;
