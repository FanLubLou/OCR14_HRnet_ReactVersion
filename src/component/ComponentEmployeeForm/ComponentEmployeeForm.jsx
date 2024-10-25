import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { states } from '../../data/states.js';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, editEmployee } from '../../features/Employee/EmployeeSlice.js';
import { FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';


/**
 * Set the app root for accessibility, excluding test environments.
 */
if (process.env.NODE_ENV !== 'test') {
  Modal.setAppElement('#root');
}

/**
 * Employee form component for adding and editing employees.
 *
 * @component
 * @returns {JSX.Element} Employee form UI
 */


const ComponentEmployeeForm = () => {

/** 
 * State management for form data, error handling, and modal visibility.
 * @type {object} formData - Employee form data.
 * @type {object} errors - Form validation errors.
 * @type {boolean} isModalOpen - Modal visibility status.
 */ 
   
   
/***********  declaration and initialization of states and their modification function***************/
  const [formData, setFormData] = useState({
      firstName: "",
    lastName: "",
    dateOfBirth: new Date(),
    startDate: new Date(),
    street: "",
    city: "",
    state: "",
    zipCode: "",
    department: "",
  });
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  /***********  Hook's Instanciation  ***************/
// Get employee ID from URL params and dispatch function  
  const { id } = useParams();
  const dispatch = useDispatch();

  /***********  Function's declaration ***************/
  
   /**
   * Handles changes to form fields and updates the formData state.
   *
   * @param {string} name - The field name being updated.
   * @param {string|number|Date} value - The new value for the field.
   */

  const handleChange = (name, value) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

   /**
   * Handles date selection and updates the formData state for date fields.
   *
   * @param {string} name - The date field being updated.
   * @param {Date} date - The new selected date.
   */

  const handleDateChange = (name, date) => {
    setFormData((prevState) => ({ ...prevState, [name]: date }));
  };

   /**
   * Validates the form fields and sets error messages.
   *
   * @returns {boolean} True if the form is valid, otherwise false.
   */


  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = "This field is required";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    /**
   * Saves the employee data if the form is valid and opens the modal.
   */

  const saveEmployee = () => {
    if (!validateForm()) {
      return;
    }
    const serializedData = {
      ...formData,
      id: id || Date.now().toString(),
      dateOfBirth: formData.dateOfBirth.toISOString(),
      startDate: formData.startDate.toISOString(),
    };
    if (id) {
      dispatch(editEmployee({ ...serializedData, id }));
    } else {
      dispatch(addEmployee(serializedData));
    }
    setIsModalOpen(true);     
  };

 /**
   * Resets the form fields to their initial state.
   */

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      dateOfBirth: new Date(),
      startDate: new Date(),
      street: "",
      city: "",
      state: "",
      zipCode: "",
      department: "",
    });
  };

   /**
   * Closes the modal and resets the form.
   */
  
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

   // Fetch the employee to edit based on the ID from the URL params

  const employeeToEdit = useSelector(state => 
    state.employees.employees.find(emp => emp.id === id)
  );

  /************* Side effect triggered after rendering and its dependency table **********/
   /**
   * Populates form fields when editing an existing employee.
   */
  useEffect(() => {
    if (id && employeeToEdit) {
      setFormData({
        ...employeeToEdit,
        dateOfBirth: new Date(employeeToEdit.dateOfBirth),
        startDate: new Date(employeeToEdit.startDate),
      });
    }
  }, [id, employeeToEdit]);

    return (
      <div>
        <form className="employeeForm">
          <label
            htmlFor="first-name"
            >First Name
          </label>
          <input
            type="text"
            id="first-name"
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}

          <label
            htmlFor="last-name">
            Last Name
          </label>
          <input
            type="text"
            id="last-name"
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
          />
          {errors.lastName && <span className="error">{errors.lastName}</span>}

          <label
            htmlFor="date-of-birth">
            Date of Birth
          </label>
          <DatePicker
            data-testid="date-of-birth-picker"
            selected={formData.dateOfBirth}
            onChange={(date) => handleDateChange("dateOfBirth", date)}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
          {errors.dateOfBirth && <span className="error">{errors.dateOfBirth}</span>}

          <label
            htmlFor="start-date">
            Start Date
          </label>
          <DatePicker
            data-testid="date-of-birth-picker"
            selected={formData.startDate}
            onChange={(date) => handleDateChange("startDate", date)}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
          {errors.startDate && <span className="error">{errors.startDate}</span>}

          <fieldset className="address">
            <legend>Address</legend>
            <div className='address-input'>
              <label htmlFor="street">Street</label>
              <input type="text" id="street" value={formData.street} onChange={(e) => handleChange("street", e.target.value)} />
              {errors.street && <span className="error">{errors.street}</span>}
            </div>
            <div className='address-input'>
              <label htmlFor="city">City</label>
              <input type="text" id="city" value={formData.city} onChange={(e) => handleChange("city", e.target.value)} />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>
            <div className='address-input'>
              <label htmlFor="state">State</label>
              <select id="state" value={formData.state} onChange={(e) => handleChange("state", e.target.value)}>
                <option value="">Select a State</option>
                {states.map((state, index) => (
                  <option key={index} value={state.abbreviation}>
                    {state.name}
                  </option>
                ))}
              </select>
              {errors.state && <span className="error">{errors.state}</span>}
            </div>
            <div className='address-input'>
              <label htmlFor="zip-code">Zip Code</label>
              <input type="number" id="zip-code" value={formData.zipCode} onChange={(e) => handleChange("zipCode", e.target.value)} />
              {errors.zipCode && <span className="error">{errors.zipCode}</span>}
            </div>
          </fieldset>

          <label htmlFor="department">Department</label>
          <select id="department" value={formData.department} onChange={(e) => handleChange("department", e.target.value)}>
            <option value="">Select a Department</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Engineering">Engineering</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Legal">Legal</option>
          </select>
          {errors.department && <span className="error">{errors.department}</span>}

          <button type="button" onClick={saveEmployee}>
            {id ? "Update Employee" : "Add Employee"}
          </button>
        </form>
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)} 
          ariaHideApp={false}
          className="modal" //déclarer une className permet de désactiver les classes de style par défaut
          >
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Success</h2>
                <button
                  className="close-button"
                  onClick={() => closeModal()}
                  aria-label="close modal"
                >                 
                  <FaTimes />
                </button>
              </div> 
              <p>{id ? 'Employee updated successfully!' : 'Employee saved successfully!'}</p>
            </div>
          </div>          
        </Modal>
      </div>
    );
}

export default ComponentEmployeeForm;

