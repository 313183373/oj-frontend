import {FETCH_PROBLEMS_STARTED, FETCH_PROBLEMS_SUCCESS, FETCH_PROBLEMS_FAILURE} from "./actionTypes";
import {CHANGE_PAGE_TO} from "./actionTypes";

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

export const fetchProblemList = (page) => dispatch => {
    page = page + 1;
    dispatch(fetchProblemsStarted());
    fetch(`/problems?page=${page}`).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error();
    }).then(problems => {
        dispatch(fetchProblemsSuccess(problems));
    }).catch(() => {
        dispatch(fetchProblemsFailure());
    });
};

export const changePageTo = (page) => ({
  type: CHANGE_PAGE_TO,
  page: page
});
