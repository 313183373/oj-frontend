import React from "react";
import AppForm from '../../baseComponents/appForm';
import * as Status from '../status';
import {Typography} from '../../problemdescComponent/';
import {emailValidator, required} from '../../../utils/validation';
import {Link} from 'react-router-dom';
import {Field, Form, FormSpy} from 'react-final-form';
import RFTextField from '../../baseComponents/rfTextField';
import FormFeedback from '../../baseComponents/formFeedback';
import FormButton from '../../baseComponents/formButton';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import {Redirect, withRouter} from "react-router";
import * as Actions from "../actions";
import PasswordValidator from "password-validator";
import {signInStarted, signInSuccess, signInFailure} from "../actions";


const passwordSchema = new PasswordValidator();

passwordSchema.is().min(6).is().max(36).has().digits().has().letters().has().not().spaces();

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
  const {classes, status, submitSignIn, validate} = props;
  if (status === Status.SUCCESS) {
    return <Redirect to='/'/>
    // handleSignInSuccess(user);
  } else {
    const isLoading = status === Status.LOADING;
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
          validate={validate}>
          {({handleSubmit, submitting, form}) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                showErrorWhen={meta => meta.touched && !meta.submitting && (!meta.dirtySinceLastSubmit || meta.error)}
                disabled={submitting || isLoading}
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
                showErrorWhen={meta => (meta.touched || meta.modified) && !meta.submitting && (!meta.dirtySinceLastSubmit || meta.error)}
                disabled={submitting || isLoading}
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
                disabled={submitting || isLoading || form.getState().hasValidationErrors || (form.getState().hasSubmitErrors && !form.getState().dirtySinceLastSubmit)}
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
    user: signInState.user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    submitSignIn: async (values) => {
      dispatch(signInStarted());
      const {email, password} = values;
      const response = await fetch('/user/login', {
        method: 'POST',
        headers: {
          'content-type': "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        const user = await response.json();
        localStorage.token = user.token;
        dispatch(signInSuccess(user));
      } else {
        switch (response.status) {
          case 400: {
            dispatch(signInFailure(await response.text()));
            return {email: "Invalid email", password: "Invalid password"};
          }
          case 401: {
            const error = await response.text();
            dispatch(signInFailure(error));
            return {password: error}
          }
          case 404: {
            const error = await response.text();
            dispatch(signInFailure(error));
            return {email: error}
          }
        }
      }
    },
    validate: values => {
      const errors = required(['email', 'password'], values);
      if (!errors.email) {
        const emailError = emailValidator(values.email, values);
        if (emailError) {
          errors.email = emailError;
        }
      }
      if (!errors.password) {
        if (!passwordSchema.validate(values.password)) {
          errors.password = "Invalid password";
        }
      }
      return errors;
    },
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignIn)));