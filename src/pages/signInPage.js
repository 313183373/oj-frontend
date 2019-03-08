import React from 'react';
import {view as SignIn} from '../signin/';


const SignInPage = (props) => {
    const {id} = props;
    return (
        <div>
            <SignIn id={id}></SignIn>
        </div>
    );
};

export default SignInPage;