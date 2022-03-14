import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
export const getRiderByIdAsync = createAsyncThunk('rider/getRiderByIdAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/rider/${payload.id}`, {
        method: "GET",
        headers: {
            "Content-Type": 'application/json',
        },
    });
    if(response.ok){
        const rider = await response.json();
        // console.log(rider);
        return {rider};
    }
});
export const patchRiderLocationAsync = createAsyncThunk('rider/patchRiderLocationAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/rider/location/${payload.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json',
            "x-auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({
            lat: payload.lat,
            lng: payload.lng
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

export const patchRiderStatusAsync = createAsyncThunk('rider/patchRiderStatusAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/rider/status/${payload.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json',
            "x-auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({
            status : payload.status
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

export const patchOrderStatusAsync = createAsyncThunk('rider/patchOrderStatusAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/order/status/${payload.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json',
            "x-auth-token": localStorage.getItem('token')
        },
        body: JSON.stringify({
            status: payload.status
        })
    });
    if(response.ok){
        const order = await response.json();
        return {order};
    }
    else{
        var error = true;
        return {error};
    }
});

export const getRiderAssign = createAsyncThunk('rider/getRiderAssign' , 
        async(payload) => {
            const response = await fetch(`http://localhost:7000/api/order/assign/${payload.id}`);
            if(response.ok){
                const rider = await response.json();
                // console.log(rider);
                return {rider};
            }
            else{
                var error = true;
                return {error};
            }
        });
export const getAssignedOrder = createAsyncThunk('rider/getAssignedOrder' ,
        async(payload) => {
            const response = await fetch(`http://localhost:7000/api/rider/${payload.id}/order`, {  
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "x-auth-token": localStorage.getItem('token')
            }});
            if(response.ok){
                const order = await response.json();
                // console.log(rider);
                return {order};
            }
        });
export const getDeliveredOrders = createAsyncThunk('rider/getDeliveredOrders' ,
        async(payload) => {
            const response = await fetch(`http://localhost:7000/api/rider/${payload.id}/order/delivered`, {  
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                "x-auth-token": localStorage.getItem('token')
            }});
            if(response.ok){
                const orders = await response.json();
                // console.log(rider);
                return {orders};
            }
        });
const RiderSlice = createSlice({
    name: "rider",
    initialState:{
        rider: {},
        assignedRider: {},
        assignedOrder: {},
        deliveredOrders: {},
    },
 
    extraReducers: {
        [getRiderByIdAsync.fulfilled]: (state, action) => {
            state.rider = action.payload.rider;
            return {...state};
        },
        [patchRiderLocationAsync.fulfilled]: (state,action) => {
            console.log("Updated Rider successfully.");
            return {...state, rider: action.payload.rider};
        },
        [patchOrderStatusAsync.fulfilled]: (state,action) => {
            console.log("Updated Order successfully.");
            if(action.payload.order.status === "delivered"){
                return {...state, assignedOrder: {}};
            }
            else{
            return {...state, assignedOrder: {...state.assignedOrder, status : action.payload?.order?.status}};
            }
        },
        [getRiderAssign.fulfilled]: (state,action) => {
            if(action?.payload?.error){

                return {...state , assignedRider: {}};
            }
            else{
            console.log("Assigned Rider successfully.");
            return {...state, assignedRider: action.payload.rider};
            }
        },
        [getAssignedOrder.fulfilled]: (state,action) => {
            console.log("Got Assigned Order successfully.");
            return {...state, assignedOrder: action.payload?.order};
        },
        [getDeliveredOrders.fulfilled]: (state,action) => {
            console.log("Got Delivered Order successfully.");
            return {...state, deliveredOrders: action.payload?.orders};
        },
        [patchRiderStatusAsync.fulfilled]: (state,action) => {
            console.log("Updated Rider successfully.");
            return {...state, rider: {...state.rider, status : action.payload.rider?.statusS}};
        }

    },
});
export default RiderSlice.reducer; 