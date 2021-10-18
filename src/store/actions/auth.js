// Contains all actions related to user authentication
import * as actionTypes from './actionTypes';

// importing axios from axios package as posting of data is from completely different url
import axios from 'axios';

// used to show spinner when authentication process will start
export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS, 
        idToken: token,
        userId: userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return{
        type: actionTypes.AUTH_LOGOUT
    };
};

// invalidating the token in the frontend after it reaches the expiration time
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expirationTime * 1000)
    };
};

export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());
        // passing "returnSecureToken: true" which is done as suggested by firebase
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };

        // url when user need to signup
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDUMaEBRqw1X3TvUE0j9hIo71wgWckBlR0';
        if(!isSignup){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDUMaEBRqw1X3TvUE0j9hIo71wgWckBlR0';
        };

        axios.post(url, authData)
            .then(response => {
                console.log(response);

                const expirationTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                // Setting up token in local storage
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationTime', expirationTime);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(err => {
                console.log(err.response.data);
                dispatch(authFail(err.response.data.error.message));
            });
    };
};

// path is the path that we will receive from component to which we want to redirect
export const setAuthRedirectPath = (path) => {
    return{
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

// Creating actionCreator which will check for the authentication data present in 
// localStorage or not
export const authCheckData = () => {
    return (dispatch) => {
        const token = localStorage.getItem('token');
        // when token is not present
        if(!token){
            dispatch(logout());
        } else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if(expirationTime <= new Date()){
                dispatch(auth());
            } else {

                // Fetching the userId saved in localStorage
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token, userId));

                // Converting the time from milliseconds to seconds by dividing it by 1000
                dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()))/1000);
            }

        }
    }
}

