import React from 'react';
import {view as ProblemDesc} from '../problemdesc/';


const Problem = (props) => {
    const {id} = props;
    return (
        <div>
            <ProblemDesc id={id}></ProblemDesc>
        </div>
    );
};

export default Problem;