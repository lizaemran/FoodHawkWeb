const express = require('express');
const mongoose = require('mongoose');
const {User, validate} = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');

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
    res.send(token);
});

module.exports = router;