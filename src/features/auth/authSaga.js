import { put, takeLatest } from "redux-saga/effects";
import {
  registerSuccess,
  registerFailure,
  setLoading,
  loginSuccess,
  loginFailure,
  setCookie,
} from "./authSlice";
import { fetchlogin, fetchRegister } from "./authApi";
import Cookies from "js-cookie";

function* register(action) {
  try {
    yield put(setLoading(true));
    const response = yield fetchRegister(action.payload);
    yield put(registerSuccess(response));
  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

function* login(action) {
  try {
    yield put(setLoading(true));
    const response = yield fetchlogin(action.payload);
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* getCookie() {
  const cookie = yield Cookies.get("user");
  if (!cookie) {
    return;
  }
  const userData = JSON.parse(cookie);
  yield put(setCookie(userData));
}

export default function* authSaga() {
  yield takeLatest("auth/registerRequest", register);
  yield takeLatest("auth/loginRequest", login);
  yield takeLatest("auth/getCookie", getCookie);
}
