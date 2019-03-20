import {FETCH_PROBLEMS_STARTED, FETCH_PROBLEMS_SUCCESS, FETCH_PROBLEMS_FAILURE} from "./actionTypes";
import {CHANGE_PAGE_TO} from "./actionTypes";
import * as Status from './status';

export default (state = {status: Status.LOADING, page: 0}, action) => {
  switch (action.type) {
    case FETCH_PROBLEMS_STARTED: {
      return {...state, status: Status.LOADING}
    }
    case FETCH_PROBLEMS_SUCCESS: {
      return {...state, status: Status.SUCCESS, problems: action.result};
    }
    case FETCH_PROBLEMS_FAILURE: {
      return {...state, status: Status.FAILURE}
    }
    case CHANGE_PAGE_TO: {
      return {...state, page: action.page}
    }
    default: {
      console.log('state does not change');
      return state;
    }
  }
};