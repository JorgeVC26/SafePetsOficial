import React, { useState, useEffect } from 'react';
import Mensaje from './Mensaje';
import CerrarBtn from '../img/cerrar.svg';
import '../Style/style.css';

const Modal = ({
  setModal,
  animarModal,
  setAnimarModal,
  guardarServicio,
  servicioEditar,
  setServicioEditar,
}) => {
  const [mensaje, setMensaje] = useState('');
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [precio, setPrecio] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [categoria, setCategoria] = useState('');
  const [imagen, setImagen] = useState('');
  const [fecha, setFecha] = useState('');
  const [id, setId] = useState('');
  const [estado, setEstado] = useState('Pendiente');
  const [descripcion, setDescripcion] = useState('');
  const usuarioActivo = JSON.parse(localStorage.getItem('UsuarioActivo'));
  const usuarioActivoName = usuarioActivo[0].name;

  useEffect(() => {
    if (Object.keys(servicioEditar).length > 0) {
      setEmail(servicioEditar.email);
      setNombre(servicioEditar.nombre);
      setApellido(servicioEditar.apellido);
      setTelefono(servicioEditar.telefono);
      setPrecio(servicioEditar.precio);
      setUbicacion(servicioEditar.ubicacion);
      setCategoria(servicioEditar.categoria);
      setImagen(servicioEditar.imagen);
      setId(servicioEditar.id);
      setFecha(servicioEditar.fecha);
      setDescripcion(servicioEditar.descripcion);
    }
  }, [servicioEditar]);

  const ocultarModal = () => {
    setAnimarModal(false);
    setServicioEditar({});
    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, apellido, precio, ubicacion, categoria].includes('')) {
      setMensaje('Todos los Campos son obligatorios');

      setTimeout(() => {
        setMensaje('');
      }, 3000);
      return;
    }

    guardarServicio({
      email,
      nombre,
      apellido,
      telefono,
      precio,
      ubicacion,
      categoria,
      imagen,
      id,
      fecha,
      estado,
      usuarioActivoName,
      descripcion,
    });
  };

  return (
    <div className="modal">
      <div className="cerrar-modal">
        <img
          src={CerrarBtn}
          alt="cerrar modal"
          onClick={ocultarModal}
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
      >
        <legend>{servicioEditar.nombre ? 'Editar Servicio' : 'Nuevo Servicio'}</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

        <div className='campo'>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Añade el email del colaborador"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor="nombre">Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Añade el nombre del colaborador"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor="apellido">Apellidos</label>
          <input
            id="apellido"
            type="text"
            placeholder="Añade el primer apellido del colaborador"
            value={apellido}
            onChange={e => setApellido(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor="telefono">Telefono</label>
          <input
            id="telefono"
            type="text"
            placeholder="Añade el telefono del colaborador"
            value={telefono}
            onChange={e => setTelefono(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor="precio">Tarifa</label>
          <input
            id="precio"
            type="number"
            placeholder="Indica la tarifa por hora"
            value={precio}
            onChange={e => setPrecio(Number(e.target.value))}
          />
        </div>

        <div className='campo'>
          <label htmlFor="ubicacion">Ubicación</label>
          <input
            id="ubicacion"
            type="text"
            placeholder="Zona donde ofrece el servicio"
            value={ubicacion}
            onChange={e => setUbicacion(e.target.value)}
          />
        </div>

        <div className='campo'>
          <label htmlFor="categoria">Tipo de Servicio</label>
          <select
            name=""
            id="categoria"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          >
            <option value="">-- Seleccione --</option>
            <option value="paseo">Paseo</option>
            <option value="higiene">Higiene y Estética</option>
            <option value="cuido">Cuidado completo</option>
            <option value="restaurante">Restaurante</option>
          </select>
        </div>

        <div className='campo'>
          <label htmlFor="descripcion">Descripcion</label>
          <input
            id="descripcion"
            type="text"
            placeholder="Añade la descripcion del colaborador"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
        </div>

        <input
          style={{ borderRadius: '1rem' }}
          type="submit"
          value={servicioEditar.nombre ? 'Guardar Cambios' : 'Agregar Servicio'}
        />
      </form>
    </div>
  );
};

export default Modal;