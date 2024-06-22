import {takeLatest , put} from 'redux-saga/effects'
import { ADD_CATEGORY_START, DELETE_CATEGORY_START, GET_CATEGORY_START, UPDATE_CATEGORY_START } from "../constant/category.constant";
import {addCategoryToFirebase, deleteCategoryFromFirebase, getCategoryToFirebase, updateCategoryFromFirebase} from '../service/category.service';
import { addCategoryError, deleteCategoryError, getCategoryError, getCategoryStart, getCategorySuccess, updateCategoryError } from '../action/category.action';


 function*  getCategory(){
    try {
        const data = yield getCategoryToFirebase()
        yield put(getCategorySuccess(data))
    } catch (error) {
        yield put(getCategoryError(error.message))
        
    }
}

function* addCategory({payload}){
    try {
        yield put(addCategoryToFirebase(payload))
        yield put(getCategoryStart())
    } catch (error) {
        yield put(addCategoryError(error.message))
    }
}


function* deleteCategory({payload}){
    try {
        yield put(deleteCategoryFromFirebase(payload))
    } catch (error) {
        yield put(deleteCategoryError(error.message))
    }
}

function* updateCategory({payload}){
    try {
        yield put(updateCategoryFromFirebase(payload))
    } catch (error) {
        yield put(updateCategoryError(error.message))
    }
}
export default function* category(){
    yield takeLatest (GET_CATEGORY_START,getCategory)
    yield takeLatest (ADD_CATEGORY_START,addCategory)
    yield takeLatest (DELETE_CATEGORY_START , deleteCategory)
    yield takeLatest(UPDATE_CATEGORY_START,updateCategory)
} 