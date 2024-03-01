import { setupListeners } from "@reduxjs/toolkit/query";

import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import appStateSlice from "./appStateSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    appState: appStateSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

// setupListeners(store.dispatch);
