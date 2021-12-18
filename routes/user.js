const express = require('express');
const mongoose = require('mongoose');
const {User, validate} = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async(req,res) => {
    console.log(req.body)
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({username: req.body.username});
    if(user){
        return res.status(400).send("USER ALREADY EXIST");
    }
    let user1 = await User.findOne({email: req.body.email});
    if(user1){
        return res.status(400).send("USER ALREADY EXISTS.");
    }
    const salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash(req.body.password, salt);
    user = new User({
        username : req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: pass,
        contact: req.body.contact,
        address: req.body.address,
    }); 
    await user.save();
    const token = user.generateAuthToken();
    user.token = token;
    res.send(user);
});

module.exports = router;