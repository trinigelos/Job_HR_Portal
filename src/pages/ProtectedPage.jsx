import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Protected/SideBar";
import "./Protected/Dashboard.css"
import SearchBar from "../components/SearchBar/SearchBar";


const ProtectedPage = ({user, handleLogout}) => {
    return (
        <div className="dashboard-container">
            {/* Sidebar Component */}
                <Sidebar handleLogout={handleLogout}/>

            {/* Main Content Area */}
            <div className="main-content">
          <SearchBar /> {/* Nested Routes Content */}
          
   
          <Outlet />
            </div>
        </div>
    );
};

export default ProtectedPage;
