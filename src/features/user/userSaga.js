import { put, takeLatest } from "redux-saga/effects";
import {
  getAllUserSuccess,
  getAllUserFailure,
} from "@/features/user/userSlice";
import { fetchAllUser } from "./userApi";

function* getAllUser() {
  try {
    const response = yield fetchAllUser();
    yield put(getAllUserSuccess(response));
  } catch (error) {
    yield put(getAllUserFailure(error.message));
  }
}

export default function* userSaga() {
  yield takeLatest("user/getAllUser", getAllUser);
}
