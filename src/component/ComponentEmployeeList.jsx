import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ComponentSortableHeader from './ComponentSortableHeader';
import { deleteEmployee } from '../features/Employee/EmployeeSlice';
import { FaTimes } from 'react-icons/fa'
import { FaPenToSquare } from 'react-icons/fa6';

const EmployeeListComponent = () => {

  /***********  déclaration et initilisation des états et de leur fonction de modification***************/
  
    const employees = useSelector((state) => state.employees.employees); 
    const [search, setSearch] = useState(""); 
    const [entries, setEntries] = useState(10); 
    const [filteredData, setFilteredData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  /***********  Instanciation des hooks ***************/  

    const dispatch = useDispatch();
    const navigate = useNavigate();

  /*************Effet secondaire déclenché après le rendu et son tableau de dépendance **********/

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

/*************Effet secondaire déclenché après le rendu et son tableau de dépendance **********/

  const handleSearchChange = (e) => {
      setSearch(e.target.value);
    };

    const handleEntriesChange = (e) => {
      setEntries(parseInt(e.target.value));
  };
  
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

  const handleDelete = (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      dispatch(deleteEmployee(employeeId));
    }
  };

  const handleEdit = (employeeId) => {
    navigate(`/edit/${employeeId}`);
};

    return (
      <div className="containerEmployeeTable">
        <div className="headerEmployeeTable">
          <div className="itemsEmployeeTable">
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
            <input type="text" value={search} onChange={handleSearchChange} />
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
                  <td>{new Date(item.startDate).toISOString().split('T')[0]}</td>
                  <td>{item.department}</td>
                  <td>{new Date(item.dateOfBirth).toISOString().split('T')[0]}</td>        
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

export default EmployeeListComponent;