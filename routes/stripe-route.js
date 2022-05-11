const { Router } = require('express');
const express = require('express');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const {v4 : uuid4} = require('uuid');

const router = express.Router();

router.get('/', (req,res,next) => {
    console.log('GET Response from Researcher')
    res.json({
        message: 'It works'
    });
});

router.post("/payment-intent", async(req,res)=>{
    var amount =req.body.amount;
    amount = amount * 100;
    //enter your checks whether the payment is correct
    const paymentIntent = await stripe.paymentIntents.create({
        amount ,
        currency: "PKR",  
      });
      res.status(200).json(paymentIntent.client_secret);

    })

// router.post('/pay', (req,res,next) => {
//     console.log(req.body.token);
//     const {token, amount} = req.body;
//     const idempotencyKey = uuid4();

//     return stripe.customers.create({
//         email: token.email,
//         source: token
//     }).then(customer => {
//         return stripe.charges.create({
//             amount: amount * 100,
//             currency: 'usd',
//             customer: customer.id,
//             receipt_email: token.email,
//             description: 'Test Charge',
//         }, {idempotencyKey});
//     }).then(charge => {
//         res.json({
//             message: 'Payment Successful'
//         });
//     }).catch(err => {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         });
//     }
//     );

// })

module.exports = router;