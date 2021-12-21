import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
export const getRestaurantsAsync = createAsyncThunk('admin/getRestaurantsAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/restaurant', {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
        },
    });
    if(response.ok){
        const restaurants = await response.json();
        console.log(restaurants);
        return {restaurants};
    }
});

export const getAllUsersAsync = createAsyncThunk('admin/getAllUsersAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/admin/users', {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "x-auth-token": localStorage.getItem('token')
        },
    });
    if(response.ok){
        const users = await response.json();
        console.log(users);
        return {users};
    }
});
const AdminSlice = createSlice({
    name: "admin",
    initialState: 
        {
         users: []  ,
        },
    reducers:{
        hydrate:(state, action) => {
            // do not do state = action.payload it will not update the store
            return action.payload
            },
    },
    extraReducers: {
        [getRestaurantsAsync.fulfilled]: (state,action) => {
            console.log("Got All Restaurants successfully.");
            return{
                ...state,
                restaurants: action?.payload?.restaurants,
            }
        },
        [getAllUsersAsync.fulfilled]: (state,action) => {
            console.log("Got All Users successfully.");
            return{
                ...state,
                users: action?.payload?.users,
            }
        },
    }
       
});
export default AdminSlice.reducer; 