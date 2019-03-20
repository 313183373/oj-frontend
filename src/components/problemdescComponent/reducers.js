import {FETCH_PROBLEM_DESC_LOADING, FETCH_PROBLEM_DESC_SUCCESS, FETCH_PROBLEM_DESC_FAILURE} from "./actionTypes";
import {COMMIT_CODE_LOADING, COMMIT_CODE_SUCCESS, COMMIT_CODE_FAILURE} from "./actionTypes";
import {CHANGE_LANGUAGE, FETCH_ALL_LANGUAGES} from './actionTypes';
import {WRITE_CODE} from './actionTypes';
import * as Status from './status';

export default (state = {
    loadData: {status: Status.LOADING, problem: {}},
    commitCode: {status: Status.NOTHING},
    userWritingCode: '',
    allLanguages: [],
    language: '',
}, action) => {
    switch (action.type) {
        case FETCH_PROBLEM_DESC_LOADING: {
            return {...state, loadData: {status: Status.LOADING}}
        }
        case FETCH_PROBLEM_DESC_SUCCESS: {
            return {...state, loadData: {status: Status.SUCCESS, problem: action.problem}}
        }
        case FETCH_PROBLEM_DESC_FAILURE: {
            return {...state, loadData: {status: Status.FAILURE}}
        }
        case CHANGE_LANGUAGE: {
            return {...state, language: action.language}
        }
        case FETCH_ALL_LANGUAGES: {
            return {...state, allLanguages: action.allLanguages, language: action.allLanguages[0].value}
        }
        case WRITE_CODE: {
            return {...state, userWritingCode: action.userWritingCode}
        }
        case COMMIT_CODE_LOADING: {
            return {...state, commitCode: {status: Status.LOADING}}
        }
        case COMMIT_CODE_SUCCESS: {
            return {...state, commitCode: {status: Status.SUCCESS}}
        }
        case COMMIT_CODE_FAILURE: {
            return {...state, commitCode: {status: Status.FAILURE}}
        }
        default: {
            return state;
        }
    }
};