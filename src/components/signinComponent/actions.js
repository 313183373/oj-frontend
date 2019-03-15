import {SIGN_IN_STARTED, SIGN_IN_SUCCESS, SIGN_IN_FAILURE} from "./actionTypes";

export const signInStarted = () => ({
    type: SIGN_IN_STARTED
});

export const signInSuccess = (result) => ({
    type: SIGN_IN_SUCCESS,
    result: {email: '131237289@qq.com', username: 'Tim'}
});

export const signInFailure = (error) => ({
    type: SIGN_IN_FAILURE,
    error
});

let nextSeqId = 0;
export const submitSignIn = (email, pwd) => {
    console.log('fetch');
    return  signInSuccess('gh');
    // const apiUrl = `/data/cityinfo/${page}.html`;
        // const seqId = ++nextSeqId;
        // const dispatchIfValid = (action) => {
        //     if (seqId === nextSeqId) {
        //         return dispatch(action);
        //     }
        // };
        //
        // dispatchIfValid(fetchProblemsStarted());
        //
        // fetch(apiUrl).then((response) => {
        //     if (response.status !== 200) {
        //         throw new Error(`Fail to get response with status ${response.status}`);
        //     }
        //
        //     response.json().then((responseJson) => {
        //         dispatchIfValid(fetchProblemsSuccess(responseJson));
        //     }).catch((error) => {
        //         dispatchIfValid(fetchProblemsFailure(error));
        //     });
        // }).catch((error) => {
        //     dispatchIfValid(fetchProblemsFailure(error));
        // });

};