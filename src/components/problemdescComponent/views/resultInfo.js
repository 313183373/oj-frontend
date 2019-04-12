import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "../../baseComponents/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import * as util from 'util';
import withStyles from "@material-ui/core/es/styles/withStyles";
import ReactDiffViewer from 'react-diff-viewer';

const styles = theme => ({
  card: {
    width: '98%',
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2,
  }
});

// function isErrorStatus(status) {
//   return status === 'CE' || status === "WA" || status === 'TLE' || status === 'MLE' || status === "RE" || status === "OLE";
// }

export const ResultInfo = withStyles(styles)(({submit, classes}) => {
  if (submit.status === 'AC') {
    return <AcceptInfo submit={submit} classes={classes}/>;
  }
  if (submit.status === 'WA') {
    return <WrongAnswerInfo submit={submit} classes={classes}/>;
  }
  if (submit.status === 'RE' || submit.status === 'CE') {
    return <RuntimeErrorInfo submit={submit} classes={classes}/>;
  }
  if (submit.status === 'TLE' || submit.status === 'MLE' || submit.status === 'OLE') {
    return <TimeLimitExceededInfo submit={submit} classes={classes}/>
  }
  return <pre>{util.inspect(submit, false, null)}</pre>;
});

function AcceptInfo({submit, classes}) {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h3' color='textPrimary' gutterBottom>
          {submit.status}
        </Typography>
        <Typography variant="h5" component="h2" color="textSecondary">
          执行用时：{submit.time} ms
        </Typography>
        <Typography variant='h5' color="textSecondary">
          内存消耗：{submit.memory} kb
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Detail</Button>
      </CardActions>
    </Card>
  );
}

function WrongAnswerInfo({submit, classes}) {
  const reg = /^input: (.+)expected: (.+)real: (.*)$/s; // the s flag means allow dot(.) to match newlines
  const result = reg.exec(submit.message);
  if (!result || result.length < 4) {
    return <p>parse wrong answer information failed</p>;
  }
  const [message, input, expected, real] = reg.exec(submit.message);
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h3' color='error' gutterBottom>
          {submit.status}
        </Typography>
        <Typography variant="h5" component="h2" color="textSecondary">
          输入：
          <pre>{input}</pre>
        </Typography>
        <Typography variant='h5' color='textSecondary'>
          输出对比：(左侧是期待输出，右侧是实际输出)
        </Typography>
        <ReactDiffViewer oldValue={expected} newValue={real} splitView={true}/>
      </CardContent>
      <CardActions>
        <Button size="small">Detail</Button>
      </CardActions>
    </Card>
  )
}

function RuntimeErrorInfo({submit, classes}) {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h3' color='error' gutterBottom>
          {submit.status}
        </Typography>
        <Typography variant="h5" component="h2" color="textSecondary">
          错误信息：{submit.message}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Detail</Button>
      </CardActions>
    </Card>
  );
}

function TimeLimitExceededInfo({submit, classes}) {
  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography variant='h3' color='error' gutterBottom>
          {submit.status}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Detail</Button>
      </CardActions>
    </Card>
  );
}
