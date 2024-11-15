import { put, takeLatest } from "redux-saga/effects";
import { CountDataFailure, CountDataSuccess } from "./dashboardSlice";
import { fetchCountData } from "./dashboardApi";

function* countData() {
  try {
    const response = yield fetchCountData();
    yield put(CountDataSuccess(response));
  } catch (error) {
    yield put(CountDataFailure(error.message));
  }
}

export default function* dashboardSaga() {
  yield takeLatest("dashboard/countData", countData);
}
