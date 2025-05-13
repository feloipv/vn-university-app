import { configureStore } from "@reduxjs/toolkit";
import authApi from "./api/auth";
import universityApi from "./api/university";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [universityApi.reducerPath]: universityApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, universityApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
