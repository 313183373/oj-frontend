import {SIGN_UP_STARTED, SIGN_UP_SUCCESS, SIGN_UP_FAILURE} from "./actionTypes";

export const signUpStarted = () => ({
    type: SIGN_UP_STARTED
});

export const signUpSuccess = (result) => ({
    type: SIGN_UP_SUCCESS,
    result: {email: '131237289@qq.com', username: 'Tim'}
});

export const signUpFailure = (error) => ({
    type: SIGN_UP_FAILURE,
    error
});

let nextSeqId = 0;
export const submitSignUp = (values) => {

    return  signUpFailure('gh');
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