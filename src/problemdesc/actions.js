import {FETCH_PROBLEM_DESC_SUCCESS, FETCH_PROBLEM_DESC_FAILURE} from "./actionTypes";

export const fetchProblemDescSuccess = (result) => ({
    type: FETCH_PROBLEM_DESC_SUCCESS,
    result: {id:1, title: 'test', ac:20, all:103, content:'我是一道题'}
});

export const fetchProblemDescFailure = (error) => ({
    type: FETCH_PROBLEM_DESC_FAILURE,
    error
});

export const fetchProblemDesc = (id) => {
    console.log('id');
    return fetchProblemDescSuccess('dsf');
};