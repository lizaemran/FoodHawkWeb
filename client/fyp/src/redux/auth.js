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
        console.log(token);
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
        [loginUserAsync.fulfilled]: (state,action) => {
            console.log("User logged in successfully.");
            localStorage.setItem('token', action?.payload?.token?.token)
            window.location.href = '/dashboard';
            return{...state, token : action?.payload?.token?.token}
        },
        [loginAdminAsync.fulfilled]: (state,action) => {
            console.log("Admin logged in successfully.");
            localStorage.setItem('token', action?.payload?.token?.token)
            window.location.href = '/dashboard';
            return{...state, token : action?.payload?.token?.token}
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
                email: action?.payload?.admin?.email,
                password: action?.payload?.admin?.password,
                user_type: action?.payload?.admin?.user_type
            }
        },
    }
       
});
export const {logoutUser} = AuthSlice.actions;
export default AuthSlice.reducer; 