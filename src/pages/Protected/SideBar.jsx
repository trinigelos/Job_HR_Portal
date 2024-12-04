// Sidebar.jsx
import React from "react";
import {NavLink} from "react-router-dom";
import "./SideBar.css";

const Sidebar = ({ handleLogout }) => {
       
     
    return (
    
        <div className="sidebar">
 
                <div className="nav-items">
                    <div className="navlinks-sidebar">
                        <NavLink
                            to="/dashboard/jobs"
                            className={({isActive}) => (isActive
                            ? "active-tab"
                            : "not-active sidelinkHover")}>
                            TRABAJOS
                        </NavLink>

                    </div>
                    <div className="navlinks-sidebar">
                        <NavLink
                            to="/dashboard/post-job"
                            className={({isActive}) => (isActive
                            ? "active-tab"
                            : "not-active sidelinkHover")}>
                            PUBLICAR
                        </NavLink>
                </div>
                <div className= "navlinks-sidebar">
                        <NavLink
                            to="/clientdashboard"
                            target="_blank" 
                            >
                            PORTAL USUARIO
                        </NavLink>
                    </div>
                    <div className="navlinks-sidebar">
                        <div onClick={handleLogout} className="logout-button sidelinkHover">
                            CERRAR SESION
                        </div>
                    </div>

                </div>
            </div>
            
       
    );
};

export default Sidebar;
