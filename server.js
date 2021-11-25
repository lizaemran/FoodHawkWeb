const express = require('express');
const mongoose = require('mongoose');
const restaurant = require('./routes/restaurant');
const product = require('./routes/product');
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors())
app.use('/api/restaurant',restaurant);
app.use('/api/product',product); 
mongoose.connect('mongodb+srv://liza:lizfiz1@foodhawk.uitlt.mongodb.net/FoodHawk?retryWrites=true&w=majority')
    .then(()=>{console.log('Connected')})
    .catch((e) => {
        console.log(e);
            console.log("Not Connected");
        }
    )


app.listen(7000, ()=>{console.log('Listening ...')})