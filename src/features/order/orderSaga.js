import { put, takeLatest } from "redux-saga/effects";
import {
  fetchcreateOrderSuccess,
  fetchcreateOrderFailure,
  fetchAllOrderSuccess,
  fetchAllOrderFailure,
  setCoordinates,
} from "@/features/order/orderSlice";
import { fetchAllOrder, fetchCreateOrder, fetchCoordinates } from "./orderApi";

function* createOrder(action) {
  try {
    const response = yield fetchCreateOrder(action.payload);
    yield put(fetchcreateOrderSuccess(response));
  } catch (error) {
    yield put(fetchcreateOrderFailure(error.message));
  }
}

function* getAllOrder(action) {
  try {
    const response = yield fetchAllOrder(action.payload);
    yield put(fetchAllOrderSuccess(response));
  } catch (error) {
    yield put(fetchAllOrderFailure(error.message));
  }
}

function* fetchCoordinatesData(action) {
  try {
    const response = yield fetchCoordinates(action.payload);
    yield put(setCoordinates(response.data));
  } catch (error) {
    yield put(fetchAllOrderFailure(error.message));
  }
}

export default function* orderSaga() {
  yield takeLatest("order/createOrder", createOrder);
  yield takeLatest("order/getAllOrder", getAllOrder);
  yield takeLatest("map/fetchCoordinates", fetchCoordinatesData);
}
