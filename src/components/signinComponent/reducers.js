import {SIGN_IN_STARTED, SIGN_IN_FAILURE, SIGN_IN_SUCCESS} from "./actionTypes";
import * as Status from './status';

export default (state = {status: ''}, action) => {
  switch (action.type) {
    case SIGN_IN_STARTED: {
      return {...state, status: Status.LOADING}
    }
    case SIGN_IN_SUCCESS: {
      return {...state, status: Status.SUCCESS, result: action.result};
    }
    case SIGN_IN_FAILURE: {
      return {...state, status: Status.FAILURE}
    }
    default: {
      return state;
    }
  }
};