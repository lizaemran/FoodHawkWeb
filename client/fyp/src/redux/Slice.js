import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
export const getRestaurantsAsync = createAsyncThunk('restaurants/getRestaurantsAsync' , 
async() => {
    const response = await fetch('http://localhost:7000/api/restaurant');
    if(response.ok){
        const restaurants = await response.json();
        return {restaurants};
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
const Slice = createSlice({
    name: "restaurants",
    initialState:
    [
        { name:"KFC", image:"https://i.ibb.co/g6PDrG5/kfc.jpg", rating: 5, location: "E-11",
        }
    ],
    extraReducers: {
        [getRestaurantsAsync.fulfilled]: (state,action) => {
            console.log("Fetched restaurants successfully.");
            return action.payload.restaurants;
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
            
        
        }

    },
});
export default Slice.reducer;