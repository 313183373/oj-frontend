import React from "react";
import AppForm from '../../baseComponents/appForm';
import Typography from "../../baseComponents/Typography";
import {Link} from 'react-router-dom';
import {Field, Form, FormSpy} from 'react-final-form';
import Grid from '@material-ui/core/Grid';
import RFTextField from "../../baseComponents/rfTextField";
import * as Status from "../status";
import FormFeedback from "../../baseComponents/formFeedback";
import FormButton from "../../baseComponents/formButton";
import {withRouter} from "react-router";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core";
import * as Actions from "../actions";
import {emailValidator, required, passwordValidator} from "../../../utils/validation";

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
  const {classes, status, submitSignUp, validate, handleSignUpSuccess, result} = props;
  if (status === Status.SUCCESS) {
    handleSignUpSuccess(result);
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
          >
            {({handleSubmit, submitting, form}) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Field
                  autoFocus
                  component={RFTextField}
                  showErrorWhen={meta => meta.touched && !meta.submitting}
                  autoComplete="username"
                  fullWidth
                  label="Username"
                  name="username"
                  required
                />
                <Field
                  autoComplete="email"
                  component={RFTextField}
                  showErrorWhen={meta => meta.touched && !meta.submitting}
                  disabled={submitting || sent}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  required
                />
                <Field
                  fullWidth
                  component={RFTextField}
                  showErrorWhen={meta => (meta.touched || meta.modified) && !meta.submitting}
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Password"
                  type="password"
                  margin="normal"
                />
                <FormSpy subscription={{submitError: true}}>
                  {(props) => {
                    console.log(props);
                    return null;
                    // return submitError ? (
                    //   <FormFeedback className={classes.feedback} error>
                    //     {submitError}
                    //   </FormFeedback>
                    // ) : null
                  }
                  }
                </FormSpy>
                <FormButton
                  className={classes.button}
                  disabled={submitting || sent || form.getState().hasValidationErrors || (form.getState().hasSubmitErrors && !form.getState().dirtySinceLastSubmit)}
                  color="secondary"
                  fullWidth
                >
                  {submitBtnText}
                </FormButton>
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
    result: signUpState.result
  }
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitSignUp: (values) => {
      dispatch(Actions.submitSignUp(values));
      return {SUBMIT_ERROR: "HELLO"}
    },
    handleSignUpSuccess: (result) => {
      // todo: save result to localstorage
      ownProps.history.goBack();
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
      return errors;
    }
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp)));