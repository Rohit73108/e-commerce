import {takeLatest , put} from 'redux-saga/effects'
import { GET_ORDER_START, PLACE_ORDER_START } from '../constant/order.constant';
import { getOrderToFirebase, palceOrderToFirebase } from '../service/order.service';
import { getOrderError, getOrderStart, getOrderSuccess, placeOrderError } from '../action/order.action';
import { getCartStart } from '../action/cart.action';


 function*  getOrder(){
    try {
        const data = yield getOrderToFirebase()
        yield put(getOrderSuccess(data))
    } catch (error) {
        yield put(getOrderError(error.message))
        
    }
}

function* palceOrder({payload}){
    try {
        yield palceOrderToFirebase(payload)
        yield put(getOrderStart())
        yield put(getCartStart())
    } catch (error) {
        yield put(placeOrderError(error.message))
    }
}

export default function* order(){
    yield takeLatest (GET_ORDER_START, getOrder)
    yield takeLatest (PLACE_ORDER_START, palceOrder)
}