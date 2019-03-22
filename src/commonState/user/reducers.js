import {SET_USER, CLEAR_USER} from "./actionTypes";

const initState = {
  isSignIn: false,
  username: '',
  email: '',
  token: '',
};

export default (state = initState, action) => {
  switch (action.type) {
    case SET_USER: {
      return {
        ...state,
        isSignIn: true,
        ...action.user,
      }
    }

    case CLEAR_USER: {
      return {
        isSignIn: false,
        username: '',
        email: '',
        token: '',
      }
    }

    default: {
      return state;
    }
  }
}