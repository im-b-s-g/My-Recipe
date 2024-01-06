import React from 'react';
import './Filter.css';

const Filter = ({ filters, onFilterChange }) => {
    const { category } = filters;

    const handleInputChange = (field, value) => {
        onFilterChange({
            ...filters,
            [field]: value,
        });
    };

    return (
        <div className="filter-container">
            <label htmlFor="Category" className="filter-label">
                Select Your Food Choice
            </label>
            <select
                className="filter-select"
                value={category}
                type="select"
                onChange={(e) => handleInputChange("category", e.target.value)}
            >
                <option value="">Select</option>
                <option value="veg">Veg</option>
                <option value="non-veg">Non Veg</option>
            </select>
        </div>
    );
};

export default Filter;