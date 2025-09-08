import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation

const SearchBar = ({ onSearch, onFilterChange, filters }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (typeof onSearch === "function") {
      onSearch(searchQuery);
    } else {
      console.error("onSearch is not a function. Make sure it's passed from the parent component.");
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    if (typeof onFilterChange === "function") {
      onFilterChange(name, value);
    } else {
      console.error("onFilterChange is not a function. Make sure it's passed from the parent component.");
    }
  };

  return (
    <div className="search-bar-container">
      <div className="search-bar">
        <div className="search-input-group">
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Name or ID"
          />
          <button className="search-button" onClick={handleSearch}>
            Search
          </button>
        </div>

        <div className="filter">
          <label>Filter by Tag:</label>
          <select
            className="filter-select"
            name="tagFilter"
            value={filters?.tagFilter || ""}
            onChange={handleFilterChange}
          >
            <option value="">All Tags</option>
            <option value="vip">VIP</option>
            <option value="regular">Regular</option>
            <option value="new">New</option>
          </select>
        </div>

        <div className="filter">
          <label>Sort by:</label>
          <select
            className="filter-select"
            name="sortOrder"
            value={filters?.sortOrder || "asc"}
            onChange={handleFilterChange}
          >
            <option value="asc">Ascending ↑</option>
            <option value="desc">Descending ↓</option>
          </select>
        </div>
      </div>

      <style>
        {`
        .search-bar-container {
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .search-input-group {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .search-input {
          width: 250px;
          padding: 10px;
          border: 1px solid #ced4da;
          border-radius: 4px;
        }

        .search-button {
          padding: 10px 20px;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .search-button:hover {
          background-color: #0056b3;
        }

        .filter {
          display: flex;
          flex-direction: column;
        }

        .filter-select {
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ced4da;
          width: 180px;
        }

        label {
          font-size: 12px;
          font-weight: 500;
          margin-bottom: 5px;
        }
        `}
      </style>
    </div>
  );
};

// Validate that props are functions
SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onFilterChange: PropTypes.func.isRequired,
  filters: PropTypes.object,
};

// Default props in case they are missing
SearchBar.defaultProps = {
  onSearch: () => console.warn("onSearch function is missing"),
  onFilterChange: () => console.warn("onFilterChange function is missing"),
  filters: {},
};

export default SearchBar;
