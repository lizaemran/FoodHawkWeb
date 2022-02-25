const express = require('express');
const mongoose = require('mongoose');
const {Rider, validate} = require('../models/rider');
const router = express.Router();
const bcrypt = require('bcrypt');
const riderAuth = require('../middleware/riderAuth');
router.post('/', async(req,res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let rider = await Rider.findOne({username: req.body.username});
    if(rider){
        return res.status(400).send("RIDER ALREADY EXIST");
    }
    let rider1 = await Rider.findOne({email: req.body.email});
    if(rider1){
        return res.status(400).send("RIDER ALREADY EXISTS.");
    }
    const salt = await bcrypt.genSalt(10);
    let pass = await bcrypt.hash(req.body.password, salt);
     rider = new Rider({
        username: req.body.username,
        password: pass,
        email: req.body.email,
        name : req.body.name,
        phone: req.body.phone,
    });
    await rider.save();
    const token = rider.generateAuthToken();
    rider.token = token;
    res.send(rider);
});
router.get('/', riderAuth, async(req, res)=> {
    let rider = await Rider.findOne({_id: req.rider._id});
    if (!rider) return res.status(404).send("RIDER NOT FOUND");
    res.send(rider);
});
module.exports = router;