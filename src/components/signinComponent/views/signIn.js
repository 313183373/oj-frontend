import React from "react";
import AppForm from './appForm';
import * as Status from '../status';
import {Typography} from '../../problemdescComponent/';
import {email, required} from './validation';
import {Link} from 'react-router-dom';
import {Field, Form, FormSpy} from 'react-final-form';
import RFTextField from './rfTextField';
import FormFeedback from './formFeedback';
import FormButton from './formButton';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {withRouter} from "react-router";
import * as Actions from "../actions";

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
  const {classes, status, submitSignIn, validate, handleSignInSuccess, result} = props;
  if (status === Status.SUCCESS) {
    handleSignInSuccess(result);
  } else {
    let sent = status === Status.LOADING;
    let submitBtnText;
    if (status === Status.LOADING) {
      submitBtnText = 'In progress…';
    } else if (status === Status.FAILURE) {
      submitBtnText = 'Try Again';
    } else {
      submitBtnText = 'Sign In';
    }
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
          onSubmit={submitSignIn}
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

                {submitBtnText}
              </FormButton>
            </form>

          )}
        </Form>
        {/*<Typography align="center">*/}
          {/*<Link to="/forgot-password">*/}
            {/*Forgot password?*/}
          {/*</Link>*/}
        {/*</Typography>*/}
      </AppForm>
    );
  }
};

const mapStateToProps = (state) => {
  const signInState = state.signIn;
  return {
    status: signInState.status,
    result: signInState.result
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitSignIn: (values) => {
      dispatch(Actions.submitSignIn(values.email, values.password));
    },
    handleSignInSuccess: (result) => {
      // todo: save result to localstorage
      ownProps.history.goBack();
    },
    validate: (values) => {
      const errors = required(['email', 'password'], values);

      if (!errors.email) {
        const emailError = email(values.email, values);
        if (emailError) {
          errors.email = email(values.email, values);
        }
      }
      return errors;
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn)));