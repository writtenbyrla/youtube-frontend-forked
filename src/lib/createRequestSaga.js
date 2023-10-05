import { call, put } from "redux-saga/effects";

const createRequestSaga = (request) => {
  return function* (action) {
    const response = yield call(request, action.payload);
    yield put({
      payload: response.data,
    });
  };
};

export default createRequestSaga;
