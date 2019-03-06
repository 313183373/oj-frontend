import {FETCH_PROBLEM_DESC_LOADING, FETCH_PROBLEM_DESC_SUCCESS, FETCH_PROBLEM_DESC_FAILURE, CHANGE_LANGUAGE} from "./actionTypes";
import * as Status from './status';

export default (state = {loadData:{status: Status.LOADING}, language: "c++"}, action) => {
    switch (action.type) {
        case FETCH_PROBLEM_DESC_LOADING: {
            return {...state, loadData:{status: Status.LOADING}}
        }
        case FETCH_PROBLEM_DESC_SUCCESS: {
            return {...state, loadData:{status: Status.SUCCESS, result: action.result}}
        }
        case FETCH_PROBLEM_DESC_FAILURE: {
            return {...state, loadData:{status: Status.FAILURE}}
        }
        case CHANGE_LANGUAGE: {
            return {...state, language:action.language}
        }
        default: {
            return state;
        }
    }
};