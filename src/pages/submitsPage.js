import {view as Submits} from '../components/SubmitsComponent';
import React from "react";

const SubmitsPage = ({match}) => {
  const {submitId} = match.params;
  return <Submits submitId={submitId}/>
};

export default SubmitsPage;