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

export const fetchProblemList = (page, user) => async dispatch => {
  page = page + 1;
  dispatch(fetchProblemsStarted());
  const header = user.token ? {headers: {'x-access-token': user.token}} : {};
  const response = await fetch(`/api/problems?page=${page}`, header);
  if (response.ok) {
    try {
      const {problems, totalProblemNumber} = await response.json();
      dispatch(setTotalProblemNumber(totalProblemNumber));
      dispatch(fetchProblemsSuccess(problems));
    } catch (e) {
      dispatch(fetchProblemsFailure());
    }
  } else {
    dispatch(fetchProblemsFailure());
  }
};

export const changePageTo = (page) => ({
  type: CHANGE_PAGE_TO,
  page: page
});
