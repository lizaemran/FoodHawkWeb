import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export const uploadImageAsync = createAsyncThunk('restaurant/uploadImageAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/file/upload/', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            data: payload.data,
            restaurant_id: payload.restaurant_id
        })
    });
    if(response.ok){
        const data = await response.json();
        toast.success("Image Uploaded Successfully");
        return {data};
    }
    else{
        toast.error("Error uploading image");
    }
});

export const getRestaurantImagesAsync = createAsyncThunk('restaurants/getRestaurantImagesAsync' , 
async() => {
    const response = await fetch('http://localhost:7000/api/file/images/');
    if(response.ok){
        const gallery = await response.json();
        return {gallery};
    } 
});

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
            lat: payload.lat,
            lng: payload.lng,
            phone: payload.phone,
            rating: payload.rating
        })
    });

    if(response.ok){
        const restaurants = await response.json();
        window.location.href = `/restaurant/dashboard/${payload.username}`
        return {restaurants};
    }
    else{
        var error = true;
        return {error};
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
    else{
        var error = true;
        return {error};
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
    else{
        var error = true;
        return {error};
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
    else{
        var error = true;
        return {error};
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
            rating: payload.rating,
        })
    });

    if(response.ok){
        const restaurant = await response.json();
        return {restaurant};
    }
    else{
        var error = true;
        return {error};
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

export const getOrdersRatingAsync = createAsyncThunk('restaurants/getOrdersRatingAsync' , 
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/orderRating/${payload.id}`);
    if(response.ok){
        const ratings = await response.json();
        return {ratings};
    }
});

export const getSearchResultsAsync = createAsyncThunk('restaurants/getSearchAsync' , 
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/restaurant/search/${payload.keyword}`);
    if(response.ok){
        const searchResults = await response.json();
        return {searchResults};
    }
});
export const getTop5RestaurantsAsync = createAsyncThunk('restaurants/getTop5RestaurantsAsync' , 
async(payload) => {
    const response = await fetch('http://localhost:7000/api/restaurant/top/5');
    if(response.ok){
        const top5Restaurants = await response.json();
        return {top5Restaurants};
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
        [uploadImageAsync.fulfilled]: (state, action) => {
            console.log(action.payload);
            
        },
        [getRestaurantImagesAsync.fulfilled]: (state,action) => {
            console.log("Fetched restaurant Images successfully.");
            return {...state, restaurantImages: action.payload.gallery};
            

        },
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
                restaurant: action.payload?.restaurant,
            }
        },
        [addRestaurantsAsync.fulfilled]: (state,action) => {
            console.log("Posted restaurants successfully.");
            state.restaurants.push(action.payload.restaurants);
        },
        [addRestaurantsByAdminAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                toast("Invalid Input", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
            console.log("Posted restaurants successfully.");
            state?.restaurants.push(action.payload?.restaurant);
            }
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
        [getOrdersRatingAsync.fulfilled]: (state,action) => {
            console.log("Got order ratings successfully.");
            state.restaurant.ratingOArray?.push(action.payload.ratings);
           
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
        [getSearchResultsAsync.fulfilled]: (state, action) => {
            console.log("Fetched Search Results Successfully.");
            state.searchResults = action.payload.searchResults;
        },
        [getTop5RestaurantsAsync.fulfilled]: (state, action) => {
            console.log("Fetched Top 5 Restaurants Successfully.");
            state.top5Restaurants = action.payload.top5Restaurants;
        },
     
    },
});
export default Slice.reducer;