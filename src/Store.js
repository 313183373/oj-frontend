import {createStore, combineReducers} from 'redux';

import {reducer as problemListReducer} from './problemlist';



const reducer = combineReducers({
    problems: problemListReducer
});

export default createStore(reducer, {});