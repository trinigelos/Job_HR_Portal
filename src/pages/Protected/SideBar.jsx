// Sidebar.jsx
import React from "react";
import {NavLink} from "react-router-dom";
import "./SideBar.css";

const Sidebar = ({handleLogout}) => {
    return (
        
            <div className="sidebar">
                <div className="nav-items">
                    <div className="navlinks-sidebar">
                        <NavLink
                            to="/dashboard/jobs"
                            className={({isActive}) => (isActive
                            ? "active-tab"
                            : "not-active sidelinkHover")}>
                            Trabajos
                        </NavLink>

                    </div>
                    <div className="navlinks-sidebar">
                        <NavLink
                            to="/dashboard/post-job"
                            className={({isActive}) => (isActive
                            ? "active-tab"
                            : "not-active sidelinkHover")}>
                            Publicar
                        </NavLink>
                    </div>
                    <div className="navlinks-sidebar">
                        <div onClick={handleLogout} className="logout-button sidelinkHover">
                            Logout
                        </div>
                    </div>

                </div>
            </div>
       
    );
};

export default Sidebar;
