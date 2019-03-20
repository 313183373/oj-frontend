import {createStore, combineReducers, applyMiddleware} from 'redux';

import {reducer as problemListReducer} from './components/problemlistComponent';
import {reducer as problemDescReducer} from './components/problemdescComponent';
import {reducer as signInReducer} from './components/signinComponent';
import {reducer as signUpReducer} from './components/signupComponent';
import thunk from "redux-thunk";

const reducer = combineReducers({
    problems: problemListReducer,
    problemDesc: problemDescReducer,
    signIn: signInReducer,
    signUp: signUpReducer,
});

export default createStore(reducer, applyMiddleware(thunk));