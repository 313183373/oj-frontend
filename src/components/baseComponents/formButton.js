import React from 'react';
import defer from '../signinComponent/views/defer';
import Button from '../signinComponent/views/button';

const FormButton = (props) => {
  const {disabled, mounted, ...others} = props;
  return <Button disabled={!mounted || disabled} type="submit" variant="contained" {...others} />;
};

export default defer(FormButton);
