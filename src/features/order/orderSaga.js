import { put, takeLatest } from "redux-saga/effects";
import {
  fetchcreateOrderSuccess,
  fetchcreateOrderFailure,
  fetchOrderByUserIdSuccess,
  fetchOrderByUserIdFailure,
  setCoordinates,
  fetchTransactionSuccess,
  fetchTransactionFailure,
  fetchVerifyTransactionFailed,
  setLoading,
  fetchOrderDeliverySuccess,
  fetchOrderDeliveryFailure,
  fetchUpdateStatusFailed,
  fetchUpdateStatusSuccess,
  fetchAllOrderHistorySuccess,
  fetchAllOrderHistoryFailure,
  fetchCreateDistanceSuccess,
  fetchCreateDistanceFailure,
  fetchCancelTransactionSuccess,
  fetchCancelTransactionFailed,
} from "@/features/order/orderSlice";
import {
  fetchOrderByUserId,
  fetchCreateOrder,
  fetchCoordinates,
  fetchPayments,
  verifyPayments,
  fetchCancelPayments,
  fetchDeliveryOrder,
  fetchUpdateStatus,
  fetchAllOrderHistory,
  fetchCreateDistance,
} from "./orderApi";

function* createOrder(action) {
  try {
    yield put(setLoading(true));
    const responseAdd = yield fetchCreateOrder(action.payload);
    const responseGet = yield fetchOrderByUserId({
      id: action.payload.userId,
      status: "pending",
    });
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

function* getOrderByUserId(action) {
  try {
    yield put(setLoading(true));
    const response = yield fetchOrderByUserId(action.payload);
    yield put(fetchOrderByUserIdSuccess(response));
  } catch (error) {
    yield put(fetchOrderByUserIdFailure(error.message));
  }
}

function* fetchCoordinatesData(action) {
  try {
    const response = yield fetchCoordinates(action.payload);
    yield put(setCoordinates(response.data));
  } catch (error) {
    yield put(fetchOrderByUserIdFailure(error.message));
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

function* createVerifyPayments(action) {
  try {
    yield verifyPayments(action.payload.orderIdMidtrans);
    const response = yield fetchOrderByUserId({
      id: action.payload.userId,
      status: "pending",
    });
    yield put(fetchOrderByUserIdSuccess(response));
  } catch (error) {
    yield put(fetchVerifyTransactionFailed(error.message));
  }
}

function* cancelPayments(action) {
  try {
    yield put(setLoading(true));
    const response = yield fetchCancelPayments(action.payload.id);
    const responseGet = yield fetchOrderByUserId({
      id: action.payload.userId,
      status: "pending",
    });
    yield put(
      fetchCancelTransactionSuccess({
        data: responseGet.data,
        message: response.message,
        code: response.code,
      })
    );
  } catch (error) {
    yield put(fetchCancelTransactionFailed(error.message));
  }
}

function* trackingOrder(action) {
  try {
    const response = yield fetchDeliveryOrder(action.payload);
    yield put(fetchOrderDeliverySuccess(response));
  } catch (error) {
    yield put(fetchOrderDeliveryFailure(error.message));
  }
}

function* getAllOrderHistory(action) {
  try {
    const response = yield fetchAllOrderHistory(action.payload);
    yield put(fetchAllOrderHistorySuccess(response));
  } catch (error) {
    yield put(fetchAllOrderHistoryFailure(error.message));
  }
}

function* updateStatus(action) {
  try {
    setLoading(true);
    const data = yield fetchUpdateStatus(action.payload);
    const response = yield fetchDeliveryOrder(action.payload);
    yield put(
      fetchUpdateStatusSuccess({
        data: response.data,
        message: data.message,
        code: data.code,
      })
    );
  } catch (error) {
    yield put(fetchUpdateStatusFailed(error.message));
  }
}

function* createDistance(action) {
  try {
    const response = yield fetchCreateDistance(action.payload);
    yield put(fetchCreateDistanceSuccess(response));
  } catch (error) {
    yield put(fetchCreateDistanceFailure(error.message));
  }
}

export default function* orderSaga() {
  yield takeLatest("order/createOrder", createOrder);
  yield takeLatest("order/getAllOrderHistory", getAllOrderHistory);
  yield takeLatest("order/getOrderByUserId", getOrderByUserId);
  yield takeLatest("map/fetchCoordinates", fetchCoordinatesData);
  yield takeLatest("payments/createPayments", createPayments);
  yield takeLatest("payments/createVerifyPayments", createVerifyPayments);
  yield takeLatest("payments/cancelPayments", cancelPayments);
  yield takeLatest("order/trackingOrder", trackingOrder);
  yield takeLatest("order/updateStatus", updateStatus);
  yield takeLatest("order/createDistance", createDistance);
}
