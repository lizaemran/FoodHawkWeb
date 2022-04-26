const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true 
    },
    firstname:{
        type: String,
        required:true 
    },
    lastname:{
        type: String,
        required:true 
    },
    email:{
        type: String,
        required:true 
    },
    password:{
        type: String,
        required:true 
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
        
    }, 
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
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
    user_type: {
        type: String,
        required: false,
        default: "user"
    }
})
userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isUser: true},"key");
    return token;
}
function validateUser(user){
    const schema = new Joi.object({
        username : Joi.string().min(3).max(50).required(),
        firstname : Joi.string().required(),
        lastname : Joi.string().required(),
        password: Joi.string().min(5).max(1024).required(),
        email: Joi.string().min(5).max(255).required().email(),
        contact: Joi.string().required(),
        address: Joi.string().required(),
        lat: Joi.number().required(),
        lng: Joi.number().required(),
    })

    return schema.validate(user);
}
const User = mongoose.model('User',userSchema);
exports.User = User;
exports.validate = validateUser;
