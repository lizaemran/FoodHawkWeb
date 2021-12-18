const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const adminSchema = new mongoose.Schema({
    name:{
        type:String,
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
    user_type: {
        type: String,
        required: true
    }
})

const Admin = mongoose.model('Admin',adminSchema);
exports.Admin = Admin;