import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import userReducer from "./features/userReducer";
import wishlistReducer from "./features/wishlistReducer";
import cartReducer from "./features/cartReducer";

export function makeStore() {
  return configureStore({
    reducer: {
      userReducer: userReducer,
      wishlistReducer: wishlistReducer,
      cartReducer: cartReducer,
    },
  });
}

const store = makeStore();

export default store;