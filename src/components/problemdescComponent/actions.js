import {
  FETCH_PROBLEM_DESC_SUCCESS,
  FETCH_PROBLEM_DESC_FAILURE,
  FETCH_PROBLEM_DESC_LOADING,
  FETCH_SUBMITS_START,
  FETCH_SUBMITS_FAILURE,
  FETCH_SUBMITS_SUCCESS,
  START_WAITING_FOR_RESULT,
  END_WAITING_FOR_RESULT,
  SHOW_SUBMIT, CLEAR_SHOW_SUBMIT
} from "./actionTypes";
import {COMMIT_CODE_LOADING, COMMIT_CODE_SUCCESS, COMMIT_CODE_FAILURE} from "./actionTypes";
import {CHANGE_LANGUAGE, CHANGE_TAB, FETCH_ALL_LANGUAGES} from "./actionTypes";
import {WRITE_CODE} from "./actionTypes";
import {initSubmits} from "../../commonState/submits/actions";

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
  fetch(`/api/problems/${id}`).then(response => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  }).then(problem => {
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

export const changeTab = (tabIndex) => {
  return {
    type: CHANGE_TAB,
    curTabIndex: tabIndex
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

export const commitCodeSuccess = () => {
  return {
    type: COMMIT_CODE_SUCCESS
  }
};

export const commitCodeFailure = (error) => {
  return {
    type: COMMIT_CODE_FAILURE,
    error
  }
};

export const commitCode = (id, token, userCommit, socket) => async dispatch => {
  dispatch(commitCodeLoading());
  const response = await fetch(`/api/problems/${id}`, {
    method: 'post',
    body: JSON.stringify(userCommit),
    headers: {"x-access-token": token, 'content-type': 'application/json'}
  });
  if (response.ok) {
    try {
      const res = await response.json();
      if (socket) {
        socket.emit('listenToSubmit', res.submitId);
      }
      dispatch(commitCodeSuccess());
      dispatch(changeTab(1));
      dispatch(startWaitingForResult(id));
    } catch (e) {
      console.error(e);
      dispatch(commitCodeFailure('Something wrong, please try again.'));
    }
  } else {
    dispatch(commitCodeFailure('Something wrong, please try again.'));
  }
};

export const fetchSubmitsStart = () => ({
  type: FETCH_SUBMITS_START,
});

export const fetchSubmitsFailure = () => ({
  type: FETCH_SUBMITS_FAILURE,
});

export const fetchSubmitsSuccess = () => ({
  type: FETCH_SUBMITS_SUCCESS,
});

export const startWaitingForResult = problemId => ({
  type: START_WAITING_FOR_RESULT,
  problemId,
});

export const endWaitingForResult = problemId => ({
  type: END_WAITING_FOR_RESULT,
  problemId,
});

export const showSubmit = submit => ({
  type: SHOW_SUBMIT,
  submit,
});

export const clearShowSubmit = submit => ({
  type: CLEAR_SHOW_SUBMIT,
  submit,
});

export const fetchSubmitsByProblemId = (problemId, token) => async dispatch => {
  dispatch(fetchSubmitsStart());
  const response = await fetch(`/api/problems/${problemId}/submits`, {
    headers: {"x-access-token": token}
  });
  if (response.ok) {
    try {
      const submits = await response.json();
      dispatch(initSubmits(problemId, submits));
      dispatch(fetchSubmitsSuccess());
    } catch (e) {
      console.error(e);
      dispatch(fetchSubmitsFailure());
    }
  }
};
