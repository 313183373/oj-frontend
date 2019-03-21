import {FETCH_PROBLEMS_STARTED, FETCH_PROBLEMS_SUCCESS, FETCH_PROBLEMS_FAILURE} from "./actionTypes";
import {CHANGE_PAGE_TO} from "./actionTypes";
import {SET_TOTAL_PROBLEM_NUMBER} from "./actionTypes";

export const fetchProblemsStarted = () => ({
  type: FETCH_PROBLEMS_STARTED
});

export const fetchProblemsSuccess = problems => ({
  type: FETCH_PROBLEMS_SUCCESS,
  problems,
});

export const fetchProblemsFailure = (error) => ({
  type: FETCH_PROBLEMS_FAILURE,
  error
});

export const setTotalProblemNumber = (totalProblemNumber) => ({
  type: SET_TOTAL_PROBLEM_NUMBER,
  totalProblemNumber
});

export const fetchProblemList = (page) => dispatch => {
  page = page + 1;
  dispatch(fetchProblemsStarted());
  fetch(`/problems?page=${page}`).then(response => {
    if (response.ok) {
      return response.json();
    }
    throw new Error();
  }).then(response => {
    dispatch(setTotalProblemNumber(response.totalProblemNumber));
    dispatch(fetchProblemsSuccess(response.problems));
  }).catch(() => {
    dispatch(fetchProblemsFailure());
  });
};

export const changePageTo = (page) => ({
  type: CHANGE_PAGE_TO,
  page: page
});
