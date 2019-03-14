import { FETCH_PROBLEM_DESC_SUCCESS, FETCH_PROBLEM_DESC_FAILURE } from "./actionTypes";
import { COMMIT_CODE_LOADING, COMMIT_CODE_SUCCESS, COMMIT_CODE_FAILURE } from "./actionTypes";
import { CHANGE_LANGUAGE, FETCH_ALL_LANGUAGES } from "./actionTypes";
import { WRITE_CODE} from "./actionTypes";

export const fetchProblemDescSuccess = (result) => ({
    type: FETCH_PROBLEM_DESC_SUCCESS,
    result: {
        id: 1,
        title: 'test',
        ac: 20,
        all: 103,
        content: '# 我是一道题',
        inputDesc: '我是输入',
        outputDesc: '我是输出',
        sampleInput: '我是输入样例',
        sampleOutput: '我是输出样例',
        hint: '我是提示',
        origin: '我是作者',
        timeLimit: '0.3s',
        memLimit: '1M'
    }
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
}

export const writeCode = (newValue) => {
    return {
        type: WRITE_CODE,
        userWritingCode: newValue
    }
}

export const commitCodeLoding = () => {
    return {
        type: COMMIT_CODE_LOADING
    }
}

export const commitCodeSuccess = (result) => {
    return {
        type: COMMIT_CODE_SUCCESS,
        result: result
    }
}

export const commitCodeFailure = (error) => {
    return {
        type: COMMIT_CODE_FAILURE,
        error
    }
}

export const commitCode = () => {
    return commitCodeLoding('xx');
}