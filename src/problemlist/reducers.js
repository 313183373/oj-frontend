import {FETCH_PROBLEMS_STARTED, FETCH_PROBLEMS_SUCCESS, FETCH_PROBLEMS_FAILURE} from "./actionTypes";
import * as Status from './status';

export default (state = {status: Status.LOADING, page: 101010100}, action) => {
    switch (action.type) {
        case FETCH_PROBLEMS_STARTED: {
            console.log('action start');
            return {...state, status: Status.LOADING}
        }
        case FETCH_PROBLEMS_SUCCESS: {
            console.log('action success');
            console.log(action.result);
            console.log({...state, status: Status.SUCCESS, result: action.result});
            return {...state, status: Status.SUCCESS, result: action.result};
        }
        case FETCH_PROBLEMS_FAILURE: {
            console.log('action failure');
            return {...state, status: Status.FAILURE}
        }
        default: {
            console.log('action default');
            return state;
        }
    }
};