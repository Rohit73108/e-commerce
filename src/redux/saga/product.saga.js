import {takeLatest , put} from 'redux-saga/effects'
import { ADD_PRODUCT_START, DELETE_PRODUCT_START, GET_PRODUCT_START, UPDATE_PRODUCT_START } from "../constant/product.constant";
import {addProductToFirebase, deleteProductFromFirebase, getProductToFirebase, updateProductFromFirebase} from '../service/product.service';
import { addProductError, deleteProductError, getProductError, getProductStart, getProductSuccess, updateProductError } from '../action/products.action';

 function*  getProduct(){
    try {
        const data = yield getProductToFirebase()
        yield put(getProductSuccess(data))
    } catch (error) {
        yield put(getProductError(error.message))
        
    }
}

function* addProduct({payload}){
    try {
        yield put(addProductToFirebase(payload))
        yield put(getProductStart())
    } catch (error) {
        yield put(addProductError(error.message))
    }
}


function* deleteProduct({payload}){
    try {
        yield put(deleteProductFromFirebase(payload))
    } catch (error) {
        yield put(deleteProductError(error.message))
    }
}

function* updateProduct({payload}){
    try {
        yield put(updateProductFromFirebase(payload))
    } catch (error) {
        yield put(updateProductError(error.message))
    }
}
export default function* product(){
    yield takeLatest (GET_PRODUCT_START,getProduct)
    yield takeLatest (ADD_PRODUCT_START,addProduct)
    yield takeLatest (DELETE_PRODUCT_START , deleteProduct)
    yield takeLatest(UPDATE_PRODUCT_START,updateProduct)
} 