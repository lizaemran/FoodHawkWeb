import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
export const addOrderAsync = createAsyncThunk('restaurants/addOrderAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/order/${payload.r_id}/${payload.p_id}`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            products: payload.products,
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
const UserSlice = createSlice({
    name: "user",
    initialState: 
        {
         orders: []  ,
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
            state.unshift(action.payload.order);
        },
    }
       
});
export default UserSlice.reducer; 