import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import EmployeeList from './pages/EmployeeList/EmployeeList';
import Error from './pages/Error/Error';

/**
 * App component serves as the main routing component for the application.
 * 
 * This component sets up the routing structure using React Router, defining
 * the paths for the Home page (which also handles employee editing),
 * the Employee List page, and a catch-all Error page for undefined routes.
 *
 * @component
 * @returns {JSX.Element} The main application component with routing
 */
export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/edit/:id" element={<Home />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}