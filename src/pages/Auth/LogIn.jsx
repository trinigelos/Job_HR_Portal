//pages/LogIn.jsx
import React, { useState } from "react";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import "./Signup";
import "./Login.css"
import * as USER_HELPERS from "../../utils/userToken";

export default function LogIn({ authenticate }) {

  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
  });
  const { username, password, email } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  function handleInputChange(event) {
    const { name, value } = event.target;

    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const credentials = {
      username,
      password,
      email
    };
    login(credentials).then((res) => {
      if (!res.status) {
        return setError({ message: "Invalid credentials" });
      }
      USER_HELPERS.setUserToken(res.data.accessToken);
      authenticate(res.data.user);
      navigate("/dashboard/jobs");
    });
  }

  return (
    <div className="form-control signin-form background-login">
      <form onSubmit={handleFormSubmission} className="signup__form">
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

        <h2 className='h2-form'>Ingresa</h2>
        <input
          id="input-username"
          type="text"
          name="username"
          placeholder="Usuario o Email"
          value={username}
          onChange={handleInputChange}
          required
        />

        <input
          id="input-password"
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={handleInputChange}
          required
          minLength="8"
        />

        {error && (
          <div className="error-block">
            <p>Hubo un error, intenta nuevamente</p>
          </div>
        )}

        <button className="signin-btn" type="submit">
          Ingresa
        </button>
      </form>
    </div>
  );
}
