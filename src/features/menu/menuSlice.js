import { createSlice } from "@reduxjs/toolkit";

export const menuSlice = createSlice({
  name: "menu",
  initialState: {
    newData: null,
    editData: null,
    menu: null,
    menuById: null,
    loading: false,
    error: null,
    isOpen: false,
    message: null,
    code: null,
    page: 1,
    limit: 8,
    totalItems: 0,
    search: "",
    category: "",
    type: "create",
    productId: null,
    menuRecommended: null,
  },
  reducers: {
    fetchRequestGetAllMenu: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchSuccessGetAllMenu: (state, action) => {
      state.loading = false;
      state.menu = action.payload;
      state.totalItems = action.payload.totalItems;
    },
    fetchFailureGetAllMenu: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSuccessGetByIdMenu: (state, action) => {
      state.loading = false;
      state.menuById = action.payload.data;
    },
    fetchFailureGetByIdMenu: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    createMenuRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    createMenuSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.code = action.payload.code;
      state.isOpen = false;
      state.menu = action.payload;
    },
    createMenuFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    updateMenuSuccess: (state, action) => {
      state.loading = false;
      state.isOpen = false;
      state.message = action.payload.message;
      state.code = action.payload.code;
      state.menu = action.payload;
    },
    updateMenuFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteMenuSuccess: (state, action) => {
      state.loading = false;
      state.code = action.payload.code;
      state.message = action.payload.message;
      state.menu = action.payload;
    },
    deleteMenuFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setProductId: (state, action) => {
      state.productId = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    fetchMenuRecommendedSuccess: (state, action) => {
      state.loading = false;
      state.menuRecommended = action.payload;
    },
    fetchMenuRecommendedFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
      state.code = action.payload;
    },
  },
});

export const {
  fetchRequestGetAllMenu,
  fetchSuccessGetAllMenu,
  fetchFailureGetAllMenu,
  fetchSuccessGetByIdMenu,
  fetchFailureGetByIdMenu,
  createMenuRequest,
  createMenuSuccess,
  createMenuFailure,
  setIsOpen,
  setLoading,
  updateMenuSuccess,
  updateMenuFailure,
  deleteMenuSuccess,
  deleteMenuFailure,
  setPage,
  setLimit,
  setType,
  setProductId,
  setSearch,
  setCategory,
  fetchMenuRecommendedSuccess,
  fetchMenuRecommendedFailure,
  setMessage,
} = menuSlice.actions;

export default menuSlice.reducer;
