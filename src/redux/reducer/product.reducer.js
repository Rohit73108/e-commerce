import { GET_PRODUCT_ERROR, GET_PRODUCT_SUCCESS } from "../constant/product.constant"

const initialState = {
    products : localStorage.getItem('products') ? 
     JSON.parse(localStorage.getItem('products')) : []
}
    export const productReducer = (state = initialState,action)=>{
        switch (action.type) {
          case GET_PRODUCT_SUCCESS:
              localStorage.setItem('products',JSON.stringify(action.payload))
              return {
                  ...state,
                  products : [...action.payload]
              }
          case GET_PRODUCT_ERROR :
              return {
                  ...state,
                  error  : action.payload
              }
        
          default:
              return state;
        }
      }
