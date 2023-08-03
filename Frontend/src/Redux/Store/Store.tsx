import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../Reducers/RootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

export type AppDispatch = typeof store.dispatch; // <-- get the type from store
