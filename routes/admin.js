const express = require('express');
const mongoose = require('mongoose');
const {Admin, validate} = require('../models/admin');
const router = express.Router();
const bcrypt = require('bcrypt');
const adminAuth = require('../middleware/adminAuth');
const { User } = require('../models/user');
const { Rider } = require('../models/rider');
const { Order } = require('../models/order');
const { Restaurant, validateR } = require('../models/restaurants');
// var positive_tweets = require('../positive_tweets');
// var negative_tweets = require('../negative_tweets.json');
var BayesClassifier = require('bayes-classifier')
var classifier = new BayesClassifier()

// var positiveData = positive_tweets.map(tweet => {
//     return {
//         text: tweet.text,
//     }
// }
// )
// console.log(positiveData);

// var negativeData = negative_tweets.map(tweet => {
//     return {
//         text: tweet.text,
//     }
// }
// )

var positiveDocuments = [
  `I love tacos.`,
  `Dude, that burrito was epic!`,
  `Holy cow, these nachos are so good and tasty.`,
  `I am drooling over the awesome bean and cheese quesadillas.`,
  `#FollowFriday @France_Inte @PKuchly57 @Milipol_Paris for being top engaged members in my community this week :)`, 
  `@Lamb2ja Hey James! How odd :/ Please call our Contact Centre on 02392441234 and we will be able to assist you :) Many thanks!`,
  `It was very yummy and fast`,
  `Best Food over`,
  `The order was fast`,
  `The food was good`,
  `Order was delivered right on time`,
  `The food was fresh`,
  `The food was tasty`,
  `The food was delicious`,
  `The food was awesome`,
  `The food was amazing`,
  `The food was great`,
]
 
var negativeDocuments = [
  `Gross, worst taco ever.`,
  `The buritos gave me horrible diarrhea.`,
  `I'm going to puke if I eat another bad nacho.`,
  `I'd rather die than eat those nasty enchiladas.`,
   `I'm not going to eat another bad nacho.`,
   `Bad food ever`,
   `I hate this order`,
   `I hate this food`,
   `Order was very late`,
   `I am pretty disappointed`,
   `I am disappinted`,
    `The rider was rude, angry`,
    `The food was cold`,
    `The food was stale`,
    `Too many cabbages`,
    `The food was overcooked`,
    `The food was undercooked`,
    `The rider was late`,
    `The rider was rude`,
    `The rider was angry`,
    `The rider was rude, angry`,
    `The order was not in time`


]
 
classifier.addDocuments(positiveDocuments, `positive`)
classifier.addDocuments(negativeDocuments, `negative`)
 
classifier.train()
 
console.log(classifier.classify(`kill`)) // "positive"

router.get('/reviewclassification', async(req,res) => {
    let reviews = await Order.find({}).populate("ratingOrder");
    for(let i = 0; i < reviews.length; i++){
        let review = reviews[i];
        let classification = classifier.classify(review.ratingOrder.description);
        review.classification = classification;
        await review.save();
    }
    res.send(reviews);
})

router.get('/restaurant/:id', async (req,res) => {
    let reviews = await Order.find({}).populate("ratingOrder");
    for(let i = 0; i < reviews.length; i++){
        let review = reviews[i];
        let classification = classifier.classify(review.ratingOrder.description);
        review.classification = classification;
        await review.save();
    }
    const restaurant = await Restaurant.findById({"_id":req.params.id}).populate("products").populate("ratingArray").populate("ratingOArray").populate("orders");
    if (!restaurant) return res.status(404).send("RESTAURANT NOT FOUND");
    res.send(restaurant);
});

router.post('/', async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let admin = await Admin.findOne({username: req.body.username});
    if(admin){
        return res.status(400).send("USER ALREADY EXIST");
    }
    let user1 = await Admin.findOne({email: req.body.email});
    if(user1){
        return res.status(400).send("USER ALREADY EXISTS.");
    }
    const salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash(req.body.password, salt);
    admin = new Admin({
        username : req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: pass,
    }); 
    await admin.save();
    const token = admin.generateAuthToken();
    admin.token = token;
    res.send(admin);
});

router.get('/', adminAuth, async(req, res)=> {
    let admin = await Admin.findOne({_id: req.admin._id});
    if (!admin) return res.status(404).send("ADMIN NOT FOUND");
    res.send(admin);
});

router.get('/users', adminAuth, async (req,res) => {
    let user = await User.find({});
    res.send(user);
});

router.get('/riders', adminAuth, async (req,res) => {
    let rider = await Rider.find({});
    res.send(rider);
});

router.get('/orders', adminAuth, async (req,res) => {
    let order = await Order.find({}).populate("products").sort({"date": -1 });
    res.send(order);
});

router.get('/order/:id', adminAuth, async (req,res) => {
    const order = await Order.findById({"_id":req.params.id});
    if (!order) return res.status(404).send("ORDER NOT FOUND");
    res.send(order);
});

router.post('/restaurant/', adminAuth, async(req,res) => {
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
        phone: req.body.phone,
        rating: req.body.rating,
        status: false
    });
    await restaurant.save();
    res.send(restaurant);
});



module.exports = router;