import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/cards.css'; // Asegúrate de importar tus estilos CSS
import { useNavigate } from 'react-router-dom';

function Usuarios() {
  const [users, setUsers] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [userToDeleteId, setUserToDeleteId] = useState(null);
  const [userDeletedMessage, setUserDeletedMessage] = useState('');
  const navigate = useNavigate();

  const usuarioActivo = JSON.parse(localStorage.getItem('UsuarioActivo'));
  const rol = usuarioActivo ? usuarioActivo[0].role : null;

  const canViewUsers = rol === 'superadmin';

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers && Array.isArray(storedUsers)) {
      setUsers(storedUsers);
    }
  }, []);

  const confirmDeleteHandler = () => {
    const updatedUsers = users.filter((user) => user.id !== userToDeleteId);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setConfirmDelete(false);
    setUserToDeleteId(null);
    setUserDeletedMessage('Usuario eliminado con éxito');
    // Limpia el mensaje después de unos segundos (ajusta el tiempo según tus necesidades)
    setTimeout(() => setUserDeletedMessage(''), 3000);
  };

  const cancelDeleteHandler = () => {
    setConfirmDelete(false);
    setUserToDeleteId(null);
  };

  const handleDelete = (id) => {
    if (rol === 'superadmin') {
      setConfirmDelete(true);
      setUserToDeleteId(id);
    } else {
      alert('No tienes permisos para eliminar usuarios.');
    }
  };

  const handleAddUser = () => {
    if (rol === 'admin' || rol === 'superadmin') {
      navigate('/CrearUsuario');
    } else {
      alert('No tienes permisos para agregar usuarios.');
    }
  };

  const handleEditUser = (id) => {
    if (rol === 'superadmin' || rol === 'admin') {
      navigate(`/editarUsuario/${id}`);
    } else {
      alert('No tienes permisos para editar usuarios.');
    }
  };

  return canViewUsers ? (
    <div className="contenedor-usuarios">
      <header>
        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <a className="titulo" href="/">
              <h1>
                Safe<span>Pets</span>
              </h1>
            </a>
          </Link>
        </div>
      </header>
      <h2>Lista de Usuarios</h2>
      <button className="green-button" onClick={handleAddUser}>
        Agregar Usuario
      </button>
      <Link className="back-button" to="/">
        Regresar
      </Link>

      {confirmDelete && (
        <div className="confirmation-modal">
          <h3>¿Estás seguro de que quieres eliminar este usuario?</h3>
          <div className="confirmation-modal-buttons">
            <button className="confirm" onClick={confirmDeleteHandler}>
              Confirmar
            </button>
            <button className="cancel" onClick={cancelDeleteHandler}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {userDeletedMessage && (
        <div className="user-deleted-message">
          <p>{userDeletedMessage}</p>
        </div>
      )}

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td className="actions">
                <button
                  className="blue-button"
                  onClick={() => handleEditUser(user.id)}
                >
                  Editar
                </button>
                <button
                  className="red-button"
                  onClick={() => handleDelete(user.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="container">
      <h2>No tiene permisos</h2>
    </div>
  );
}

export default Usuarios;