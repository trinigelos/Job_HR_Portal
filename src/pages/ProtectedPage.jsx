import React from "react";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import Sidebar from "./Protected/SideBar";
import "./Protected/Dashboard.css"
import SearchBar from "../components/SearchBar/SearchBar";
import { SearchProvider } from "../components/SearchBar/SearchContext";

const ProtectedPage = ({ user, handleLogout }) => {
    const location = useLocation(); // Get current location path

    // Define routes for which the SearchBar should be hidden
    const noSearchBarPaths = [
        "/dashboard/post-job",
        "/dashboard/edit-job/:jobId",
        "/dashboard/job/:jobId",
    ];

    // Check if the current path matches any of the paths where SearchBar should not be displayed
    const shouldHideSearchBar = noSearchBarPaths.some((path) =>
        matchPath({ path, exact: true }, location.pathname)
    );

    // Handle Search - This will be passed to SearchBar
    const handleSearch = (searchTerm, location) => {
        console.log("Search Term:", searchTerm, "Location:", location);
        // You need to pass these values to JobList or your fetching logic
    };


    return (
        // wrapped in searchcontext to make the searchbar functional.
        <SearchProvider > 
        <div className="dashboard-container">
            {/* Sidebar Component */}
                <Sidebar handleLogout={handleLogout}/>

            {/* Main Content Area */}
            <div className="main-content">
            {!shouldHideSearchBar && <SearchBar onSearch={handleSearch} />}
                
                {/* Nested Routes Content */}
          
   
          <Outlet />
            </div>
            </div>
            </SearchProvider>
    );
};

export default ProtectedPage;
