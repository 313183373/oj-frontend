import {SIGN_IN_STARTED, SIGN_IN_FAILURE, SIGN_IN_SUCCESS} from "./actionTypes";
import * as Status from './status';

export default (state = {isSubmit: false, status: ''}, action) => {
    switch (action.type) {
        case SIGN_IN_STARTED: {
            return {...state, isSubmit: true, status: Status.LOADING}
        }
        case SIGN_IN_SUCCESS: {
            return {...state, isSubmit: true, status: Status.SUCCESS, result: action.result};
        }
        case SIGN_IN_FAILURE: {
            return {...state, isSubmit: true, status: Status.FAILURE}
        }
        default: {
            return state;
        }
    }
};