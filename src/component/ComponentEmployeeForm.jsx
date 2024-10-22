import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { states } from '../data/states';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../features/Employee/EmployeeSlice.js';
import Modal from "react-modal";
import { FaTimes } from 'react-icons/fa';

// Définition de l'élément racine de ton application pour l'accessibilité
Modal.setAppElement('#root');

const ComponentEmployeeForm = () => {

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
   
    const dispatch = useDispatch();

    const handleChange = (name, value) => {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    const handleDateChange = (name, date) => {
      setFormData((prevState) => ({ ...prevState, [name]: date }));
    };

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

    const saveEmployee = () => {
      if (!validateForm()) {
        return;
      }
      const serializedData = {
        ...formData,
        dateOfBirth: formData.dateOfBirth.toISOString(),
        startDate: formData.startDate.toISOString(),
      };
      dispatch(addEmployee(serializedData));
      setIsModalOpen(true);     
  };
  
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
  
  const closeModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

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
            Save
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
                <button className="close-button" onClick={() => closeModal()}>
                  <FaTimes />
                </button>
              </div> 
              <p>Employee saved successfully!</p>
            </div>
          </div>          
        </Modal>
      </div>
    );
}

export default ComponentEmployeeForm;

