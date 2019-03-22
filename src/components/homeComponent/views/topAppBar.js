import React, {useEffect} from 'react';
import AppBar from './appBar';
import Toolbar, {styles as toolbarStyles} from './toolBar';
import {withStyles} from '@material-ui/core';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Typography from "../../baseComponents/Typography";
import {signInSuccess} from '../../signinComponent/actions';
// import clsx from 'clsx';

const styles = theme => ({
  // title: {
  //     fontSize: 24,
  // },
  placeholder: toolbarStyles(theme).root,
  left: {
    flex: 1,
  },
  // leftLinkActive: {
  //     color: theme.palette.common.white,
  // },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  // rightLink: {
  //     fontSize: 16,
  //     color: theme.palette.common.white,
  //     marginLeft: theme.spacing.unit * 3,
  // },
  // linkSecondary: {
  //     color: theme.palette.secondary.main,
  // },
  titleLink: {
    color: '#ffffff',
    textDecoration: 'none',
    padding: 10,
    fontSize: 24,
    fontFamily: 'Work Sans'
  },
});


const SignInOrSignUp = () => {
  return (
    <React.Fragment>
      <Link to="/sign-in" style={{color: '#ffffff', textDecoration: 'none', padding: 10}}>
        Sign In
      </Link>
      <Link to="/sign-up" style={{color: '#FFE57F', textDecoration: 'none', padding: 10}}>
        Sign Up
      </Link>
    </React.Fragment>
  )
};

const UserInfo = ({user}) => {
  return (
    <Typography variant='subtitle1' style={{color: '#ffffff', padding: 10}}>
      {user.username}
    </Typography>
  )
};

async function getUserInfo(token, dispatch) {
  const response = await fetch('/user/me', {headers: {'x-access-token': token}});
  if (response.ok) {
    const {user, token} = await response.json();
    dispatch(signInSuccess({username: user.name, email: user.email, token,}));
  }
}

const TopAppBar = ({classes, user, dispatch}) => {
  useEffect(() => {
    if (!user.token && localStorage.token) {
      getUserInfo(localStorage.token, dispatch);
    }
  });

  const isUserLoggedIn = !!user.token;
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <div className={classes.left}/>
          <Link to="/" className={classes.titleLink}>
            Online Judge
          </Link>
          <div className={classes.right}>
            {isUserLoggedIn ? <UserInfo user={user}/> : <SignInOrSignUp/>}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder}/>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.signIn.user
});

export default connect(mapStateToProps)(withStyles(styles)(TopAppBar));
