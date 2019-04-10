import React from 'react';
import {LinearProgress, withStyles} from "@material-ui/core";

const style = theme => ({
  linearProgress: {
    width: '98%',
    margin: 'auto',
    marginBottom: theme.spacing.unit,
  }
});

export const WaitingIndicator = withStyles(style)(({classes}) => {
  return (
    <LinearProgress className={classes.linearProgress}/>
  )
});