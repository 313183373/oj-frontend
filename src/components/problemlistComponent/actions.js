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

export const fetchProblemList = (page) => async dispatch => {
  page = page + 1;
  dispatch(fetchProblemsStarted());
  const response = await fetch(`/problems?page=${page}`);
  if (response.ok) {
    const {problems, totalProblemNumber} = await response.json();
    dispatch(setTotalProblemNumber(totalProblemNumber));
    dispatch(fetchProblemsSuccess(problems));
  } else {
    dispatch(fetchProblemsFailure());
  }
};

export const changePageTo = (page) => ({
  type: CHANGE_PAGE_TO,
  page: page
});
