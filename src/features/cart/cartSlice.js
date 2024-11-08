import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: null,
    loading: false,
    errorCart: null,
    message: null,
    count: 1,
  },
  reducers: {
    addCartRequest: (state) => {
      state.loading = true;
      state.errorCart = null;
    },
    addCartSuccess: (state, action) => {
      state.loading = false;
      state.cart = action.payload.data;
      state.message = action.payload.message;
    },
    addCartFailure: (state, action) => {
      state.loading = false;
      state.errorCart = action.payload;
    },
    getCartByUserIdRequest: (state) => {
      state.loading = true;
      state.errorCart = null;
    },
    getCartByUserIdSuccess: (state, action) => {
      state.loading = false;
      state.message = null;
      state.cart = action.payload.data;
    },
    getCartByUserIdFailure: (state, action) => {
      state.loading = false;
      state.errorCart = action.payload;
    },
    deleteCartRequest: (state) => {
      state.loading = true;
      state.errorCart = null;
    },
    deleteCartSuccess: (state, action) => {
      state.loading = false;
      state.cart = action.payload.data;
    },
    deleteCartFailure: (state, action) => {
      state.loading = false;
      state.errorCart = action.payload;
    },
    updateCartSuccess: (state, action) => {
      state.loading = false;
      state.cart = action.payload.data;
    },
    updateCartFailure: (state, action) => {
      state.loading = false;
      state.errorCart = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
  },
});

export const {
  addCartRequest,
  addCartSuccess,
  addCartFailure,
  getCartByUserIdRequest,
  getCartByUserIdSuccess,
  getCartByUserIdFailure,
  setMessage,
  increment,
  decrement,
  updateCartSuccess,
  updateCartFailure,
} = cartSlice.actions;

export default cartSlice.reducer;
