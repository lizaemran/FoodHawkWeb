const mongoose = require('mongoose');
const ratingSchema = new mongoose.Schema({ 
    stars:{
        type:Number,
        required:true,
        min: 0,
        max: 5
    },

    
})

const Rating = mongoose.model('Rating',ratingSchema)
exports.Rating = Rating;
