import { SERVER_URL } from "../../helper/baseApi";
import axios from 'axios'
export const GET_PEOPLE_REQUEST = 'GET_PEOPLE_REQUEST';
export const GET_PEOPLE_SUCCESS = 'GET_PEOPLE_SUCCESS';
export const GET_PEOPLE_ERROR = 'GET_PEOPLE_ERROR';
export const RESET_PEOPLE = 'RESET_PEOPLE';
export const GET_FILM_REQUEST = 'GET_FILM_REQUEST';
export const GET_FILM_SUCCESS = 'GET_FILM_SUCCESS';
export const GET_FILM_ERROR = 'GET_FILM_ERROR';
export const RESET_GET_FILM = 'RESET_GET_FILM';
export const GET_PEOPLE_DETAIL_REQUEST = 'GET_PEOPLE_DETAIL_REQUEST';
export const GET_PEOPLE_DETAIL_SUCCESS = 'GET_PEOPLE_DETAIL_SUCCESS';
export const GET_PEOPLE_DETAIL_ERROR = 'GET_PEOPLE_DETAIL_ERROR';
export const RESET_GET_PEOPLE_DETAIL = 'RESET_GET_PEOPLE_DETAIL';
export const GET_FILM_DETAIL_REQUEST = 'GET_FILM_DETAIL_REQUEST';
export const GET_FILM_DETAIL_SUCCESS = 'GET_FILM_DETAIL_SUCCESS';
export const GET_FILM_DETAIL_ERROR = 'GET_FILM_DETAIL_ERROR';
export const RESET_GET_FILM_DETAIL = 'RESET_GET_FILM_DETAIL';

export const getPeopleDetail = (data) => {
    let url = data && data.id ? `${SERVER_URL}people/${data.id}` : data && data.url ? data.url : `${SERVER_URL}people`
    return dispatch => {
        dispatch({
            type: GET_PEOPLE_DETAIL_REQUEST
        })
        axios({
            method: 'GET',
            url: url
        })
            .then(function (response) {
                console.log('response => ', response);
                dispatch({
                    type: GET_PEOPLE_DETAIL_SUCCESS,
                    payload: response
                })
            })
            .catch(function (error) {
                dispatch({
                    type: GET_PEOPLE_DETAIL_ERROR,
                    payload: error
                })
            })
    }
}
export const getFilmDetail = (data) => {
    let url = data && data.id ? `${SERVER_URL}films/${data.id}` : data && data.url ? data.url : `${SERVER_URL}films`
    return dispatch => {
        dispatch({
            type: GET_FILM_DETAIL_REQUEST
        })
        axios({
            method: 'GET',
            url: url
        })
            .then(function (response) {
                console.log('response => ', response);
                dispatch({
                    type: GET_FILM_DETAIL_SUCCESS,
                    payload: response
                })
            })
            .catch(function (error) {
                dispatch({
                    type: GET_FILM_DETAIL_ERROR,
                    payload: error
                })
            })
    }
}
export const getPeople = (data) => {
    let url = data && data.id ? `${SERVER_URL}people/${data.id}` : data && data.url ? data.url : `${SERVER_URL}people`
    return dispatch => {
        dispatch({
            type: GET_PEOPLE_REQUEST
        })
        axios({
            method: 'GET',
            url: url
        })
            .then(function (response) {
                console.log('response => ', response);
                dispatch({
                    type: GET_PEOPLE_SUCCESS,
                    payload: response
                })
            })
            .catch(function (error) {
                dispatch({
                    type: GET_PEOPLE_ERROR,
                    payload: error
                })
            })
    }
}
export const getFilm = (data) => {
    let url = data && data.id ? `${SERVER_URL}films/${data.id}` : data && data.url ? data.url : `${SERVER_URL}films`
    return dispatch => {
        dispatch({
            type: GET_FILM_REQUEST
        })
        axios({
            method: 'GET',
            url: url
        })
            .then(function (response) {
                console.log('response => ', response);
                dispatch({
                    type: GET_FILM_SUCCESS,
                    payload: response
                })
            })
            .catch(function (error) {
                dispatch({
                    type: GET_FILM_ERROR,
                    payload: error
                })
            })
    }
}
export const resetGetPeople = (id) => {
    return dispatch => {
        dispatch({
            type: RESET_PEOPLE
        })
    }
}
export const resetGetFilm = (id) => {
    return dispatch => {
        dispatch({
            type: RESET_GET_FILM
        })
    }
}
export const resetPeopleDetail = (id) => {
    return dispatch => {
        dispatch({
            type: RESET_GET_PEOPLE_DETAIL
        })
    }
}
export const resetFilmDetail = (id) => {
    return dispatch => {
        dispatch({
            type: RESET_GET_FILM_DETAIL
        })
    }
}