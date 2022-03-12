const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
    restaurant_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rider_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rider"
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
