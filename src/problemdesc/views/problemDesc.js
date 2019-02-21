import * as Status from "../status";
import React from "react";
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    app_bar: {
        color: theme.palette.common.black
    },
    app_bar_text: {
        color: theme.palette.common.white
    },
    progress: {
        margin: theme.spacing.unit * 2,
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

const ProblemDesc = ({classes, status, problemDesc}) => {
    switch (status) {
        case Status.LOADING: {
            return (
                <div>
                    <CircularProgress className={classes.progress}/>
                </div>
            );
        }
        case Status.SUCCESS: {
            return (
                <div className={classes.root}>
                    <AppBar className={classes.app_bar} position="static">
                        <Toolbar>
                            <Typography className={classes.app_bar_text} variant="h6">
                                `${problemDesc.id}-${problemDesc.title}`
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
            );
        }
        case Status.FAILURE: {
            return <div>题目详情获取失败，请刷新重试</div>
        }
        default: {
            throw new Error(`unexpected status ${status}`);
        }
    }
};

const mapStateToProps = (state) => {
    const problemDescData = state.problemDesc;
    return {
        status: problemDescData.status,
        problemDesc: problemDescData.result
    }
};

export default connect(mapStateToProps,null)(withStyles(styles)(ProblemDesc));