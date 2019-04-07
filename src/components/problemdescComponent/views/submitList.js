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

const styles = theme => ({
  root: {
    width: '98%',
    margin: 'auto',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 400,
  },
});

function SubmitList(props) {
  const {classes} = props;
  const submits = props.submits.map(submit => {
    const created = moment(submit.created).locale('zh-cn').fromNow();
    return {...submit, created}
  });

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>提交时间</TableCell>
            <TableCell align="right">状态</TableCell>
            <TableCell align="right">执行用时</TableCell>
            <TableCell align="right">内存消耗</TableCell>
            <TableCell align="right">语言</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {submits.map(submit => (
            <TableRow key={submit._id}>
              <TableCell component="th" scope="row">
                {submit.created}
              </TableCell>
              <TableCell align="right">{submit.status}</TableCell>
              <TableCell align="right">{submit.time}</TableCell>
              <TableCell align="right">{submit.memory}</TableCell>
              <TableCell align="right">{submit.language}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(SubmitList);