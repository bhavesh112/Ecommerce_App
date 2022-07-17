const express = require('express');
const { createProduct } = require('../controllers/productController');
// const {requireSignin, adminMiddleware} = require('../common-middleware');
const router = express.Router();
const product = require('../Models/productModel')
const multer=require('multer');
const shortid= require('shortid');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname),'uploads'))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, shortid.generate() + '-' + file.originalname)
    }
  })
  const upload = multer({ storage });
// router.get('/contacts', GetContacts);
router.post('/product/create',upload.array('productPicture'),createProduct);
// router.put('/contacts/:id', UpdateContact);
// router.delete('/contacts/:id', DeleteContact);

module.exports = router;