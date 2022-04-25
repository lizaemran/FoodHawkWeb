import {createSlice} from '@reduxjs/toolkit';

const BookingSlice = createSlice({
    name: "booking",
    initialState:
    { bookingItems: [], totalB: 0},
    reducers: {
        addBookingItems: (state,action) => {
            const index = state.bookingItems.findIndex((bookingProduct)=> bookingProduct.id === action.payload.id)
            if(index >= 0 ){
                state.bookingItems[index].countItems += 1;
                state.totalB += 1;
            }
            else{
            state.bookingItems.push({
                id: action.payload.id,
                restaurant_id: action.payload.restaurant_id,
                name: action.payload.name,
                price: action.payload.price,
                image: action.payload.image,
                discount: action.payload.discount,
                category: action.payload.category,
                countItems: action.payload.countItems,
            } );
            state.restaurant = action.payload.restaurant;
            state.totalB += 1;
        }
        },
        incrementBookingProduct: (state, action) => {
            const index = state.bookingItems.findIndex((bookingProduct)=> bookingProduct.id === action.payload.id);
            state.bookingItems[index].countItems += 1;
            state.totalB += 1;
        },
        decrementBookingProduct: (state, action) => {
            const index = state.bookingItems.findIndex((bookingProduct)=> bookingProduct.id === action.payload.id);
            if(state.bookingItems[index].countItems >0) state.bookingItems[index].countItems -= 1;
            else state.bookingItems[index].countItems = 0;
            state.totalB -= 1;
        },
        deleteBooking: (state, action) => {
            let booking = state.bookingItems.filter((booking) => booking.id !== action.payload.id);
            const index = state.bookingItems.findIndex((bookingProduct)=> bookingProduct.id === action.payload.id);
            return {bookingItems: booking, totalB: state.totalB-state.bookingItems[index].countItems }
        },
        setBooking: (state, action) => {
            return action.payload;
        },
        clearBooking: (state, action) => {
            return {bookingItems: [], totalB: 0};
        },

    },
});
export const {addBookingItems, incrementBookingProduct, decrementBookingProduct, deleteBooking, setBooking, clearBooking} = BookingSlice.actions;
export default BookingSlice.reducer;