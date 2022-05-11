const express = require('express');
const mongoose = require('mongoose');
const {Booking} = require('../models/booking');
const { Restaurant } = require('../models/restaurants');
const { User } = require('../models/user');
const router = express.Router();
// const bcrypt = require('bcrypt');
// const riderAuth = require('../middleware/riderAuth');
router.post('/:r_id/:u_id', async(req,res) => {
    let booking = new Booking({
        restaurant_id: req.params.r_id,
        user_id: req.params.u_id,
        name: req.body.name,	
        contact: req.body.contact,
        no_of_people: req.body.no_of_people,
        time: req.body.time,
        total_price: req.body.total_price,
        dateOfBooking: req.body.dateOfBooking
    });
    for(let i = 0; i < req.body.products.length; i++){
        booking.products.push(req.body.products[i].id);
    }
    await booking.save();
    let user = await User.findById({_id:req.params.u_id});
    user.bookings.push(booking._id);
    user = await user.save();
    let restaurant = await Restaurant.findById({_id:req.params.r_id});
    restaurant.bookings.push(booking._id);
    restaurant = await restaurant.save();
    res.send(booking);
});
router.delete('/:id', async(req, res) => {
    const booking = await Booking. findByIdAndDelete(req.params.id);
    if(!booking) return res.status(404).send("BOOKING WITH ID NOT FOUND")
    res.send(booking);
   });
module.exports = router;