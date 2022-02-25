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
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    location: {
        type: String,
        required: true
    },
    phone: {
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
        phone: Joi.string().required(),
        rating: Joi.required(),
    })

    return schema.validate(restaurant);
}
const Restaurant = mongoose.model('Restaurant',restaurantSchema);
exports.Restaurant = Restaurant;
exports.validate = validateRestaurant;