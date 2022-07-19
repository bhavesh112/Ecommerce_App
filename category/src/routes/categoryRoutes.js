const express = require("express");
const router = express.Router();
const categoryValidations= require("../validations/categoryValidations")
const Category = require ("../controllers/Category")
const adminAuth= require("../middlewares/auth")

router.post('/create',categoryValidations,adminAuth,Category.create)
router.delete('/delete/:id',adminAuth,Category.deleteCategory)

module.exports = router;