import React from 'react';
import {view as TopAppBar} from '../home/';
import { Switch, Route } from 'react-router-dom';
import Problem from './problem';
import Problems from './problems';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../theme';


const Home = () => {
    return (
        <MuiThemeProvider theme={theme}>
            <TopAppBar/>
            <Switch>
                <Route exact path='/' component={Problems}/>
                <Route path='/problem/:id' component={Problem}/>
                <Route path='/sign-in' component={Problem}/>
                <Route path='/sign-up' component={Problem}/>
            </Switch>
        </MuiThemeProvider>
    );
}
export default Home;