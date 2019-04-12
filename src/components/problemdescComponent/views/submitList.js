import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import 'moment/locale/zh-cn';
import {withRouter} from "react-router";

const styles = theme => ({
  root: {
    width: '98%',
    margin: 'auto',
    overflowX: 'auto',
  },
  table: {
    minWidth: 400,
  },
  wrong: {
    backgroundColor: 'rgba(255,0,0,0.3)',
  },
  ok: {
    backgroundColor: 'rgba(0,255,0,0.3)',
  },
  row: {
    textAlign: 'right',
  }
});

function SubmitList(props) {
  const {classes, history} = props;
  const submits = props.submits.map(submit => {
    const created = moment(submit.created).locale('zh-cn').fromNow();
    return {...submit, created}
  });

  const handleClickSubmit = submitId => {
    history.push({pathname: `/submits/${submitId}`});
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>提交时间</TableCell>
            <TableCell className={classes.row}>状态</TableCell>
            <TableCell className={classes.row}>执行用时(MS)</TableCell>
            <TableCell className={classes.row}>内存消耗(KB)</TableCell>
            <TableCell className={classes.row}>语言</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submits.map(submit => (
            <TableRow key={submit._id} className={submit.status === 'AC' ? classes.ok : classes.wrong} hover
                      onClick={() => {
                        handleClickSubmit(submit._id)
                      }}>
              <TableCell component="th" scope="row">
                {submit.created}
              </TableCell>
              <TableCell className={classes.row}>{submit.status}</TableCell>
              <TableCell className={classes.row}>{submit.time}</TableCell>
              <TableCell className={classes.row}>{submit.memory}</TableCell>
              <TableCell className={classes.row}>{submit.language}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withRouter(withStyles(styles)(SubmitList));