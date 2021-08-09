import {createSlice} from '@reduxjs/toolkit';

const CartSlice = createSlice({
    name: "cart",
    initialState:
    { cartItems: [], total: 0},
    reducers: {
        addCart: (state,action) => {
            const index = state.cartItems.findIndex((cartProduct)=> cartProduct.id === action.payload.id)
            if(index >= 0 )
            {state.cartItems[index].countItems += 1;
            state.total += 1;}
            else{
            state.cartItems.push({
                id: action.payload.id,
                countItems: action.payload.countItems,
            } );
            state.restaurant = action.payload.restaurant;
            state.total += 1;
        }
        },
        incrementProduct: (state, action) => {
            const index = state.cartItems.findIndex((cartProduct)=> cartProduct.id === action.payload.id);
            state.cartItems[index].countItems += 1;
            state.total += 1;
        },
        decrementProduct: (state, action) => {
            const index = state.findIndex((cartProduct)=> cartProduct.id === action.payload.id);
            if(state.cartItems[index].countItems >0) state.cartItems[index].countItems -= 1;
            else state.cartItems[index].countItems = 0;
            state.total += 1;
        },
        deleteCart: (state, action) => {
            let cart = state.cartItems.filter((cart) => cart.id !== action.payload.id);
            const index = state.cartItems.findIndex((cartProduct)=> cartProduct.id === action.payload.id);
            return {cartItems: cart, total: state.total-state.cartItems[index].countItems }
        }

    },
});
export const {addCart, incrementProduct, decrementProduct, deleteCart} = CartSlice.actions;
export default CartSlice.reducer;