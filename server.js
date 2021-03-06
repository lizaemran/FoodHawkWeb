// require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const restaurant = require('./routes/restaurant');
const product = require('./routes/product');
const user = require('./routes/user');
const admin = require('./routes/admin');
const auth = require('./routes/auth');
const rider = require('./routes/rider');
const order = require('./routes/order');
const rating = require('./routes/rating');
const file = require("./routes/file");
const orderRating = require('./routes/orderRating');
const striperoutes = require('./routes/stripe-route');
const booking = require('./routes/booking');
const cors = require('cors')
const app = express();
const request = require('request');

// app.use(express.json());
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit:'50mb',extended:true}));
app.use('/api/file', file);
app.use('/api/restaurant',restaurant);
app.use('/api/product',product);
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/admin', admin);
app.use('/api/rider', rider);
app.use('/api/order', order);
app.use('/api/rating', rating);
app.use('/api/orderRating', orderRating);
app.use('/api/stripe', striperoutes);
app.use('/api/booking', booking);
// app.all('*', (req, res) => res.send('That route does not exist!'));

app.post('/chatbot', async(req,res) => {
        await request.post(`http://127.0.0.1:4000/predict?message=${req.body.message}`, async(error, response, body) => {
            await res.status(200).send({'reply': response.body});
     });    
}) 

const connectionParams= {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}
mongoose.connect('mongodb+srv://liza:lizfiz1@foodhawk.uitlt.mongodb.net/data?retryWrites=true&w=majority', connectionParams)
    .then(()=>{console.log('Connected' )})
    .catch(
        () => {
            console.log("Not Connected");
        }
    )


app.listen(7000, ()=>{console.log('Listening ...')})