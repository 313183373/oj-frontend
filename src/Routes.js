import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Problem from './pages/problem';
import Home from './pages/Home';

const Routes = () => (
    <HashRouter>
        <Home/>
    </HashRouter>
);

export default Routes;