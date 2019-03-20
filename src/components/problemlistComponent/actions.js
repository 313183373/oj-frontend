import {FETCH_PROBLEMS_STARTED, FETCH_PROBLEMS_SUCCESS, FETCH_PROBLEMS_FAILURE} from "./actionTypes";
import {CHANGE_PAGE_TO} from "./actionTypes";

export const fetchProblemsStarted = () => ({
    type: FETCH_PROBLEMS_STARTED
});

export const fetchProblemsSuccess = (result) => ({
    type: FETCH_PROBLEMS_SUCCESS,
    result: [{id: 1,title: 'test',ac: 20,all: 103},{id: 2,title: 'test2',ac: 30,all: 103}]
});

export const fetchProblemsFailure = (error) => ({
    type: FETCH_PROBLEMS_FAILURE,
    error
});

let nextSeqId = 0;
export const fetchProblemList = (page) => {
    page = page + 1;
    console.log('fetch page:', page);
    return  fetchProblemsSuccess('gh');
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

export const changePageTo = (page) => ({
  type: CHANGE_PAGE_TO,
  page: page
});
