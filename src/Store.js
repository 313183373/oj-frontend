import {createStore, combineReducers} from 'redux';

import {reducer as problemListReducer} from './components/problemlistComponent';
import {reducer as problemDescReducer} from './components/problemdescComponent';


const reducer = combineReducers({
    problems: problemListReducer,
    problemDesc: problemDescReducer
});

export default createStore(reducer, {});