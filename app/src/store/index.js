import { configureStore } from "@reduxjs/toolkit";
import path from "./reducers/path";

export const store = configureStore({
  reducer: {
    path,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
