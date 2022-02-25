import {configureStore} from '@reduxjs/toolkit';
import restaurantReducer from './Slice';
import productReducer from './ProductSlice';
import cartReducer from './CartSlice';
import authReducer from './auth';
import adminReducer from './admin';
import userReducer from './user';
export default configureStore({
    reducer: {
        restaurants: restaurantReducer,
        products: productReducer,
        cart: cartReducer,
        auth: authReducer,
        admin: adminReducer,
        user: userReducer,
        // rider: riderReducer,
    },
})