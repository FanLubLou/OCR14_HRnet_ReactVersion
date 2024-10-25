import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import ComponentEmployeeList from './ComponentEmployeeList';

// Créez un mock reducer
const mockEmployeesReducer = (state = { employees: [] }, action) => state;

// Créez un mock store
const createMockStore = (initialState) => {
  return configureStore({
    reducer: {
      employees: mockEmployeesReducer
    },
    preloadedState: initialState
  });
};

describe('ComponentEmployeeList', () => {
  test('renders employee list component', () => {
    const mockStore = createMockStore({
      employees: {
        employees: [
          { 
            id: 1, 
            firstName: 'John', 
            lastName: 'Doe', 
            department: 'IT',
            startDate: '2022-01-01',
            dateOfBirth: '1990-01-01',
            street: '123 Main St',
            city: 'Anytown',
            state: 'CA',
            zipCode: '12345'
          },
        ]
      }
    });

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <ComponentEmployeeList />
        </BrowserRouter>
      </Provider>
    );

    // Vérifications de base
    const entriesSection = screen.getByTestId('entries-section');
    expect(entriesSection).toBeInTheDocument();
    expect(entriesSection).toHaveTextContent(/Show/i);
    expect(entriesSection).toHaveTextContent(/entries/i);

    expect(screen.getByLabelText(/Search:/i)).toBeInTheDocument();
    
    // Vérification des en-têtes
    expect(screen.getByText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByText(/Department/i)).toBeInTheDocument();

    // Vérification des données d'employé
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Doe')).toBeInTheDocument();
    expect(screen.getByText('IT')).toBeInTheDocument();
  });

  test('displays no data message when employee list is empty', () => {
    const mockStore = createMockStore({
      employees: {
        employees: []
      }
    });

    render(
      <Provider store={mockStore}>
        <BrowserRouter>
          <ComponentEmployeeList />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/No data available in table/i)).toBeInTheDocument();
  });
});