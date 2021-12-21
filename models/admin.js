const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const adminSchema = new mongoose.Schema({
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
    // contact: {
    //     type: String,
    //     required: true
    // },
    user_type: {
        type: String,
        required: false,
        default: "admin"
    }
})
adminSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, isAdmin: true},"key");
    return token;
}
function validateAdmin(admin){
    const schema = new Joi.object({
        username : Joi.string().min(3).max(50).required(),
        firstname: Joi.string().min(5).max(1024).required(),
        lastname: Joi.string().min(5).max(1024).required(),
        password: Joi.string().min(5).max(1024).required(),
        email: Joi.string().min(5).max(255).required().email(),
    })

    return schema.validate(admin);
}
const Admin = mongoose.model('Admin',adminSchema);
exports.Admin = Admin;
exports.validate = validateAdmin;
