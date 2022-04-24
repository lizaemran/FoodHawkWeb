const express = require('express');
const mongoose = require('mongoose');
const {User, validate} = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const userAuth = require('../middleware/userAuth');
const { Order } = require('../models/order');
const nodemailer = require('nodemailer');
const utility = require("../utility");
const hbs = require('nodemailer-express-handlebars')
const path = require('path')

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

//register
router.post('/', async(req,res) => {
    // console.log(req.body)
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({username: req.body.username});
    if(user){
        return res.status(400).send("USER ALREADY EXIST");
    }
    let user1 = await User.findOne({email: req.body.email});
    if(user1){
        return res.status(400).send("USER ALREADY EXISTS.");
    }
    const salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash(req.body.password, salt);
    let otp = utility.randomNumber(4);
    user = new User({
        username : req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        confirmOTP: otp,
        password: pass,
        contact: req.body.contact,
        address: req.body.address,
        lat: req.body.lat,
        lng: req.body.lng,
    }); 
//     var message = `<div>
//     <p><b>Email:</b> ${req.body.email}<br />
//     <b>Message: </b>${req.body.message}<br />
//     <span>Food Hawk</span>
//     </p>
//    </div>`;
    var mailOptions = {
    from: '180984@students.au.edu.pk',
    to: req.body.email,
    subject: 'Please verify your account on Food Hawk',
    template: 'verifyEmailTemplate',
    context: {
        verifylink: 'http://localhost:3000/user/verifyConfirm/' + otp,
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
    await user.save();
    const token = user.generateAuthToken();
    user.token = token;
    res.send(user);
});

router.put('/:id', userAuth, async(req, res) => {
    let user;
     try { user = await User.findByIdAndUpdate({_id:req.params.id},{
         firstname : req.body.firstname,
         lastname: req.body.lastname,
         contact: req.body.contact,
         address: req.body.address,
     }, {new: true});
 }
 catch(e){}
     if (!user) return res.status(404).send("USER WITH ID NOT FOUND");
     res.send(user);
 });

router.get('/', userAuth, async(req, res)=> {
    let user = await User.findOne({_id: req.user._id});
    if (!user) return res.status(404).send("USER NOT FOUND");
    res.send(user);
});

router.get('/:id/orders', userAuth, async(req, res)=> {
    let orders = await Order.find({user_id: req.user._id}).sort({"date": -1 }).populate("products");
    if (!orders) return res.status(404).send("ORDERS NOT FOUND");
    res.send(orders);
});
router.get('/order/:id', async (req,res) => {
    const order = await Order.findById({"_id":req.params.id}).populate("products");
    if (!order) return res.status(404).send("ORDER NOT FOUND");
    res.send(order);
});

//contact
router.post('/message' , async(req,res) => {
    // var message = `<div>
    //                 <p><b>Email:</b> ${req.body.email}<br />
    //                 <b>Message: </b>${req.body.message}<br />
    //                 <span>Food Hawk</span>
    //                 </p>
    //                </div>`;
    var mailOptions = {
        from: req.body.email,
        to: '180984@students.au.edu.pk',
        subject: req.body.subject,
        template: 'contactTemplate',
        context: {
            email: req.body.email,
            message: req.body.message,
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

module.exports = router;