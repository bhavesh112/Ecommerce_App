const Page = require("../models/page");

const insertBanner = async (banner) => {
  const page = await Page.findOne({});

  if (!page) {
    await Page.create({
      banners: [banner],
    });
  } else {
    page.banners.push(banner);
    await page.save();
  }
  return page;
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
