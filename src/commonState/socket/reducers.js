import {SET_SOCKET} from "./actionTypes";
import {CLEAR_SOCKET} from "./actionTypes";

export default (state = null, action) => {
  switch (action.type) {
    case SET_SOCKET : {
      return action.socket;
    }
    case CLEAR_SOCKET: {
      return null;
    }
    default: {
      return state;
    }
  }
};