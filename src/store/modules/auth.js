import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { takeLatest } from "redux-saga/effects";
import { loginAPI, registerAPI } from "../../api/auth";
import createRequestSaga from "../../lib/createRequestSaga";

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";

const REGISTER = "auth/REGISTER";
const LOGIN = "auth/LOGIN";

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({ form, key, value })
);
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);

export const register = createAction(REGISTER, ({ id, password, name }) => ({
  id,
  password,
  name,
}));
export const login = createAction(LOGIN, ({ id, password }) => ({
  id,
  password,
}));

const registerSaga = createRequestSaga(registerAPI);
const loginSaga = createRequestSaga(loginAPI);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(LOGIN, loginSaga);
}

const initialState = {
  register: {
    id: "",
    password: "",
    name: "",
  },
  login: {
    id: "",
    password: "",
  },
  auth: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value;
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [REGISTER]: (state, { payload: auth }) => ({
      ...state,
      auth,
    }),
    [LOGIN]: (state, { payload: auth }) => ({
      ...state,
      auth,
    }),
  },
  initialState
);

export default auth;
