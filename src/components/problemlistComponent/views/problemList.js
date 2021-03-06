import React from 'react';
import {connect} from 'react-redux';
import * as Status from '../status';
import {withStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import * as Actions from '../actions';
import {withRouter} from "react-router";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActionsWrapped from './tablePaginationActionsWrapped'
import classnames from 'classnames';

const CustomTableCell = withStyles(() => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    height: '100%',
    minWidth: 700,
    tableLayout: 'fixed',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  progress: {
    margin: theme.spacing.unit * 2,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  accepted: {
    backgroundColor: 'rgba(0,255,0,0.3)'
  },
  submitted: {
    backgroundColor: 'rgba(255, 255, 0, 0.3)'
  }
});

class ProblemList extends React.Component {

  componentDidMount() {
    this.props.fetchProblemList(this.props.page, this.props.user);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.page !== this.props.page || prevProps.user.token !== this.props.user.token) {
      this.props.fetchProblemList(this.props.page, this.props.user);
    }
  }

  render() {
    const {classes, status, problems, handleClickRow, page, changePageTo, totalProblemNumber} = this.props;
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
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>#</CustomTableCell>
                <CustomTableCell>Title</CustomTableCell>
                <CustomTableCell>Ratio(AC/ALL)</CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {problems.map((problem, index) => {
                const ratio = problem.submitCount === 0 ? `(${problem.acceptCount}/${problem.submitCount})` : `${(problem.acceptCount * 100.0 / problem.submitCount).toFixed(2)}%(${problem.acceptCount}/${problem.submitCount})`;
                const number = index + (page * 10) + 1;
                return (
                  <TableRow className={classnames({
                    [classes.accepted]: problem.status === 'accepted',
                    [classes.submitted]: problem.status === 'submitted',
                    [classes.row]: problem.status === 'none',
                  })} key={problem._id} hover={true}
                            onClick={() => handleClickRow(problem._id)}>
                    <CustomTableCell component="th" scope="row">
                      {number}
                    </CustomTableCell>
                    <CustomTableCell>
                      {problem.title}
                    </CustomTableCell>
                    <CustomTableCell>
                      {ratio}
                    </CustomTableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={3}
                  page={page}
                  onChangePage={changePageTo}
                  ActionsComponent={TablePaginationActionsWrapped}
                  count={totalProblemNumber}
                  rowsPerPage={10}
                  rowsPerPageOptions={[10]}/>
              </TableRow>
            </TableFooter>
          </Table>
        );
      }
      case Status.FAILURE: {
        return <div>题目列表获取失败，请刷新重试</div>
      }
      default: {
        throw new Error(`unexpected status ${status}`);
      }
    }
  }
}

const mapStateToProps = (state) => {
  const problemsData = state.problems;
  return {
    status: problemsData.status,
    // NOTE: page starts from 0 but +1 when sent to server.
    page: problemsData.page,
    problems: problemsData.problems,
    totalProblemNumber: problemsData.totalProblemNumber,
    user: state.user,
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    fetchProblemList: (page, user) => {
      dispatch(Actions.fetchProblemList(page, user));
    },
    handleClickRow: (id) => {
      ownProps.history.push(`/problem/${id}`);
    },
    changePageTo: (page) => {
      dispatch(Actions.changePageTo(page));
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProblemList)));
