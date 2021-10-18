// reducer for controlling all the auth states and actions
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

// declaring Helper functions
const authStart = (state, actions) => {
    return updateObject(state, { error: null, loading: true });
};

const authFailure = (state, actions) => {
    return updateObject(state, { error: actions.error, loading: false });
};

const authLogout = (state, actions) => {
    return updateObject(state, { token: null, userId: null})
}

const authSuccess = (state, actions) => {
    return updateObject(state, {
        token: actions.idToken,
        userId: actions.userId,
        loading: false,
        error: null
    });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path });
};

const reducer = (state = initialState, actions) => {
    switch (actions.type) {
        case actionTypes.AUTH_START:
            return authStart(state, actions);

        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, actions);

        case actionTypes.AUTH_FAIL:
            return authFailure(state, actions);

        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, actions);

        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, actions);

        default:
            return state;
    }
};

export default reducer;
