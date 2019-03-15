import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import LayoutBody from './layoutBody';
import Paper from './paper';

const styles = theme => ({
  root: {
    display: 'flex',
    backgroundImage: 'url(/static/onepirate/appCurvyLines.png)',
    backgroundRepeat: 'no-repeat',
  },
  paper: {
    padding: theme.spacing.unit * 4,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 10,
    },
  },
});

const AppForm = (props) => {
  const {children, classes} = props;

  return (
    <div className={classes.root}>
      <LayoutBody margin marginBottom width="small">
        <Paper className={classes.paper}>{children}</Paper>
      </LayoutBody>
    </div>
  );
};

export default withStyles(styles)(AppForm);
