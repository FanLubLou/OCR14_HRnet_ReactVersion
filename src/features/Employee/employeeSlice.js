import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for the employees slice.
 * @type {Object}
 * @property {Array} employees - Array to store employee data.
 */
const initialState = {
  employees: [],
};

/**
 * Redux slice for managing employee data.
 * @type {Slice}
 */
const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    /**
     * Adds a new employee to the state.
     * @param {Object} state - The current state.
     * @param {Object} action - The action object.
     * @param {Object} action.payload - The employee data to add.
     */
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },

    /**
     * Removes an employee from the state by ID.
     * @param {Object} state - The current state.
     * @param {Object} action - The action object.
     * @param {string} action.payload - The ID of the employee to delete.
     */
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(employee => employee.id !== action.payload);
    },

    /**
     * Updates an existing employee's data in the state.
     * @param {Object} state - The current state.
     * @param {Object} action - The action object.
     * @param {Object} action.payload - The updated employee data.
     * @param {string} action.payload.id - The ID of the employee to update.
     */
    editEmployee: (state, action) => {
      const index = state.employees.findIndex(emp => emp.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
  },
});

/**
 * Action creators for the employees slice.
 */
export const { addEmployee, deleteEmployee, editEmployee } = employeeSlice.actions;

/**
 * Reducer for the employees slice.
 */
export default employeeSlice.reducer;