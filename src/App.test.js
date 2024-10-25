import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store'; 
import App from './App';

test('renders App component without crashing', () => {
  render(
    <Provider store={store}>
      <App />      
    </Provider>
  );   
  
 // On vérifie simplement que le composant se rend sans erreur
  expect(document.body).toBeInTheDocument();
});