import authSaga from "@/features/auth/authSaga";
import menuSaga from "@/features/menu/menuSaga";
import menuReducer from "@/features/menu/menuSlice";
import authReducer from "@/features/auth/authSlice";
import cartReducer from "@/features/cart/cartSlice";
import orderReducer from "@/features/order/orderSlice";
import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import cartSaga from "@/features/cart/cartSaga";
import orderSaga from "@/features/order/orderSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    auth: authReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: false,
      serializableCheck: {
        ignoredActions: ["menu/createMenu"],
      },
    }).concat(sagaMiddleware),
});

[menuSaga, authSaga, cartSaga, orderSaga].map((saga) => {
  sagaMiddleware.run(saga);
});
