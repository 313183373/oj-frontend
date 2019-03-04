import * as Status from "../status";
import React from "react";
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import * as Actions from '../actions';
import Typography from './Typography';

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

class ProblemDesc extends React.Component {
    
    componentDidMount() {
        this.props.fetchProblemDesc(this.props.id);
    }

    render() {
        const {classes, status, problemDesc} = this.props;
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
                        <Typography variant="h4" marked="center" align="center" component="h2">
                            {problemDesc.id}-{problemDesc.title}
                        </Typography>
                    
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
    }
}

const mapStateToProps = (state) => {
    const problemDescData = state.problemDesc;
    return {
        status: problemDescData.status,
        problemDesc: problemDescData.result
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProblemDesc: (id) => {
            dispatch(Actions.fetchProblemDesc(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProblemDesc));