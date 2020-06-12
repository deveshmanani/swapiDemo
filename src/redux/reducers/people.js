import { GET_PEOPLE_REQUEST, GET_PEOPLE_SUCCESS, GET_PEOPLE_ERROR, RESET_PEOPLE } from "../actions/getData"

const initialState = {
    loading: false,
    data: null,
    list:[],
    error: null
}

const people = (state = initialState, action) => {
    switch (action.type) {
        case GET_PEOPLE_REQUEST:
            return {
                ...state,
                loading: true
            }
        case GET_PEOPLE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                list: state.list.concat(action.payload.data.results)
            }
        case GET_PEOPLE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case RESET_PEOPLE:
            return {
                ...state,
                loading: false,
                data:null,
                list:[],
                error: null
            }
        default:
            return state
    }
}

export default people;