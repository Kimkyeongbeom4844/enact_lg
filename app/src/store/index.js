import { configureStore } from "@reduxjs/toolkit";
import device from "./reducers/device";

export const store = configureStore({
  reducer: {
    device,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
