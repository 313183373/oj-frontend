import * as Status from "../status";
import React from "react";
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';
import * as Actions from '../actions';
import Typography from '../../baseComponents/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MonacoEditor from '@uiw/react-monacoeditor';
import {Radio, RadioGroup} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import DialogContent from '@material-ui/core/DialogContent';
import CheckIcon from '@material-ui/icons/Check';
import ReplayIcon from '@material-ui/icons/Replay';
import classNames from 'classnames';

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
    maxHeight: 600,
    overflow: 'auto',
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 5,
    zIndex: 1,
    '&:focus': {
      color: '#bab6b6',
      backgroundColor: '#ededed',
      cursor: 'not-allowed',
    }
  },
  fabProgress: {
    color: '#FF5252',
    position: 'absolute',
    bottom: theme.spacing.unit * 1.25,
    right: theme.spacing.unit * 4.25,
  },
  fabSuccess: {
    backgroundColor: '#84d68a',
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 5,
    zIndex: 1,
    '&:hover': {
      cursor: 'not-allowed',
    }
  },
  fabFailure: {
    backgroundColor: '#FF5252',
    color: theme.palette.white,
    position: 'absolute',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 5,
    zIndex: 1
  },
});

class ProblemDesc extends React.Component {

  componentDidMount() {
    this.props.fetchProblemDesc(this.props.id);
    this.props.fetchAllLangages();
  }

  render() {
    const {classes, fetchProblemStatus, problemDesc, defaultLanguage, commitCodeStatus, changeLanguage, allLanguages, commitCode, writeCode, userWritingCode} = this.props;
    switch (fetchProblemStatus) {
      case Status.LOADING: {
        return (
          <div>
            <DialogContent>
              <CircularProgress className={classes.progress}/>
            </DialogContent>
          </div>
        );
      }
      case Status.SUCCESS: {
        const fabClassName = classNames({
          [classes.fabSuccess]: commitCodeStatus === Status.SUCCESS,
          [classes.fabFailure]: commitCodeStatus === Status.FAILURE,
          [classes.fab]: commitCodeStatus !== Status.SUCCESS && commitCodeStatus !== Status.FAILURE
        });
        return (
          <div className={classes.root}>
            <Typography variant="h4" marked="center" align="center" component="h2">
              {problemDesc.id}-{problemDesc.title}
            </Typography>
            <Grid container className={classes.root} spacing={24} justify="center">
              <Grid key={0} item xs={6}>
                <div className={classes.gridcell}>
                  <ExpansionPanel expanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                      <Typography className={classes.heading}>Time Limit: {problemDesc.timeLimit}, Memory
                        Limit: {problemDesc.memLimit}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      {problemDesc.content}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel expanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                      <Typography className={classes.heading}>Input & Output</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      {problemDesc.inputDesc}
                      {problemDesc.outputDesc}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel expanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                      <Typography className={classes.heading}>Samples</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div>{problemDesc.sampleInput}</div>
                      <div>{problemDesc.sampleOutput}</div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel expanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                      <Typography className={classes.heading}>Hint</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      {problemDesc.hint}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                  <ExpansionPanel expanded={true}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                      <Typography className={classes.heading}>Hint</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      {problemDesc.hint}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              </Grid>
              <Grid key={1} item xs={6}>
                <div style={{paddingRight: 15}}>
                  <div>
                    <RadioGroup style={{height: 40, align: 'left'}} value={defaultLanguage}>
                      {
                        allLanguages.map((each) => {
                          return (
                            <FormControlLabel
                              key={each.value}
                              value={each.value}
                              control={<Radio color="secondary"/>}
                              label={each.label}
                              disabled={each.disabled}
                              labelPlacement="end"
                              onChange={changeLanguage}
                            />
                          );
                        })
                      }
                    </RadioGroup>
                  </div>
                  <MonacoEditor
                    language={defaultLanguage}
                    height={600}
                    defaultValue=""
                    options={{
                      theme: 'vs-dark',
                    }}
                    onChange={writeCode}
                  />
                  <Tooltip title="Commit" aria-label="Commit" placement="top">
                    <Fab color="secondary" className={fabClassName}
                         onClick={() => commitCode(userWritingCode, commitCodeStatus)}>
                      {
                        commitCodeStatus === Status.SUCCESS || commitCodeStatus === Status.LOADING ? <CheckIcon/> :
                          <ReplayIcon/>
                      }
                    </Fab>
                  </Tooltip>
                  {commitCodeStatus === Status.LOADING && <CircularProgress size={68} className={classes.fabProgress}/>}
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
        throw new Error(`unexpected status ${fetchProblemStatus}`);
      }
    }
  }
}

const mapStateToProps = (state) => {
  const problemDescData = state.problemDesc;
  const language = state.problemDesc.language;
  const allLanguages = state.problemDesc.allLanguages;
  const userWritingCode = state.problemDesc.userWritingCode;
  const commitCodeStatus = state.problemDesc.commitCode.status;

  return {
    fetchProblemStatus: problemDescData.loadData.status,
    problemDesc: problemDescData.loadData.result,
    defaultLanguage: language,
    allLanguages: allLanguages,
    userWritingCode: userWritingCode,
    commitCodeStatus: commitCodeStatus
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchProblemDesc: (id) => {
      dispatch(Actions.fetchProblemDesc(id));
    },
    fetchAllLangages: () => {
      dispatch(Actions.fetchAllLanguages());
    },
    changeLanguage: (event) => {
      dispatch(Actions.changeLanguage(event.target.value));
    },
    writeCode: (newValue) => {
      console.log('write code:', newValue);
      dispatch(Actions.writeCode(newValue));
    },
    commitCode: (userWritingCode, curCommitCodeStatus) => {
      console.log('commit code');
      if (curCommitCodeStatus !== Status.LOADING && curCommitCodeStatus !== Status.SUCCESS) {
        dispatch(Actions.commitCode(userWritingCode));
      }
    },
  }
}

// $$T^{\mu\nu}=\begin{pmatrix}
// \varepsilon&0&0&0\\
// 0&\varepsilon/3&0&0\\
// 0&0&\varepsilon/3&0\\
// 0&0&0&\varepsilon/3
// \end{pmatrix},$$

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProblemDesc));