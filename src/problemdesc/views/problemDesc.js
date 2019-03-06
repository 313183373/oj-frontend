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
import { Radio, RadioGroup } from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
        maxHeight: 550, 
        overflow: 'auto',
    }
});

class ProblemDesc extends React.Component {
    
    componentDidMount() {
        this.props.fetchProblemDesc(this.props.id);
    }

    render() {
        const {classes, status, problemDesc, language, changeLanguage} = this.props;
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
                                        <div>
                                            <RadioGroup style={{height: 40, align: 'left'}} value={language}>
                                                <FormControlLabel
                                                    value="c++"
                                                    control={<Radio color="secondary" />}
                                                    label="C++"
                                                    labelPlacement="end"
                                                    onChange={changeLanguage}
                                                    />
                                                <FormControlLabel
                                                    value="java"
                                                    disabled
                                                    control={<Radio color="secondary" />}
                                                    label="Java"
                                                    labelPlacement="end"
                                                    onChange={changeLanguage}
                                                    />
                                                <FormControlLabel
                                                    value="javascript"
                                                    disabled
                                                    control={<Radio color="secondary" />}
                                                    label="Javascript"
                                                    labelPlacement="end"
                                                    />
                                                <FormControlLabel
                                                    value="python"
                                                    disabled
                                                    control={<Radio color="secondary" />}
                                                    label="Python"
                                                    labelPlacement="end"
                                                    />
                                            </RadioGroup>
                                        </div>
                                        <MonacoEditor
                                            language="html"
                                            height={540}
                                            value="<h1>I ♥ react-monacoeditor</h1>"
                                            options={{
                                                theme: 'vs-dark',
                                            }}/>
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
    const problemDescData = state.problemDesc.loadData;
    const language = state.problemDesc.language;
    console.log(problemDescData);
    return {
        status: problemDescData.status,
        problemDesc: problemDescData.result,
        language: language
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchProblemDesc: (id) => {
            dispatch(Actions.fetchProblemDesc(id));
        },
        changeLanguage: (event) => {
            dispatch(Actions.changeLanguage(event.target.value));
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