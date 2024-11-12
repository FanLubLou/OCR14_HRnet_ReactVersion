import React from 'react';
import ComponentEmployeeForm from '../../component/ComponentEmployeeForm/ComponentEmployeeForm'
import { Link } from 'react-router-dom';

/**
 * Home component represents the main page of the HRNet application.
 * 
 * This component renders the home page structure, including:
 * - The main title (HRNet)
 * - A link to view current employees
 * - A section title for creating a new employee
 * - The ComponentEmployeeForm for adding a new employee
 *
 * @component
 * @returns {JSX.Element} The rendered Home page
 */
export default function Home() {
  return (
    <>
      <h1>HRNet</h1>
      <Link to="/employee-list">View current employees</Link>
      <h2>Create Employee</h2>
      <ComponentEmployeeForm />
    </>
  )
}