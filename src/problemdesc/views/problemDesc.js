import * as Status from "../status";
import React from "react";
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import * as Actions from '../actions';
import Typography from './Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import ReactMarkdown from 'react-markdown';
import MonacoEditor from '@uiw/react-monacoeditor';

const ExpansionPanel = withStyles({
    root: {
      border: '1px solid rgba(0,0,0,.125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
    },
    expanded: {
      margin: 'auto',
    },
  })(MuiExpansionPanel);

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
    gridcell: {
        padding: theme.spacing.unit * 2,
        color: theme.palette.text.black,
        height: 700,
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
                        <Grid container className={classes.root} spacing={24} justify="center">
                            <Grid key={0} item xs={6}>
                                <div className={classes.gridcell}>
                                    <ExpansionPanel expanded={true}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className={classes.heading}>Time Limit: {problemDesc.timeLimit},  Memory Limit: {problemDesc.memLimit}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <ReactMarkdown source={problemDesc.content}/>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                    <ExpansionPanel expanded={true}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className={classes.heading}>Input & Output</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            {problemDesc.inputDesc}
                                            {problemDesc.outputDesc}
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                    <ExpansionPanel expanded={true}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className={classes.heading}>Samples</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <div>{problemDesc.sampleInput}</div>
                                            <div>{problemDesc.sampleOutput}</div>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                    <ExpansionPanel expanded={true}>
                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography className={classes.heading}>Hint</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            {problemDesc.hint}
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </div>
                            </Grid>
                            <Grid key={1} item xs={6}>
                                <div className={classes.gridcell}>
                                <MonacoEditor
                                    language="html"
                                    value="<h1>I ♥ react-monacoeditor</h1>"
                                    options={{
                                        theme: 'vs-dark',
                                    }}
                                />
                                </div>
                            </Grid>
                        </Grid>
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

// $$T^{\mu\nu}=\begin{pmatrix}
// \varepsilon&0&0&0\\
// 0&\varepsilon/3&0&0\\
// 0&0&\varepsilon/3&0\\
// 0&0&0&\varepsilon/3
// \end{pmatrix},$$

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProblemDesc));