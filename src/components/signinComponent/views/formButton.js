import React from 'react';
import defer from './defer';
import Button from './button';

const FormButton = (props) => {
  const {disabled, mounted, ...others} = props;
  return <Button disabled={!mounted || disabled} type="submit" variant="contained" {...others} />;
};

export default defer(FormButton);
