import { GET_USER_ERROR, GET_USER_SUCCESS, LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS } from "../constant/user.constant";

const initialState = {
    users : localStorage.getItem('users') ? 
     JSON.parse(localStorage.getItem('users')) : [],

    currentUser : localStorage.getItem('currentUser') ? 
    JSON.parse(localStorage.getItem('currentUser')) : {
        name: '',
        email: '',
        contact : '',
        image:''
    }
}

export const userReducer = (state = initialState,action)=>{
  switch (action.type) {
    case GET_USER_SUCCESS:
        localStorage.setItem('users',JSON.stringify(action.payload))
        return {
            ...state,
            users : [...action.payload]
        }
    case GET_USER_ERROR :
        return {
            ...state,
            error  : action.payload
        }
        case LOGIN_USER_SUCCESS:
            localStorage.setItem('currentUser',JSON.stringify(action.payload))
            return {
                ...state,
                currentUser : {...action.payload}
            }
        case LOGOUT_USER_SUCCESS:
            localStorage.removeItem('currentUser')
            return {
                ...state,
                currentUser :{
                    name: '',
                    email: '',
                  contact : '',
                }
            }

    default:
        return state;
  }
}