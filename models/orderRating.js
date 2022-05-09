const mongoose = require('mongoose');
const orderRatingSchema = new mongoose.Schema({
    stars:{
        type:Number,
        required:true,
        min: 0,
        max: 5
    },
    order_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    user_name:{
        type:String,
        required:true
    },
    restaurant_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
    },
    description:{
        type:String,
        required:true
    },
  

})
const OrderRating = mongoose.model('OrderRating',orderRatingSchema)
exports.OrderRating = OrderRating;