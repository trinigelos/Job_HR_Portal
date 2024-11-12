import React from "react";
import { Outlet, useLocation, matchPath } from "react-router-dom";
import Sidebar from "./Protected/SideBar";
import "./Protected/Dashboard.css"
import SearchBar from "../components/SearchBar/SearchBar";


const ProtectedPage = ({ user, handleLogout }) => {
    const location = useLocation(); // Get current location path

    // Define routes for which the SearchBar should be hidden
    const noSearchBarPaths = [
        "/dashboard/post-job",
        "/dashboard/edit-job",
        "/dashboard/job/:jobId",
    ];

    // Check if the current path matches any of the paths where SearchBar should not be displayed
    const shouldHideSearchBar = noSearchBarPaths.some((path) =>
        matchPath({ path, exact: true }, location.pathname)
    );
    return (
        <div className="dashboard-container">
            {/* Sidebar Component */}
                <Sidebar handleLogout={handleLogout}/>

            {/* Main Content Area */}
            <div className="main-content">
            {!shouldHideSearchBar && <SearchBar />}
                
                {/* Nested Routes Content */}
          
   
          <Outlet />
            </div>
        </div>
    );
};

export default ProtectedPage;
