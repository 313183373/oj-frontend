import React from 'react';
import {view as ProblemDesc} from '../components/problemdescComponent/';


const Problem = ({match}) => {
    const {id} = match.params;
    return (
        <div>
            <ProblemDesc id={id}/>
        </div>
    );
};

export default Problem;