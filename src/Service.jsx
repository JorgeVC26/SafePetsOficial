import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Filtro from './Components/Filtro';
import Modal from './Components/Modal';
import ListadoServicios from './Components/ListadoServicios';
import { generarId } from './Components/helpers';
import IconoNuevoServicio from './img/nuevo-gasto.svg';
import ControlServicios from './Components/ControlServicios';
import MsjServicio from './MsjServicio'; // Importa el componente MsjServicio

import './Style/style.css';
import './App.css';

function Service() {
  const authToken = localStorage.getItem('authToken');
  const [mensajeModalVisible, setMensajeModalVisible] = useState(false);

  const usuarioActivo = JSON.parse(localStorage.getItem('UsuarioActivo'));
  const rol = usuarioActivo ? usuarioActivo[0].role : null;
  console.log(rol);

  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);

  const [serviciosAprobados, setServiciosAprobados] = useState(
    JSON.parse(localStorage.getItem('serviciosAprobados')) || []
  );
  const [servicioTemporal, setServiciosTemporales] = useState(
    JSON.parse(localStorage.getItem('serviciosTemporales')) || []
  );
  const [mensajeDespuesDeCierre, setMensajeDespuesDeCierre] = useState('');

  const [servicioEditar, setServicioEditar] = useState({});
  const [filtro, setFiltro] = useState('');
  const [serviciosFiltrados, setServiciosFiltrados] = useState([]);

  useEffect(() => {
    if (Object.keys(servicioEditar).length > 0) {
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    }
  }, [servicioEditar]);

  useEffect(() => {
    // Actualizar servicios aprobados en el localStorage
    localStorage.setItem('serviciosAprobados', JSON.stringify(serviciosAprobados));
  }, [serviciosAprobados]);

  useEffect(() => {
    if (filtro) {
      const serviciosFiltrados = serviciosAprobados.filter(
        (servicio) => servicio.categoria === filtro
      );
      setServiciosFiltrados(serviciosFiltrados);
    }
  }, [filtro]);

  const handleNuevoServicio = () => {
    setModal(true);
    setServicioEditar({});
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };



  const [confirmDelete, setConfirmDelete] = useState(false);
  const [servicioToDeleteId, setServicioToDeleteId] = useState(null);

  const confirmDeleteHandler = () => {
    const serviciosActualizados = serviciosAprobados.filter(
      (servicio) => servicio.id !== servicioToDeleteId
    );
    setServiciosAprobados(serviciosActualizados);
    localStorage.setItem('serviciosAprobados', JSON.stringify(serviciosActualizados));
    setConfirmDelete(false);
    setServicioToDeleteId(null);
    setMensajeDespuesDeCierre('Servicio eliminado con éxito');
    // Limpia el mensaje después de unos segundos (ajusta el tiempo según tus necesidades)
    setTimeout(() => setMensajeDespuesDeCierre(''), 3000);
  };

  const cancelDeleteHandler = () => {
    setConfirmDelete(false);
    setServicioToDeleteId(null);
    window.location.reload();

  };

  const handleEliminarServicio = (id) => {
    if (authToken && (rol === 'superadmin' || rol === 'admin')) {
      setConfirmDelete(true);
      setServicioToDeleteId(id);
    } else {
      alert('No tienes permisos para eliminar servicios.');
      window.location.reload();
    }
  };

  const handleEditarServicio = (id) => {
    if (authToken && (rol === 'superadmin' || rol === 'admin')) {
      const servicioAEditar = serviciosAprobados.find((servicio) => servicio.id === id);
      setServicioEditar(servicioAEditar);
      setModal(true);
      setTimeout(() => {
        setAnimarModal(true);
      }, 500);
    } else {
      alert('No tienes permisos para editar servicios.');
    }
  };
  const guardarServicio = (servicio) => {
    if (servicio.id !== "") {
      // Si el servicio ya tiene un ID, significa que está siendo editado
      const servicioAprobado = serviciosAprobados.find((servicioState) => servicioState.id === servicio.id);
  
      if (servicioAprobado) {
        // Eliminar el servicio de serviciosAprobados
        const serviciosActualizados = serviciosAprobados.filter((servicioState) => servicioState.id !== servicio.id);
        setServiciosAprobados(serviciosActualizados);
  
        // Agregar el servicio a serviciosTemporales
        setServiciosTemporales([...servicioTemporal, servicio]);
  
        setServicioEditar({});
      }
    } else {
      // Si el servicio no tiene un ID, es un servicio nuevo
      servicio.id = generarId();
      servicio.fecha = Date.now();
      setServiciosTemporales([...servicioTemporal, servicio]);
    }
  
    // Restablecer el estado y cerrar el modal
    setAnimarModal(false);
    setTimeout(() => {
      setModal(false);
      setMensajeDespuesDeCierre('Servicio enviado para su aprobación');
  
      // Mostrar el mensaje modal
      setMensajeModalVisible(true);
  
      // Borrar el mensaje después de 3 segundos (3000 ms)
      setTimeout(() => {
        setMensajeDespuesDeCierre('');
      }, 3000);
  
      // Ocultar el mensaje modal después de 3 segundos (3000 ms)
      setTimeout(() => {
        setMensajeModalVisible(false);
      }, 3000);
    }, 500); // Mostrar el mensaje después de cerrar el modal
  };
  
  useEffect(() => {
    // Actualizar servicios aprobados en el localStorage
    localStorage.setItem('serviciosAprobados', JSON.stringify(serviciosAprobados));
  }, [serviciosAprobados]);
  
  useEffect(() => {
    // Actualizar servicios temporales en el localStorage
    localStorage.setItem('serviciosTemporales', JSON.stringify(servicioTemporal));
  }, [servicioTemporal]);
  


  return (
    <div className={modal ? 'fijar' : ''}>
      <Header servicios={serviciosAprobados} />
      <ControlServicios cantidadServicios={serviciosAprobados.length} />
      <main>

     
        <Filtro filtro={filtro} setFiltro={setFiltro} />
        <ListadoServicios
          servicios={serviciosAprobados}
          setServicioEditar={setServicioEditar}
          eliminarServicio={handleEliminarServicio}
          editarServicio={handleEditarServicio}
          filtro={filtro}
          serviciosFiltrados={serviciosFiltrados}
        />
{confirmDelete && (
          <div className="confirmation-modal">
            <h3>¿Estás seguro de que quieres eliminar este servicio?</h3>
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

{mensajeModalVisible && <MsjServicio />}
          
      </main>
      {authToken && (rol === 'superadmin' || rol === 'admin') && (
        <div className='nuevo-gasto'>
          <img
            src={IconoNuevoServicio}
            alt='imagen nuevo servicio'
            onClick={handleNuevoServicio}
          />
        </div>
      )}

      {authToken && (rol === 'superadmin' || rol === 'admin') && modal && (
        <Modal
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarServicio={guardarServicio}
          servicioEditar={servicioEditar}
          setServicioEditar={setServicioEditar}
        />
      )}
    </div>
  );
}

export default Service;
