const express = require("express");
const { createProduct } = require("../controllers/productController");
const router = express.Router();
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const adminAuth = require("../middlewares/auth");
const validateRequest = require("../middlewares/validateRequest");

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
  adminAuth,
  // check("name").notEmpty().withMessage("Name is required"),
  validateRequest,
  upload.array("productPicture"),
  createProduct
);

module.exports = router;
