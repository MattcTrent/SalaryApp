import { createSlice } from "@reduxjs/toolkit";

interface ILoadingState {
  isLoading: boolean;
  loadingText: string;
}

export const ladingInitialState: ILoadingState = {
  isLoading: false,
  loadingText: "Loading",
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState: ladingInitialState,
  reducers: {
    setLoading(state, action) {
      state.isLoading = true;
      state.loadingText = action.payload !== "" ? action.payload : "Loading";
    },
    finishLoading(state) {
      state.isLoading = false;
      state.loadingText = "Loading";
    },
  },
});

export const loadingActions = loadingSlice.actions;
