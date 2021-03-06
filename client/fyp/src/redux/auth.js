import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
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
            lat: payload.lat,
            lng: payload.lng,

        })
    });

    if(response.ok){
        const user = await response.json();
        // console.log(user.token);
        return {user};
    }
    else{
        var error = true;
        return {error};
    }
});

export const verifyUserAsync = createAsyncThunk('auth/verifyUserAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/auth/user/verifyConfirm', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            otp : payload.otp,
        })
    });
    if(response.ok){
        const message = await response.json();
        // console.log(token);
        return {message};
    }
    else{
        var error = true;
        return {error};
    }
});

export const resendVerifyUserAsync = createAsyncThunk('auth/resendVerifyUserAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/user/resend', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            email : payload.email,
        })
    });
    if(response.ok){
        const message = await response.json();
        // console.log(token);
        return {message};
    }
    else{
        var error = true;
        return {error};
    }
});



export const resendVerifyRiderAsync = createAsyncThunk('auth/resendVerifyRiderAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/rider/resend', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            email : payload.email,
        })
    });
    if(response.ok){
        const message = await response.json();
        // console.log(token);
        return {message};
    }
    else{
        var error = true;
        return {error};
    }
});

export const resendVerifyRestaurantAsync = createAsyncThunk('auth/resendVerifyRestaurantAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/restaurant/resend', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            email : payload.email,
        })
    });
    if(response.ok){
        const message = await response.json();
        // console.log(token);
        return {message};
    }
    else{
        var error = true;
        return {error};
    }
});

export const forgetPasswordUserAsync = createAsyncThunk('auth/forgetPasswordUserAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/auth/user/forgetPassword', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            email : payload.email,
        })
    });
    if(response.ok){
        const message = await response.json();
        // console.log(token);
        return {message};
    }
    else{
        var error = true;
        return {error};
    }
});

export const forgetPasswordRiderAsync = createAsyncThunk('auth/forgetPasswordRiderAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/auth/rider/forgetPassword', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            email : payload.email,
        })
    });
    if(response.ok){
        const message = await response.json();
        // console.log(token);
        return {message};
    }
    else{
        var error = true;
        return {error};
    }
});

export const forgetPasswordRestaurantAsync = createAsyncThunk('auth/forgetPasswordRestaurantAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/auth/restaurant/forgetPassword', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            email : payload.email,
        })
    });
    if(response.ok){
        const message = await response.json();
        // console.log(token);
        return {message};
    }
    else{
        var error = true;
        return {error};
    }
});

export const resetPasswordUserAsync = createAsyncThunk('auth/resetPasswordUserAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/auth/user/resetPassword', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            otp : payload.otp,
            password : payload.password,
        })
    });
    if(response.ok){
        const message = await response.json();
        console.log(message);
        return {message};
    }
    else{
        var error = true;
        console.log(error);
        return {error};
    }
});

export const resetPasswordRiderAsync = createAsyncThunk('auth/resetPasswordRiderAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/auth/rider/resetPassword', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            otp : payload.otp,
            password : payload.password,
        })
    });
    if(response.ok){
        const message = await response.json();
        // console.log(token);
        return {message};
    }
    else{
        var error = true;
        return {error};
    }
});

export const resetPasswordRestaurantAsync = createAsyncThunk('auth/resetPasswordRestaurantAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/auth/restaurant/resetPassword', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            otp : payload.otp,
            password : payload.password,
        })
    });
    if(response.ok){
        const message = await response.json();
        // console.log(token);
        return {message};
    }
    else{
        var error = true;
        return {error};
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
        token.noRedirection = payload.noRedirection;
        // console.log(token);
        return {token};
    }
    else{
        var error = true;
        return {error};
    }
});

export const updateUserAsync = createAsyncThunk('auth/updateUserAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/user/${payload.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": 'application/json',
            "x-auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({
            firstname: payload.firstname,
            lastname: payload.lastname,
            contact: payload.contact,
            address: payload.address
        })
    });

    if(response.ok){
        const user = await response.json();
        return {user};
    }
    else{
        var error = true;
        return {error};
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
            lat: payload.lat,
            lng: payload.lng,
        })
    });

    if(response.ok){
        const rider = await response.json();
        return {rider};
    }
    else{
        var error = true;
        return {error};
    }
});

export const verifyRiderAsync = createAsyncThunk('auth/verifyRiderAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/auth/rider/verifyConfirm', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            otp : payload.otp,
        })
    });
    if(response.ok){
        const message = await response.json();
        // console.log(token);
        return {message};
    }
    else{
        var error = true;
        return {error};
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
    else{
        var error = true;
        return {error};
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
        // console.log(token);
        return {token};
    }
    else{
        var error = true;
        return {error};
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
    else{
        var error = true;
        return {error};
    }
})

