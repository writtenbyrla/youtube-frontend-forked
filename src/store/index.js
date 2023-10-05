import { combineReducers } from "redux";
import { all } from "redux-saga/effects";
import auth, { authSaga } from "./modules/auth";
import user from "./modules/user";

const rootReducer = combineReducers({
  auth,
  user,
});

export function* rootSaga() {
  yield all([authSaga()]);
}

export default rootReducer;
