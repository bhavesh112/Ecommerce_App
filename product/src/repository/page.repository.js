const Page = require("../models/page");

const insertBanner = async (banner) => {
  const page = await Page.findOne({});

  if (!page) {
    await Page.create({
      banners: [banner],
    });
  } else {
    const existingBanners = await Page.find({
      name: banner.name,
    });
    if (existingBanners.length > 0) {
      throw new Error("Banner already exists");
    }
    page.banners.push(banner);
    await page.save();
  }
};
const removeBannerById = async (id) => {
  const banners = await Page.findOne({});
  const newBanners = banners.banners.filter((banner) => banner._id != id);
  await Page.updateOne({}, { banners: newBanners });
};
const findBanner = async () => {
  const banners = await Page.findOne({});
  return banners.banners;
};

const insertCategory = async (category) => {
  const page = await Page.findOne({});
  if (!page) {
    await Page.create({
      categories: [category],
    });
  } else {
    page.categories.push(category);
    await page.save();
  }
};
const removeCategoryById = async (id) => {
  const categories = await Page.findOne({});
  const newCategories = categories.categories.filter(
    (category) => category._id != id
  );
  await Page.updateOne({}, { categories: newCategories });
};
const findCategory = async () => {
  const categories = await Page.findOne({}).limit(5);
  return categories.categories;
};

module.exports = {
  insertBanner,
  removeBannerById,
  findBanner,
  insertCategory,
  removeCategoryById,
  findCategory,
};
