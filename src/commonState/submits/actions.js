import {ADD_SUBMIT, CLEAR_SUBMITS, INIT_SUBMITS} from "./actionTypes";


export const addSubmit = submit => {
  return {
    type: ADD_SUBMIT,
    submit,
  }
};

export const initSubmits = (problemId, submits) => {
  return {
    type: INIT_SUBMITS,
    submits,
    problemId,
  }
};

export const clearSubmits = () => {
  return {
    type: CLEAR_SUBMITS,
  }
};