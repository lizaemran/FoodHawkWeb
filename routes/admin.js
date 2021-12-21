const express = require('express');
const mongoose = require('mongoose');
const {Admin, validate} = require('../models/admin');
const router = express.Router();
const bcrypt = require('bcrypt');
const adminAuth = require('../middleware/adminAuth');
const { User } = require('../models/user');
router.post('/', async(req,res) => {
    console.log(req.body)
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let admin = await Admin.findOne({username: req.body.username});
    if(admin){
        return res.status(400).send("USER ALREADY EXIST");
    }
    let user1 = await Admin.findOne({email: req.body.email});
    if(user1){
        return res.status(400).send("USER ALREADY EXISTS.");
    }
    const salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash(req.body.password, salt);
    admin = new Admin({
        username : req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: pass,
    }); 
    await admin.save();
    const token = admin.generateAuthToken();
    admin.token = token;
    res.send(admin);
});

router.get('/', adminAuth, async(req, res)=> {
    let admin = await Admin.findOne({_id: req.admin._id});
    if (!admin) return res.status(404).send("ADMIN NOT FOUND");
    res.send(admin);
});

router.get('/users', adminAuth, async (req,res) => {
    let user = await User.find({});
    res.send(user);
});

module.exports = router;