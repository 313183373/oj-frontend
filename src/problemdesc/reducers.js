import {FETCH_PROBLEM_DESC_LOADING, FETCH_PROBLEM_DESC_SUCCESS, FETCH_PROBLEM_DESC_FAILURE} from "./actionTypes";
import * as Status from './status';

export default (state = {status: Status.LOADING}, action) => {
    switch (action.type) {
        case FETCH_PROBLEM_DESC_LOADING: {
            return {...state, status: Status.LOADING}
        }
        case FETCH_PROBLEM_DESC_SUCCESS: {
            return {...state, status: Status.SUCCESS, result: action.result}
        }
        case FETCH_PROBLEM_DESC_FAILURE: {
            return {...state, status: Status.FAILURE}
        }
        default: {
            return state;
        }
    }
};