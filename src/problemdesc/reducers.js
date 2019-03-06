import {FETCH_PROBLEM_DESC_LOADING, FETCH_PROBLEM_DESC_SUCCESS, FETCH_PROBLEM_DESC_FAILURE} from "./actionTypes";
import {CHANGE_LANGUAGE, FETCH_ALL_LANGUAGES} from './actionTypes';
import * as Status from './status';

export default (state = {loadData:{status: Status.LOADING}}, action) => {
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
        case FETCH_ALL_LANGUAGES: {
            return {...state, allLanguages: action.allLanguages, language: action.allLanguages[0].value}
        }
        default: {
            return state;
        }
    }
};