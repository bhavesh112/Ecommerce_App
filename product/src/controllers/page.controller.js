const {
  insertBanner,
  removeBannerById,
  findBanner,
  insertCategory,
} = require("../repository/page.repository");

const addBanner = async (req, res) => {
  try {
    const { navigateTo, name } = req.body;
    const img = req.file;
    await insertBanner({
      img: img.filename,
      navigateTo,
      name,
    });
    res.status(200).json({ message: "Banner added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server internal error!");
  }
};

const getBanners = async (req, res) => {
  try {
    const banners = await findBanner();
    res.status(200).json(banners);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server internal error!");
  }
};
const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    await removeBannerById(id);
    res.status(200).json({ message: "Banner deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server internal error!");
  }
};

const addCategory = async (req, res) => {
  try {
    const { id } = req.body;
    await insertCategory({ id });
    res.status(200).json({ message: "Category added successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server internal error!");
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await findCategory();
    res.status(200).json(categories);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server internal error!");
  }
};
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await removeCategoryById(id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Server internal error!");
  }
};
module.exports = {
  addBanner,
  getBanners,
  deleteBanner,
  addCategory,
  getCategories,
  deleteCategory,
};
