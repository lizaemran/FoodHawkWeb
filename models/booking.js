const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
    restaurant_id:{
        type:String,
        required:true 
    },
    user_id:{
        type:String,
        required:true
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    contact:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true 
    },
    no_of_people: {
        type:Number,
        required:true 
    },
    time: {
        type:String,
        required:true
    },
    dateOfBooking: {
        type:Date,  
        required:true
    },
    total_price: {
        type:Number,    
        required:true
    }

})

const Booking = mongoose.model('Booking',bookingSchema)
exports.Booking = Booking;
