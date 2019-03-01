import React from 'react';
import {view as TopAppBar} from '../home/';
import { Switch, Route } from 'react-router-dom';
import Problems from './problems';
import Problem from './problem'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../theme';

const Home = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <TopAppBar/>
            <Switch>
                <Route path='/problems' component={Problems}/>
                <Route path='/problem/:id' component={Problem}/>
            </Switch>
        </MuiThemeProvider>
    );
}
export default Home;