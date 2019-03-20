import {FETCH_PROBLEM_DESC_SUCCESS, FETCH_PROBLEM_DESC_FAILURE, FETCH_PROBLEM_DESC_LOADING} from "./actionTypes";
import {COMMIT_CODE_LOADING, COMMIT_CODE_SUCCESS, COMMIT_CODE_FAILURE} from "./actionTypes";
import {CHANGE_LANGUAGE, FETCH_ALL_LANGUAGES} from "./actionTypes";
import {WRITE_CODE} from "./actionTypes";

export const fetchProblemDescSuccess = (problem) => ({
    type: FETCH_PROBLEM_DESC_SUCCESS,
    problem,
});

export const fetchProblemDescFailure = (error) => ({
    type: FETCH_PROBLEM_DESC_FAILURE,
    error
});

export const fetchProblemDescLoading = () => ({
    type: FETCH_PROBLEM_DESC_LOADING,
});

export const fetchProblemDesc = id => dispatch => {
    dispatch(fetchProblemDescLoading());
    fetch(`/problems/${id}`).then(response => {
        if (!response.ok) {
            throw new Error();
        }
        return response.json();
    }).then(problem => {
        console.log(problem);
        dispatch(fetchProblemDescSuccess(problem));
    }).catch(() => {
        dispatch(fetchProblemDescFailure());
    });
};

export const changeLanguage = (language) => {
    return {
        type: CHANGE_LANGUAGE,
        language: language
    }
};

export const fetchAllLanguages = () => {
    return {
        type: FETCH_ALL_LANGUAGES,
        allLanguages: [{
            value: "cpp",
            label: "C++",
            disabled: false
        }, {
            value: "c",
            label: "C",
            disabled: false
        }, {
            value: "java",
            label: "Java",
            disabled: true
        }, {
            value: "javascript",
            label: "Javascript",
            disabled: true
        }, {
            value: "python",
            label: "Python",
            disabled: true
        }]
    }
};

export const writeCode = (newValue) => {
    return {
        type: WRITE_CODE,
        userWritingCode: newValue
    }
};

export const commitCodeLoading = () => {
    return {
        type: COMMIT_CODE_LOADING
    }
};

export const commitCodeSuccess = (result) => {
    return {
        type: COMMIT_CODE_SUCCESS,
        result: result
    }
};

export const commitCodeFailure = (error) => {
    return {
        type: COMMIT_CODE_FAILURE,
        error
    }
};

export const commitCode = () => {
    return commitCodeLoading('xx');
};