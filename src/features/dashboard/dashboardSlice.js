import { createSlice } from "@reduxjs/toolkit";

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    countData: 0,
    error: null,
  },
  reducers: {
    CountDataSuccess: (state, action) => {
      state.countData = action.payload.data;
    },
    CountDataFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { CountDataSuccess, CountDataFailure } = dashboardSlice.actions;

export default dashboardSlice.reducer;
