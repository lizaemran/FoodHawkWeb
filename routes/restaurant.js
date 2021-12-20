const express = require('express');
const mongoose = require('mongoose');
const {Restaurant} = require('../models/restaurants');
const router = express.Router();
router.get('/', async (req,res) => {
    const restaurants = await Restaurant.find().sort({"rating": -1 });
    if (!restaurants) return res.status(404).send("RESTAURANT NOT FOUND");
    res.send(restaurants);
});
router.get('/:id', async (req,res) => {
    const restaurants = await Restaurant.find({"_id":req.params.id}).select("-_id products").populate("products");
    if (!restaurants) return res.status(404).send("RESTAURANT NOT FOUND");
    res.send(restaurants[0].products);
});
router.post('/', async(req,res) => {
    const restaurant = new Restaurant({
        name : req.body.name,
        image: req.body.image,
        location: req.body.location,
        rating: req.body.rating,
        status: false
    });
    await restaurant.save();
    res.send(restaurant);
});
router.put('/:id', async(req, res) => {
   let restaurant;
    try { restaurant = await Restaurant.findByIdAndUpdate({_id:req.params.id},{
        name : req.body.name,
        image: req.body.image,
        location: req.body.location,
        rating: req.body.rating,
        status: false,
    }, {new: true});
}
catch(e){}
    if (!restaurant) return res.status(404).send("RESTAURANT WITH ID NOT FOUND");
    res.send(restaurant);
});
router.delete('/:id', async(req, res) => {
 const restaurant = await Restaurant. findByIdAndDelete(req.params.id);
 if(!restaurant) return res.status(404).send("RESTAURANT WITH ID NOT FOUND")
 res.send(restaurant);
});
router.patch('/:id', async(req,res) => {
    let restaurant;
    try { restaurant = await Restaurant.findOne({_id:req.params.id});
        restaurant.status = req.body.status
    await restaurant.save();
    res.send(restaurant);
}
    catch{
        if (!restaurant) return res.status(404).send("RESTAURANT WITH ID NOT FOUND");
    }
});

module.exports = router;