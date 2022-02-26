import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
export const getRestaurantsAsync = createAsyncThunk('restaurants/getRestaurantsAsync' , 
async() => {
    const response = await fetch('http://localhost:7000/api/restaurant');
    if(response.ok){
        const restaurants = await response.json();
        return {restaurants};
    } 
});

export const getRestaurantAsync = createAsyncThunk('products/getRestaurantAsync' , 
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/restaurant/${payload.id}`);
    if(response.ok){
        const restaurant = await response.json();
        return {restaurant};
    }
});

export const addRestaurantsAsync = createAsyncThunk('restaurants/addRestaurantsAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/restaurant/', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            username: payload.username,
            password: payload.password,
            email: payload.email,
            name: payload.name,
            image: payload.image,
            location: payload.location,
            phone: payload.phone,
            rating: payload.rating
        })
    });

    if(response.ok){
        const restaurants = await response.json();
        window.location.href = `/restaurant/dashboard/${payload.username}`
        return {restaurants};
    }
});
export const updateRestaurantsAsync = createAsyncThunk('restaurants/updateRestaurantsAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/restaurant/${payload.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            name: payload.name,
            image: payload.image,
            location: payload.location,
            rating: payload.rating
        })
    });

    if(response.ok){
        const restaurants = await response.json();
        return {restaurants};
    }
});
export const deleteRestaurantAsync = createAsyncThunk('restaurants/deleteRestaurantAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/restaurant/${payload.id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({id: payload.id})
    });
    if(response.ok){
        const restaurants = await response.json();
        return {id: payload.id};
    }
});
export const patchRestaurantAsync = createAsyncThunk('restaurants/patchRestaurantAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/restaurant/${payload.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({status: payload.status})
    });
    if(response.ok){
        const restaurant = await response.json();
        return {id: restaurant.id, status: payload.status};
    }
});

export const getOrderDetailAsync = createAsyncThunk('restaurant/getOrderDetailAsync' , 
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/restaurant/order/${payload.id}`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "x-auth-token": localStorage.getItem('token')
        },
    });
    if(response.ok){
        const order = await response.json();
        return {order};
    }
});
const Slice = createSlice({
    name: "restaurants",
    initialState:
    {
        restaurants: [], order_detail : [],
    },
    // [
    //     { 
    //         name:"KFC", image:"https://i.ibb.co/g6PDrG5/kfc.jpg", rating: 5, location: "E-11", status: false,
    //     },
       
    // ],

    extraReducers: {
        [getRestaurantsAsync.fulfilled]: (state,action) => {
            console.log("Fetched restaurants successfully.");
            return {
                ...state,
                restaurants: action.payload.restaurants,
            }
        },
        [getRestaurantAsync.fulfilled]: (state, action) => {
            console.log("Fetched Restaurant Successfully.");
            return {
                ...state,
                restaurant: action.payload.restaurant,
            }
        },
        [addRestaurantsAsync.fulfilled]: (state,action) => {
            console.log("Posted restaurants successfully.");
            state.unshift(action.payload.restaurants);
        },
        [updateRestaurantsAsync.fulfilled]: (state,action) => {
            console.log("Posted restaurants successfully.");
            const index = state.findIndex((restaurant)=> restaurant.id === action.payload.id);
            state[index] = action.payload.restaurants;
        },
        [deleteRestaurantAsync.fulfilled]: (state,action) => {
            return state.filter((restaurant) => restaurant._id !== action.payload.id);
        },
        [patchRestaurantAsync.fulfilled]: (state, action) => {
            const index = state.findIndex((restaurant)=> restaurant.id === action.payload.id);
            state[index].status = action.payload.status;
        },
        [getOrderDetailAsync.fulfilled]: (state, action) => {
            console.log("Fetched Order Detail Successfully.");
            console.log(action.payload.order);
            state.order_detail.push(action.payload.order);
        },
    },
});
export default Slice.reducer;