import React from 'react';
import clsx from 'clsx';
import {withStyles} from '@material-ui/core/styles';
import {capitalize} from '@material-ui/core/utils/helpers';

function round(value) {
  return Math.round(value * 1e4) / 1e4;
}

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit * 7,
  },
  marginBottom: {
    marginBottom: theme.spacing.unit * 12,
  },
  widthSmall: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(660 + theme.spacing.unit * 6)]: {
      width: 660,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  widthMedium: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(850 + theme.spacing.unit * 6)]: {
      width: 850,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  widthLarge: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      width: 880,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up(round(880 / 0.7777))]: {
      width: '77.7777%',
    },
    [theme.breakpoints.up(round(1400 / 0.7777))]: {
      width: 1400,
    },
  },
  widthXlarge: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    [theme.breakpoints.up(round(900 / 0.9))]: {
      width: '90%',
    },
    [theme.breakpoints.up(round(1800 / 0.9))]: {
      width: 1800,
    },
  },
  widthFull: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },
});

function LayoutBody(props) {
  const {
    children,
    classes,
    className,
    component: Component,
    fullHeight,
    fullWidth,
    margin,
    marginBottom,
    style,
    width,
    ...other
  } = props;

  return (
    <Component
      className={clsx(
        classes.root,
        {
          [classes[`width${capitalize(width)}`]]: !fullWidth,
          [classes.fullHeight]: fullHeight,
          [classes.margin]: margin,
          [classes.marginBottom]: marginBottom,
        },
        className,
      )}
      style={style}
      {...other}
    >
      {children}
    </Component>
  );
}

LayoutBody.defaultProps = {
  component: 'div',
  fullHeight: false,
  fullWidth: false,
  margin: false,
  marginBottom: false,
  width: 'medium',
};

export default withStyles(styles)(LayoutBody);
