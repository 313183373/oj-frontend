import {SIGN_UP_STARTED, SIGN_UP_FAILURE, SIGN_UP_SUCCESS} from "./actionTypes";
import * as Status from './status';

export default (state = {status: ''}, action) => {
  switch (action.type) {
    case SIGN_UP_STARTED: {
      return {...state, status: Status.LOADING};
    }
    case SIGN_UP_SUCCESS: {
      return {...state, status: Status.SUCCESS};
    }
    case SIGN_UP_FAILURE: {
      return {...state, status: Status.FAILURE};
    }
    default: {
      return state;
    }
  }
};