const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const restaurantSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type: String,
        required:true 
    },
    email:{
        type: String,
        required:true 
    },
    confirmOTP: {
        type: Number,
        required: false
    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    resetOTP: {
        type: Number,
        required: false
    },
    isReset: {
        type: Boolean,
        default: false
    },
    name:{
        type:String,
        required:true 
    },
    overview:{
        type:String,
        required:false 
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
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    bookings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        }
    ],
    gallery : [
        {
            type: String,
            required: false
        }
    ],
    location: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: false
    },
    lng: {
        type: Number,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
        
    }, 
    ratingR: {
        type: Number,
        required: true,
        default: 0
        
    }, 
    ratingO: {
        type: Number,
        required: true,
        default: 0
        
    }, 
    ratingArray : [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rating" 
        }
    ],
    ratingOArray : [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderRating" 
        }
    ],
    status: {
        type: Boolean,
        required: false
    },
    openTime : {
        type: String,
        required: false
    },
    closeTime : {
        type: String,
        required: false
    },
    enableBooking: {
        type: Boolean,
        required: false
    }

})
restaurantSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isRestaurant: true},"key");
    return token;
}
function validateRestaurant(restaurant){
    const schema = new Joi.object({
        username : Joi.string().min(3).max(50).required(),
        password: Joi.string().min(5).max(1024).required(),
        email: Joi.string().min(5).max(255).required().email(),
        name : Joi.string().required(),
        image : Joi.string().required(),
        location: Joi.string().required(),
        // lat: Joi.number().required(),
        // lng: Joi.number().required(),
        phone: Joi.string().required(),
        rating: Joi.required(),
    })

    return schema.validate(restaurant);
}
const Restaurant = mongoose.model('Restaurant',restaurantSchema);
exports.Restaurant = Restaurant;
exports.validateR = validateRestaurant;