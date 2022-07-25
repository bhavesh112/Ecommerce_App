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

module.exports = {
  insertBanner,
  removeBannerById,
  findBanner,
};
