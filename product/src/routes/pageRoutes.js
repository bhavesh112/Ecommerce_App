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

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");

const router = express.Router();

const adminAuth = require("../middlewares/auth");

const { upload } = require("../services/storage");

router.use("/api-docs", swaggerUi.serve, (req, res) => {
  let html = swaggerUi.generateHTML(swaggerDocument);
  res.send(html);
});
router.post("/add-banner", upload.single("img"), adminAuth, addBanner);

router.get("/get-banners", getBanners);

router.delete("/delete-banner/:id", adminAuth, deleteBanner);

module.exports = router;
