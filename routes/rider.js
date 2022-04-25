const express = require('express');
const mongoose = require('mongoose');
const {Rider, validate} = require('../models/rider');
const router = express.Router();
const bcrypt = require('bcrypt');
const riderAuth = require('../middleware/riderAuth');
const { Order } = require('../models/order');
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

//register
router.post('/', async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let rider = await Rider.findOne({username: req.body.username});
    if(rider){
        return res.status(400).send("RIDER ALREADY EXIST");
    }
    let rider1 = await Rider.findOne({email: req.body.email});
    if(rider1){
        return res.status(400).send("RIDER ALREADY EXISTS.");
    }
    const salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash(req.body.password, salt);
    let otp = utility.randomNumber(4);
     rider = new Rider({
        username: req.body.username,
        password: pass,
        email: req.body.email,
        name : req.body.name,
        phone: req.body.phone,
        confirmOTP: otp,
        lat: 0,
        lng: 0,
    });
    var mailOptions = {
        from: '180984@students.au.edu.pk',
        to: req.body.email,
        subject: 'Please verify your account on Food Hawk',
        template: 'verifyEmailTemplate',
        context: {
            verifylink: 'http://localhost:3000/rider/verifyConfirm/' + otp,
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
    await rider.save();
    const token = rider.generateAuthToken();
    rider.token = token;
    res.send(rider);
});
router.get('/', riderAuth, async(req, res)=> {
    let rider = await Rider.findOne({_id: req.rider._id});
    if (!rider) return res.status(404).send("RIDER NOT FOUND");
    res.send(rider);
});
router.get('/:id', async(req, res)=> {
    let rider = await Rider.findOne({_id: req.params.id});
    if (!rider) return res.status(404).send("RIDER NOT FOUND");
    res.send(rider);
});
router.get('/:id/order', riderAuth, async(req, res)=> {
    let rider = await Rider.findById({"_id":req.params.id,  });
    if (!rider) return res.status(404).send("RIDER NOT FOUND");
    let order = await Order.find({"rider_id":req.params.id}).populate("restaurant_id").populate("rider_id").populate("products").populate("user_id");
    order = order.filter(order => order.status !== "delivered");
    if (order.length === 0) return res.status(404).send("ORDER NOT FOUND");
    order = order[0];
    res.send({
        products : order.products, 
        restaurant: {
            _id : order.restaurant_id._id,
            name : order.restaurant_id.name,
            lat : order.restaurant_id.lat,
            lng : order.restaurant_id.lng,
            location : order.restaurant_id.location,
            image : order.restaurant_id.image,
            phone: order.restaurant_id.phone,
        },
        user: {
            _id : order.user_id._id,
            name : order.user_id.firstname + " " + order.user_id.lastname,
            contact : order.user_id.contact,
            address : order.user_id.address,
            lat : order.user_id.lat,
            lng : order.user_id.lng,
        },
        id : order._id,
        total_price : order.total_price,
        status : order.status,
        date : order.date,
        time : order.time,
    });
});
router.get('/:id/order/delivered', async(req, res)=> {
    let rider = await Rider.findById({"_id":req.params.id,  });
    if (!rider) return res.status(404).send("RIDER NOT FOUND");
    let order = await Order.find({"rider_id":req.params.id}).populate("restaurant_id").populate("rider_id").populate("products").populate("user_id");
    order = order.filter(order => order.status === "delivered");
    if (order.length === 0) return res.status(404).send("ORDER NOT FOUND");
    let respondOrders = [];
    for(let i = 0; i < order.length; i++){
        respondOrders.push({
            products : order[i].products, 
            restaurant: {
                _id : order[i].restaurant_id._id,
                name : order[i].restaurant_id.name,
                lat : order[i].restaurant_id.lat,
                lng : order[i].restaurant_id.lng,
                location : order[i].restaurant_id.location,
                image : order[i].restaurant_id.image,
                phone: order[i].restaurant_id.phone,
            },
            user: {
                _id : order[i].user_id._id,
                name : order[i].user_id.firstname + " " + order[i].user_id.lastname,
                contact : order[i].user_id.contact,
                address : order[i].user_id.address,
                lat : order[i].user_id.lat,
                lng : order[i].user_id.lng,
            },
            id : order[i]._id,
            total_price : order[i].total_price,
            status : order[i].status,
            date : order[i].date,
            time : order[i].time,
        }
        )}
    res.send(respondOrders);
});
router.patch('/location/:id', riderAuth, async(req, res)=> {
    let rider = await Rider.findOne({_id: req.params.id});
    if (!rider) return res.status(404).send("RIDER NOT FOUND");
    rider.lat = req.body.lat;
    rider.lng = req.body.lng;
    await rider.save();
    res.send(rider);
   
});
router.patch('/status/:id', riderAuth, async(req, res)=> {
    let rider = await Rider.findOne({_id: req.params.id});
    if (!rider) return res.status(404).send("RIDER NOT FOUND");
    rider.status = req.body.status;
    await rider.save();
    res.send(rider);
});
module.exports = router;