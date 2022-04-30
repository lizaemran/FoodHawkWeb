const express = require('express');
const mongoose = require('mongoose');
const {User, validate} = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Admin } = require('../models/admin');
const { Restaurant } = require('../models/restaurants');
const { Rider } = require('../models/rider');
const nodemailer = require('nodemailer');
const utility = require("../utility");
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

//nodemailer
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '180984@students.au.edu.pk',
      pass: '7031376@#'
    }
});

const handlebarOptions = {
	viewEngine: {
		partialsDir: path.resolve('./templates'),
		defaultLayout: false,
	},
	viewPath: path.resolve('./templates'),
};

transporter.use('compile', hbs(handlebarOptions))


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

//make route for forget password
router.post('/user/forgetPassword', async(req,res) => {
    let user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send("INVALID EMAIL");
    }
    let otp = utility.randomNumber(4);
    user.resetOTP = otp;
    await user.save();
    let mailOptions = {
        from: '180984@students.au.edu.pk',
        to: req.body.email,
        subject: 'Please reset your password on Food Hawk',
        template: 'forgotPasswordTemplate',
        context: {
            resetlink: 'http://localhost:3000/user/forgotPassword/' + otp,
        }
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        res.send(error);
        } else {
        console.log('Email sent: ' + info.response);
        res.send({message: "Message Sent"});
        }
    });
});

//make route for reset password
router.post('/user/resetPassword', async(req,res) => {
    let user = await User.findOne({resetOTP: req.body.otp});
    if(!user){
        return res.status(400).send("INVALID OTP");
    }
    const salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash(req.body.password, salt);
    user.password = pass;
    user.resetOTP = null;
    await user.save();
    return res.status(200).send("PASSWORD RESET");
});

//forget and reset password for rider
//make route for forget password
router.post('/rider/forgetPassword', async(req,res) => {
    let user = await Rider.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send("INVALID EMAIL");
    }
    let otp = utility.randomNumber(4);
    user.resetOTP = otp;
    await user.save();
    let mailOptions = {
        from: '180984@students.au.edu.pk',
        to: req.body.email,
        subject: 'Please reset your password on Food Hawk',
        template: 'forgotPasswordTemplate',
        context: {
            resetlink: 'http://localhost:3000/rider/forgotPassword/' + otp,
        }
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        res.send(error);
        } else {
        console.log('Email sent: ' + info.response);
        res.send({message: "Message Sent"});
        }
    });
});

router.post('/rider/resetPassword', async(req,res) => {
    let user = await Rider.findOne({resetOTP: req.body.otp});
    if(!user){
        return res.status(400).send("INVALID OTP");
    }
    const salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash(req.body.password, salt);
    user.password = pass;
    user.resetOTP = null;
    await user.save();
    return res.status(200).send("PASSWORD RESET");
});

//forget and reset password for restaurant
router.post('/restaurant/forgetPassword', async(req,res) => {
    let user = await Restaurant.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send("INVALID EMAIL");
    }
    let otp = utility.randomNumber(4);
    user.resetOTP = otp;
    await user.save();
    let mailOptions = {
        from: '180984@students.au.edu.pk',
        to: req.body.email,
        subject: 'Please reset your password on Food Hawk',
        template: 'forgotPasswordTemplate',
        context: {
            resetlink: 'http://localhost:3000/restaurant/forgotPassword/' + otp,
        }
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        res.send(error);
        } else {
        console.log('Email sent: ' + info.response);
        res.send({message: "Message Sent"});
        }
    });
});

router.post('/restaurant/resetPassword', async(req,res) => {
    let user = await Restaurant.findOne({resetOTP: req.body.otp});
    if(!user){
        return res.status(400).send("INVALID OTP");
    }
    const salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash(req.body.password, salt);
    user.password = pass;
    user.resetOTP = null;
    await user.save();
    return res.status(200).send("PASSWORD RESET");
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
    rider.status = "available";
    await rider.save();
    const token = rider.generateAuthToken();
    res.send({token: token});
});

module.exports = router;