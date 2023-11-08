import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "../slices/cartSlice";
import { productReducer } from "../slices/productSlice";
import { orderReducer } from "../slices/orderSlice";

import storage from "redux-persist/lib/storage/";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import { authReducer } from "../slices/authSlice";

const persistConfig = {
  key: "gh-cart",
  storage,
};

const persistUserConfig = {
  key: "gh-user",
  storage,
  stateReconciler: autoMergeLevel2,
};

const persistCart = persistReducer(persistConfig, cartReducer);
const persistAuth = persistReducer(persistUserConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistAuth,
    cart: persistCart,
    orders: orderReducer,
    products: productReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }),
});

export const newStore = persistStore(store);