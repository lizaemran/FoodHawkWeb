import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
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
        return token;
    }
});

const AuthSlice = createSlice({
    name: "auth",
    initialState:
    [ 
        {
            username:"", 
            firstname:"", 
            lastname:"", 
            email:"", 
            password:"", 
            contact:"",
            address:"",
            token:"",
        }
    ],
    extraReducers: {
        [registerUserAsync.fulfilled]: (state,action) => {
            console.log("User registered successfully.");
            state = action.payload.user;
            console.log(state);
        },
        [loginUserAsync.fulfilled]: (state,action) => {
            console.log("User logged in successfully.");
            state.token = action.payload.token;
            console.log(state);
        },
    }
       
});
export default AuthSlice.reducer; 