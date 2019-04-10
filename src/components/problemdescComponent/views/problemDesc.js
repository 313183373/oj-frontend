import * as Status from "../status";
import React from "react";
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';
import {withStyles} from '@material-ui/core/styles';
import * as Actions from '../actions';
import Typography from '../../baseComponents/Typography';
import Grid from '@material-ui/core/Grid';
import MonacoEditor from '@uiw/react-monacoeditor';
import {Radio, RadioGroup} from "@material-ui/core";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';
import DialogContent from '@material-ui/core/DialogContent';
import CheckIcon from '@material-ui/icons/Check';
import ReplayIcon from '@material-ui/icons/Replay';
import classNames from 'classnames';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DescriptionPanel from "./descriptionPanel";
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import SubmitList from './submitList';
import {withRouter} from "react-router";
import {Link} from "react-router-dom";
import {WaitingIndicator} from "./waitingIndicator";
import {ResultInfo} from "./resultInfo";

const styles = theme => ({
  root: {
    flexGrow: 1,
    minWidth: 700,
    overflow: 'hidden',
    height: '100%',
  },
  tabAppBar: {
    boxShadow: 'none',
    backgroundColor: '#ffffff'
  },
  tab: {
    textTransform: 'none'
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
  gridCell: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.black,
    height: '100%',
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
  title: {
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
  },
  radioGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'no-wrap'
  },
  editor: {
    overflow: 'auto'
  },
  item: {
    height: '100%',
  },
  container: {
    height: 'calc(100% - 99px)',
  },
  tabContainer: {
    height: 'calc(100% - 48px)',
    overflow: 'auto',
    paddingBottom: theme.spacing.unit * 3,
    boxSizing: 'border-box',
    paddingTop: theme.spacing.unit * 3,
  },
});

const TabContainer = withStyles(styles)(function ({children, classes}) {
  return (
    <div className={classes.tabContainer}>
      {children}
    </div>
  );
});

class ProblemDesc extends React.Component {

  componentDidMount() {
    this.props.fetchProblemDesc(this.props.id);
    this.props.fetchAllLanguages();
    if (this.props.token) {
      this.props.fetchSubmitsByProblemId(this.props.id, this.props.token);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.token !== this.props.token && this.props.token !== '') {
      this.props.fetchSubmitsByProblemId(this.props.id, this.props.token);
    }
  }

  componentWillUnmount() {
    this.props.clearShowSubmit(this.props.showSubmit);
  }

