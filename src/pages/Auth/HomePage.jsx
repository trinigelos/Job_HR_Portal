import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import * as PATHS from '../../utils/paths';
import './Login.css';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine the active form based on the current path
  const isSignupPath = location.pathname === PATHS.SIGNUPPAGE;

  // Setting the signup page as standard
  const [isSignupActive, setIsSignupActive] = useState(isSignupPath);

  // Sync the style state with the URL
  useEffect(() => {
    setIsSignupActive(isSignupPath);
  }, [isSignupPath]);

  // Handlers to navigate to signup and login
  function handleToggleToSignup() {
    setIsSignupActive(true); // Update the style
      navigate(PATHS.SIGNUPPAGE); // Update the URL
  }

  function handleToggleToLogin() {
    setIsSignupActive(false); // Update the style
      navigate(PATHS.LOGINPAGE); // Update the URL
  }

  return (
    <div className="whole-container">
      <div className={`login-container ${isSignupActive ? 'change' : ''}`}>
        <div className="forms-container">
          {/* Render the nested Signup or Login form here */}
          <Outlet />
        </div>
        <div className="intros-container">
          <div className="intro-control signin-intro">
            <div className="intro-control__inner">
              <h2>Bienvenido!</h2>
              <p>Todavía no tienes cuenta?</p>
              <button id="signup-btn" onClick={handleToggleToSignup}>
                Registrate
              </button>
            </div>
          </div>
          <div className="intro-control signup-intro">
            <div className="intro-control__inner">
              <h2>Bienvenido!</h2>
              <p>Ya tienes cuenta?</p>
              <button id="signin-btn" onClick={handleToggleToLogin}>
                Ingresa
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
