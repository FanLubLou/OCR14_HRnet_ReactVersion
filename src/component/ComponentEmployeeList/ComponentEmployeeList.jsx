import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ComponentSortableHeader from '../ComponentSortableHeader/ComponentSortableHeader';
import { deleteEmployee } from '../../features/Employee/EmployeeSlice';
import { FaTimes } from 'react-icons/fa'
import { FaPenToSquare } from 'react-icons/fa6';


/**
 * Component for displaying and managing the list of employees.
 * @returns {JSX.Element} The employee list component
 */


const ComponentEmployeeList = () => {

  /*********** Declaration and initialization of states and their modification functions ***************/

    const employees = useSelector((state) => state.employees.employees); 
    const [search, setSearch] = useState(""); 
    const [entries, setEntries] = useState(10); 
    const [filteredData, setFilteredData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  /***********  hook's Instantiation  ***************/  

    const dispatch = useDispatch();
    const navigate = useNavigate();

  /************* Side effect triggered after rendering and its dependency array **********/

    useEffect(() => {
      let result = employees.filter(
        (item) =>
          item.firstName.toLowerCase().includes(search.toLowerCase()) ||
          item.lastName.toLowerCase().includes(search.toLowerCase()) ||
          item.department.toLowerCase().includes(search.toLowerCase()) ||
          item.city.toLowerCase().includes(search.toLowerCase()) ||
          item.state.toLowerCase().includes(search.toLowerCase())
      );
      result = sortData(result, sortConfig);
      setFilteredData(result);
    }, [search, employees, sortConfig]);

  /*************Component Functions declarations **********/

  /**
   * Handles changes in the search input.
   * @param {Event} e - The change event
   */

  const handleSearchChange = (e) => {
      setSearch(e.target.value);
  };
  
    /**
   * Handles changes in the number of entries to display.
   * @param {Event} e - The change event
   */

    const handleEntriesChange = (e) => {
      setEntries(parseInt(e.target.value));
  };

  /**
   * Sorts the data based on the given configuration.
   * @param {Array} data - The data to sort
   * @param {Object} sortConfig - The sorting configuration
   * @returns {Array} The sorted data
   */
  
  const sortData = (data, sortConfig) => {
    if (!sortConfig.key) return data;
  
    return [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  };

  /**
   * Requests a sort operation on a specific column.
   * @param {string} key - The key to sort by
   */

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'ascending') {
        direction = 'descending';
      } else {
        direction = 'ascending';
      }
    }
    setSortConfig({ key, direction });
  };

  /**
   * Handles the deletion of an employee.
   * @param {string} employeeId - The ID of the employee to delete
   */

  const handleDelete = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(employeeId));
    }
  };

  /**
   * Handles the editing of an employee.
   * @param {string} employeeId - The ID of the employee to edit
   */

  const handleEdit = (employeeId) => {
    navigate(`/edit/${employeeId}`);
  };

 /**
   * Formats a date string to a localized date string.
   * @param {string} dateString - The date string to format
   * @returns {string} The formatted date string
   */  


  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date) ? date.toLocaleDateString() : 'Invalid Date';
  };

    return (
      <div className="containerEmployeeTable">
        <div className="headerEmployeeTable">
          <div className="itemsEmployeeTable" data-testid="entries-section">
          <label htmlFor="entries">Show{" "}</label>
            <select value={entries} onChange={handleEntriesChange}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>{" "}
            entries
          </div>
          <div className="searchEmployeeTable">
            <label htmlFor="search">Search:</label>
            <input id="search" type="text" value={search} onChange={handleSearchChange} />
          </div>
        </div>

        <table className="employeeTable">
        <thead>
          <tr>
            <ComponentSortableHeader column="firstName" label="First Name" sortConfig={sortConfig} requestSort={requestSort} />
            <ComponentSortableHeader column="lastName" label="Last Name" sortConfig={sortConfig} requestSort={requestSort} />
            <ComponentSortableHeader column="startDate" label="Start Date" sortConfig={sortConfig} requestSort={requestSort} />
            <ComponentSortableHeader column="department" label="Department" sortConfig={sortConfig} requestSort={requestSort} />
            <ComponentSortableHeader column="dateOfBirth" label="Date of Birth" sortConfig={sortConfig} requestSort={requestSort} />
            <ComponentSortableHeader column="street" label="Street" sortConfig={sortConfig} requestSort={requestSort} />
            <ComponentSortableHeader column="city" label="City" sortConfig={sortConfig} requestSort={requestSort} />
            <ComponentSortableHeader column="state" label="State" sortConfig={sortConfig} requestSort={requestSort} />
            <ComponentSortableHeader column="zipCode" label="Zip Code" sortConfig={sortConfig} requestSort={requestSort} />
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
          <tbody>
            {filteredData.length > 0 ? (
              filteredData.slice(0, entries).map((item, index) => (
                <tr key={index}>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{formatDate(item.startDate)}</td>
                  <td>{item.department}</td>
                  <td>{formatDate(item.dateOfBirth)}</td>        
                  <td>{item.street}</td>
                  <td>{item.city}</td>
                  <td>{item.state}</td>
                  <td>{item.zipCode}</td>
                  <td>
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="edit-button"
                      aria-label={`Edit ${item.firstName} ${item.lastName}`}>
                        <FaPenToSquare />
                    </button>
                    </td>
                    <td>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="delete-button"
                      aria-label={`Delete ${item.firstName} ${item.lastName}`}>
                      <FaTimes />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="employeeTable-no-data">
                  No data available in table
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="employeeTable-footer">
          <div className="employeeTable-info">
            Showing {filteredData.length > 0 ? 1 : 0} to {filteredData.length > entries ? entries : filteredData.length} of {filteredData.length} entries
          </div>
          <div className="employeeTable-pagination">
            <button disabled={true}>Previous</button>
            <button disabled={true}>Next</button>
          </div>
        </div>
      </div>
    );
}

export default ComponentEmployeeList;