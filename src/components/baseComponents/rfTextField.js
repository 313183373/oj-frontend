import React from 'react';
import TextField from '../signinComponent/views/textField';

const RFTextField = (props) => {
  const {
    autoComplete,
    input,
    InputProps,
    meta,
    meta: {error, submitError},
    showErrorWhen,
    ...other
  } = props;
  const isShowError = showErrorWhen(meta);
  console.log(meta);
  return (
    <TextField
      error={Boolean(isShowError && (error || submitError))}
      {...input}
      InputProps={{
        inputProps: {
          autoComplete,
        },
        ...InputProps,
      }}
      helperText={isShowError ? error || submitError : ''}
      {...other}
    />
  );
};

export default RFTextField;
