const Product = require("../models/product");
const slugify = require("slugify");

const createProduct = (req, res) => {
  const { name, description, price, category, quantity } = req.body;

  let productPicture = [];

  if (req.files && req.files.length > 0) {
    productPicture = req.files.map((file) => {
      return { img: file.filename, path: file.path };
    });
  }

  const product = new Product({
    name: name,
    slug: slugify(name),
    price,
    description,
    quantity,
    productPicture,
    category,
  });

  product.save((error, product) => {
    if (error) return res.status(400).json({ error });
    if (product) {
      res.status(201).json({ product });
    }
  });
};

module.exports = {
  createProduct,
};
