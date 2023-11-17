import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Auth/NavbarHome';
import '../../css/login.css';
import ReCAPTCHA from "react-google-recaptcha";


function Register() {
  const [captchaValue, setCaptchaValue] = useState(null);

  const authToken = localStorage.getItem('authToken');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('usuario');
  const [passwordError, setPasswordError] = useState('');
  const [formError, setFormError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const navigate = useNavigate();

  const getNextUserId = (users) => {
    const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    return maxId + 1;
  };

  const isFormValid = () => {
    // Verificar si algún campo está en blanco
    if (!name || !email || (!password && !confirmPassword)) {
      setFormError('Por favor, completa todos los campos.');
      return false;
    }

    // Limpiar mensajes de error si no hay problemas
    setPasswordError('');
    setFormError('');

    // Verificar si las contraseñas coinciden
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()|| !captchaValue) {
      return;
    }

    const userData = { id: 0, name, email, password, role };
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];
    userData.id = getNextUserId(existingUsers);
    const updatedUsers = [...existingUsers, userData];
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Mostrar el mensaje de registro exitoso
    setRegistrationSuccess(true);

    // Redirigir al login después de 2 segundos (ajustable según tus necesidades)
    setTimeout(() => {
      setRegistrationSuccess(false);
      navigate('/login');
    }, 2000);
  };

  return (
    <div>
      <Navbar authToken={authToken} />
      <div className="formRegister">
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
            <ReCAPTCHA 
                sitekey="6LeRZwspAAAAAFowRBpENYBi0WmY5BwIop8TB-nY"
                onChange={(value) => setCaptchaValue(value)}
              />
          {formError && <span className="error-message">{formError}</span>}
          {passwordError && <span className="error-message">{passwordError}</span>}
          {/* <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Colaborador</option>
          </select> */}
          <button style={{ marginTop: '2rem'}} type="submit" disabled={!captchaValue} >Registrarse</button>
        </form>

        {registrationSuccess && (
          <div className="success-message">Registro exitoso. Redirigiendo al inicio de sesión...</div>
        )}



        
      </div>
    </div>
  );
}

export default Register;