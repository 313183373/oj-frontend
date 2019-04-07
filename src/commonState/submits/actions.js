import {ADD_SUBMIT} from "./actionTypes";


export const addSubmit = submit => {
  return {
    type: ADD_SUBMIT,
    submit,
  }
};