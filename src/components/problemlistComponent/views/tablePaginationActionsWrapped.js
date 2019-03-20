import React from "react";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import {withStyles} from '@material-ui/core/styles';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

const TablePaginationActions = (props) => {
  const {classes, page, count, rowsPerPage, theme, onChangePage} = props;

  return (
    <div className={classes.root}>
      <IconButton
        onClick={() => onChangePage(page - 1)}
        disabled={page === 0}
        aria-label="Previous Page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
      </IconButton>
      <IconButton
        onClick={() => onChangePage(page + 1)}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
      </IconButton>
    </div>
  );
};

export default withStyles(actionsStyles, {withTheme: true})(TablePaginationActions,);
