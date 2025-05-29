import { configureStore } from "@reduxjs/toolkit";
import authApi from "./api/auth";
import universityApi from "./api/university";
import cityApi from "./api/city";
import trainingFieldApi from "./api/trainingField";
import majorApi from "./api/major";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [universityApi.reducerPath]: universityApi.reducer,
    [cityApi.reducerPath]: cityApi.reducer,
    [trainingFieldApi.reducerPath]: trainingFieldApi.reducer,
    [majorApi.reducerPath]: majorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      universityApi.middleware,
      cityApi.middleware,
      trainingFieldApi.middleware,
      majorApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
