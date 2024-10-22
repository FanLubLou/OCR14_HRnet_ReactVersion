import React from 'react'

export default function ComponentSortableHeader({ column, label, sortConfig, requestSort }) {
    const isSorted = sortConfig.key === column;
    return (
      <th onClick={() => requestSort(column)}>
        <div className="sortableHeaderContent">
          <span>{label}</span>
          <span className="sortableHeaderIndicator">
            {isSorted && sortConfig.direction === 'ascending' ? '▲' : '▼'}
          </span>
        </div>
      </th>
    );
  };