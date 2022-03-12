const express = require('express');
const mongoose = require('mongoose');
const {User, validate} = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const userAuth = require('../middleware/userAuth');
const { Order } = require('../models/order');

router.post('/', async(req,res) => {
    // console.log(req.body)
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
        lat: req.body.lat,
        lng: req.body.lng,
    }); 
    await user.save();
    const token = user.generateAuthToken();
    user.token = token;
    res.send(user);
});

router.get('/', userAuth, async(req, res)=> {
    let user = await User.findOne({_id: req.user._id});
    if (!user) return res.status(404).send("USER NOT FOUND");
    res.send(user);
});

router.get('/:id/orders', userAuth, async(req, res)=> {
    let orders = await Order.find({user_id: req.user._id}).sort({"date": -1 }).populate("products");
    if (!orders) return res.status(404).send("ORDERS NOT FOUND");
    res.send(orders);
});
router.get('/order/:id', userAuth, async (req,res) => {
    const order = await Order.findById({"_id":req.params.id}).populate("products");
    if (!order) return res.status(404).send("ORDER NOT FOUND");
    res.send(order);
});

module.exports = router;