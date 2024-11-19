//protected page, access after loggin in - all other routes are children.
import React from "react";
import {Outlet, useLocation, matchPath, Navigate} from "react-router-dom";
import Sidebar from "./SideBar";
import "./Dashboard.css"
import SearchBar from "../../components/SearchBar/SearchBar";
import * as PATHS from "../../utils/paths";

const ProtectedPage = ({user, handleLogout}) => {
    const location = useLocation();

    // Redirect to login if user is not authenticated
    if (!user) {
        return <Navigate to={PATHS.LOGINPAGE} replace/>;
    }

    // Define routes for which the SearchBar should be hidden
    const noSearchBarPaths = ["/dashboard/post-job", "/dashboard/edit-job/:jobId", "/dashboard/job/:jobId"];

    // Check if the current path matches any of the paths where SearchBar should not be displayed
    const shouldHideSearchBar = noSearchBarPaths.some((path) => matchPath({
        path,
        exact: true
    }, location.pathname));

    return (

        <div className="dashboard-container">
            {/* Sidebar Component */}
            <Sidebar handleLogout={handleLogout}/> {/* Main Content Area */}
            <div className="main-content">
                {!shouldHideSearchBar && <SearchBar/>}

                {/* Nested Routes Content */}

                <Outlet/>
            </div>
        </div>
    );
};

export default ProtectedPage;
