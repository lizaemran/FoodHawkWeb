const express = require('express');
const mongoose = require('mongoose');
const {Order, validate} = require('../models/order');
const { Restaurant } = require('../models/restaurants');
const {Rider, } = require('../models/rider');
const { User } = require('../models/user');
const axios = require('axios');
const riderAuth = require('../middleware/riderAuth');
const router = express.Router();
// const bcrypt = require('bcrypt');
// const riderAuth = require('../middleware/riderAuth');
router.post('/:r_id/:u_id', async(req,res) => {
    let order = new Order({
        restaurant_id: req.params.r_id,
        user_id: req.params.u_id,
        products: req.body.products,
        total_price: req.body.total_price,	
        status: req.body.status,
        date: req.body.date,
        time: req.body.time,
    });
    await order.save();
    let user = await User.findById({_id:req.params.u_id});
    user.orders.push(order._id);
    user = await user.save();
    let restaurant = await Restaurant.findById({_id:req.params.r_id});
    restaurant.orders.push(order._id);
    restaurant = await restaurant.save();
    res.send(order);
});
router.get('/assign/:id', async(req,res) => {
    let order = await Order.findById({_id:req.params.id});
    if (!order) return res.status(404).send("ORDER NOT FOUND");
    if (order.rider_id) return res.status(400).send("ORDER ALREADY ASSIGNED");
    let restaurant = await Restaurant.findById({_id:order.restaurant_id});
    let riders = await Rider.find({status: "available"});
    if (riders.length === 0) return res.status(404).send("NO RIDER AVAILABLE");
    let riderWithDistance = [];
      for(let i=0; i<riders.length; i++)
    {
    await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?origins=${riders[i].lat}%2C${riders[i].lng}&destinations=${restaurant.lat}%2C${restaurant.lng}&key=AIzaSyAOWEsA7XNwmoFasiw9hlAewldBeEJB8-o`)
    .then(res => {
        riderWithDistance.push({ rider: riders[i], distance: res?.data?.rows[0]?.elements[0]?.distance?.value});
    }).catch(err => {
        console.log(err);
    });
}
    console.log(riderWithDistance, "riderWithDistance");
    let minDistance = Math.min(...riderWithDistance.map(o => o.distance));
    let assignedrider = riderWithDistance.find(o => o.distance === minDistance);
    console.log("assignedrider",assignedrider)
    order.rider_id = assignedrider?.rider._id;
    console.log("order.rider_id",order.rider_id);
    let riderUpdate = await Rider.findById({_id:assignedrider.rider?._id});
    riderUpdate.status = "busy";
    console.log("riderUpdatedtobusy",riderUpdate);
    await riderUpdate.save();
    await order.save();
    res.send(riderUpdate);
});
router.delete('/:id', async(req, res) => {
    const order = await Order. findByIdAndDelete(req.params.id);
    if(!order) return res.status(404).send("ORDER WITH ID NOT FOUND")
    res.send(order);
   });
router.patch('/status/:id', riderAuth, async(req, res)=> {
    let order = await Order.findOne({_id: req.params.id});
    if (!order) return res.status(404).send("ORDER NOT FOUND");
    if(req.body.status === "delivered"){
        let rider = await Rider.findById({_id:order.rider_id});
        rider.status = "available";
        console.log("rider status update to available",rider.status);
        await rider.save();
    }
    order.status = req.body.status;
    await order.save();
    res.send(order);
});
module.exports = router;