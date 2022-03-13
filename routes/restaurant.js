const express = require('express');
const mongoose = require('mongoose');
const {Restaurant, validateR} = require('../models/restaurants');
const router = express.Router();
const bcrypt = require('bcrypt');
const restaurantAuth = require('../middleware/restaurantAuth');
const { Order } = require('../models/order');
router.get('/', async (req,res) => {
    const restaurants = await Restaurant.find().sort({"rating": -1 });
    if (!restaurants) return res.status(404).send("RESTAURANT NOT FOUND");
    res.send(restaurants);
});
router.get('/:id/products', async (req,res) => {
    const restaurants = await Restaurant.find({"_id":req.params.id}).select("-_id products").populate("products");
    if (!restaurants) return res.status(404).send("RESTAURANT NOT FOUND");
    res.send(restaurants[0].products);
});
router.get('/:id', async (req,res) => {
    const restaurants = await Restaurant.findById({"_id":req.params.id}).populate("products").populate("ratingArray");
    if (!restaurants) return res.status(404).send("RESTAURANT NOT FOUND");
    res.send(restaurants);
});
router.get('/dashboard/:username', async (req,res) => {
    let restaurant = await Restaurant.findOne({username: req.params.username}).populate("products").populate("ratingArray").populate("orders").sort({"date": -1 });	
    if (!restaurant) return res.status(404).send("RESTAURANT NOT FOUND");
    res.send(restaurant);
});
router.post('/', async(req,res) => {
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
        lat: req.body.lat,
        lng: req.body.lng,
        phone: req.body.phone,
        rating: req.body.rating,
        status: false
    });
    await restaurant.save();
    const token = restaurant.generateAuthToken();
    restaurant.token = token;
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

router.get('/order/:id', restaurantAuth, async (req,res) => {
    const order = await Order.findById({"_id":req.params.id});
    if (!order) return res.status(404).send("ORDER NOT FOUND");
    res.send(order);
});
router.get('/search/:keyword', async (req,res) => {
    let restaurants = await Restaurant.find({}).populate("products").populate("ratingArray");
    let resultRestaurants = restaurants.filter(restaurant => {
        return restaurant.name.toLowerCase().includes(req.params.keyword.toLowerCase());
    });
    // filter restaurants whose products name contains the keyword
    let resultProducts = restaurants.filter(restaurant => {
        return restaurant.products.filter(product => {
            return product.name.toLowerCase().includes(req.params.keyword.toLowerCase());
        }).length > 0;
    });
    
    let result = resultRestaurants.concat(resultProducts);
    //sort by restaurant name
    result.sort((a,b) => {
        if(a.rating > b.rating) return -1;
        if(a.rating < b.rating) return 1;
        return 0;
    });

    // const regex = new RegExp(req.params.keyword, 'i');
    //  restaurants = await Restaurant.find({name: regex}).sort({"rating": -1 });
    // if (!restaurants) return res.status(404).send("RESTAURANT NOT FOUND");
    res.send(result);
});

router.get('/top/5', async (req,res) => {
    let restaurants = await Restaurant.find({}).populate("products").populate("ratingArray");
    let resultRestaurants = restaurants.filter(restaurant => {
        return restaurant.orders.length > 0;
    });
    let result = resultRestaurants.sort(function(a, b){
        return b.orders.length - a.orders.length;
    });
    res.send(result.slice(0,5));
});



module.exports = router;