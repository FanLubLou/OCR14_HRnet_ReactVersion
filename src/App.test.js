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
  
 // checking if component is rendered without any error
  expect(document.body).toBeInTheDocument();
});