import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';

import Problems from './pages/problems';
import Problem from './pages/problem'

const Routes = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Problems}/>
            <Route exact path="/problem/:name" component={Problem}/>
        </Switch>
    </HashRouter>
);

export default Routes;