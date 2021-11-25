import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

export const getProductsAsync = createAsyncThunk('products/getProductsAsync' , 
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/restaurant/${payload.id}`);
    if(response.ok){
        const products = await response.json();
        return {products};
    }
});

export const addProductsAsync = createAsyncThunk('products/addProductsAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/product/${payload.id}`, {
        method: "POST",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            name: payload.name,
            price: payload.price,
            image: payload.image,
            discount: payload.discount,
            category: payload.category
        })
    });

    if(response.ok){
        const products = await response.json();
        return {products};
    }
});

export const updateProductsAsync = createAsyncThunk('products/updateProductsAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/product/${payload.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({
            name: payload.name,
            price: payload.price,
            image: payload.image,
            discount: payload.discount,
            category: payload.category
        })
    });

    if(response.ok){
        const products = await response.json();
        return {products};
    }
});

export const deleteProductAsync = createAsyncThunk('products/deleteProductAsync',
async(payload) => {
    const response = await fetch(`http://localhost:7000/api/product/${payload.id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": 'application/json',
        },
        body: JSON.stringify({id: payload.id})
    });
    if(response.ok){
        const product = await response.json();
        return {id: payload.id};
    }
});
const ProductSlice = createSlice({
    name: "products",
    initialState:
    [ 
        {
            name:"Value Bucket", 
            price:"1250", 
            image:"https://i.ibb.co/g6PDrG5/kfc.jpg", 
            discount:0, 
            category:"Fast Food"
        }
    ],
    extraReducers: {

        [getProductsAsync.fulfilled]: (state,action) => {
            console.log("Fetched products successfully.");
            return action.payload.products;
        },
        [addProductsAsync.fulfilled]: (state,action) => {
            console.log("Posted products successfully.");
            state.push(action.payload.products);
        },
        [updateProductsAsync.fulfilled]: (state,action) => {
            console.log("Posted products successfully.");
            const index = state.findIndex((product)=> product.id === action.payload.id);
            state[index] = action.payload.products;
        },
        [deleteProductAsync.fulfilled]: (state,action) => {
            return state.filter((product) => product._id !== action.payload.id);
        }
    },
});
export default ProductSlice.reducer;