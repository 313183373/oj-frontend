import {ADD_SUBMIT} from './actionTypes';

const initState = {};

export default (state = initState, action) => {
  switch (action.type) {
    case ADD_SUBMIT: {
      const submit = action.submit;
      if (state[submit.problem]) {
        const oldSubmits = state[submit.problem];
        return {
          ...state,
          [submit.problem]: [...oldSubmits, submit],
        }
      }
      return {...state, [submit.problem]: [submit]}
    }
    default: {
      return state;
    }
  }
}