const express = require('express');
const mongoose = require('mongoose');
const restaurant = require('./routes/restaurant');
const product = require('./routes/product');
const user = require('./routes/user');
const admin = require('./routes/admin');
const auth = require('./routes/auth');
const rider = require('./routes/rider');
const order = require('./routes/order');
const cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors())
app.use('/api/restaurant',restaurant);
app.use('/api/product',product);
app.use('/api/user', user);
app.use('/api/auth', auth)
app.use('/api/admin', admin);
app.use('/api/rider', rider);
app.use('/api/order', order);

mongoose.connect('mongodb+srv://liza:lizfiz1@foodhawk.uitlt.mongodb.net/data?retryWrites=true&w=majority')
    .then(()=>{console.log('Connected')})
    .catch(
        () => {
            console.log("Not Connected");
        }
    )


app.listen(7000, ()=>{console.log('Listening ...')})