const express = require('express');
const mongoose = require('mongoose');
const {Admin, validate} = require('../models/admin');
const router = express.Router();
const bcrypt = require('bcrypt');
const adminAuth = require('../middleware/adminAuth');
const { User } = require('../models/user');
const { Rider } = require('../models/rider');
const { Order } = require('../models/order');
const { Restaurant, validateR } = require('../models/restaurants');
router.post('/', async(req,res) => {
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

router.get('/riders', adminAuth, async (req,res) => {
    let rider = await Rider.find({});
    res.send(rider);
});

router.get('/orders', adminAuth, async (req,res) => {
    let order = await Order.find({}).populate("products").sort({"date": -1 });
    res.send(order);
});

router.get('/order/:id', adminAuth, async (req,res) => {
    const order = await Order.findById({"_id":req.params.id});
    if (!order) return res.status(404).send("ORDER NOT FOUND");
    res.send(order);
});

router.post('/restaurant/', adminAuth, async(req,res) => {
    const {error} = validateR(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let restaurant = await Restaurant.findOne({username: req.body.username});
    if(restaurant){
        return res.status(400).send("RESTAURANT ALREADY EXIST");
    }
    let restaurant1 = await Restaurant.findOne({email: req.body.email});
    if(restaurant1){
        return res.status(400).send("RESTAURANT ALREADY EXISTS.");
    }
    const salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash(req.body.password, salt);
     restaurant = new Restaurant({
        username: req.body.username,
        password: pass,
        email: req.body.email,
        name : req.body.name,
        image: req.body.image,
        location: req.body.location,
        phone: req.body.phone,
        rating: req.body.rating,
        status: false
    });
    await restaurant.save();
    res.send(restaurant);
});



module.exports = router;