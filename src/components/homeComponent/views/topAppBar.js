import React, {useEffect, useState} from 'react';
import AppBar from './appBar';
import Toolbar, {styles as toolbarStyles} from './toolBar';
import {withStyles} from '@material-ui/core';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {clearUser, setUser} from "../../../commonState/user/actions";
import io from "socket.io-client";
import Button from "@material-ui/core/Button";
import {clearSocket, setSocket} from "../../../commonState/socket/actions";
import {addSubmit, clearSubmits} from '../../../commonState/submits/actions';
import {endWaitingForResult, showSubmit} from "../../problemdescComponent/actions";
import {urlCreator} from "../../../urls/urlCreator";
import {GET_ME} from "../../../urls/urls";
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
  link: {
    color: '#ffffff',
    textDecoration: 'none',
  },
  button: {
    color: '#ffffff',
    padding: 10,
    textTransform: 'none',
  }
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

const UserInfo = withStyles(styles)(({user, logOut, classes}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Button className={classes.button} onClick={event => {
        setAnchorEl(event.currentTarget);
      }}>
        {user.username}
      </Button>
      <UserMenu anchorEl={anchorEl} logOut={logOut} handleMenuClose={handleMenuClose}/>
    </div>
  )
});

async function getUserInfo(token, setUserInfo) {
  const response = await fetch(urlCreator({type: GET_ME}), {headers: {'x-access-token': token}});
  if (response.ok) {
    try {
      const user = await response.json();
      setUserInfo({...user, token,});
    } catch (e) {
    }
  }
}

const TopAppBar = ({classes, user, setUserInfo, logOut, clearSocketInfo, setSocketInfo, addSubmit, endWaitingForResult}) => {

  useEffect(() => {
    if (!user.isSignIn && localStorage.token) {
      getUserInfo(localStorage.token, setUserInfo);
    }
  });

  useEffect(() => {
    const socket = io('http://backend:5000');
    setSocketInfo(socket);
    socket.on('result', submit => {
      const submitObject = JSON.parse(submit);
      addSubmit(submitObject);
      endWaitingForResult(submitObject.problem);
    });
    return () => {
      clearSocketInfo();
      socket.disconnect();
    }
  }, []);

  return (
    <div>
      <AppBar>
        <Toolbar>
          <div className={classes.left}>
          </div>
          <Link to="/" className={classes.titleLink}>
            Online Judge
          </Link>
          <div className={classes.right}>
            {user.isSignIn ? <UserInfo user={user} logOut={logOut}/> : <SignInOrSignUp/>}
          </div>
        </Toolbar>
      </AppBar>
      {/*<div className={classes.placeholder}/>*/}
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
    setSocketInfo: socket => {
      dispatch(setSocket(socket));
    },
    clearSocketInfo: () => {
      dispatch(clearSocket());
    },
    logOut: () => {
      localStorage.removeItem('token');
      dispatch(clearUser());
      dispatch(clearSubmits());
    },
    addSubmit: submit => {
      dispatch(addSubmit(submit));
      dispatch(showSubmit(submit));
    },
    endWaitingForResult: problemId => {
      dispatch(endWaitingForResult(problemId))
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TopAppBar));
