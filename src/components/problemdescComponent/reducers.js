import {
  FETCH_PROBLEM_DESC_LOADING,
  FETCH_PROBLEM_DESC_SUCCESS,
  FETCH_PROBLEM_DESC_FAILURE,
  FETCH_SUBMITS_BY_PROBLEM_ID,
  FETCH_SUBMITS_START,
  FETCH_SUBMITS_FAILURE,
  FETCH_SUBMITS_SUCCESS,
  START_WAITING_FOR_RESULT,
  END_WAITING_FOR_RESULT,
  SHOW_SUBMIT, CLEAR_SHOW_SUBMIT,
} from "./actionTypes";
import {COMMIT_CODE_LOADING, COMMIT_CODE_SUCCESS, COMMIT_CODE_FAILURE} from "./actionTypes";
import {CHANGE_LANGUAGE, CHANGE_TAB, FETCH_ALL_LANGUAGES} from './actionTypes';
import {WRITE_CODE} from './actionTypes';
import * as Status from './status';

export default (state = {
  loadData: {status: Status.LOADING, problem: {}},
  commitCode: {status: Status.NOTHING, message: ''},
  userWritingCode: '',
  allLanguages: [],
  language: 'cpp',
  curTabIndex: 0,
  fetchSubmitsStatus: Status.NOTHING,
  waitingForResult: [],
  showSubmit: [],
}, action) => {
  switch (action.type) {
    case FETCH_PROBLEM_DESC_LOADING: {
      return {...state, loadData: {status: Status.LOADING}}
    }
    case FETCH_PROBLEM_DESC_SUCCESS: {
      return {
        ...state,
        loadData: {status: Status.SUCCESS, problem: action.problem},
        userWritingCode: localStorage.getItem(`${action.problem._id}-${state.language}`)
          || '',
        commitCode: {status: Status.NOTHING, message: ''},
        curTabIndex: 0
      }
    }
    case FETCH_PROBLEM_DESC_FAILURE: {
      return {...state, loadData: {status: Status.FAILURE}}
    }
    case CHANGE_LANGUAGE: {
      return {
        ...state,
        language: action.language,
        userWritingCode: localStorage.getItem(`${state.loadData.problem._id}-${action.language}`)
          || ''
      }
    }
    case CHANGE_TAB: {
      return {
        ...state,
        curTabIndex: action.curTabIndex
      }
    }
    case FETCH_ALL_LANGUAGES: {
      return {
        ...state,
        allLanguages: action.allLanguages
      }
    }
    case
    WRITE_CODE: {
      localStorage.setItem(`${state.loadData.problem._id}-${state.language}`, action.userWritingCode);
      return {...state, userWritingCode: action.userWritingCode}
    }
    case
    COMMIT_CODE_LOADING: {
      return {...state, commitCode: {status: Status.LOADING, message: ''}}
    }
    case
    COMMIT_CODE_SUCCESS: {
      return {...state, commitCode: {status: Status.SUCCESS, message: ''}}
    }
    case
    COMMIT_CODE_FAILURE: {
      return {...state, commitCode: {status: Status.FAILURE, message: action.error}}
    }
    case FETCH_SUBMITS_START: {
      return {...state, fetchSubmitsStatus: Status.LOADING}
    }
    case FETCH_SUBMITS_FAILURE: {
      return {...state, fetchSubmitsStatus: Status.FAILURE}
    }
    case FETCH_SUBMITS_SUCCESS: {
      return {...state, fetchSubmitsStatus: Status.SUCCESS}
    }
    case START_WAITING_FOR_RESULT: {
      const oldWaitingForResult = state.waitingForResult;
      return {...state, waitingForResult: [action.problemId, ...oldWaitingForResult]}
    }
    case END_WAITING_FOR_RESULT: {
      const oldWaitingForResult = state.waitingForResult;
      return {...state, waitingForResult: oldWaitingForResult.filter(submit => submit !== action.problemId)}
    }
    case SHOW_SUBMIT: {
      return {...state, showSubmit: [...state.showSubmit, action.submit]}
    }
    case CLEAR_SHOW_SUBMIT: {
      return {...state, showSubmit: state.showSubmit.filter(submit => submit !== action.submit)}
    }
    default: {
      return state;
    }
  }
}
;
