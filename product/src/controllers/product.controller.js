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
      Product.find({ category: category._id }).exec((error, products) => {
        if (error) {
          return res.status(400).json({ error });
        }

        if (category.slug) {
          if (products.length > 0) {
            res.status(200).json({
              products,
              priceRange: {
                under5k: 5000,
                under10k: 10000,
                under15k: 15000,
                under20k: 20000,
                under30k: 30000,
                above30k: 30000,
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
            res.status(400).json({ msg: "No products found" });
          }
        } else {
          res.status(200).json({ products });
        }
      });
    }
  });
};

class APIfeatures {
  constructor(query, queryString){
      this.query = query;
      this.queryString = queryString;
  }
  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

//   paginating(){
//     const page = this.queryString.page * 1 || 1
//     const limit = this.queryString.limit * 1 || 9
//     const skip = (page - 1) * limit;
//     this.query = this.query.skip(skip).limit(limit)
//     return this;
// }
}

const getProductbyfeature= async(req, res) =>{
      try {
      const  product = await Product
    .find(
        { $text : { $search : req.query.keyword } }
    )
      //   console.log(req.query)
      //     const features = new APIfeatures(Product.find(), req.query)
      //     .search()
      //     const product = await features.query

          res.json({
              status: 'success',
              result: product.length,
              product: product
          })
          
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
  }

const deleteProduct = async (req, res) =>  {

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
