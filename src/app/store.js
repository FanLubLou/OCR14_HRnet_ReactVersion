import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './../features/Employee/employeeSlice';

// Function dedicated to load states from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error('Error loading state:', err);
    return undefined;
  }
};

// Function dedicated to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error('Error saving state:', err);
  }
};

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    
  },
  preloadedState,
});

// Listening potential store updates and save them into localStorage 
store.subscribe(() => {
  saveState(store.getState());
});





/*******************************store simple sans persistance ***************************************/ 


// import { configureStore } from "@reduxjs/toolkit";
// import employeeReducer from "./../features/Employee/EmployeeSlice";

// export const store = configureStore({
//   reducer: {
//     employees: employeeReducer,
//   },
// });