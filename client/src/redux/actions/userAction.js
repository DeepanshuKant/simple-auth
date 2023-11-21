import {
    REGISTER_USER_REQUESTS, REGISTER_USER_SUCCESS, REGISTER_USER_FAILED,
    LOAD_USER_REQUESTS, LOAD_USER_SUCCESS, LOAD_USER_FAILED
} from '../types/users.type'
import axios from 'axios'

export const registerUser = (details) => async (dispatch) => {

    try {

        dispatch({
            type: REGISTER_USER_REQUESTS
        })


        const response = await axios.post("http://localhost:4000/users/signup", details, { withCredentials: true }).
            then((resp) => {
                if (resp.status === 200) {
                    return dispatch({ type: REGISTER_USER_SUCCESS, payload: resp.data })
                }
            }).
            catch((error) => {
                return dispatch({ type: REGISTER_USER_FAILED, payload: error.response.data })
            })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAILED,
            payload: error.message
        })
    }
}


export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUESTS });

        const response = await axios.get("http://localhost:4000/users/me", { withCredentials: true }).
            then((resp) => {
                if (resp.status === 200) {
                    return dispatch({ type: LOAD_USER_SUCCESS, payload: resp.data })
                }
            }).
            catch((error) => {
                return dispatch({ type: LOAD_USER_FAILED, payload: error.response.data })
            })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAILED,
            payload: error.message
        })
    }
}