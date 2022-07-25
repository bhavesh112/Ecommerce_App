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
  const { category_id } = req.params;
  Category.findById(category_id).exec((error, category) => {
    if (error) {
      return res.status(400).json({ error });
    }

    if (category) {
      Product.find({ category: category._id })
        .populate("category")
        .exec((error, products) => {
          if (error) {
            return res.status(400).json({ error });
          }

          if (category.slug) {
            if (products.length > 0) {
              res.status(200).json({
                products,
                priceRange: {
                  "<= 5000": "under5k",
                  "5001 - 10,000": "under10k",
                  "10,001 - 15,000": "under15k",
                  "15,001 - 20,000": "under20k",
                  "20,001 - 30,000": "under30k",
                  "> 30000": "above30k",
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
                  above30k: products.filter((product) => product.price > 30000),
                },
              });
            } else {
              res.status(200).json({ products: [] });
            }
          } else {
            res.status(200).json({ products });
          }
        });
    }
  });
};
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.product_id).populate(
      "category"
    );
    res.json({ product });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const getProductbyfeature = async (req, res) => {
  try {
    const products = await Product.find({
      $text: { $search: req.query.keyword },
    }).populate("category");

    res.json({
      products,
      priceRange: {
        "<= 5000": "under5k",
        "5001 - 10,000": "under10k",
        "10,001 - 15,000": "under15k",
        "15,001 - 20,000": "under20k",
        "20,001 - 30,000": "under30k",
        "> 30000": "above30k",
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
        above30k: products.filter((product) => product.price > 30000),
      },
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted a Product" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, description, content, category } = req.body;

    let productPicture = [];

    if (req.files && req.files.length > 0) {
      productPicture = req.files.map((file) => {
        return { img: file.filename, path: file.path };
      });
    }
    await Product.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: name.toLowerCase(),
        price,
        description,
        content,
        productPicture,
        category,
      }
    );

    res.json({ msg: "Updated a Product" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  createProduct,
  getProduct,
  getProductbyfeature,
  deleteProduct,
  updateProduct,
  getProductById,
};

async (req, res) => {
  try {
    const { name, price, description, content, productPicture, category } =
      req.body;
    if (!iProductPicture)
      return res.status(400).json({ msg: "No image upload" });

    await Products.findOneAndUpdate(
      { _id: req.params.id },
      {
        name: name.toLowerCase(),
        price,
        description,
        content,
        productPicture,
        category,
      }
    );

    res.json({ msg: "Updated a Product" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
