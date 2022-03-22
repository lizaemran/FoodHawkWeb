const express = require('express');
const mongoose = require('mongoose');
const { Rating } = require('../models/rating');
const { Restaurant } = require('../models/restaurants');
const { User } = require('../models/user');
const router = express.Router();
router.post('/:r_id/:u_id', async(req,res) => {
    let restaurant = await Restaurant.findById({_id:req.params.r_id}).populate('ratingArray');
    if(restaurant.ratingArray.filter((r) => r.user_id == req.params.u_id).length > 0){
        return res.status(400).send("RESTAURANT RATED ALREADY");
    }  
     let rating = new Rating({
        stars: req.body.stars,
        user_id: req.params.u_id,
        restaurant_id: req.params.r_id,
        description: req.body.description,
    });
    let user = await User.findById({_id:req.params.u_id});
    rating.user_name = user.firstname;
    await rating.save();
    // user = await user.save();
    restaurant.ratingArray.push(rating);
    restaurant.ratingR = restaurant.ratingArray.reduce((a,b) => a + b.stars, 0)/restaurant.ratingArray.length;
    restaurant.rating = (restaurant.ratingR + restaurant.ratingO) / (restaurant.ratingArray.length + restaurant.ratingOArray.length);
    restaurant = await restaurant.save();
    res.send(restaurant);
});
router.get('/:id', async (req,res) => {
    const rating = await Rating.findById({"_id":req.params.id});
    if (!rating) return res.status(404).send("RATING NOT FOUND");
    res.send(rating);
});

module.exports = router;