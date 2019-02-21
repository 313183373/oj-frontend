import React from 'react';
import {view as Search} from './search/';
import {view as ProblemList} from './problemlist/';

function OnlineJudgeApp() {
    return (
        <div>
            <ProblemList />
        </div>
    );
}

export default OnlineJudgeApp;