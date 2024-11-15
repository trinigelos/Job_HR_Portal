import React, { useState, useCallback, useContext } from 'react';
import { debounce } from 'lodash';
import { SearchContext } from './SearchContext'; // Import SearchContext
import "./SearchBar.css";

export default function SearchBar() {
    // Local state for the search form
    const [form, setForm] = useState({
        searchTerm: '',
        location: ''
    });

    // Destructure the setter functions from SearchContext
    const { setSearchTerm, setLocation } = useContext(SearchContext);

    // Debounced function to update the search context
    // This function will delay updates until the user stops typing
    const debouncedSearch = useCallback(
        debounce((searchTerm, location) => {
            setSearchTerm(searchTerm);
            setLocation(location);
        }, 100), // Adjust delay to control responsiveness
        [setSearchTerm, setLocation]
    );

    // Handle changes to the input fields
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update local form state
        setForm((prev) => {
            const updatedForm = { ...prev, [name]: value }; // Get updated form values
            
            // Debounced update to the context values
            debouncedSearch(updatedForm.searchTerm, updatedForm.location);

            return updatedForm; // Return the updated form state
        });
    };

    // Handle clicking the search button for an immediate search
    const handleSearch = () => {
        setSearchTerm(form.searchTerm);
        setLocation(form.location);
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
                        onChange={handleChange} // Update state on change
                    />

                    {/* Location Input */}
                    <input
                        type="text"
                        name="location"
                        className="location-input"
                        placeholder="Ubicación"
                        value={form.location}
                        onChange={handleChange} // Update state on change
                    />

                    {/* Search Button */}
                    <button className="search-btn" onClick={handleSearch}>Buscar</button>
                </div>
            </div>
        </div>
    );
}