export const verifyRestaurantAsync = createAsyncThunk('auth/verifyRestaurantAsync',
async(payload) => {
    const response = await fetch('http://localhost:7000/api/auth/restaurant/verifyConfirm', {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            otp : payload.otp,
        })
    });
    if(response.ok){
        const message = await response.json();
        // console.log(token);
        return {message};
    }
    else{
        var error = true;
        return {error};
    }
});

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
        // console.log(user);
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
        // console.log(admin);
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
        // console.log(rider);
        return {rider};
    }
});

export const patchOverviewAsync = createAsyncThunk('auth/patchOverviewAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/restaurant/overview/${payload.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({overview: payload.overview})
    });
    if(response.ok){
        const overview = await response.json();
        return {overview};
    }
    else{
        var error = true;
        return {error};
    }
});

export const patchEnableBookingAsync = createAsyncThunk('auth/patchEnableBookingAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/restaurant/enable-booking/${payload.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({enableBooking: payload.enableBooking})
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

export const patchOpenTimeAsync = createAsyncThunk('auth/patchOpenTimeAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/restaurant/open-time/${payload.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({openTime: payload.openTime})
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

export const patchCloseTimeAsync = createAsyncThunk('auth/patchCloseTimeAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/restaurant/close-time/${payload.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({closeTime: payload.closeTime})
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
            if(action?.payload?.error){
                toast("Invalid username or password", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
            toast("Verify your Email and Sign In to continue", {
                position: "top-right",
                autoClose: 5000,
            });
            window.location.href = '/SignIn';
            return {
                ...state,
                username: action.payload.user.username,
                user_type: action.payload.user.user_type,
                firstname: action.payload.user.firstname,
                lastname: action.payload.user.lastname,
                email: action.payload.user.email,
                contact: action.payload.user.contact,
                address: action.payload.user.address,
                lat : action.payload.user.lat,
                lng : action.payload.user.lng,
                isConfirmed : false,
            };
        }
        },
        [verifyUserAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                toast.error("Invalid OTP", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
                toast("User verified successfully.", {
                    position: "top-right",
                    autoClose: 5000,
                });

            }
            return {
                ...state,
            }
        },
        [resendVerifyUserAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                toast.error("Invalid OTP", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
                toast("Verification email sent successfully.", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
        },
        [resendVerifyRiderAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                toast.error("Invalid OTP", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
                toast("Verification email sent successfully.", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
        },
        [resendVerifyRestaurantAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                toast.error("Invalid OTP", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
                toast("Verification email sent successfully.", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
        },
        [forgetPasswordUserAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                toast.error("Invalid Email", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
                toast("Reset password email sent successfully.", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
        },
        [forgetPasswordRiderAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                toast.error("Invalid Email", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
                toast("Reset password email sent successfully.", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
        },
        [forgetPasswordRestaurantAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                toast.error("Invalid Email", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
                toast("Reset password email sent successfully.", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
        },
        [resetPasswordRestaurantAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                toast.error("Invalid Otp", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
                toast("Reset password successfully.", {
                    position: "top-right",
                    autoClose: 5000,
                });
                window.location.href = '/restaurant-login';
            }
        },
        [resetPasswordRiderAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                toast.error("Invalid Otp", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
                toast("Reset password successfully.", {
                    position: "top-right",
                    autoClose: 5000,
                });
                window.location.href = '/rider-login';

            }
        },
        [resetPasswordUserAsync.fulfilled]: (state,action) => {
            console.log(action?.payload?.error, "error");

            if(action?.payload?.error){
                toast.error("Invalid Otp", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
                toast("Reset password successfully.", {
                    position: "top-right",
                    autoClose: 5000,
                });
                console.log('reset user successful');
                window.location.href = '/SignIn';
            }
        },
        [verifyRiderAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                toast.error("Invalid OTP", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
                toast("Rider verified successfully.", {
                    position: "top-right",
                    autoClose: 5000,
                });

            }
            return {
                ...state,
            }
        },
        [verifyRestaurantAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                toast.error("Invalid OTP", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
                toast("Restaurant verified successfully.", {
                    position: "top-right",
                    autoClose: 5000,
                });

            }
            return {
                ...state,
            }
        },
        [registerRiderAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                toast("Invalid details", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
            console.log("Rider registered successfully.");
            window.location.href = '/rider-dashboard/';
            return action.payload.rider;
            }
        },
        [loginUserAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                toast("Invalid username or password", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
                console.log("User logged in successfully.");
                localStorage.setItem('token', action?.payload?.token?.token);
                console.log(action?.payload?.token?.noRedirection);
                if(!action?.payload?.token?.noRedirection){
                    window.location.href = '/dashboard';
                }
            }
        
            return{...state, 
                registered: false,  
                token : action?.payload?.token?.token
            }
        },
        [loginRiderAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                toast("Invalid username or password", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
            console.log("Rider logged in successfully.");
            localStorage.setItem('token', action?.payload?.token?.token)
            window.location.href = '/rider-dashboard';
            return{...state, token : action?.payload?.token?.token}
            }
        },
        [loginAdminAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                toast("Invalid username or password", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
            console.log("Admin logged in successfully.");
            localStorage.setItem('token', action?.payload?.token?.token)
            window.location.href = '/dashboard';
            }
            return{...state, token : action?.payload?.token?.token}
        },
        [loginRestaurantAsync.fulfilled]: (state,action) => {
            if(action?.payload?.error){
                toast("Invalid username or password", {
                    position: "top-right",
                    autoClose: 5000,
                });
            }
            else{
            console.log("Restaurant logged in successfully.");
            localStorage.setItem('token', action?.payload?.data?.token)
            window.location.href = `/restaurant/dashboard/${action.payload?.data?.restaurant?.username}`
            return{...state, token : action?.payload?.data?.token, 
                id: action?.payload?.data?.restaurant?._id,
                username: action?.payload?.data?.restaurant?.username,
                name: action?.payload?.data?.restaurant?.name,
                email: action?.payload?.data?.restaurant?.email,
                phone: action?.payload?.data?.restaurant?.phone,
                location: action?.payload?.data?.restaurant?.location,
                image: action?.payload?.data?.restaurant?.image,
                rating: action?.payload?.data?.restaurant?.rating,
                status: action?.payload?.data?.restaurant?.status,
                overview: action?.payload?.data?.restaurant?.overview,
                openTime: action?.payload?.data?.restaurant?.openTime,
                closeTime: action?.payload?.data?.restaurant?.closeTime,
                enableBooking: action?.payload?.data?.restaurant?.enableBooking,
                user_type: 'Restaurant'
            }
        }
        },
        [getRestaurantDashboardAsync.fulfilled]: (state, action) => {
            console.log("Got Restaurant successfully.");
            return{...state, 
                id: action?.payload?.restaurant?._id,
                username: action?.payload?.restaurant?.username,
                name: action?.payload?.restaurant?.name,
                email: action?.payload?.restaurant?.email,
                phone: action?.payload?.restaurant?.phone,
                location: action?.payload?.restaurant?.location,
                image: action?.payload?.restaurant?.image,
                rating: action?.payload?.restaurant?.rating,
                status: action?.payload?.restaurant?.status,
                products: action?.payload?.restaurant?.products,
                overview: action?.payload?.restaurant?.overview,
                user_type: 'Restaurant',
                orders: action?.payload?.restaurant?.orders,
                isConfirmed : action?.payload?.restaurant?.isConfirmed,
                gallery : action?.payload?.restaurant?.gallery,

            }
        },
        [patchOverviewAsync.fulfilled]: (state, action) => {
            console.log("Posted overview successfully.");
            return{...state, overview: action?.payload?.overview?.overview}
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
                user_type: action?.payload?.user?.user_type,
                isConfirmed : action?.payload?.user?.isConfirmed,
                bookings : action?.payload?.user?.bookings,
            }
        },
        [updateUserAsync.fulfilled] : (state, action) => {
            console.log("Updated User Successfully");
            return{
                ...state, firstname: action?.payload?.firstname, lastname: action?.payload?.lastname, contact: action?.payload?.contact, address: action?.payload?.address,
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
                user_type: 'rider',
                isConfirmed : action?.payload?.rider?.isConfirmed,

            }
        },
        [patchEnableBookingAsync.fulfilled]: (state, action) => {
            console.log("Posted enable booking successfully.");
            return{...state, enableBooking: action?.payload?.restaurant?.enableBooking}
        },
        [patchCloseTimeAsync.fulfilled]: (state, action) => {
            console.log("Posted close time successfully.");
            return{...state, closeTime: action?.payload?.restaurant?.closeTime}
        },
        [patchOpenTimeAsync.fulfilled]: (state, action) => {
            console.log("Posted open time successfully.");
            return{...state, openTime: action?.payload?.restaurant?.openTime}
        },

    }
       
});
export const {logoutUser} = AuthSlice.actions;
export default AuthSlice.reducer; 