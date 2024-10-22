import React from 'react';
import ComponentEmployeeForm from '../../component/ComponentEmployeeForm'
import { Link } from 'react-router-dom';

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
