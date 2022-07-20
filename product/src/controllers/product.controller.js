const Product = require("../models/product");
const slugify = require("slugify");
const Category = require("../models/category");
const product = require("../models/product");

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

const getProduct = (req, res) => {
  const { slug } = req.params;
  Category.findOne({ slug: slug }).exec((error, category) => {
    if (error) {
      return res.status(400).json({ error });
    }

    if (category) {
      Product.find({ category: category._id }).exec((error, products) => {
        if (error) {
          return res.status(400).json({ error });
        }

        if (category.type) {
          if (products.length > 0) {
            res.status(200).json({
              products,
              priceRange: {
                under5k: 5000,
                under10k: 10000,
                under15k: 15000,
                under20k: 20000,
                under30k: 30000,
              },
              productsByPrice: {
                under5k: products.filter((product) => product.price <= 5000),
                under10k: products.filter(
                  (product) => product.price > 5000 && product.price <= 10000
                ),
                under15k: products.filter(
                  (product) => product.price > 10000 && product.price <= 15000
                ),
                under20k: products.filter(
                  (product) => product.price > 15000 && product.price <= 20000
                ),
                under30k: products.filter(
                  (product) => product.price > 20000 && product.price <= 30000
                ),
              },
            });
          }
        } else {
          res.status(200).json({ products });
        }
      });
    }
  });
};

module.exports = {
  createProduct,
  getProduct,
};
