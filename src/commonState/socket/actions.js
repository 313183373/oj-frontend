import {CLEAR_SOCKET, SET_SOCKET} from "./actionTypes";

export const setSocket = socket => ({
  type: SET_SOCKET,
  socket,
});


export const clearSocket = () => ({
  type: CLEAR_SOCKET,
});