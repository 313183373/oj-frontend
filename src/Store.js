import {createStore, combineReducers} from 'redux';

import {reducer as problemListReducer} from './components/problemlist';
import {reducer as problemDescReducer} from './components/problemdesc';


const reducer = combineReducers({
    problems: problemListReducer,
    problemDesc: problemDescReducer
});

export default createStore(reducer, {});