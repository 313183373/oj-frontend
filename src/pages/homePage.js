import React from 'react';
import {view as TopAppBar} from '../components/homeComponent/';
import {Switch, Route} from 'react-router-dom';
import asyncComponent from '../components/baseComponents/AsyncComponent';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../theme';
import {NoMatch} from "./NoMatchPage";
import {withStyles} from "@material-ui/core";
const Problem = asyncComponent(() => import('./problemPage'));
const Problems = asyncComponent(() => import('./problemsPage'));
const SignIn = asyncComponent(() => import('./signInPage'));
const SignUp = asyncComponent(() => import('./signUpPage'));
const Submits = asyncComponent(() => import('./submitsPage'));

const style = {
  appBar: {
    height: 'calc(100vh - 64px)',
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100vh - 70px)',
    },
  }
};

const Home = ({classes}) => {
  return (
    <MuiThemeProvider theme={theme}>
      <TopAppBar/>
      <div className={classes.appBar}>
        <Switch>
          <Route exact path='/' component={Problems}/>
          <Route path='/problem/:id' component={Problem}/>
          <Route path='/sign-in' component={SignIn}/>
          <Route path='/sign-up' component={SignUp}/>
          <Route path='/submits/:submitId' component={Submits}/>
          <Route component={NoMatch}/>
          {/*<Route path='/status' component={Status}></Route>*/}
        </Switch>
      </div>
    </MuiThemeProvider>
  );
};
export default withStyles(style)(Home);