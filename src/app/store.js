import authSaga from "@/features/auth/authSaga";
import menuSaga from "@/features/menu/menuSaga";
import menuReducer from "@/features/menu/menuSlice";
import authReducer from "@/features/auth/authSlice";
import cartReducer from "@/features/cart/cartSlice";
import orderReducer from "@/features/order/orderSlice";
import userReducer from "@/features/user/userSlice";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import cartSaga from "@/features/cart/cartSaga";
import orderSaga from "@/features/order/orderSaga";
import userSaga from "@/features/user/userSaga";
import dashboardReducer from "@/features/dashboard/dashboardSlice";
import dashboardSaga from "@/features/dashboard/dashboardSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
    user: userReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ["menu/createMenu", "menu/getAllMenu"],
      },
    }).concat(sagaMiddleware),
});

[menuSaga, authSaga, cartSaga, orderSaga, userSaga, dashboardSaga].map(
  (saga) => {
    sagaMiddleware.run(saga);
  }
);
