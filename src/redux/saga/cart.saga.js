import {takeLatest , put} from 'redux-saga/effects'
import { ADD_CART_START, DELETE_CART_START, GET_CART_START,UPDATE_CART_START } from "../constant/cart.constant";
import {addCartToFirebase,deleteCartFromFirebase, getCartToFirebase, updateCartFromFirebase} from '../service/cart.service';
import { addCartError, deleteCartError, getCartError, getCartStart, getCartSuccess,updateCartError } from '../action/cart.action';


 function*  getCart(){
    try {
        const data = yield getCartToFirebase()
         console.log(data);
        yield put(getCartSuccess(data))
    } catch (error) {
        yield put(getCartError(error.message))
        
    }
}

function* addCart({payload}){
    try {
        yield addCartToFirebase(payload)
        yield put(getCartStart())
    } catch (error) {
        yield put(addCartError(error.message))
    }
}

 

 
export default function* cart(){
    yield takeLatest (GET_CART_START, getCart)
    yield takeLatest (ADD_CART_START, addCart)
  
 
}