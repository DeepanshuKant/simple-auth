import {
    REGISTER_USER_REQUESTS, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED, LOGIN_USER_REQUESTS, LOAD_USER_REQUESTS
    , LOAD_USER_SUCCESS, LOAD_USER_FAILED
} from '../types/users.type'

const initialState = {
    user: {},
    isAuthenticated: document.cookie.includes('token') ? true : false,
}
const userReducer = (state = initialState, action) => {

    switch (action.type) {

        case REGISTER_USER_REQUESTS:
        case LOAD_USER_REQUESTS:
            return {
                ...state,
                loading: true
            }

        case REGISTER_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload.user,
                isAuthenticated: true
            }

        case REGISTER_USER_FAILED:
            return {
                ...state,
                loading: false,
                user: {},
                isAuthenticated: false,
                error: action.payload.message
            }


        case LOAD_USER_FAILED:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            };

        default:
            return state;
    }

}


export default userReducer;