import { createSlice } from "@reduxjs/toolkit";

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
    isOpen: false,
    distance: null,
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
      state.order = action.payload;
      state.messageOrder = action.payload.message;
      state.codeOrder = action.payload.code;
    },
    fetchVerifyTransactionFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCancelTransactionSuccess: (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
      state.order = action.payload;
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
      state.codeOrder = action.payload;
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
      state.tracking = action.payload.data;
    },
    fetchUpdateStatusFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchCreateDistanceSuccess: (state, action) => {
      state.loading = false;
      state.distance = action.payload;
    },
    fetchCreateDistanceFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setIsOpenModal: (state, action) => {
      state.isOpen = action.payload;
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
  setIsOpenModal,
  fetchCreateDistanceSuccess,
  fetchCreateDistanceFailure,
} = orderSlice.actions;

export default orderSlice.reducer;
