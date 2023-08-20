import { createSlice } from "@reduxjs/toolkit";
import { SystemParameter } from "../../Content/Models/SystemParamModels";

export const systemParameterInitialState: SystemParameter = {
  id: null,
  parameterGroup: "",
  name: "",
  rate: null,
  lowerThreshold: null,
  upperThreshold: null,
};

interface ParamSliceState {
  SelectedSystemParameter: SystemParameter;
  SystemParameters: SystemParameter[];
}

const ParamsSliceInitialState: ParamSliceState = {
  SelectedSystemParameter: systemParameterInitialState,
  SystemParameters: [],
};

export const parametersSlice = createSlice({
  name: "systemParameters",
  initialState: ParamsSliceInitialState,
  reducers: {
    setSelectedSystemParameter(state, action) {
      const selectSystemParam = state.SystemParameters.find(
        (param) => param.id === action.payload
      );
      if (selectSystemParam) {
        state.SelectedSystemParameter = selectSystemParam;
      }
    },
    setGroup(state, action) {
      if (state.SelectedSystemParameter !== null) {
        state.SelectedSystemParameter.parameterGroup = action.payload;
      }
    },
    setName(state, action) {
      if (state.SelectedSystemParameter !== null) {
        state.SelectedSystemParameter.name = action.payload;
      }
    },
    setRate(state, action) {
      if (state.SelectedSystemParameter !== null) {
        state.SelectedSystemParameter.rate = action.payload;
      }
    },
    setLowerThreshold(state, action) {
      if (state.SelectedSystemParameter !== null) {
        state.SelectedSystemParameter.lowerThreshold = action.payload;
      }
    },
    setUpperThreshold(state, action) {
      if (state.SelectedSystemParameter !== null) {
        state.SelectedSystemParameter.upperThreshold = action.payload;
      }
    },
    clearSelectedSystemParameter(state) {
      state.SelectedSystemParameter = systemParameterInitialState;
    },
    setSystemParameters(state, action) {
      state.SystemParameters = action.payload;
    },
  },
});

export const parameterActions = parametersSlice.actions;
