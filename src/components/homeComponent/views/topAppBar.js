import React from 'react';
import AppBar from './appBar';
import Toolbar, {styles as toolbarStyles} from './toolBar';
import {withStyles} from '@material-ui/core';
import {Link} from "react-router-dom";
import clsx from 'clsx';

const styles = theme => ({
    // title: {
    //     fontSize: 24,
    // },
    // placeholder: toolbarStyles(theme).root,
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
    rightLink: {
        color: '#ffffff',
        textDecoration: 'none',
        padding: 10
    },
    // linkSecondary: {
    //     color: theme.palette.secondary.main,
    // },
    titleLink: {
        flex: 1,
        color: '#ffffff',
        textDecoration: 'none',
        padding: 10,
        fontSize: 24,
        fontFamily: 'Work Sans',
        textAlign: 'center'
    }
});

const TopAppBar = ({classes}) => {
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar>
                    <div className={classes.left}/>
                    <Link to="/" className={classes.titleLink}>
                        Online Judge
                    </Link>
                    <div className={classes.right}>
                        <Link to="/sign-in" className={classes.rightLink}>
                            Sign In
                        </Link>
                        <Link to="/sign-up" style={{color: '#FFE57F', textDecoration: 'none', padding: 10}}>
                            Sign Up
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.placeholder}/>
        </div>
    );
};

export default withStyles(styles)(TopAppBar);
