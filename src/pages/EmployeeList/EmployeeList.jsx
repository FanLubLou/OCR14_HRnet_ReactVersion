import React from 'react';
import ComponentEmployeeList from '../../component/ComponentEmployeeList/ComponentEmployeeList';
import { Link } from 'react-router-dom';

/**
 * EmployeeList component displays the list of employees.
 * 
 * This component renders the main structure of the employee list page,
 * including the header, navigation link, and the ComponentEmployeeList.
 *
 * @component
 * @returns {JSX.Element} The rendered EmployeeList page
 */
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
