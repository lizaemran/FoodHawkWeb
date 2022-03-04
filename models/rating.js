const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({
    stars:{
        type:Number,
        required:true,
        min: 0,
        max: 5
    },
    user_id:{
        type:String,
        required:true
    },
    user_name:{
        type:String,
        required:true
    },
    restaurant_id:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
})
const Rating = mongoose.model('Rating',ratingSchema)
exports.Rating = Rating;