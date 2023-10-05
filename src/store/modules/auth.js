import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { takeLatest } from "redux-saga/effects";
import { loginAPI, registerAPI } from "../../api/auth";
import createRequestSaga, {
  createRequestActionTypes,
} from "../../lib/createRequestSaga";

const CHANGE_FIELD = "auth/CHANGE_FIELD";
const INITIALIZE_FORM = "auth/INITIALIZE_FORM";

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes("auth/REGISTER");
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes("auth/LOGIN");

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

// redux-saga : 비동기 처리 때문에 추가
const registerSaga = createRequestSaga(REGISTER, registerAPI);
const loginSaga = createRequestSaga(LOGIN, loginAPI);
export function* authSaga() {
  console.log("saga!!");
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
  authError: null,
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
      authError: null,
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState
);

export default auth;
