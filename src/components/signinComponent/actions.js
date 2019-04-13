import {SIGN_IN_STARTED, SIGN_IN_SUCCESS, SIGN_IN_FAILURE} from "./actionTypes";
import {setUser} from "../../commonState/user/actions";

export const signInStarted = () => ({
  type: SIGN_IN_STARTED
});

export const signInSuccess = (user) => ({
  type: SIGN_IN_SUCCESS,
  user,
});

// todo: the error is not used in reducer, delete if it is useless
export const signInFailure = (error) => ({
  type: SIGN_IN_FAILURE,
  error
});

// todo: the submitSignIn function is not used because a submit function should return a submit error object which can not be implemented here
export const submitSignIn = (email, pwd) => dispatch => {
  dispatch(signInStarted());
  fetch('/api/user/login', {
    method: 'POST',
    headers: {
      'content-type': "application/json",
    },
    body: JSON.stringify({
      email,
      password: pwd
    }),
  }).then(res => {
    if (res.ok) {
      return res.json();
    }
    throw new Error();
  }).then(user => {
    dispatch(signInSuccess(user));
    dispatch(setUser(user));
  }).catch(err => {
    dispatch(signInFailure());
  });
};