import { createSlice } from "@reduxjs/toolkit";
import { setMessage } from "../cart/cartSlice";
import { fetchUpdateStatus } from "./orderApi";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    transactions: null,
    coordinates: null,
    orderById: null,
    messageOrder: null,
    codeOrder: null,
    loading: false,
    error: null,
    tracking: null,
    orders: null,
  },
  reducers: {
    fetchcreateOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchcreateOrderSuccess: (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.messageOrder = action.payload.message;
      state.codeOrder = action.payload.code;
    },
    fetchcreateOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchOrderByUserIdRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrderByUserIdSuccess: (state, action) => {
      state.loading = false;
      state.orderById = action.payload.data;
    },
    fetchOrderByUserIdFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setCoordinates: (state, action) => {
      state.coordinates = action.payload;
    },
    fetchTransactionSuccess: (state, action) => {
      state.loading = false;
      state.transactions = action.payload.data.transaction;
    },
    fetchTransactionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchVerifyTransactionSuccess: (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    },
    fetchVerifyTransactionFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCancelTransactionSuccess: (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    },
    fetchCancelTransactionFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setMessageOrder: (state, action) => {
      state.messageOrder = action.payload;
    },
    fetchOrderDeliverySuccess: (state, action) => {
      state.loading = false;
      state.tracking = action.payload;
    },
    fetchOrderDeliveryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchAllOrderHistorySuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    fetchAllOrderHistoryFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchUpdateStatusSuccess: (state, action) => {
      state.loading = false;
      state.messageOrder = action.payload.message;
      state.codeOrder = action.payload.code;
    },
    fetchUpdateStatusFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchcreateOrderRequest,
  fetchcreateOrderSuccess,
  fetchcreateOrderFailure,
  fetchOrderByUserIdRequest,
  fetchOrderByUserIdSuccess,
  fetchOrderByUserIdFailure,
  setCoordinates,
  fetchTransactionSuccess,
  fetchTransactionFailure,
  fetchVerifyTransactionSuccess,
  fetchVerifyTransactionFailed,
  fetchCancelTransactionSuccess,
  fetchCancelTransactionFailed,
  setLoading,
  setMessageOrder,
  fetchOrderDeliverySuccess,
  fetchOrderDeliveryFailure,
  fetchUpdateStatusSuccess,
  fetchUpdateStatusFailed,
  fetchAllOrderHistorySuccess,
  fetchAllOrderHistoryFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
