const express = require('express');
const { getAllProducts } = require("../Controllers/productController");
const router=express.Router();
router.get("/products", getAllProducts);
module.exports=router;


