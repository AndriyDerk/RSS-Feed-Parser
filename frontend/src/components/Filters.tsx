import React, { useState } from 'react';

interface FiltersProps {
  onSearch: (query: string) => void;
  onSort: (order: string) => void;
  onDateFilter: (from: string, to: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ onSearch, onSort, onDateFilter }) => {
  const [search, setSearch] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onSort(value);
  };

  const handleFromDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFromDate(value);
    onDateFilter(value, toDate); 
  };

  const handleToDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setToDate(value);
    onDateFilter(fromDate, value); 
  };

  return (
    <div className="filters">
      <input
        type="text"
        placeholder="Search posts..."
        value={search}
        onChange={handleSearchChange}
        className="p-2 rounded border border-gray-500"
      />
      <select
        onChange={handleSortChange}
        className="p-2 rounded border border-gray-500"
        defaultValue="desc"
      >
        <option value="desc">Newest to Oldest</option>
        <option value="asc">Oldest to Newest</option>
      </select>
      <div className="date-filters">
        <input
          type="date"
          value={fromDate}
          onChange={handleFromDateChange}
          className="p-2 rounded border border-gray-500"
        />
        <input
          type="date"
          value={toDate}
          onChange={handleToDateChange}
          className="p-2 rounded border border-gray-500"
        />
      </div>
    </div>
  );
};

export default Filters;
