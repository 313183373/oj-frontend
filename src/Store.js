import {createStore, combineReducers} from 'redux';

import {reducer as problemListReducer} from './components/problemlistComponent';
import {reducer as problemDescReducer} from './components/problemdescComponent';
import {reducer as signInReducer} from './components/signinComponent';

const reducer = combineReducers({
    problems: problemListReducer,
    problemDesc: problemDescReducer,
    signIn: signInReducer,
});

export default createStore(reducer, {});