const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const riderSchema = new mongoose.Schema({
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
    phone: {
        type: String,
        required: true
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
    status: {
        type: String,
        default: "inactive"
    },
    lat: {
        type: Number,
        required: true,
        default: 0
    },
    lng: {
        type: Number,
        required: true,
        default: 0
    },
})
riderSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isRider: true},"key");
    return token;
}
function validateRider(rider){
    const schema = new Joi.object({
        username : Joi.string().min(3).max(50).required(),
        password: Joi.string().min(5).max(1024).required(),
        email: Joi.string().min(5).max(255).required().email(),
        name : Joi.string().required(),
        phone: Joi.string().required(),
        lat: Joi.number().required(),
        lng: Joi.number().required(),
    })

    return schema.validate(rider);
}
const Rider = mongoose.model('Rider', riderSchema);
exports.Rider = Rider;
exports.validate = validateRider;