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
    fetchAllOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchAllOrderSuccess: (state, action) => {
      state.loading = false;
      state.orderById = action.payload.data;
    },
    fetchAllOrderFailure: (state, action) => {
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
  },
});

export const {
  fetchcreateOrderRequest,
  fetchcreateOrderSuccess,
  fetchcreateOrderFailure,
  fetchAllOrderRequest,
  fetchAllOrderSuccess,
  fetchAllOrderFailure,
  setCoordinates,
  fetchTransactionSuccess,
  fetchTransactionFailure,
  fetchVerifyTransactionSuccess,
  fetchVerifyTransactionFailed,
  fetchCancelTransactionSuccess,
  fetchCancelTransactionFailed,
  setLoading,
} = orderSlice.actions;

export default orderSlice.reducer;
