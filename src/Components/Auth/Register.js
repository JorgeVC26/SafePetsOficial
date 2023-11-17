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
  const [role, setRole] = useState('admin'); // Valor predeterminado: usuario
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const getNextUserId = (users) => {
    // Encuentra el máximo 'id' en los usuarios registrados
    const maxId = users.reduce((max, user) => (user.id > max ? user.id : max), 0);
    // Asigna el siguiente 'id' al nuevo usuario
    return maxId + 1;
  };

  const isFormValid = () => {
    // Verificar si algún campo está en blanco
    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Por favor, completa todos los campos.');
      return false;
    }

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden');
      return false;
    }

    // Limpiar los mensajes de error si no hay problemas
    setErrorMessage('');

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Verificar si el formulario es válido
    if (!isFormValid()|| !captchaValue) {
            return;
    }

    // Crear un objeto para almacenar los datos del usuario
    const userData = { id: 0, name, email, password, role };

    // Obtener los datos actuales de usuarios desde el Local Storage
    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Asignar un 'id' único al nuevo usuario
    userData.id = getNextUserId(existingUsers);

    // Agregar el nuevo usuario al arreglo de usuarios
    const updatedUsers = [...existingUsers, userData];

    // Guardar el arreglo actualizado en Local Storage como cadena JSON
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Mostrar el mensaje de éxito
    setSuccessMessage('Registro exitoso. Redirigiendo al inicio de sesión...');

    // Limpiar el formulario después de un breve retraso (ajustable según tus necesidades)
    setTimeout(() => {
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setRole('usuario');
      setSuccessMessage('');
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

          {errorMessage && <div className="error-message">{errorMessage}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
          <button style={{ marginTop: '2rem'}} type="submit" disabled={!captchaValue} >Registrarse</button>        </form>
      </div>
    </div>
  );
}

export default Register;