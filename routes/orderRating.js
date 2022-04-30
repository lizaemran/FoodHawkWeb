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
    restaurant.ratingOArray.push(orderRating);
    //get all values of stars in orderRating model from database
    if(restaurant.ratingOArray.length > 1){
    let starsArray = [];
    let orderRatingsArray = await OrderRating.find({});
    for(let i = 0; i < orderRatingsArray.length; i++){
        starsArray.push(orderRatingsArray[i].stars);
    }
    starsArray.push(req.body.stars); //append new value of star to starsArray
    console.log(starsArray);
    //calculate average of starsArray
    let sum = 0;
    for(let i = 0; i < starsArray.length; i++){
        sum += starsArray[i];
    }
    let average = Math.floor(sum/starsArray.length);
    console.log(average);
    restaurant.ratingO = average;
    }
    else{
        restaurant.ratingO = req.body.stars;   
    }
    // console.log('restaurant.ratingOArray', restaurant.ratingOArray);
    // var rat_o;
    // console.log('orderRating.stars', restaurant.ratingOArray);
    // if(restaurant.ratingOArray.length > 1){
    //  rat_o = Number((restaurant.ratingOArray.reduce((a,b) => a + b.stars, 0))/restaurant.ratingOArray.length);
    //  console.log('restaurant.ratin',rat_o);
    // }
    // else{
    //  rat_o = Number(restaurant.ratingOArray[0].stars);
    //  console.log('restaurant.ratinelse',rat_o);
    // }
    // restaurant.ratingO = parseInt(rat_o);
    if(restaurant.ratingR > 0){
    restaurant.rating = Math.ceil((restaurant.ratingR + restaurant.ratingO) / (restaurant.ratingArray.length + restaurant.ratingOArray.length));
    }
    else{
    restaurant.rating = restaurant.ratingO;
    }
    console.log('restaurant.rating',restaurant.rating);
    await restaurant.save();
    await orderRating.save(); 
    order.ratingOrder = orderRating; 
    console.log('order.ratingOrder',order.ratingOrder);
    await order.save(); 
    res.send(orderRating);
});

router.get('/:id', async (req,res) => {
    const orderRating = await OrderRating.findById(req.params.id).populate("user_id");
    if (!orderRating) return res.status(404).send("ORDER RATING WITH ID NOT FOUND");
    res.send(orderRating);
});

module.exports = router;
