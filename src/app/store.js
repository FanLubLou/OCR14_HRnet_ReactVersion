import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./../features/Employee/EmployeeSlice";

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});