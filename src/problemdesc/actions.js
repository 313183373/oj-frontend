import {FETCH_PROBLEM_DESC_SUCCESS, FETCH_PROBLEM_DESC_FAILURE} from "./actionTypes";
import {CHANGE_LANGUAGE} from "./actionTypes";

export const fetchProblemDescSuccess = (result) => ({
    type: FETCH_PROBLEM_DESC_SUCCESS,
    result: {id:1, title: 'test', ac:20, all:103, content:'# 我是一道题', inputDesc: '我是输入', outputDesc: '我是输出', sampleInput: '我是输入样例', sampleOutput: '我是输出样例', hint: '我是提示', origin: '我是作者', timeLimit: '0.3s', memLimit: '1M'}
});

export const fetchProblemDescFailure = (error) => ({
    type: FETCH_PROBLEM_DESC_FAILURE,
    error
});

export const fetchProblemDesc = (id) => {
    console.log('id');
    return fetchProblemDescSuccess('dsf');
};

export const changeLanguage = (language) => {
    return {
        type: CHANGE_LANGUAGE,
        language: language
    }
}