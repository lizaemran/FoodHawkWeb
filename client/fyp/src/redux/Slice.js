import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
export const getRestaurantsAsync = createAsyncThunk('restaurants/getRestaurantsAsync' , 
async() => {
    const response = await fetch('http://localhost:7000/api/restaurant');
    if(response.ok){
        const restaurants = await response.json();
        return {restaurants};
    } 
});

export const getRestaurantAsync = createAsyncThunk('restaurants/getRestaurantAsync' , 
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/restaurant/${payload.id}`);
    if(response.ok){
        const restaurant = await response.json();
        return {restaurant};
    }
});

export const getRestaurantByUsernameAsync = createAsyncThunk('restaurants/getRestaurantByUsernameAsync' , 
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/restaurant/dashboard/${payload.username}`);
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

export const addRatingAsync = createAsyncThunk('restaurant/addRatingAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/rating/${payload.r_id}/${payload.u_id}`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            stars: payload.stars,
            description : payload.description,
        })
    });

    if(response.ok){
        const restaurant = await response.json();
        return {restaurant};
    }
    else{
        alert("You have already rated this restaurant");
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
        return {restaurant};
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


export const addRestaurantsByAdminAsync = createAsyncThunk('restaurant/addRestaurantsByAdminAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/admin/restaurant/', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
            "x-auth-token": localStorage.getItem('token')
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
        const restaurant = await response.json();
        return {restaurant};
    }
});

export const getRatingAsync = createAsyncThunk('restaurants/getRatingAsync' , 
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/rating/${payload.id}`);
    if(response.ok){
        const rating = await response.json();
        return {rating};
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
        [getRestaurantByUsernameAsync.fulfilled]: (state, action) => {
            console.log("Fetched Restaurant By Username Successfully.");
            return {
                ...state,
                restaurant: action.payload.restaurant,
            }
        },
        [addRestaurantsAsync.fulfilled]: (state,action) => {
            console.log("Posted restaurants successfully.");
            state.restaurants.push(action.payload.restaurants);
        },
        [addRestaurantsByAdminAsync.fulfilled]: (state,action) => {
            console.log("Posted restaurants successfully.");
            state.restaurants.push(action.payload.restaurants);
        },
        [addRatingAsync.fulfilled]: (state,action) => {
            console.log("Posted rating successfully.");
            const index = state.restaurants?.findIndex((r)=> r?._id === action.payload?.restaurant?._id);
            state.restaurants[index] = action.payload?.restaurant;
        },
        [getRatingAsync.fulfilled]: (state,action) => {
            console.log("Got rating successfully.");
            state.restaurant.ratingArray.push(action.payload.rating);
        },
        [updateRestaurantsAsync.fulfilled]: (state,action) => {
            console.log("Posted restaurants successfully.");
            const index = state.restaurants.findIndex((restaurant)=> restaurant.id === action.payload.id);
            state.restaurants[index] = action.payload.restaurants;
        },
        [deleteRestaurantAsync.fulfilled]: (state,action) => {
            return state.restaurants.filter((restaurant) => restaurant._id !== action.payload.id);
        },
        [patchRestaurantAsync.fulfilled]: (state, action) => {
            const index = state.restaurants.findIndex((restaurant)=> restaurant.id === action.payload.id);
            state.restaurants[index] = action.payload.restaurant;
        },
        [getOrderDetailAsync.fulfilled]: (state, action) => {
            console.log("Fetched Order Detail Successfully.");
            state.order_detail.push(action.payload.order);
        },
    },
});
export default Slice.reducer;