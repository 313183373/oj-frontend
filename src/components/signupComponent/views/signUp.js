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
import {email, required} from "../../../utils/validation";

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
    marginTop: theme.spacing.unit * 2 ,
  },
});

const SignUp = (props) => {
  const {classes, status, submitSignUp, validate, handleSignUpSuccess, result} = props;
  let sent = status === Status.LOADING;
  return (
    <React.Fragment>
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Sign Up
          </Typography>
          <Typography variant="body2" align="center">
            <Link to="/sign-in" >
              Already have an account?
            </Link>
          </Typography>
        </React.Fragment>
        <Form
          onSubmit={submitSignUp}
          subscription={{ submitting: true }}
          validate={validate}
        >
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    autoComplete="fname"
                    fullWidth
                    label="First name"
                    name="firstName"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    autoComplete="lname"
                    fullWidth
                    label="Last name"
                    name="lastName"
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
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
                disabled={submitting || sent}
                required
                name="password"
                autoComplete="current-password"
                label="Password"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
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
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'In progress…' : 'Sign Up'}
              </FormButton>
            </form>
          )}
        </Form>
      </AppForm>
    </React.Fragment>
  );
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
      dispatch(Actions.submitSignUp(values.email, values.password));
    },
    handleSignUpSuccess: (result) => {
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SignUp)));