const mongoose = require('mongoose');
const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim:true
    },
    slug: {
        type: String,
        required: true,
        unique:true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim:true
    },
    quantity:{
        type:Number,
        required:true
    },
    productPicture: [
        {
        img: {type:String}
    }],
    reviews:[
        {
            userId: {type:mongoose.Schema.Types.ObjectId,ref: 'User'},
            review:String
        }
    ],
    category:{
        type: mongoose.Schema.Types.ObjectId,ref: 'Category'
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,ref: 'User'
    },
    updatedAt: Date,
});

module.exports = mongoose.model('Product', productSchema, 'Products');