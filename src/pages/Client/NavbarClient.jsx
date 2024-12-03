import React from 'react'
import foto1 from "./images/logoCeciliaMenta.png";
import "./Navbar.css"
import {NavLink} from "react-router-dom";



export default function NavbarClient() {
  return (
       <div className='navbar'>
                <img src={foto1} alt=""/>
                <NavLink
                            to="/clientdashboard/about"
                            className= "btn-navbar">
                            INICIO
                        </NavLink>
                         <NavLink
                            to="/clientdashboard/clientjobs"
                            className= "btn-navbar">
                            TRABAJOS
                        </NavLink>
            </div>  
            )
}
