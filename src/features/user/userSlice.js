import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    getAllUserRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getAllUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    getAllUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { getAllUserRequest, getAllUserSuccess, getAllUserFailure } =
  userSlice.actions;

export default userSlice.reducer;
