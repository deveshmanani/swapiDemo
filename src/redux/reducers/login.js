import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS } from "../actions/login"

const initialState = {
    loading: false,
    data: null,
    error: null
}

const login = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                data: null,
                error: null
            }
        default:
            return state
    }
}

export default login;