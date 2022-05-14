const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const {cloudinary} = require('../cloudinary');
const { Restaurant } = require("../models/restaurants");
//restaurant gallery
router.post('/upload', async (req, res) => {
    try{
        var fileStr = req.body.data;
        const restaurant_id = req.body.restaurant_id;
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, { 
            upload_preset: 'dev_setups',
        });
        const restaurant = await Restaurant.findById(restaurant_id);
        restaurant.gallery.push(uploadedResponse.url);
        restaurant.save();
        res.json({message : 'yay'});
    }catch(error){
        res.status(500).json({error: 'Something went wrong'});    }
})

router.get('/images', async (req, res) => {
    const {resources} = await cloudinary.search.expression('folder:dev_setups')
    .sort_by('public_id', 'desc')
    .max_results(30)
    .execute();
    const publicIds = resources.map(resource => resource.public_id);
    // const images = await cloudinary.api.resources(publicIds);
    res.send(publicIds);
})


module.exports = router;
