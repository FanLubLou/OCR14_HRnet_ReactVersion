import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../../features/Employee/employeeSlice';
import ComponentEmployeeForm from './ComponentEmployeeForm';

// Configuration du store pour les tests
const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});

// Fonction helper pour le rendu du composant
const renderComponent = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <ComponentEmployeeForm />
      </BrowserRouter>
    </Provider>
  );
};

describe('ComponentEmployeeForm', () => {
  test('renders form fields', () => {
    renderComponent();
    
    // Vérification de la présence des champs du formulaire
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Street/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/State/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Zip Code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Department/i)).toBeInTheDocument();
  });

  test('renders submit button', () => {
    renderComponent();
    
    // Vérification de la présence du bouton de soumission
    expect(screen.getByRole('button', { name: /Add Employee/i })).toBeInTheDocument();
  });
});