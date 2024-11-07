import { put, takeLatest } from "redux-saga/effects";
import {
  fetchcreateOrderSuccess,
  fetchcreateOrderFailure,
  fetchAllOrderSuccess,
  fetchAllOrderFailure,
  setCoordinates,
  fetchTransactionSuccess,
  fetchTransactionFailure,
} from "@/features/order/orderSlice";
import {
  fetchAllOrder,
  fetchCreateOrder,
  fetchCoordinates,
  fetchPayments,
} from "./orderApi";

function* createOrder(action) {
  try {
    const responseAdd = yield fetchCreateOrder(action.payload);
    const responseGet = yield fetchAllOrder(action.payload.userId);
    yield put(
      fetchcreateOrderSuccess({
        data: responseGet.data,
        message: responseAdd.message,
        code: responseAdd.code,
      })
    );
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

function* createPayments(action) {
  try {
    const response = yield fetchPayments(action.payload);
    yield put(fetchTransactionSuccess(response));
  } catch (error) {
    yield put(fetchTransactionFailure(error.message));
  }
}

export default function* orderSaga() {
  yield takeLatest("order/createOrder", createOrder);
  yield takeLatest("order/getAllOrder", getAllOrder);
  yield takeLatest("map/fetchCoordinates", fetchCoordinatesData);
  yield takeLatest("payments/createPayments", createPayments);
}
