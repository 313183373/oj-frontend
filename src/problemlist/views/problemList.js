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
import {Link} from 'react-router-dom';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
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
        minWidth: 700,
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
});

class ProblemList extends React.Component {

    componentDidMount() {
        console.log('did mount');
        this.props.fetchProblemList(this.props.page);
    }

    render() {
        console.log('render');
        const {classes, status, problems} = this.props;
        switch (status) {
            case Status.LOADING: {
                console.log('render loading');
                return (
                    <div>
                        <CircularProgress className={classes.progress}/>
                    </div>
                );
            }
            case Status.SUCCESS: {
                console.log('render success');
                console.log(problems);
                return (
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <CustomTableCell>ID</CustomTableCell>
                                <CustomTableCell>Title</CustomTableCell>
                                <CustomTableCell>Ratio(AC/ALL)</CustomTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {problems.map(row => {
                                let ratio = `${(row.ac * 100.0 / row.all).toFixed(2)}%(${row.ac}/${row.all})`;
                                return (
                                    <TableRow className={classes.row} key={row.id} hover={true}>
                                        <CustomTableCell component="th" scope="row">
                                            <Link to={`/problem/${row.id}`} className={classes.row} key={row.id}
                                                  style={{textDecoration: 'none'}}>
                                                <div className={classes.row_div}>{row.id}</div>
                                            </Link>
                                        </CustomTableCell>
                                        <CustomTableCell>
                                            <Link to={`/problem/${row.id}`} className={classes.row} key={row.id}
                                                  style={{textDecoration: 'none'}}>
                                                <div className={classes.row_div}>{row.title}</div>
                                            </Link>
                                        </CustomTableCell>

                                        <CustomTableCell>
                                            <Link to={`/problem/${row.id}`} className={classes.row} key={row.id}
                                                  style={{textDecoration: 'none'}}>
                                                <div className={classes.row_div}>{ratio}</div>
                                            </Link>
                                        </CustomTableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                );
            }
            case Status.FAILURE: {
                console.log('render failure');
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
    console.log('mapStateToProps ');
    console.log(state);
    return {
        status: problemsData.status,
        page: problemsData.page,
        problems: problemsData.result
    }
};

const mapDispatchToProps = (dispatch) => {
    console.log('mapDispatchToProps');
    return {
        fetchProblemList: (page) => {
            dispatch(Actions.fetchProblemList(page));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(ProblemList));