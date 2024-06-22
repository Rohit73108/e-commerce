 import { GET_CART_ERROR, GET_CART_SUCCESS } from "../constant/cart.constant";

export const defaultValue = {
    customer: {},
    items: [],
    subTotal: 0,
    tax: 0,
    grandTotal: 0
};

let previousCart = localStorage.getItem("cart") && localStorage.getItem("cart") !== "undefined" ? JSON.parse(localStorage.getItem("cart")) : defaultValue;

const initialState = {
    currentCart: "items" in previousCart ? previousCart : defaultValue,
    error: null 
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CART_SUCCESS:
            localStorage.setItem('cart', JSON.stringify(action.payload));
            return {
                ...state,
                currentCart: {...action.payload},
                error: null 
            };
        case GET_CART_ERROR:
            return {
                ...state,
                error: action.payload
            };
        default:
            return state;
    }
};