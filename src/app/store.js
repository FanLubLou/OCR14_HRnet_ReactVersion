import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './../features/Employee/EmployeeSlice';
// Importez d'autres reducers si nécessaire

// Fonction pour charger l'état depuis le localStorage
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

// Fonction pour sauvegarder l'état dans le localStorage
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
    // Ajoutez d'autres reducers ici
  },
  preloadedState,
});

// Écoutez les changements du store et sauvegardez dans le localStorage
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