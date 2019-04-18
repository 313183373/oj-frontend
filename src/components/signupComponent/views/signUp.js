import React from "react";
import AppForm from '../../baseComponents/appForm';
import Typography from "../../baseComponents/Typography";
import {Link} from 'react-router-dom';
import {Field, Form, FormSpy} from 'react-final-form';
import RFTextField from "../../baseComponents/rfTextField";
import * as Status from "../status";
import FormFeedback from "../../baseComponents/formFeedback";
import FormButton from "../../baseComponents/formButton";
import {Redirect, withRouter} from "react-router";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import * as Actions from "../actions";
import {emailValidator, required, passwordValidator, usernameValidator} from "../../../utils/validation";
import {FORM_ERROR} from "final-form";
import createDecorator from 'final-form-focus';
import {setUser} from "../../../commonState/user/actions";
import {urlCreator} from "../../../urls/urlCreator";
import {SIGN_UP} from "../../../urls/urls";

const focusOnErrors = createDecorator();

const styles = theme => ({
  form: {
    marginTop: theme.spacing.unit * 6,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    height: 60,
  },
  feedback: {
    marginTop: theme.spacing.unit * 2,
  },
});


const SignUp = (props) => {
  const {classes, status, submitSignUp, validate, isSignIn, history} = props;
  if (isSignIn) {
    const to = history.location.state ? history.location.state.from.pathname : '/';
    return (
      <Redirect to={to}/>
    )
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
      <React.Fragment>
        <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              Sign Up
            </Typography>
            <Typography variant="body2" align="center">
              <Link to="/sign-in">
                Already have an account?
              </Link>
            </Typography>
          </React.Fragment>
          <Form
            onSubmit={submitSignUp}
            validate={validate}
            subscription={{submitting: true}}
            decorators={[focusOnErrors]}
          >
            {({handleSubmit, submitting}) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Field
                  autoFocus
                  autoComplete="email"
                  component={RFTextField}
                  showErrorWhen={meta => meta.touched && !meta.submitting && (!meta.dirtySinceLastSubmit || meta.error)}
                  disabled={submitting || sent}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  required
                />
                <Field
                  component={RFTextField}
                  showErrorWhen={meta => meta.touched && !meta.submitting && (!meta.dirtySinceLastSubmit || meta.error)}
                  autoComplete="username"
                  fullWidth
                  label="Username"
                  name="username"
                  required
                />
                <Field
                  fullWidth
                  component={RFTextField}
                  showErrorWhen={meta => (meta.touched || meta.modified) && !meta.submitting && (!meta.dirtySinceLastSubmit || meta.error)}
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Password"
                  type="password"
                  margin="normal"
                />
                <FormSpy subscription={{submitError: true}}>
                  {({submitError}) => {
                    return submitError ? (
                      <FormFeedback className={classes.feedback} error>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                  }
                </FormSpy>
                <FormSpy subscription={{hasValidationErrors: true, hasSubmitErrors: true, dirtySinceLastSubmit: true}}>
                  {({hasValidationErrors, hasSubmitErrors, dirtySinceLastSubmit}) => {
                    return (
                      <FormButton
                        className={classes.button}
                        disabled={submitting || sent || hasValidationErrors || (hasSubmitErrors && !dirtySinceLastSubmit)}
                        color="secondary"
                        fullWidth
                      >
                        {submitBtnText}
                      </FormButton>
                    )
                  }}
                </FormSpy>
              </form>
            )}
          </Form>
        </AppForm>
      </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => {
  const signUpState = state.signUp;
  return {
    status: signUpState.status,
    isSignIn: state.user.isSignIn,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitSignUp: async (values) => {
      dispatch(Actions.signUpStarted());
      try {
        const response = await fetch(urlCreator({type: SIGN_UP}), {
          method: 'post',
          headers: {'content-type': 'application/json'},
          body: JSON.stringify(values),
        });
        if (response.ok) {
          const token = await response.text();
          dispatch(Actions.signUpSuccess());
          localStorage.token = token;
          dispatch(setUser({token, username: values.username, email: values.email}));
        } else {
          const message = await response.text();
          dispatch(Actions.signUpFailure(message));
          let errorKey = '';
          switch (message) {
            case 'Server error':
            case 'Invalid parameters': {
              errorKey = FORM_ERROR;
              break;
            }
            case "Email already used": {
              errorKey = 'email';
              break;
            }
            case 'Username already used': {
              errorKey = 'username';
              break;
            }
            default: {
              break;
            }
          }
          return {[errorKey]: message}
        }
      } catch (e) {
        dispatch(Actions.signUpFailure(e));
      }
    },
    validate: (values) => {
      const errors = required(['username', 'email', 'password'], values);
      if (!errors.email) {
        const emailError = emailValidator(values.email, values);
        if (emailError) {
          errors.email = emailValidator(values.email, values);
        }
      }
      if (!errors.password) {
        if (!passwordValidator(values.password)) {
          errors.password = 'Invalid password';
        }
      }
      if (!errors.username) {
        if (!usernameValidator(values.username)) {
          errors.username = 'Invalid username';
        }
      }
      return errors;
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp)));