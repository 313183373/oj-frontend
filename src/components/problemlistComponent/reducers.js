import {FETCH_PROBLEMS_STARTED, FETCH_PROBLEMS_SUCCESS, FETCH_PROBLEMS_FAILURE} from "./actionTypes";
import * as Status from './status';

export default (state = {status: Status.LOADING, page: 1, problems: []}, action) => {
    switch (action.type) {
        case FETCH_PROBLEMS_STARTED: {
            return {...state, status: Status.LOADING}
        }
        case FETCH_PROBLEMS_SUCCESS: {
            return {...state, status: Status.SUCCESS, problems: action.problems};
        }
        case FETCH_PROBLEMS_FAILURE: {
            return {...state, status: Status.FAILURE}
        }
        default: {
            return state;
        }
    }
};