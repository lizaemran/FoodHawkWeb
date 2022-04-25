const express = require('express');
const mongoose = require('mongoose');
const {User, validate} = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Admin } = require('../models/admin');
const { Restaurant } = require('../models/restaurants');
const { Rider } = require('../models/rider');

router.post('/user/verifyConfirm', async(req,res) => {
    let user = await User.findOne({confirmOTP: req.body.otp});
    if(!user){
        return res.status(400).send("INVALID OTP");
    }
    user.isConfirmed = true;
    user.confirmOTP = null;
    await user.save();
    return res.status(200).send("OTP VERIFIED");
});

router.post('/rider/verifyConfirm', async(req,res) => {
    let user = await Rider.findOne({confirmOTP: req.body.otp});
    if(!user){
        return res.status(400).send("INVALID OTP");
    }
    user.isConfirmed = true;
    user.confirmOTP = null;
    await user.save();
    return res.status(200).send("OTP VERIFIED");
});

router.post('/restaurant/verifyConfirm', async(req,res) => {
    let user = await Restaurant.findOne({confirmOTP: req.body.otp});
    if(!user){
        return res.status(400).send("INVALID OTP");
    }
    user.isConfirmed = true;
    user.confirmOTP = null;
    await user.save();
    return res.status(200).send("OTP VERIFIED");
});


router.post('/user', async(req,res) => {
    let user = await User.findOne({username: req.body.username});
    if(!user){
        return res.status(400).send("INVALID USERNAME OR PASSWORD");
    }
    let pass = await bcrypt.compare(req.body.password, user.password);
    if(!pass){
        return res.status(400).send("INVALID USERNAME OR PASSWORD");
    }
    const token = user.generateAuthToken();
    res.send({token: token});
});

router.post('/restaurant', async(req,res) => {
    let restaurant = await Restaurant.findOne({username: req.body.username});
    if(!restaurant){
        return res.status(400).send("INVALID USERNAME OR PASSWORD");
    }
    let pass = await bcrypt.compare(req.body.password, restaurant.password);
    if(!pass){
        return res.status(400).send("INVALID USERNAME OR PASSWORD");
    }
    const token = restaurant.generateAuthToken();
    res.send({token: token, restaurant: restaurant});
});

router.post('/admin', async(req,res) => {
    let admin = await Admin.findOne({username: req.body.username});
    if(!admin){
        return res.status(400).send("INVALID USERNAME OR PASSWORD");
    }
    let pass = await bcrypt.compare(req.body.password, admin.password);
    if(!pass){
        return res.status(400).send("INVALID USERNAME OR PASSWORD");
    }
    const token = admin.generateAuthToken();
    res.send({token: token});
});

router.post('/rider', async(req,res) => {
    let rider = await Rider.findOne({username: req.body.username});
    if(!rider){
        return res.status(400).send("INVALID USERNAME OR PASSWORD");
    }
    let pass = await bcrypt.compare(req.body.password, rider.password);
    if(!pass){
        return res.status(400).send("INVALID USERNAME OR PASSWORD");
    }
    const token = rider.generateAuthToken();
    res.send({token: token});
});

module.exports = router;