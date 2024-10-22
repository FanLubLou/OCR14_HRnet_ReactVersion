import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import EmployeeList from './pages/EmployeeList/EmployeeList';
import Error from './pages/Error/Error';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/employee-list" element={<EmployeeList />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

