import React from 'react';
import {view as ProblemDesc} from '../components/problemdescComponent/';


const Problem = (props) => {
    const {id} = props;
    return (
        <div>
            <ProblemDesc id={id}/>
        </div>
    );
};

export default Problem;