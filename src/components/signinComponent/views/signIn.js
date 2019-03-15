import React from "react";
import AppForm from './appForm';
import {Typography} from '../../problemdescComponent/';
import {Link} from 'react-router-dom';
import {Field, Form, FormSpy} from 'react-final-form';
import RFTextField from './rfTextField';
import FormFeedback from './formFeedback';
import FormButton from './formButton';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router";

const styles = theme => ({
  form: {
    marginTop: theme.spacing.unit * 6,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
  },
  feedback: {
    marginTop: theme.spacing.unit * 2,
  },
});

const SignIn = (props) => {
  const {classes, sent, handleSubmit, submitting, validate} = props;
  return (
    <AppForm>
      <React.Fragment>
        <Typography variant="h3" gutterBottom marked="center" align="center">
          Sign In
        </Typography>
        <Typography variant="body2" align="center">
          {'Not a member yet? '}
          <Link to="/sign-up">
            Sign Up here
          </Link>
        </Typography>
      </React.Fragment>
      <Form
        onSubmit={handleSubmit}
        subscription={{submitting: true}}
        validate={validate}>
        {({handleSubmit, submitting}) => (
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            <Field
              autoComplete="email"
              autoFocus
              component={RFTextField}
              disabled={submitting || sent}
              fullWidth
              label="Email"
              margin="normal"
              name="email"
              required
              size="large"
            />
            <Field
              fullWidth
              size="large"
              component={RFTextField}
              disabled={submitting || sent}
              required
              name="password"
              autoComplete="current-password"
              label="Password"
              type="password"
              margin="normal"
            />
            <FormSpy subscription={{submitError: true}}>
              {({submitError}) =>
                submitError ? (
                  <FormFeedback className={classes.feedback} error>
                    {submitError}
                  </FormFeedback>
                ) : null
              }
            </FormSpy>
            <FormButton
              className={classes.button}
              disabled={submitting || sent}
              size="large"
              color="secondary"
              fullWidth
            >
              {submitting || sent ? 'In progress…' : 'Sign In'}
            </FormButton>
          </form>
        )}
      </Form>
      <Typography align="center">
        <Link to="/forgot-password">
          Forgot password?
        </Link>
      </Typography>
    </AppForm>
  );
};

export default withRouter(connect(null, null)(withStyles(styles)(SignIn)));