import { GET_FILM_REQUEST, GET_FILM_SUCCESS, GET_FILM_ERROR, RESET_GET_FILM } from "../actions/getData"

const initialState = {
    loading: false,
    data: null,
    list: [],
    error: null
}

const film = (state = initialState, action) => {
    switch (action.type) {
        case GET_FILM_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_FILM_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                list: state.list.concat(action.payload.data.results)
            }
        case GET_FILM_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case RESET_GET_FILM:
            return {
                ...state,
                loading: false,
                data: null,
                list: [],
                error: null
            }
        default:
            return state
    }
}

export default film;