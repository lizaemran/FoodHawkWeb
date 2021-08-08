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
mongoose.connect('mongodb://localhost:27017/Restaurant?readPreference=primary&appname=MongoDB%20Compass&ssl=false')
    .then(()=>{console.log('Connected')})
    .catch(
        () => {
            console.log("Not Connected");
        }
    )


app.listen(7000, ()=>{console.log('Listening ...')})