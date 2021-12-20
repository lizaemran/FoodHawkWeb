const express = require('express');
const mongoose = require('mongoose');
const {User, validate} = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Admin } = require('../models/admin');

router.post('/user', async(req,res) => {
    let user = await User.findOne({username: req.body.username});
    if(!user){
        return res.status(400).send("INVALID USERNAME OR PASSWORD");
    }
    let pass = await bcrypt.compare(req.body.password, user.password);
    if(!pass){
        return res.status(400).send("INVALID USERNAME OR PASSWORD");
    }
    const token = user.generateAuthToken();
    res.send({token: token});
});

router.post('/admin', async(req,res) => {
    let admin = await Admin.findOne({username: req.body.username});
    if(!admin){
        return res.status(400).send("INVALID USERNAME OR PASSWORD");
    }
    let pass = await bcrypt.compare(req.body.password, admin.password);
    if(!pass){
        return res.status(400).send("INVALID USERNAME OR PASSWORD");
    }
    const token = admin.generateAuthToken();
    res.send({token: token});
});

module.exports = router;