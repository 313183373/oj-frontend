import React, {useEffect, useState} from 'react';
import AppBar from './appBar';
import Toolbar, {styles as toolbarStyles} from './toolBar';
import {withStyles} from '@material-ui/core';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Typography from "../../baseComponents/Typography";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {clearUser, setUser} from "../../../commonState/user/actions";
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

const UserMenu = ({anchorEl, logOut, handleMenuClose}) => {
  const isOpen = Boolean(anchorEl);
  return (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      transformOrigin={{vertical: 'top', horizontal: 'right'}}
      open={isOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={logOut}>Log out</MenuItem>
    </Menu>
  )
};

const UserInfo = ({user, logOut}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Typography variant='subtitle1' style={{color: '#ffffff', padding: 10}} onClick={event => {
        setAnchorEl(event.currentTarget);
      }}>
        {user.username}
      </Typography>
      <UserMenu anchorEl={anchorEl} logOut={logOut} handleMenuClose={handleMenuClose}/>
    </div>
  )
};

async function getUserInfo(token, setUserInfo) {
  const response = await fetch('/user/me', {headers: {'x-access-token': token}});
  if (response.ok) {
    const user = await response.json();
    setUserInfo({...user, token,});
  }
}

const TopAppBar = ({classes, user, setUserInfo, logOut}) => {

  useEffect(() => {
    if (!user.isSignIn && localStorage.token) {
      getUserInfo(localStorage.token, setUserInfo);
    }
  });

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar>
          <div className={classes.left}/>
          <Link to="/" className={classes.titleLink}>
            Online Judge
          </Link>
          <div className={classes.right}>
            {user.isSignIn ? <UserInfo user={user} logOut={logOut}/> : <SignInOrSignUp/>}
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder}/>
    </div>
  );
};

const mapStateToProps = state => {
  return ({
    user: state.user,
  });
};

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: user => {
      dispatch(setUser(user));
    },
    logOut: () => {
      localStorage.removeItem('token');
      dispatch(clearUser());
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TopAppBar));
