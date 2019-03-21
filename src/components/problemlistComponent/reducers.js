import {FETCH_PROBLEMS_STARTED, FETCH_PROBLEMS_SUCCESS, FETCH_PROBLEMS_FAILURE} from "./actionTypes";
import {CHANGE_PAGE_TO} from "./actionTypes";
import {SET_TOTAL_PROBLEM_NUMBER} from "./actionTypes";
import * as Status from './status';

export default (state = {status: Status.LOADING, problems: [], page: 0, totalProblemNumber: 0}, action) => {
  switch (action.type) {
    case FETCH_PROBLEMS_STARTED: {
      return {...state, status: Status.LOADING}
    }
    case FETCH_PROBLEMS_SUCCESS: {
      return {
        ...state,
        status: Status.SUCCESS,
        problems: action.problems
      };
    }
    case FETCH_PROBLEMS_FAILURE: {
      return {...state, status: Status.FAILURE}
    }
    case CHANGE_PAGE_TO: {
      return {...state, page: action.page}
    }
    case SET_TOTAL_PROBLEM_NUMBER: {
      return {
        ...state,
        totalProblemNumber: action.totalProblemNumber
      }
    }
    default: {
      return state;
    }
  }
};
