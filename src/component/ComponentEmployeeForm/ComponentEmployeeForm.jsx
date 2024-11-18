import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { states } from '../../data/states.js';
import { useDispatch, useSelector } from 'react-redux';
import { addEmployee, editEmployee } from '../../features/Employee/employeeSlice.js';
import { FaTimes } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import JclModal from 'jcl-custom-modal/dist/JclModal.js';



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
 * This function iterates through all form fields in the formData object.
 * For each empty field, it adds an error message to the newErrors object.
 * After checking all fields, it updates the errors state with newErrors.
 *
 * @returns {boolean} True if the form is valid (no empty fields), otherwise false.
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
 * 
 * This function first validates the form using validateForm().
 * If the form is valid, it prepares the data for submission by:
 * 1. Creating a copy of formData
 * 2. Adding an id (either existing or new)
 * 3. Converting date objects to ISO strings
 * Then, it dispatches either an edit or add action based on whether an id exists.
 * Finally, it opens the success modal.
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
 * 
 * This function creates a new object with all form fields set to their default values:
 * - Empty strings for text fields
 * - New Date() objects for date fields
 * It then updates the formData state with this new object, effectively clearing the form.
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
 * 
 * This function performs two actions:
 * 1. It sets isModalOpen to false, which closes the modal
 * 2. It calls resetForm() to clear all form fields
 * This ensures that when the modal is closed, the form is ready for a new entry.
 */
  
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

   // Fetch the employee to edit based on the ID from the URL params

  const employeeToEdit = useSelector(state => 
    state.employees.employees.find(emp => emp.id === id)
  );

  
   /**
 * Effect hook to populate form fields when editing an existing employee.
 * 
 * This effect runs when the component mounts or when the id or employeeToEdit changes.
 * It checks if an id is present and if the corresponding employee data exists.
 * If both conditions are met, it populates the form with the employee's data,
 * converting date strings to Date objects for the date fields.
 *
 * @effect
 * @dependency {string|undefined} id - The ID of the employee being edited, derived from URL params.
 * @dependency {Object|undefined} employeeToEdit - The employee data object fetched from the Redux store.
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

  /**
 * Effect that listens for keydown events and closes the modal if the "Enter" or "Space" key is pressed.
 * The modal is only closed if it is currently open. It also resets the form data when closing the modal.
 *
 * Dependencies:
 * - `isModalOpen`: Determines whether the modal is currently open.
 */
useEffect(() => {
  /**
   * Handles the keydown event and checks if the "Enter" or "Space" key is pressed.
   * Closes the modal and resets the form data if the modal is open.
   *
   * @param {KeyboardEvent} event - The keyboard event triggered by user input.
   */
  const handleKeyDown = (event) => {
    if ((event.key === 'Enter' || event.key === ' ') && isModalOpen) {
      setIsModalOpen(false);
      event.preventDefault();
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
    }
  };

  // Adds the keydown event listener to the window object.
  window.addEventListener('keydown', handleKeyDown);

  /**
   * Cleanup function that removes the keydown event listener
   * to prevent memory leaks when the component is unmounted or dependencies change.
   */
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [isModalOpen]);



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

          <button
            type="button"
            onClick={saveEmployee}
          >
            {id ? "Update Employee" : "Add Employee"}
          </button>
        </form>
        <JclModal
          isOpen={isModalOpen}          
          onRequestClose={closeModal}
          className="modal" //declaring a className allows you to disable default style classes          
          >
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>Success</h2>
                <button
                  type="button"
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
        </JclModal>
      </div>
    );
}

export default ComponentEmployeeForm;

