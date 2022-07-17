const Product = require('../Models/productModel');
const slugify=require('slugify');
const { Error } = require('mongoose');



exports.createProduct=(req,res)=>{

    // res.status(200).json({file: req.files,body:req.body})
    const{
        name,description,price,category,quantity,createdBy
    }=req.body;

    let productPicture=[];
    if(req.files.length>0){
       productPicture= req.files.map(file=>{
            return {img:file.filename}
        })
    }

    const product = new Product({
        name: name,
        slug: slugify(name),
        price,
        description,
        quantity,
        productPicture,
        category,
        // createdBy: req.user._id

    });

    product.save(((error,product)=>{
        if(error) return res.status(400).json({error});
        if (product){
            res.status(201).json({product})
        }
    }))

} 