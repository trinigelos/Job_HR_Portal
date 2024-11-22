import React, { useState, useCallback, useContext } from 'react';
import { debounce } from 'lodash';
import { SearchContext } from './SearchContext'; // Import SearchContext
import "./SearchBar.css";

export default function SearchBar() {
    // Local state for the search form
    const [form, setForm] = useState({
        searchTerm: '',
        locationTerm: ''
    });

    // Destructure the setter functions from SearchContext
    const { setSearchTerm, setLocationTerm } = useContext(SearchContext);

    // Debounced function to update the search context
    // This function will delay updates until the user stops typing
    const debouncedSearch = useCallback(
        debounce((searchTerm, locationTerm) => {
            setSearchTerm(searchTerm);
            setLocationTerm(locationTerm);
        }, 200), // Adjust delay to control responsiveness
        [setSearchTerm, setLocationTerm]
    );

    // Handle changes to the input fields
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update local form state
        setForm((prev) => {
            const updatedForm = { ...prev, [name]: value }; // Get updated form values
            
            // Debounced update to the context values
            debouncedSearch(updatedForm.searchTerm, updatedForm.locationTerm);

            return updatedForm; // Return the updated form state
        });
    };

    // Handle clicking the search button for an immediate search
    const handleSearch = () => {
        setSearchTerm(form.searchTerm);
        setLocationTerm(form.locationTerm);
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
                        name="locationTerm"
                        className="location-input"
                        placeholder="Provincia, Ciudad, Región, Zona, etc"
                        value={form.locationTerm}
                        onChange={handleChange} // Update state on change
                    />

                    {/* Search Button */}
                    <button className="search-btn" onClick={handleSearch}>Buscar</button>
                </div>
            </div>
        </div>
    );
}
