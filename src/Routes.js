import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Problem from './pages/problemPage';
import Home from './pages/homePage';

const Routes = () => (
    <HashRouter>
        <Home/>
    </HashRouter>
);

export default Routes;