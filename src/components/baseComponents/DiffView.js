import {ReactGhLikeDiff} from "react-gh-like-diff";
import 'react-gh-like-diff/lib/diff2html.min.css';
import React from "react";

export const DiffView = ({expected, real}) => {
  return (
    <ReactGhLikeDiff past={expected} current={real} options={{originalFileName: 'output', updatedFileName: 'output'}}/>
  );
};