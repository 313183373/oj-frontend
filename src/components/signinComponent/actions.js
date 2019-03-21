import {SIGN_IN_STARTED, SIGN_IN_SUCCESS, SIGN_IN_FAILURE} from "./actionTypes";

export const signInStarted = () => ({
  type: SIGN_IN_STARTED
});

export const signInSuccess = (user) => ({
  type: SIGN_IN_SUCCESS,
  user,
});

export const signInFailure = (error) => ({
  type: SIGN_IN_FAILURE,
  error
});

export const submitSignIn = (email, pwd) => dispatch => {
  dispatch(signInStarted());
  fetch('/user/login', {
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
  }).catch(err => {
    dispatch(signInFailure());
  });
};