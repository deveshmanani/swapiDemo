import { GET_FILM_DETAIL_REQUEST, GET_FILM_DETAIL_SUCCESS, GET_FILM_DETAIL_ERROR, RESET_GET_FILM_DETAIL } from "../actions/getData"

const initialState = {
    loading: false,
    data: null,
    error: null
}

const filmDetail = (state = initialState, action) => {
    switch (action.type) {
        case GET_FILM_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_FILM_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case GET_FILM_DETAIL_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case RESET_GET_FILM_DETAIL:
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

export default filmDetail;