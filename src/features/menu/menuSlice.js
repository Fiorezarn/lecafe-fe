import { createSlice } from "@reduxjs/toolkit";
import { set } from "react-hook-form";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menu: null,
    menuById: null,
    loading: false,
    error: null,
    isOpen: false,
  },
  reducers: {
    fetchRequestGetAllMenu: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccessGetAllMenu: (state, action) => {
      state.loading = false;
      state.menu = action.payload;
    },
    fetchFailureGetAllMenu: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchRequestGetByIdMenu: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccessGetByIdMenu: (state, action) => {
      state.loading = false;
      state.menuById = action.payload.data;
    },
    fetchFailurGetByIdMenu: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createMenuRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createMenuSuccess: (state, action) => {
      state.loading = false;
      state.menu = action.payload;
      state.isOpen = false;
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    createMenuFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchRequestGetAllMenu,
  fetchSuccessGetAllMenu,
  fetchFailureGetAllMenu,
  fetchRequestGetByIdMenu,
  fetchSuccessGetByIdMenu,
  fetchFailurGetByIdMenu,
  createMenuRequest,
  createMenuSuccess,
  createMenuFailure,
  setIsOpen,
  setLoading,
} = menuSlice.actions;

export default menuSlice.reducer;
