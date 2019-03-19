import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';

const styles = theme => ({
  root: {
    color: theme.palette.common.white,
  },
});

const AppBar = (props) => {
  return <MuiAppBar {...props} />;
};

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);
