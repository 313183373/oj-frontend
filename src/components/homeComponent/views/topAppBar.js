import React from 'react';
import AppBar from './appBar';
import Toolbar, {styles as toolbarStyles} from './toolBar';
import {withStyles} from '@material-ui/core';
import {Link} from "react-router-dom";
import clsx from 'clsx';

const styles = theme => ({
    title: {
        fontSize: 24,
    },
    placeholder: toolbarStyles(theme).root,
    toolbar: {
        justifyContent: 'space-between',
    },
    left: {
        flex: 1,
    },
    leftLinkActive: {
        color: theme.palette.common.white,
    },
    right: {
        flex: 1,
        display: 'flex',
        justifyContent: 'flex-end',
    },
    rightLink: {
        fontSize: 16,
        color: theme.palette.common.white,
        marginLeft: theme.spacing.unit * 3,
    },
    linkSecondary: {
        color: theme.palette.secondary.main,
    },
});

const TopAppBar = ({classes}) => {
    return (
        <div>
            <AppBar position="fixed">
                <Toolbar className={classes.toolbar}>
                    <div className={classes.left}/>
                    <Link to="/" style={{
                        color: '#ffffff',
                        textDecoration: 'none',
                        padding: 10,
                        fontSize: 24,
                        fontFamily: 'Work Sans'
                    }}>
                        {'Online Judge'}
                    </Link>
                    <div className={classes.right}>
                        <Link to="/sign-in" style={{color: '#ffffff', textDecoration: 'none', padding: 10}}>
                              {'Sign In'}
                        </Link>
                        <Link to="/sign-up" style={{color: '#FFE57F', textDecoration: 'none', padding: 10}}>
                            {'Sign Up'}
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.placeholder}/>
        </div>
    );
};

export default withStyles(styles)(TopAppBar);
