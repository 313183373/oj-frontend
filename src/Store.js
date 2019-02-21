import {createStore, combineReducers} from 'redux';

import {reducer as problemListReducer} from './problemlist';
import {reducer as problemDescReducer} from './problemdesc';


const reducer = combineReducers({
    problems: problemListReducer,
    problemDesc: problemDescReducer
});

export default createStore(reducer, {});