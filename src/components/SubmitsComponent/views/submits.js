import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress";
import Link from "react-router-dom/es/Link";
import Typography from "../../baseComponents/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import moment from "moment";
import 'moment/locale/zh-cn';
import classnames from "classnames";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {xonokai} from 'react-syntax-highlighter/dist/esm/styles/prism';
import {urlCreator} from "../../../urls/urlCreator";
import {GET_SUBMIT_BY_ID} from "../../../urls/urls";
import {diffAsText, diffLines} from 'unidiff';
import {DiffView} from "./DiffView";

const styles = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 3,
    width: '80%',
    margin: 'auto',
    height: '100%',
  },
  error: {
    borderRadius: '4px',
    boxShadow: '0 0 4px red',
    backgroundColor: 'rgba(255,0,0,0.3)',
  },
  accept: {
    borderRadius: '4px',
    boxShadow: '0 0 4px green',
    backgroundColor: 'rgba(0,255,0,0.3)',
  },
  basicInfo: {
    marginTop: theme.spacing.unit * 3,
  },
  green: {
    color: 'rgb(0,255,0)',
  },
  red: {
    color: '#f44336',
  },
  input: {
    margin: 0,
    maxHeight: '400px',
    overflow: 'auto',
  },
  highLight: {
    background: '#fdb8c0',
  },
  diffView: {
    maxHeight: '400px',
    overflow: 'auto',
  },
  messageBox: {
    backgroundColor: 'yellow',
    borderRadius: '4px',
    marginTop: '14px',
  }
});

const getSubmitById = async (submitId, token, setSubmit, setState) => {
  const res = await fetch(urlCreator({type: GET_SUBMIT_BY_ID, submitId}), {headers: {'x-access-token': token}});
  if (res.ok) {
    const submit = await res.json();
    setSubmit(submit);
    setState('ok');
  } else {
    setState('error');
  }
};

function submits({submitId, token, classes}) {
  if (!token) {
    return 'you are not allowed to see this page';
  }
  const [state, setState] = useState('loading');
  const [submit, setSubmit] = useState(null);

  useEffect(() => {
    getSubmitById(submitId, token, setSubmit, setState);
  }, [submitId]);

  if (state === 'loading' || !submit) {
    return <LinearProgress/>;
  }

  if (state === 'error') {
    return "Fetch Data Error";
  }

  const problem = submit.problem;
  const isError = submit.status !== 'AC';
  const isShowDiff = submit.status === 'WA';
  const isShowMessage = (submit.status === 'RE' || submit.status === 'CE') && submit.message;
  let ShowDiff = null, showMessage = null;
  if (isShowDiff) {
    const reg = /^input: (.+)expected: (.+)real: (.*)$/s; // the s flag means allow dot(.) to match newlines
    const result = reg.exec(submit.message);
    if (!result || result.length < 4) {
      return <p>parse wrong answer information failed</p>;
    }
    const [message, input, expected, real] = reg.exec(submit.message);
    const diffText = diffAsText(expected, real, {context: 2});
    ShowDiff = (
      <div>
        <Typography variant='h6'>输入：
          <pre className={classes.input}><span className={classes.highLight}>{input}</span></pre>
        </Typography>
        <Typography variant='h6'>输出对比：(左侧是期待输出，右侧是实际输出)</Typography>
        <div className={classes.diffView}>
          <DiffView diffText={diffText}/>
        </div>
      </div>
    )
  }
  if (isShowMessage) {
    showMessage = (
      <div className={classes.messageBox}>
        <Typography variant='h6'>错误信息：
          <span className={classes.red}>{submit.message}</span>
        </Typography>
      </div>
    )
  }


  return (
    <div className={classes.container}>
      <Typography variant='h5' align='center'><Link to={`/problem/${problem._id}`}>{problem.title}</Link></Typography>
      <div className={classnames(classes.basicInfo, {[classes.error]: isError}, {[classes.accept]: !isError})}>
        <Typography variant='h6' inline>提交结果：<Typography variant='h5' inline
                                                         className={classnames({[classes.green]: !isError}, {[classes.red]: isError})}>{submit.status}</Typography></Typography>
        <Typography variant='h6'>提交时间：{moment(submit.created).locale('zh-cn').format('LLL')}</Typography>
        <Typography variant='h6'>执行用时：{submit.time} ms</Typography>
        <Typography variant='h6'>内存消耗：{submit.memory} kb</Typography>
        <Typography variant='h6'>题目来源：{problem.origin}</Typography>
        <Typography variant='h6'>时间限制：{problem.timeLimit} ms</Typography>
        <Typography variant='h6'>内存限制：{problem.memLimit} kb</Typography>
      </div>
      {isShowDiff && ShowDiff}
      {isShowMessage && showMessage}
      <SyntaxHighlighter language={submit.language} style={xonokai} showLineNumbers>
        {submit.code}
      </SyntaxHighlighter>
    </div>
  );
}


const mapStateToProps = (state) => ({
  token: state.user.token,
});

export default connect(mapStateToProps)(withStyles(styles)(submits));