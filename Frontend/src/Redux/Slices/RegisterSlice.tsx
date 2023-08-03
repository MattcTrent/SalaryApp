import { createSlice } from "@reduxjs/toolkit";
import { IUserDetails } from "../../Content/Models/UserModels";

export const registerUserInitialState: IUserDetails = {
  id: undefined,
  username: "",
  password: "",
  firstName: "",
  lastName: "",
  email: "",
  salary: 0,
  pensionPercentage: 0,
  pensionSalarySacrifice: true,
  studentFinancePlan: "",
  roles: [],
};

export const registerSlice = createSlice({
  name: "register",
  initialState: registerUserInitialState,
  reducers: {
    setExistingUser(state, action) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.salary = action.payload.salary;
      state.pensionPercentage = action.payload.pensionPercentage;
      state.pensionSalarySacrifice = action.payload.pensionSalarySacrifice;
      state.studentFinancePlan = action.payload.studentFinancePlan;
      state.roles = action.payload.roles;
    },
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setFirstName(state, action) {
      state.firstName = action.payload;
    },
    setLastName(state, action) {
      state.lastName = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setSalary(state, action) {
      state.salary = action.payload;
    },
    setPensionPercentage(state, action) {
      state.pensionPercentage = action.payload;
    },
    setIsPensionSalarySacrifice(state, action) {
      state.pensionSalarySacrifice = action.payload;
    },
    setStudentFinancePlan(state, action) {
      state.studentFinancePlan = action.payload;
    },
    reset() {
      return registerUserInitialState;
    },
  },
});

export const registerActions = registerSlice.actions;
