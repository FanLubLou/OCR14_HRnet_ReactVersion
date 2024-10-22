import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ComponentSortableHeader from './ComponentSortableHeader';


const EmployeeListComponent = () => {
    const employees = useSelector((state) => state.employees.employees); 
    const [search, setSearch] = useState(""); 
    const [entries, setEntries] = useState(10); 
    const [filteredData, setFilteredData] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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


    return (
      <div className="containerEmployeeTable">
        <div className="headerEmployeeTable">
          <div className="itemsEmployeeTable">
            Show{" "}
            <select value={entries} onChange={handleEntriesChange}>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>{" "}
            entries
          </div>
          <div className="searchEmployeeTable">
            Search: <input type="text" value={search} onChange={handleSearchChange} />
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
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="employeeTable-no-data">
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