import { configureStore } from '@reduxjs/toolkit'
import ProductReducer from './reducers/productReducer';
import cartReducer from './reducers/cartReducer';
import { authReducer } from './reducers/authReducer';
import { paymentMethodReducer } from './reducers/paymentMethodReducer';

const user = localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : [];

const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];



const initialState = {
    auth: {
        user: user,
    },
    carts: {
        cart: cartItems,
        totalPrice: cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0),
    },
};

// Add this helper function
function calculateTotalPrice(cartItems) {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Change this:
export const store = configureStore({
    reducer: {
        products: ProductReducer,
        carts: cartReducer,
        auth: authReducer,
        payment: paymentMethodReducer,
    },
    preloadedState: initialState,
});

// To this (add this line):
export default store;