  render() {
    const {
      classes, fetchProblemStatus, problemDesc, token, language,
      commitCodeStatus, changeLanguage, allLanguages, commitCode,
      writeCode, userWritingCode, commitCodeMessage, curTabIndex, changeTab, socket, submits, fetchSubmitsStatus, isWaitingForResult, showSubmit
    } = this.props;
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
          [classes.fab]: commitCodeStatus !== Status.SUCCESS
          && commitCodeStatus !== Status.FAILURE
        });
        const title = commitCodeStatus === Status.NOTHING ? problemDesc.title + "   " + problemDesc.origin : problemDesc.title + " " + commitCodeStatus;
        let Submissions;
        if (token !== '') {
          switch (fetchSubmitsStatus) {
            case Status.NOTHING: {
              Submissions = '';
              break;
            }

            case Status.LOADING: {
              Submissions = 'loading the submit history...';
              break;
            }

            case Status.SUCCESS: {
              Submissions = submits ? <SubmitList submits={submits}/> : '';
              break;
            }

            case Status.FAILURE: {
              Submissions = 'Error';
              break;
            }
          }
        } else {
          Submissions =
            <h1>Please <Link to={{pathname: '/sign-in', state: {from: this.props.location}}}>sign in</Link> first</h1>;
        }
        return (
          <div className={classes.root}>
            <Typography variant="h4" marked="center" align="center" component="h2"
                        className={classes.title}>
              {title}
            </Typography>
            <Grid container className={classes.container} justify="center">
              <Grid item xs={6} className={classes.item}>
                <div className={classes.gridCell}>
                  <AppBar className={classes.tabAppBar} position="static" color="default">
                    <Tabs
                      value={curTabIndex}
                      onChange={changeTab}
                      indicatorColor="primary"
                      textColor="primary"
                      variant="fullWidth"
                    >
                      <Tab className={classes.tab} label="Problem"/>
                      <Tab className={classes.tab} label="Submissions"/>
                    </Tabs>
                  </AppBar>
                  {
                    curTabIndex === 0 && (
                      <TabContainer>
                        <DescriptionPanel content={problemDesc.content} title='Description' html/>
                        {problemDesc.inputDesc &&
                        <DescriptionPanel content={problemDesc.inputDesc} title='Input Description' html/>}
                        {problemDesc.outputDesc &&
                        <DescriptionPanel content={problemDesc.outputDesc} title='Output Description'
                                          html/>}
                        <DescriptionPanel content={problemDesc.sampleInput} title='Input Example'/>
                        <DescriptionPanel content={problemDesc.sampleOutput} title='Output Example'/>
                        {problemDesc.hint &&
                        <DescriptionPanel content={problemDesc.hint} title='Hint' defaultExpanded={false} html/>}
                      </TabContainer>
                    )
                  }
                  {
                    curTabIndex === 1 &&
                    <TabContainer>
                      {showSubmit && <ResultInfo submit={showSubmit}/>}
                      {isWaitingForResult && <WaitingIndicator/>}
                      {Submissions}
                    </TabContainer>
                  }
                </div>
              </Grid>
              <Grid item xs={6} className={classes.item}>
                <div className={classes.gridCell}>
                  <RadioGroup className={classes.radioGroup} value={language}>
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
                  <MonacoEditor
                    language={language}
                    height='calc(100% - 48px)'
                    defaultValue={userWritingCode}
                    options={{
                      theme: 'vs-dark',
                    }}
                    value={userWritingCode}
                    onChange={writeCode}
                    className={classes.editor}
                  />
                  <Tooltip title="Commit" aria-label="Commit" placement="top">
                    <Fab color="secondary"
                         className={fabClassName}
                         disabled={userWritingCode === ''}
                         onClick={() => commitCode(problemDesc._id, token,
                           {
                             code: userWritingCode,
                             language: language
                           }, commitCodeStatus, socket)}>
                      {
                        commitCodeStatus === Status.FAILURE ?
                          <ReplayIcon/> : <CheckIcon/>
                      }
                    </Fab>
                  </Tooltip>
                  {commitCodeStatus === Status.LOADING &&
                  <CircularProgress size={68} className={classes.fabProgress}/>}
                  <Snackbar
                    open={commitCodeStatus === Status.FAILURE}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    autoHideDuration={2000}>
                    <SnackbarContent message={commitCodeMessage}/>
                  </Snackbar>
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

const mapStateToProps = (state, ownProps) => {
  const problemDescData = state.problemDesc;
  const submitsToThisProblem = state.submits[ownProps.id];
  return {
    fetchProblemStatus: problemDescData.loadData.status,
    problemDesc: problemDescData.loadData.problem,
    language: problemDescData.language,
    allLanguages: problemDescData.allLanguages,
    userWritingCode: problemDescData.userWritingCode,
    commitCodeStatus: problemDescData.commitCode.status,
    commitCodeMessage: problemDescData.commitCode.message,
    curTabIndex: problemDescData.curTabIndex,
    token: state.user.token,
    socket: state.socket,
    submits: submitsToThisProblem,
    fetchSubmitsStatus: problemDescData.fetchSubmitsStatus,
    isWaitingForResult: !!problemDescData.waitingForResult.includes(ownProps.id),
    showSubmit: problemDescData.showSubmit.find(submit => submit.problem === ownProps.id),
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchProblemDesc: (id) => {
      dispatch(Actions.fetchProblemDesc(id));
    },
    fetchAllLanguages: () => {
      dispatch(Actions.fetchAllLanguages());
    },
    changeLanguage: (event) => {
      dispatch(Actions.changeLanguage(event.target.value));
    },
    changeTab: (event, value) => {
      dispatch(Actions.changeTab(value));
    },
    writeCode: (newValue) => {
      dispatch(Actions.writeCode(newValue));
    },
    commitCode: (id, token, userCommit, curCommitCodeStatus, socket) => {
      if (token === '') {
        ownProps.history.push(`/sign-in`, {from: ownProps.history.location});
      } else {
        if (curCommitCodeStatus !== Status.LOADING && curCommitCodeStatus !== Status.SUCCESS) {
          dispatch(Actions.commitCode(id, token, userCommit, socket));
        }
      }
    },
    fetchSubmitsByProblemId: (problemId, token) => {
      dispatch(Actions.fetchSubmitsByProblemId(problemId, token));
    },
    clearShowSubmit: submit => {
      dispatch(Actions.clearShowSubmit(submit));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProblemDesc)));
