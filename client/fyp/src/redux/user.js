import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

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

export const addOrderRatingAsync = createAsyncThunk('user/addOrderAsync',
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
        }
    }
       
});
export default UserSlice.reducer; 