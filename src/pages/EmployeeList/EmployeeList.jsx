import React from 'react';
import ComponentEmployeeList from '../../component/ComponentEmployeeList/ComponentEmployeeList';
import { Link } from 'react-router-dom';

export default function EmployeeList() {
  return (
    <div>
      <h1>HRNet</h1>
      <Link to="/">Home</Link>
      <h2>Employee List</h2>
      <ComponentEmployeeList />
    </div>
  )
}
