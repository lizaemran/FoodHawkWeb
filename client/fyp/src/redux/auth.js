import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { getRestaurantAsync } from './Slice';
export const registerUserAsync = createAsyncThunk('auth/registerUserAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/user/', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            username: payload.username,
            firstname: payload.firstname,
            lastname: payload.lastname,
            email: payload.email,
            password: payload.password,
            contact: payload.contact,
            address: payload.address,
        })
    });

    if(response.ok){
        const user = await response.json();
        return {user};
    }
});

export const loginUserAsync = createAsyncThunk('auth/loginUserAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/auth/user', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            username: payload.username,
            password: payload.password,
        })
    });
    if(response.ok){
        const token = await response.json();
        console.log(token);
        return {token};
    }
});

export const registerRiderAsync = createAsyncThunk('auth/registerRiderAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/rider/', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            username: payload.username,
            name: payload.name,
            email: payload.email,
            password: payload.password,
            phone: payload.phone,
        })
    });

    if(response.ok){
        const rider = await response.json();
        return {rider};
    }
});

export const loginRiderAsync = createAsyncThunk('auth/loginRiderAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/auth/rider', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            username: payload.username,
            password: payload.password,
        })
    });
    if(response.ok){
        const token = await response.json();
        return {token};
    }
});


export const loginAdminAsync = createAsyncThunk('auth/loginAdminAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/auth/admin', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            username: payload.username,
            password: payload.password,
        })
    });
    if(response.ok){
        const token = await response.json();
        console.log(token);
        return {token};
    }
});

export const loginRestaurantAsync = createAsyncThunk('auth/loginRestaurantAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/auth/restaurant', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            username: payload.username,
            password: payload.password,
        })
    });
    if(response.ok){
        const data = await response.json();
        // window.location.href = `/restaurant/dashboard/${payload.username}`
        return {data};
    }
})

export const getRestaurantDashboardAsync = createAsyncThunk('auth/getRestaurantDashboardAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/restaurant/dashboard/${payload}`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "x-auth-token": localStorage.getItem('token')

        },
    });
    if(response.ok){
        const restaurant = await response.json();
        // console.log(restaurant);
        return {restaurant};
    }
});


export const getUserAsync = createAsyncThunk('auth/getUserAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/user', {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "x-auth-token": localStorage.getItem('token')
        },
    });
    if(response.ok){
        const user = await response.json();
        console.log(user);
        return {user};
    }
});

export const getAdminAsync = createAsyncThunk('auth/getAdminAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/admin/', {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "x-auth-token": localStorage.getItem('token')
        },
    });
    if(response.ok){
        const admin = await response.json();
        console.log(admin);
        return {admin};
    }
});


export const getRiderAsync = createAsyncThunk('auth/getRiderAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/rider/', {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
            "x-auth-token": localStorage.getItem('token')
        },
    });
    if(response.ok){
        const rider = await response.json();
        console.log(rider);
        return {rider};
    }
});



