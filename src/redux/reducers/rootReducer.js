import { combineReducers } from 'redux';
import {firebaseReducer} from 'react-redux-firebase'
import login from './login'
import people from './people'
import film from './film'
import peopleDetail from './peopleDetail'
import filmDetail from './filmDetail'
export default combineReducers({
    firebaseAuth: firebaseReducer,
    login,
    people,
    film,
    peopleDetail,
    filmDetail
});