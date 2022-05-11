const express = require('express');
const mongoose = require('mongoose');
const {Restaurant, validateR} = require('../models/restaurants');
const router = express.Router();
const bcrypt = require('bcrypt');
const restaurantAuth = require('../middleware/restaurantAuth');
const { Order } = require('../models/order');
const nodemailer = require('nodemailer');
const utility = require("../utility");
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
const {cloudinary} = require('../cloudinary');


//nodemailer
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '180984@students.au.edu.pk',
      pass: '7031376@#'
    }
});

const handlebarOptions = {
	viewEngine: {
		partialsDir: path.resolve('./templates'),
		defaultLayout: false,
	},
	viewPath: path.resolve('./templates'),
};

transporter.use('compile', hbs(handlebarOptions))

router.get('/', async (req,res) => {
    const restaurants = await Restaurant.find().sort({"rating": -1 }).populate("products");
    if (!restaurants) return res.status(404).send("RESTAURANT NOT FOUND");
    res.send(restaurants);
});
router.get('/:id/products', async (req,res) => {
    const restaurants = await Restaurant.find({"_id":req.params.id}).select("-_id products").populate("products");
    if (!restaurants) return res.status(404).send("RESTAURANT NOT FOUND");
    res.send(restaurants[0].products);
});
router.get('/:id', async (req,res) => {
    const restaurant = await Restaurant.findById({"_id":req.params.id}).populate("products").populate("ratingArray").populate("ratingOArray");
    if (!restaurant) return res.status(404).send("RESTAURANT NOT FOUND");
    res.send(restaurant);
});
router.get('/dashboard/:username', async (req,res) => {
    let restaurant = await Restaurant.findOne({username: req.params.username}).populate("products").populate("ratingArray").populate("ratingOArray").populate("orders").sort({"date": -1 });	
    if (!restaurant) return res.status(404).send("RESTAURANT NOT FOUND");
    res.send(restaurant);
});

//register
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
    const uploadedResponse = await cloudinary.uploader.upload(req.body.image, { 
        upload_preset: 'dev_setups',
    });
    let uploaded_image = uploadedResponse.url;
    let otp = utility.randomNumber(4);
     restaurant = new Restaurant({
        username: req.body.username,
        password: pass,
        email: req.body.email,
        name : req.body.name,
        image: uploaded_image,
        location: req.body.location,
        lat: req.body.lat,
        lng: req.body.lng,
        phone: req.body.phone,
        rating: req.body.rating,
        status: false,
        confirmOTP: otp,
    });
    var mailOptions = {
        from: '180984@students.au.edu.pk',
        to: req.body.email,
        subject: 'Please verify your account on Food Hawk',
        template: 'verifyEmailTemplate',
        context: {
            verifylink: 'http://localhost:3000/restaurant/verifyConfirm/' + otp,
        }
        };
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        res.send(error);
        } else {
        console.log('Email sent: ' + info.response);
        res.send({message: "Message Sent"});
        }
        });
    await restaurant.save();
    const token = restaurant.generateAuthToken();
    restaurant.token = token;
    res.send(restaurant);
});

//resend verification link
router.post('/resend', async(req,res) => {
    let user = await Restaurant.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send("RESTAURANT NOT FOUND");
    }
    let otp = utility.randomNumber(4);
    user.confirmOTP = otp;
    await user.save();
    var mailOptions = {
    from: '180984@students.au.edu.pk',
    to: req.body.email,
    subject: 'Please verify your account on Food Hawk',
    template: 'verifyEmailTemplate',
    context: {
        verifylink: 'http://localhost:3000/restaurant/verifyConfirm/' + otp,
    }
    };
    transporter.sendMail(mailOptions, function(error, info){
    if (error) {
    console.log(error);
    res.send(error);
    } else {
    console.log('Email sent: ' + info.response);
    res.send({message: "Message Sent"});
    }
    });
});


router.put('/:id', async(req, res) => {
   let restaurant;
   const uploadedResponse = await cloudinary.uploader.upload(req.body.image, { 
    upload_preset: 'dev_setups',
    });
    let uploaded_image = uploadedResponse.url;
    try { restaurant = await Restaurant.findByIdAndUpdate({_id:req.params.id},{
        name : req.body.name,
        image: uploaded_image,
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

router.patch('/overview/:id', async(req,res) => {
    let restaurant;
    try { restaurant = await Restaurant.findOne({_id:req.params.id});
        restaurant.overview = req.body.overview
    await restaurant.save();
    res.send(restaurant);
}
    catch{
        if (!restaurant) return res.status(404).send("RESTAURANT WITH ID NOT FOUND");
    }
});

router.patch('/open-time/:id', async(req,res) => {
    let restaurant;
    try { restaurant = await Restaurant.findOne({_id:req.params.id});
        restaurant.openTime = req.body.openTime
    await restaurant.save();
    res.send(restaurant);
}
    catch{
        if (!restaurant) return res.status(404).send("RESTAURANT WITH ID NOT FOUND");
    }
});

router.patch('/close-time/:id', async(req,res) => {
    let restaurant;
    try { restaurant = await Restaurant.findOne({_id:req.params.id});
        restaurant.closeTime = req.body.closeTime
    await restaurant.save();
    res.send(restaurant);
}
    catch{
        if (!restaurant) return res.status(404).send("RESTAURANT WITH ID NOT FOUND");
    }
});

router.patch('/enable-booking/:id', async(req,res) => {
    let restaurant;
    try { restaurant = await Restaurant.findOne({_id:req.params.id});
        if(req.body.enableBooking == true){
            restaurant.enableBooking = true;
        }
        else{
            restaurant.enableBooking = false;
        }
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
    //filter restaurants whose products category contains the keyword
    let resultCategories = restaurants.filter(restaurant => {
        return restaurant.products.filter(product => {
            return product.category.toLowerCase().includes(req.params.keyword.toLowerCase());
        }).length > 0;
    });

    let result = resultRestaurants.concat(resultProducts).concat(resultCategories);
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