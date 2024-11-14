import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ComponentSortableHeader from '../ComponentSortableHeader/ComponentSortableHeader';
import { deleteEmployee } from '../../features/Employee/EmployeeSlice';
import { FaTimes } from 'react-icons/fa'
import { FaPenToSquare } from 'react-icons/fa6';


/**
 * Component for displaying and managing the list of employees.
 * 
 * Key features:
 * - Displays a paginated table of employees with sortable columns
 * - Allows searching employees by name, department, city, or state
 * - Provides options to change the number of entries displayed per page
 * - Supports editing and deleting individual employee records
 * - Implements client-side sorting and filtering of employee data
 * 
 * @returns {JSX.Element} The employee list component
 */


const ComponentEmployeeList = () => {

  /*********** Declaration and initialization of states and their modification functions ***************/

    const employees = useSelector((state) => state.employees.employees); 
    const [search, setSearch] = useState(""); 
    const [entries, setEntries] = useState(10); 
    const [filteredData, setFilteredData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
    /***States to handle pagination according to employees'quantiey*/
    const [currentPage, setCurrentPage] = useState(1);
   

  /***********  hook's Instantiation  ***************/  

    const dispatch = useDispatch();
    const navigate = useNavigate();

  /************* Side effect triggered after rendering and its dependency array to handle searching feature **********/

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
  
  /**
 * Resets the current page to 1 when the number of entries per page or the search term changes.
 * 
 * This effect ensures that the user is always brought back to the first page of results
 * when they change the number of entries to display or modify their search criteria.
 * This prevents scenarios where the user might be on a page that no longer exists
 * after changing these parameters.
 *
 * @effect
 * @dependency {number} entries - The number of entries to display per page
 * @dependency {string} search - The current search term
 */
  useEffect(() => {
    setCurrentPage(1);
  }, [entries, search]);

  /*************Component Functions declarations **********/

  /**
   * Handles changes in the search input.
   * @param {Event} e - The change event
   * @returns {void}
  */

  const handleSearchChange = (e) => {
      setSearch(e.target.value);
  };
  
    /**
   * Handles changes in the number of entries to display.
   * @param {Event} e - The change event
   * @returns {void}
   */

    const handleEntriesChange = (e) => {
      setEntries(parseInt(e.target.value));
  };

  /**
 * Sorts the data based on the given configuration.
 * @param {Array<Object>} data - The array of employee objects to sort
 * @param {Object} sortConfig - The sorting configuration
 * @param {string|null} sortConfig.key - The key to sort by (e.g., 'firstName', 'lastName', etc.)
 * @param {'ascending'|'descending'} sortConfig.direction - The sort direction
 * @returns {Array<Object>} The sorted array of employee objects
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
 * 
 * This function updates the sort configuration based on the given key:
 * 1. If the key is different from the current sort key, it sets the direction to 'ascending'.
 * 2. If the key is the same as the current sort key:
 *    - If the current direction is 'ascending', it changes to 'descending'.
 *    - If the current direction is 'descending', it changes back to 'ascending'.
 * 3. Finally, it updates the sortConfig state with the new key and direction.
 * 
 * @param {string} key - The key to sort by (corresponds to a column in the table)
 * @returns {void}
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
 * After confirmation, it dispatches the deleteEmployee action to remove the employee from the Redux store.
 * This will update the global state, causing the component to re-render with the updated list.
 * 
 * @param {string} employeeId - The ID of the employee to delete
 * @returns {void}
 */

  const handleDelete = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(employeeId));
    }
  };

/**
 * Handles the editing of an employee.
 * This function navigates to the edit page for the specified employee.
 * The navigation will cause a route change, rendering the edit form for the selected employee.
 * 
 * @param {string} employeeId - The ID of the employee to edit
 * @returns {void}
 */

  const handleEdit = (employeeId) => {
    navigate(`/edit/${employeeId}`);
  };

 /**
   * Formats a date string to a localized date string.
   * @param {string} dateString - The date string to format
   * @returns {string} The formatted date string
   */

  
/**
 * Calculates the index of the last item on the current page.
 *
 * @constant
 * @type {number}
 */
const indexOfLastItem = currentPage * entries;

/**
 * Calculates the index of the first item on the current page.
 *
 * @constant
 * @type {number}
 */
const indexOfFirstItem = indexOfLastItem - entries;

/**
 * Gets the current items to be displayed based on the current page.
 *
 * @constant
 * @type {Array}
 */
const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

/**
 * Calculates the total number of pages based on the filtered data and number of entries per page.
 *
 * @constant
 * @type {number}
 */
const totalPages = Math.ceil(filteredData.length / entries);

/**
 * Handles the action of going to the previous page. Updates the current page state, ensuring it doesn't go below 1.
 *
 * @function
 * @returns {void}
 */
const handlePrevious = () => {
  setCurrentPage(prev => Math.max(prev - 1, 1));
};

/**
 * Handles the action of going to the next page. Updates the current page state, ensuring it doesn't exceed the total pages.
 *
 * @function
 * @returns {void}
 */
const handleNext = () => {
  setCurrentPage(prev => Math.min(prev + 1, totalPages));
};  

  /**
 * Formats a date string into a readable date format (locale-based).
 *
 * @function
 * @param {string} dateString - The date string to format (ISO format expected).
 * @returns {string} - A formatted date string based on the user's locale, or 'N/A' if the input is invalid.
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

        <div className="table-container">
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
              {currentItems.length > 0 ? (
                currentItems.map((item, index) => (
                  <tr key={item.id}>
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
        </div>  

        <div className="employeeTable-footer">
          <div className="employeeTable-info">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="employeeTable-pagination">
            <button onClick={handlePrevious} disabled={currentPage === 1}>Previous</button>
            <button onClick={handleNext} disabled={currentPage === totalPages}>Next</button>
          </div>
        </div>
      </div>
    );
}

export default ComponentEmployeeList;