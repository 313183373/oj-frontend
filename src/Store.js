import {createStore, combineReducers, applyMiddleware} from 'redux';

import {reducer as problemListReducer} from './components/problemlistComponent';
import {reducer as problemDescReducer} from './components/problemdescComponent';
import {reducer as signInReducer} from './components/signinComponent';
import {reducer as signUpReducer} from './components/signupComponent';
import {reducer as userReducer} from './commonState/user';
import {reducer as socketReducer} from './commonState/socket';
import {reducer as submitReducer} from './commonState/submits';
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";


const reducer = combineReducers({
  problems: problemListReducer,
  problemDesc: problemDescReducer,
  signIn: signInReducer,
  signUp: signUpReducer,
  user: userReducer,
  socket: socketReducer,
  submits: submitReducer,
});

export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
