const express = require('express');
const mongoose = require('mongoose');
const {Rider, validate} = require('../models/rider');
const router = express.Router();
const bcrypt = require('bcrypt');
const riderAuth = require('../middleware/riderAuth');
const { Order } = require('../models/order');
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
     rider = new Rider({
        username: req.body.username,
        password: pass,
        email: req.body.email,
        name : req.body.name,
        phone: req.body.phone,
        lat: 0,
        lng: 0,
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