import React, { useState, useCallback } from 'react';
import { debounce } from 'lodash'; // Using lodash to debounce the search
import "./SearchBar.css";

export default function SearchBar({ onSearch }) {
    const [form, setForm] = useState({
        searchTerm: '',
        location: ''
    });

    // Debounced onSearch to avoid frequent function calls while typing
    const debouncedOnSearch = useCallback(
        debounce((updatedSearchTerm, updatedLocation) => {
            onSearch(updatedSearchTerm, updatedLocation);
        }, 300), // Adjust delay as necessary
        [onSearch]
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => {
            const updatedForm = { ...prev, [name]: value };
            debouncedOnSearch(updatedForm.searchTerm, updatedForm.location);
            return updatedForm;
        });
    };

    const handleSearch = () => {
        // Trigger search immediately when clicking the button
        onSearch(form.searchTerm, form.location);
    };

    return (
        <div className="search-bar-container">
            <div className="search-bar">
                <div className="search-input-container">
                    {/* Search Term Input */}
                    <input
                        type="text"
                        name="searchTerm"
                        className="search-input"
                        placeholder="Empleo..."
                        value={form.searchTerm}
                        onChange={handleChange}
                    />

                    {/* Location Input */}
                    <input
                        type="text"
                        name="location"
                        className="location-input"
                        placeholder="Ubicación"
                        value={form.location}
                        onChange={handleChange}
                    />

                    {/* Search Button */}
                    <button className="search-btn" onClick={handleSearch}>Buscar</button>
                </div>
            </div>
        </div>
    );
}
