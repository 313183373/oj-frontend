import {
  GET_ME,
  GET_PROBLEM_AT_PAGE,
  GET_PROBLEM_BY_ID,
  GET_SUBMIT_BY_ID,
  GET_SUBMITS_BY_PROBLEM_ID,
  SIGN_IN,
  POST_SUBMIT_TO_PROBLEM, SIGN_UP
} from "./urls";

const isProduction = process.env.NODE_ENV === 'production';

export function urlCreator(action) {
  switch (action.type) {
    case GET_PROBLEM_AT_PAGE: {
      return isProduction ? `/api/problems?page=${action.page}` : `/problems?page=${action.page}`;
    }
    case SIGN_IN: {
      return isProduction ? '/api/user/login' : '/user/login';
    }
    case SIGN_UP: {
      return isProduction ? '/api/user' : '/user';
    }
    case GET_SUBMIT_BY_ID: {
      return isProduction ? `/api/submits/${action.submitId}` : `/submits/${action.submitId}`;
    }
    case GET_ME: {
      return isProduction ? '/api/user/me' : '/user/me';
    }
    case GET_PROBLEM_BY_ID: {
      return isProduction ? `/api/problems/${action.problemId}` : `/problems/${action.problemId}`;
    }
    case POST_SUBMIT_TO_PROBLEM: {
      return isProduction ? `/api/problems/${action.problemId}` : `/problems/${action.problemId}`;
    }
    case GET_SUBMITS_BY_PROBLEM_ID: {
      return isProduction ? `/api/problems/${action.problemId}/submits` : `/problems/${action.problemId}/submits`;
    }
  }
}