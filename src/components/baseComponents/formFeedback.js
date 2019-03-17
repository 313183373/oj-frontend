import React from 'react';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';
import Typography from './Typography';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
  },
  error: {
    backgroundColor: theme.palette.error.xLight,
    color: theme.palette.error.dark,
  },
  success: {
    backgroundColor: theme.palette.success.xLight,
    color: theme.palette.success.dark,
  },
});

const FormFeedback = (props) => {
  return (
    <div
      className={clsx(
        props.classes.root,
        {[props.classes.error]: props.error, [props.classes.success]: props.success},
        props.className,
      )}
    >
      <Typography color="inherit">{props.children}</Typography>
    </div>
  );
};

export default withStyles(styles)(FormFeedback);
