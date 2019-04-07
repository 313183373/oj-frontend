import {ADD_SUBMIT} from "./actionTypes";


export const addStudent = submit => {
  return {
    type: ADD_SUBMIT,
    submit,
  }
};