const AuthSlice = createSlice({
    name: "auth",
    initialState: 
        {
            username:"", 
            firstname:"", 
            lastname:"", 
            email:"", 
            password:"", 
            contact:"",
            address:"",
            token: localStorage.getItem('token'),
        },
    reducers:{
        hydrate:(state, action) => {
            // do not do state = action.payload it will not update the store
            return action.payload
            },
        logoutUser: (state, action) => {
            localStorage.removeItem('token');
            window.location.href = '/';
            return{
                ...state,
                token: null,
                
            }
        },
    },
    extraReducers: {
        [registerUserAsync.fulfilled]: (state,action) => {
            console.log("User registered successfully.");
            window.location.href = '/SignIn';
            return action.payload.user;
        },
        [registerRiderAsync.fulfilled]: (state,action) => {
            console.log("Rider registered successfully.");
            window.location.href = '/rider/login';
            return action.payload.rider;
        },
        [loginUserAsync.fulfilled]: (state,action) => {
            console.log("User logged in successfully.");
            localStorage.setItem('token', action?.payload?.token?.token)
            window.location.href = '/dashboard';
            return{...state, token : action?.payload?.token?.token}
        },
        [loginRiderAsync.fulfilled]: (state,action) => {
            console.log("Rider logged in successfully.");
            console.log(action.payload);
            localStorage.setItem('token', action?.payload?.token?.token)
            window.location.href = '/rider/dashboard';
            return{...state, token : action?.payload?.token?.token}
        },
        [loginAdminAsync.fulfilled]: (state,action) => {
            console.log("Admin logged in successfully.");
            localStorage.setItem('token', action?.payload?.token?.token)
            window.location.href = '/dashboard';
            return{...state, token : action?.payload?.token?.token}
        },
        [loginRestaurantAsync.fulfilled]: (state,action) => {
            console.log("Restaurant logged in successfully.");
            localStorage.setItem('token', action?.payload?.data?.token)
            window.location.href = `/restaurant/dashboard/${action.payload?.data?.restaurant?.username}`
            return{...state, token : action?.payload?.data?.token, 
                id: action?.payload?.data?.restaurant?._id,
                username: action?.payload?.data?.restaurant?.username,
                name: action?.payload?.data?.restaurant?.name,
                email: action?.payload?.data?.restaurant?.email,
                password: action?.payload?.data?.restaurant?.password,
                phone: action?.payload?.data?.restaurant?.phone,
                location: action?.payload?.data?.restaurant?.location,
                image: action?.payload?.data?.restaurant?.image,
                rating: action?.payload?.data?.restaurant?.rating,
                status: action?.payload?.data?.restaurant?.status,
                user_type: 'Restaurant'
            }
        },
        [getRestaurantDashboardAsync.fulfilled]: (state, action) => {
            console.log("Got Restaurant successfully.");
            return{...state, 
                id: action?.payload?.restaurant?._id,
                username: action?.payload?.restaurant?.username,
                name: action?.payload?.restaurant?.name,
                email: action?.payload?.restaurant?.email,
                password: action?.payload?.restaurant?.password,
                phone: action?.payload?.restaurant?.phone,
                location: action?.payload?.restaurant?.location,
                image: action?.payload?.restaurant?.image,
                rating: action?.payload?.restaurant?.rating,
                status: action?.payload?.restaurant?.status,
                products: action?.payload?.restaurant?.products,
                user_type: 'Restaurant',
                orders: action?.payload?.restaurant?.orders,
            }
        },
        [getUserAsync.fulfilled]: (state,action) => {
            console.log("Got User successfully.");
            return{
                ...state,
                id: action?.payload?.user?._id,
                username: action?.payload?.user?.username,
                firstname: action?.payload?.user?.firstname,
                lastname: action?.payload?.user?.lastname,
                email: action?.payload?.user?.email,
                password: action?.payload?.user?.password,
                contact: action?.payload?.user?.contact,
                address: action?.payload?.user?.address,
                user_type: action?.payload?.user?.user_type
            }
        },
        [getAdminAsync.fulfilled]: (state,action) => {
            console.log("Got Admin successfully.");
            return{
                ...state,
                id: action?.payload?.admin?._id,
                username: action?.payload?.admin?.username,
                firstname: action?.payload?.admin?.firstname,
                lastname: action?.payload?.admin?.lastname,
                email: action?.payload?.admin?.email,
                password: action?.payload?.admin?.password,
                user_type: action?.payload?.admin?.user_type
            }
        },
        [getRiderAsync.fulfilled]: (state,action) => {
            console.log("Got Rider successfully.");
            return{
                ...state,
                id: action?.payload?.rider?._id,
                username: action?.payload?.rider?.username,
                name: action?.payload?.rider?.name,
                email: action?.payload?.rider?.email,
                password: action?.payload?.rider?.password,
                phone: action?.payload?.rider?.phone,
                user_type: 'rider'
            }
        },
    }
       
});
export const {logoutUser} = AuthSlice.actions;
export default AuthSlice.reducer; 