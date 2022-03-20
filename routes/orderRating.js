const express = require('express');
const { Order } = require('../models/order');
const { OrderRating } = require('../models/orderRating');
const { Restaurant } = require('../models/restaurants');
const { User } = require('../models/user');
const router = express.Router();
// const bcrypt = require('bcrypt');
// const riderAuth = require('../middleware/riderAuth');
router.post('/:r_id/:u_id/:o_id', async(req,res) => {
    let order = await Order.findById({_id:req.params.o_id});
    if(!order){ return res.status(404).send('Order not found'); }
    let restaurant = await Restaurant.findById({_id:req.params.r_id});
    if(!restaurant){ return res.status(404).send('Restaurant not found'); }
    let user = await User.findById(req.params.u_id);
    if(!user){ return res.status(404).send('User not found'); }
    if(order.ratingOrder != null || order.ratingOrder != undefined){ return res.status(400).send('Order already rated'); }  
    let orderRating = new OrderRating({
        restaurant_id: req.params.r_id,
        user_id: req.params.u_id,
        order_id: req.params.o_id,
        stars: req.body.stars,
        description: req.body.description
    });
    orderRating.user_name = user.firstname;
    await orderRating.save();
    restaurant.ratingOArray.push(orderRating);
    restaurant.ratingO = restaurant.ratingOArray.reduce((a,b) => a + b.stars, 0)/restaurant.ratingOArray.length;
    restaurant.rating = (restaurant.ratingR + restaurant.ratingO) / (restaurant.ratingArray.length + restaurant.ratingOArray.length);
    restaurant = await restaurant.save();
    order.ratingOrder = orderRating;
    order = await order.save();
    res.send(orderRating);
});

router.get('/:id', async (req,res) => {
    const orderRating = await OrderRating.findById(req.params.id).populate("user_id");
    if (!orderRating) return res.status(404).send("ORDER RATING WITH ID NOT FOUND");
    res.send(orderRating);
});

module.exports = router;
