const express = require('express');
const mongoose = require('mongoose');
const {Product} = require('../models/product');
const router = express.Router();
const {Restaurant} = require('../models/restaurants');
router.get('/', async (req,res) => {
    const products = await Product.find();
    if (!products) return res.status(404).send("PRODUCT NOT FOUND");
    res.send(products);
});
router.get('/:id', async (req,res) => {
    const products = await Product.findById(req.params.id);
    if (!products) return res.status(404).send("PRODUCT WITH ID NOT FOUND");
    res.send(products);
});
router.post('/:r_id', async(req,res) => {
    let product = new Product({
        restaurant_id: req.params.r_id,
        name : req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        discount: req.body.discount,
        category: req.body.category
    });
    product = await product.save();
    let restaurant = await Restaurant.findById({_id:req.params.r_id});
    restaurant.products.push(product._id);
    restaurant = await restaurant.save();
    res.send(product);
});
router.put('/:id', async(req, res) => {
   let products;
    try { products = await Product.findByIdAndUpdate({_id:req.params.id},{
        name : req.body.name,
        price: req.body.price,
        image: req.body.image,
        discount: req.body.discount,
        description : req.body.description,
        category: req.body.category
    }, {new: true});
}
catch(e){}
    if (!products) return res.status(404).send("PRODUCT ID NOT FOUND");
    res.send(products);
});
router.delete('/:id', async(req, res) => {
 const products = await Product.findByIdAndDelete(req.params.id);
 if(!products) return res.status(404).send("PRODUCT WITH ID NOT FOUND")
 res.send(products);
});

module.exports = router;