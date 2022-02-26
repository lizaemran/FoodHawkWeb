const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    restaurant_id:{
        type:String,
        required:true 
    },
    user_id:{
        type:String,
        required:true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    total_price:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true 
    },
    date: {
        type:String,
        required:true 
    },
    time: {
        type:String,
        required:true
    }

})

const Order = mongoose.model('Order',orderSchema)
exports.Order = Order;
