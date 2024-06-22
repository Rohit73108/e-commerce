import { GET_ORDER_ERROR, GET_ORDER_SUCCESS } from "../constant/order.constant";

let previousOrders = localStorage.getItem('orders') && localStorage.getItem('orders') !== 'undefined' ? JSON.parse(localStorage.getItem('orders')) : []

const initialState = {
    orders : previousOrders ?? []
}


export const orderReducer = (state = initialState,action)=>{
  switch (action.type) {
    case GET_ORDER_SUCCESS:
        localStorage.setItem('orders',JSON.stringify(action.payload))
        return {
            ...state,
            orders : [...action.payload]
        }
    case GET_ORDER_ERROR :
        return {
            ...state,
            error  : action.payload
        }
    default:
        return state;
  }
}