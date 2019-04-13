import {SIGN_UP_STARTED, SIGN_UP_SUCCESS, SIGN_UP_FAILURE} from "./actionTypes";

export const signUpStarted = () => ({
    type: SIGN_UP_STARTED
});

export const signUpSuccess = () => ({
    type: SIGN_UP_SUCCESS,
});

export const signUpFailure = (error) => ({
    type: SIGN_UP_FAILURE,
    error
});