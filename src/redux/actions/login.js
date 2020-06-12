export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_ERROR = 'LOGOUT_ERROR';

export const login = (data) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        dispatch({
            type: LOGIN_REQUEST
        })
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then(function (response) {
                console.log('response login => ', response);
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response
                })
            })
            .catch(function (error) {
                console.log('error login => ', error);
                dispatch({
                    type: LOGIN_ERROR,
                    payload: error
                })
            })
    }
}

export const autoLogin = (token) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        dispatch({
            type: LOGIN_REQUEST
        })
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: user
                })
            } else {
                dispatch({
                    type: LOGIN_ERROR,
                    payload: { message: "Please Login again" }
                })
                // No user is signed in.
            }
        });

        // .catch(function (error) {
        //     console.log('error autoLogin => ', error);
        //     dispatch({
        //         type: LOGIN_ERROR,
        //         payload: error
        //     })
        // })
    }
}

export const logout = () => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        dispatch({
            type: LOGOUT_REQUEST
        })
        firebase.auth().signOut()
            .then(function (response) {
                localStorage.removeItem("token")
                dispatch({
                    type: LOGOUT_SUCCESS,
                    payload: response
                })
            })
            .catch(function (error) {
                dispatch({
                    type: LOGOUT_ERROR,
                    payload: error
                })
            })
    }
}

export const signup = (data) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase()
        dispatch({
            type: LOGIN_REQUEST
        })
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then(function (response) {
                console.log('response => ', response);
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: response
                })
            })
            .catch(function (error) {
                console.log('error => ', error);
                dispatch({
                    type: LOGIN_ERROR,
                    payload: error
                })
            })
    }
}