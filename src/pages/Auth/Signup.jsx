//pages/Signup.jsx
import React, {useState} from "react";
import {signup} from "../../services/auth";
import {useNavigate} from "react-router-dom";
import "./Login.css"
import * as PATHS from "../../utils/paths";
import * as USER_HELPERS from "../../utils/userToken";

export default function Signup({authenticate}) {
    const [form,
        setForm] = useState({username: "", password: "", email: ""});
    const {username, password, email} = form;
    const [error,
        setError] = useState(null);
    const [errorMessage,
        setErrorMessage] = useState('');
    const [showSuccessAlert,
        setShowSuccessAlert] = useState(false);
    const [confirmPassword,
        setConfirmPassword] = useState('');
    const [showPassword,
        setShowPassword] = useState(false);

    const navigate = useNavigate();

    function handleInputChange(event) {
        const {name, value} = event.target;
        return setForm({
            ...form,
            [name]: value
        });
    }

    function handleFormSubmission(event) {
        event.preventDefault();

        //message error
        setErrorMessage("");

        //check if passwords match
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        } else if (!username || !email || !password || !confirmPassword) {
            setErrorMessage("All fields are required.");
            return;
        }

        //create credentials for signup
        const credentials = {
            username,
            password,
          email, 
            confirmPassword
        };

        signup(credentials).then((res) => {
            if (!res.status) {
                // unsuccessful signup
                console.error("Signup was unsuccessful: ", res);
                return setError({message: "Error al registrarte, intenta nuevamente"});
            }
            // successful signup
            USER_HELPERS.setUserToken(res.data.accessToken);
            authenticate(res.data.user);
            setShowSuccessAlert(true);

            // Reset the form fields
            setForm({username: "", password: "", email: ""});
            setConfirmPassword("");
        });
      
      }
      const handleCloseAlert = () => {
        setShowSuccessAlert(false);
        navigate(PATHS.LOGINPAGE);
        };

  return (
      
    <div className="form-control signup-form background-signup">
      
      <form onSubmit={handleFormSubmission}>

        {/* show error message when it happens */}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
         {/* Show success card when correctly signed up */}
         {showSuccessAlert && (
          <div className="success-alert">
            <p>Tu cuenta fue creada.</p>
            <button onClick={handleCloseAlert}>OK</button>
          </div>
        )}        

        <h2 className='h2-form'>Crea tu cuenta</h2>

        <input
                    id="input-username"
                    type="text"
                    name="username"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={handleInputChange}
                    required/>

                <input
                    id="input-email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleInputChange}
                    required/>

                {/* Password input field */}
        <div className="password-field">
          <input
            id="input-password"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            required
            minLength="8"
          />
          <span
            className="material-symbols-outlined toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'visibility_off' : 'visibility'}
          </span>
        </div>
        
        
       {/* Confirm Password input field */}
       <div className="password-field">
          <input
            id="input-confirm-password"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <span
            className="material-symbols-outlined toggle-password"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'visibility_off' : 'visibility'}
          </span>
        </div>

        {error && (
          <div className="error-block">
            <p>{error.message}</p>
          </div>
        )}


                <button className="signin-btn" type="submit">
                    Registrate
                </button>
            </form>
        </div>
    );
}
