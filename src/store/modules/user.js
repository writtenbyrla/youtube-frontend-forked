import { createAction, handleActions } from "redux-actions";
import { takeLatest } from "redux-saga/effects";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";

const SET_USER = "user/SET_USER";

export const setUser = createAction(SET_USER, (user) => user);

const initialState = {
  user: null,
};

export default handleActions({
  [SET_USER]: (state, { payload: user }) => ({
    ...state,
    user,
  }),
});
