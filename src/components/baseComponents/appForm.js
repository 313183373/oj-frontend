import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import LayoutBody from '../signinComponent/views/layoutBody';
import Paper from '../signinComponent/views/paper';

const styles = theme => ({
  root: {
    display: 'flex',
    // backgroundImage: 'url(/static/onepirate/appCurvyLines.png)',
    // backgroundRepeat: 'no-repeat',
  },
  paper: {
    padding: `0 ${theme.spacing.unit * 10}px`,
  },
});

const AppForm = (props) => {
  const {children, classes} = props;

  return (
    <div className={classes.root}>
      <LayoutBody margin width="small">
        <Paper className={classes.paper}>{children}</Paper>
      </LayoutBody>
    </div>
  );
};

export default withStyles(styles)(AppForm);
