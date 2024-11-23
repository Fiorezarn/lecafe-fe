import { put, takeLatest, call } from "redux-saga/effects";
import {
  registerSuccess,
  registerFailure,
  setLoading,
  loginSuccess,
  loginFailure,
  setDecodeToken,
} from "./authSlice";
import { fetchlogin, fetchLoginGoogle, fetchRegister } from "./authApi";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function* register(action) {
  try {
    yield put(setLoading(true));
    const response = yield fetchRegister(action.payload);
    yield put(registerSuccess(response));
  } catch (error) {
    yield put(registerFailure(error));
  }
}

function* login(action) {
  try {
    yield put(setLoading(true));
    const response = yield fetchlogin(action.payload);
    Cookies.set("user_leecafe", response.data.token, {
      expires: response.rememberme ? 30 : 1,
    });
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* loginWithGoogle(action) {
  try {
    yield put(setLoading(true));
    const response = yield fetchLoginGoogle(action.payload);
    Cookies.set("user_leecafe", response.data.token);
    yield call(getCookie);
    yield put(loginSuccess(response));
  } catch (error) {
    yield put(loginFailure(error));
  }
}

function* getCookie() {
  const cookie = Cookies.get("user_leecafe");

  if (!cookie) {
    return;
  }
  const decoded = jwtDecode(`${cookie}`);
  yield put(
    setDecodeToken({
      us_id: decoded.us_id,
      us_email: decoded.us_email,
      us_fullname: decoded.us_fullname,
      us_username: decoded.us_username,
      us_role: decoded.us_role,
    })
  );
}

export default function* authSaga() {
  yield takeLatest("auth/registerRequest", register);
  yield takeLatest("auth/loginRequest", login);
  yield takeLatest("auth/getCookie", getCookie);
  yield takeLatest("auth/loginWithGoogle", loginWithGoogle);
}
