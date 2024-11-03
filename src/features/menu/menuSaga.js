import { put, takeLatest } from "redux-saga/effects";
import {
  fetchFailureGetAllMenu,
  fetchRequestGetAllMenu,
  fetchSuccessGetAllMenu,
  fetchRequestGetByIdMenu,
  fetchSuccessGetByIdMenu,
  fetchFailurGetByIdMenu,
  createMenuRequest,
  createMenuSuccess,
  createMenuFailure,
  setLoading,
} from "@/features/menu/menuSlice";
import { fetchAllMenu, fetchMenuById, fetchcreateMenu } from "./menuApi";

function* getAllMenu() {
  try {
    const response = yield fetchAllMenu();
    yield put(fetchSuccessGetAllMenu(response));
  } catch (error) {
    yield put(fetchFailureGetAllMenu(error.message));
  }
}

function* getMenuById(action) {
  try {
    const response = yield fetchMenuById(action.payload);
    yield put(fetchSuccessGetByIdMenu(response));
  } catch (error) {
    yield put(fetchFailurGetByIdMenu(error.message));
  }
}

function* createMenu(action) {
  try {
    yield put(setLoading(true));
    yield fetchcreateMenu(action.payload);
    const responseGet = yield fetchAllMenu();
    yield put(createMenuSuccess(responseGet));
  } catch (error) {
    yield put(createMenuFailure(error.message));
  }
}

export default function* menuSaga() {
  yield takeLatest("menu/getAllMenu", getAllMenu);
  yield takeLatest("menu/getMenuById", getMenuById);
  yield takeLatest("menu/createMenu", createMenu);
}
