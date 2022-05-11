import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const addOrderAsync = createAsyncThunk('user/addOrderAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/order/${payload.r_id}/${payload.u_id}`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            products: payload.products,
            total_price: payload.total_price,
            status: 'pending',
            date: payload.date,
            time: payload.time,
        })
    });

    if(response.ok){
        const order = await response.json();
        return {order};
    }
});

export const addOrderRatingAsync = createAsyncThunk('user/addOrderRatingAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/orderRating/${payload.r_id}/${payload.u_id}/${payload.o_id}`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            stars: payload.stars,
            description: payload.description,
        })
    });
    if(response.ok){
        const orderRating = await response.json();
        return {orderRating};
    }
});

export const getOrderAsync = createAsyncThunk('user/getOrderAsync' , 
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/user/order/${payload}`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
        },
    });
    if(response.ok){
        const order = await response.json();
        return {order};
    }
});


export const getProductAsync = createAsyncThunk('user/getProductAsync' , 
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/product/${payload}`);
    if(response.ok){
        const product = await response.json();
        return {product};
    }
});

export const getAllOrdersForUserAsync = createAsyncThunk('user/getAllOrdersForUserAsync' , 
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/user/${payload}/orders`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "x-auth-token": localStorage.getItem('token')
        },
    });
    if(response.ok){
        const orders = await response.json();
        return {orders};
    }
});

export const sendMessageAsync = createAsyncThunk('user/sendMessageAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/user/message`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            email: payload.email,
            subject: payload.subject,
            message: payload.message,
        })
    });
    if(response.ok){
        const message = await response.json();
        return {message};
    }
});

export const placeBookingAsync = createAsyncThunk('user/placeBookingAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/booking/${payload.r_id}/${payload.u_id}`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            name: payload.name,
            contact: payload.contact,
            products: payload.products,
            total_price: payload.total_price,
            dateOfBooking: payload.dateOfBooking,
            no_of_people: payload.persons,
            time: payload.time,
        })
    });
    if(response.ok){
        const booking = await response.json();
        return {booking};
    }
    else {
        toast.error('Booking failed');
    }
});

const UserSlice = createSlice({
    name: "user",
    initialState: 
        {
         orders: []  ,
         order : {},
         products: [],
         allOrders : [],
        },
    reducers:{
        hydrate:(state, action) => {
            // do not do state = action.payload it will not update the store
            return action.payload
            },
    },
    extraReducers: {
        [addOrderAsync.fulfilled]: (state,action) => {
            console.log("Order Added successfully.");
            state.orders.push(action.payload.order);
            window.location.href = `/track-order/${action.payload.order._id}`;

        },
        [getOrderAsync.fulfilled]: (state, action) => {
            console.log("Fetched Order Successfully.");
            return {
                ...state,
                order: action.payload.order,
            }
        },
        [getProductAsync.fulfilled]: (state,action) => {
            console.log("Fetched product successfully.");
            state.products.push(action.payload.product);
        },
        [getAllOrdersForUserAsync.fulfilled]: (state,action) => {
            console.log("Fetched all orders for user successfully.");
            state.allOrders.push(action.payload?.orders);
        },
        [addOrderRatingAsync.fulfilled]: (state,action) => {
            console.log("Order Rating Added successfully.");
        },
        [sendMessageAsync.fulfilled]: (state,action) => {
            console.log("Message Sent successfully.");
            toast.success("Message Sent Successfully.");
        },
        [placeBookingAsync.fulfilled]: (state,action) => {
            console.log("Booking Placed successfully.");
            toast.success("Booking Placed Successfully.");
        },
    }
       
});
export default UserSlice.reducer; 