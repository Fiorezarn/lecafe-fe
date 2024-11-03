import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: null,
    coordinates: null,
    orderById: null,
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
} = orderSlice.actions;

export default orderSlice.reducer;
