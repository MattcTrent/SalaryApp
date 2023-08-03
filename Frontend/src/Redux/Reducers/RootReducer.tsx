// rootReducer.ts
import { combineReducers } from "@reduxjs/toolkit";
import { loadingSlice } from "../Slices/LoadingSlice";
import { registerSlice } from "../Slices/RegisterSlice";
import { parametersSlice } from "../Slices/SystemParameterSlice";

const rootReducer = combineReducers({
  loading: loadingSlice.reducer,
  register: registerSlice.reducer,
  systemParameters: parametersSlice.reducer,
});

// Define the RootState type based on the combined state structure
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
