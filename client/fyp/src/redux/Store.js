import {configureStore} from '@reduxjs/toolkit';
import restaurantReducer from './Slice';
import productReducer from './ProductSlice';
import cartReducer from './CartSlice';
export default configureStore({
    reducer: {
        restaurants: restaurantReducer,
        products: productReducer,
        cart: cartReducer,

    },
})