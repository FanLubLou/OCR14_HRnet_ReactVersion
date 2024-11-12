import React from 'react'

/**
 * ComponentSortableHeader renders a sortable table header column.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} props.column - The column identifier
 * @param {string} props.label - The display label for the column
 * @param {Object} props.sortConfig - The current sort configuration
 * @param {string} props.sortConfig.key - The key of the column currently being sorted
 * @param {('ascending'|'descending')} props.sortConfig.direction - The current sort direction
 * @param {Function} props.requestSort - Function to call when sorting is requested
 * @returns {JSX.Element} A table header cell with sorting functionality
 */
export default function ComponentSortableHeader({ column, label, sortConfig, requestSort }) {
  /**
   * Determines if this column is currently being sorted
   * @type {boolean}
   */
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