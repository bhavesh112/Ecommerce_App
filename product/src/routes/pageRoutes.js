const express = require("express");
const {
  addBanner,
  getBanners,
  deleteBanner,
  addCategory,
  getCategories,
  deleteCategory,
  getPage,
} = require("../controllers/page.controller");
const adminAuth = require("../middlewares/auth");

const router = express.Router();
const { upload } = require("../services/storage");

router.post("/add-banner", upload.single("img"), adminAuth, addBanner);

router.get("/get-banners", getBanners);

router.delete("/delete-banner/:id", adminAuth, deleteBanner);

module.exports = router;
