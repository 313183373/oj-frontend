import {ADD_SUBMIT, CLEAR_SUBMITS, INIT_SUBMITS} from './actionTypes';

const initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_SUBMIT: {
      const submit = action.submit;
      if (state[submit.problem]) {
        const oldSubmits = state[submit.problem];
        return {
          ...state,
          [submit.problem]: [submit, ...oldSubmits],
        }
      }
      return {...state, [submit.problem]: [submit]}
    }
    case INIT_SUBMITS: {
      const {submits, problemId} = action;
      return {...state, [problemId]: submits}
    }
    case CLEAR_SUBMITS: {
      return {};
    }
    default: {
      return state;
    }
  }
}