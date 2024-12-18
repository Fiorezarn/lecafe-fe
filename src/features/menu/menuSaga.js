import { put, takeLatest } from "redux-saga/effects";
import {
  fetchFailureGetAllMenu,
  fetchSuccessGetAllMenu,
  fetchSuccessGetByIdMenu,
  fetchFailureGetByIdMenu,
  createMenuSuccess,
  createMenuFailure,
  setLoading,
  updateMenuSuccess,
  updateMenuFailure,
  deleteMenuSuccess,
  deleteMenuFailure,
  fetchMenuRecommendedSuccess,
  fetchMenuRecommendedFailure,
} from "@/features/menu/menuSlice";
import {
  fetchAllMenu,
  fetchMenuById,
  fetchcreateMenu,
  fetchDeleteMenu,
  fetchEditMenu,
  fetchMenuRecommended,
} from "./menuApi";

function* getAllMenu(action) {
  try {
    yield put(setLoading(true));
    const response = yield fetchAllMenu(action.payload ? action.payload : {});
    yield put(fetchSuccessGetAllMenu(response));
  } catch (error) {
    yield put(fetchFailureGetAllMenu(error.message));
  }
}

function* getMenuRecommended(action) {
  try {
    yield put(setLoading(true));
    const response = yield fetchMenuRecommended(action.payload);
    yield put(fetchMenuRecommendedSuccess(response));
  } catch (error) {
    yield put(fetchMenuRecommendedFailure(error.message));
  }
}

function* getMenuById(action) {
  try {
    const response = yield fetchMenuById(action.payload);
    yield put(fetchSuccessGetByIdMenu(response));
  } catch (error) {
    yield put(fetchFailureGetByIdMenu(error.message));
  }
}

function* createMenu(action) {
  try {
    yield put(setLoading(true));
    const response = yield fetchcreateMenu(action.payload);
    const responseGet = yield fetchAllMenu({
      page: 1,
      limit: 8,
    });

    yield put(
      createMenuSuccess({
        data: responseGet.data,
        message: response.message,
        code: response.code,
      })
    );
  } catch (error) {
    yield put(createMenuFailure(error));
  }
}

function* updateMenu(action) {
  try {
    yield put(setLoading(true));
    const { id, formData } = action.payload;
    const response = yield fetchEditMenu(id, formData);
    const responseGet = yield fetchAllMenu({
      page: 1,
      limit: 8,
    });
    yield put(
      updateMenuSuccess({
        data: responseGet.data,
        message: response.message,
        code: response.code,
      })
    );
  } catch (error) {
    yield put(updateMenuFailure(error.message));
  }
}

function* DeleteMenu(action) {
  try {
    yield put(setLoading(true));
    const response = yield fetchDeleteMenu(action.payload);
    const responseGet = yield fetchAllMenu({
      page: 1,
      limit: 8,
    });
    yield put(
      deleteMenuSuccess({
        data: responseGet.data,
        message: response.message,
        code: response.code,
      })
    );
  } catch (error) {
    yield put(deleteMenuFailure(error.message));
  }
}

export default function* menuSaga() {
  yield takeLatest("menu/getAllMenu", getAllMenu);
  yield takeLatest("menu/getMenuById", getMenuById);
  yield takeLatest("menu/createMenu", createMenu);
  yield takeLatest("menu/updateMenu", updateMenu);
  yield takeLatest("menu/deleteMenu", DeleteMenu);
  yield takeLatest("menu/getMenuRecommended", getMenuRecommended);
}
