const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true 
    },
    image:{
        type:String,
        required:true 
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    location: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
        
    }, 
    status: {
        type: Boolean,
        required: false
    }
})

const Restaurant = mongoose.model('Restaurant',restaurantSchema);
exports.Restaurant = Restaurant;