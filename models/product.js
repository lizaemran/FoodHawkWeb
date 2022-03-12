const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    restaurant_id:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true 
    },
    price:{
        type:String,
        required:true 
    },
    image:{
        type:String,
        required:true 
    },
    description:{
        type:String,
        required:false
    },
    discount: {
        type:Number,
        required:true 
    },
    category: {
        type:String,
        required:true 
    },
})

const Product = mongoose.model('Product',productSchema)
exports.Product = Product;