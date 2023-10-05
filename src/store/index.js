import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./modules/auth";

const rootReducer = combineReducers({
  auth,
});

export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;
