import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

function Auth() {
    return (
        <div>
            <SignIn />
            <hr />
            <hr />
            <SignUp />
        </div>
    );
}

export default Auth;