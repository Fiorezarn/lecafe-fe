import { put, takeLatest } from "redux-saga/effects";
import {
  fetchAddCart,
  fetchCountCart,
  fetchDeleteCart,
  fetchGetCartByUserId,
  fetchUpdateQuantity,
} from "./cartApi";
import {
  addCartSuccess,
  addCartFailure,
  getCartByUserIdSuccess,
  getCartByUserIdFailure,
  setMessage,
  decrement,
  increment,
  updateCartFailure,
  updateCartSuccess,
  cartCountSuccess,
  cartCountFailure,
} from "./cartSlice";

function* addCart(action) {
  try {
    const responseAdd = yield fetchAddCart(action.payload);
    const responseFetch = yield fetchGetCartByUserId(action.payload.userId);
    yield put(
      addCartSuccess({ data: responseFetch.data, message: responseAdd.message })
    );
    const responseCount = yield fetchCountCart(action.payload.userId);
    yield put(cartCountSuccess(responseCount));
  } catch (error) {
    yield put(addCartFailure(error.message));
  }
}

function* getCartByUserId(action) {
  try {
    const response = yield fetchGetCartByUserId(action.payload);
    yield put(getCartByUserIdSuccess(response));
  } catch (error) {
    yield put(getCartByUserIdFailure(error.message));
  }
}

function* deleteCart(action) {
  try {
    yield fetchDeleteCart(action.payload);
    const response = yield fetchGetCartByUserId(action.payload.userId);
    yield put(getCartByUserIdSuccess(response));
  } catch (error) {
    yield put(getCartByUserIdFailure(error.message));
  }
}

function* updateQuantity(action) {
  try {
    yield fetchUpdateQuantity(action.payload);
    const response = yield fetchGetCartByUserId(action.payload.userId);
    yield put(updateCartSuccess(response));
  } catch (error) {
    yield put(updateCartFailure(error.message));
  }
}

function* cartCount(action) {
  try {
    const response = yield fetchCountCart(action.payload);
    yield put(cartCountSuccess(response));
  } catch (error) {
    yield put(cartCountFailure(error.message));
  }
}

export default function* cartSaga() {
  yield takeLatest("cart/addCart", addCart);
  yield takeLatest("cart/getCartByUserId", getCartByUserId);
  yield takeLatest("cart/deleteCart", deleteCart);
  yield takeLatest("cart/updateQuantity", updateQuantity);
  yield takeLatest("cart/cartCount", cartCount);
  yield takeLatest("cart/setMessage", setMessage);
  yield takeLatest("cart/decrement", decrement);
  yield takeLatest("cart/increment", increment);
}
