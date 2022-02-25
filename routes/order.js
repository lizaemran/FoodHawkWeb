const express = require('express');
const mongoose = require('mongoose');
const {Order, validate} = require('../models/order');
const { Restaurant } = require('../models/restaurants');
const { User } = require('../models/user');
const router = express.Router();
// const bcrypt = require('bcrypt');
// const riderAuth = require('../middleware/riderAuth');
router.post('/:r_id/:u_id', async(req,res) => {
    let order = new Order({
        restaurant_id: req.params.r_id,
        user_id: req.params.u_id,
        products: req.body.products,	
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
router.delete('/:id', async(req, res) => {
    const order = await Order. findByIdAndDelete(req.params.id);
    if(!order) return res.status(404).send("ORDER WITH ID NOT FOUND")
    res.send(order);
   });
module.exports = router;