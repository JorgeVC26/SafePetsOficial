import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import IconoNuevoServicio from '../img/nuevo-gasto.svg';
import CerrarBtn from '../img/cerrar.svg';
import { formatearFecha } from './helpers';
import '../Style/style.css';
import '../App.css';
import IconoPaseo from '../img/paseo.avif';
import IconoComida from '../img/comida-mascota.png';
import IconoHigiene from '../img/higiene_mascota.png';
import IconoCuido from '../img/cuido_completo.png';

function ServiciosPublicos() {
  const diccionarioIconos = {
    paseo: IconoPaseo,
    restaurante: IconoComida,
    higiene: IconoHigiene,
    cuido: IconoCuido
  };

  const [serviciosMostrados, setServiciosMostrados] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [servicioACalificar, setServicioACalificar] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [calificacion, setCalificacion] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const obtenerServiciosDelLocalStorage = () => {
    const serviciosAprobados = JSON.parse(localStorage.getItem('serviciosAprobados')) || [];
    setServiciosMostrados(serviciosAprobados);
  };

  const abrirModalCalificacion = (servicio) => {
    setServicioACalificar(servicio);
    setCalificacion(servicio.calificacion || 0);
    setModalVisible(true);
  };

  const verDetalles = (servicio) => {
    localStorage.setItem('detalleServicio', JSON.stringify(servicio));
    window.location.href = '/detalleServicio';
  };

  const cerrarModalCalificacion = () => {
    setServicioACalificar(null);
    setCalificacion(0);
    setModalVisible(false);
  };

  const calificarServicio = () => {
    if (servicioACalificar) {
      const serviciosActualizados = [...serviciosMostrados];
      const indexServicioACalificar = serviciosActualizados.findIndex(servicio => servicio.id === servicioACalificar.id);

      if (indexServicioACalificar !== -1) {
        if (!serviciosActualizados[indexServicioACalificar].calificaciones) {
          serviciosActualizados[indexServicioACalificar].calificaciones = [];
        }

        serviciosActualizados[indexServicioACalificar].calificaciones.push(calificacion);

        const calificaciones = serviciosActualizados[indexServicioACalificar].calificaciones;

        if (calificaciones.length > 0) {
          const calificacionesNumeros = calificaciones.map(calificacion => parseFloat(calificacion));
          const sumatoriaCalificaciones = calificacionesNumeros.reduce((acc, curr) => acc + curr, 0);
          const promedio = sumatoriaCalificaciones / calificacionesNumeros.length;
          serviciosActualizados[indexServicioACalificar].promedioCalificaciones = promedio;
        }

        setServiciosMostrados(serviciosActualizados);
        localStorage.setItem('serviciosAprobados', JSON.stringify(serviciosActualizados));
      }

      cerrarModalCalificacion();
    }
  };

  useEffect(() => {
    obtenerServiciosDelLocalStorage();
  }, []);

  return (
    <div>
      <header>
        <div>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <a className="titulo" href="/">
              <h1>Safe<span>Pets</span></h1>
            </a>
          </Link>
        </div>
      </header>
      <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <p>Imagen aquí</p>
        <div className="contenido-presupuesto">
          <p>{serviciosMostrados.length} servicios disponibles</p>
        </div>
      </div>
      <div className="filtros sombra contenedor" style={{ margin: '70px auto' }}>
        <form>
          <div className='campo'>
            <label>Filtrar Servicios</label>
            <select
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
            >
              <option value="">-- Todas las Categorías --</option>
              <option value="paseo">Paseo</option>
              <option value="higiene">Higiene y Estética</option>
              <option value="cuido">Cuidado completo</option>
              <option value="restaurante">Restaurante</option>
            </select>
          </div>
        </form>
      </div>
      <div className='listado-gastos contenedor'>
        {serviciosMostrados.length > 0 ? (
          <>
            <h2>Servicios</h2>
            {serviciosMostrados
              .filter(servicio => !filtro || servicio.categoria === filtro)
              .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
              .map((servicio, index) => (
                <div className='gasto sombra' key={index}>
                  <div className='contenido-gasto'>
                    <img src={diccionarioIconos[servicio.categoria]} alt="Icono servicio" />
                    <div className='descripcion-gasto'>
                      <p className='categoria'>{servicio.categoria}</p>
                      <p className='nombre-gasto'>{servicio.nombre}</p>
                      <p className='nombre-gasto'>{servicio.ubicacion}</p>
                      <p className='nombre-gasto'>Creado por: {servicio.usuarioActivoName}</p>
                      <p className='fecha-gasto'>
                        Agregado el: <span>{formatearFecha(servicio.fecha)}</span>
                      </p>
                      {servicio.promedioCalificaciones && (
                        <p className='fecha-gasto'>Calificación: {servicio.promedioCalificaciones.toFixed(2)}</p>
                      )}
                      <button className='nombre-gasto calificar' onClick={() => abrirModalCalificacion(servicio)}>Calificar</button>
                    </div>
                  </div>
                  <p className='cantidad-gasto'>₡{servicio.precio}</p>

                  <button className="ver-mas-btn" onClick={() => verDetalles(servicio)}>
                    Ver Más
                  </button>
                </div>
              ))}
            <div className="pagination">
              {Array.from({ length: Math.ceil(serviciosMostrados.length / itemsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </>
        ) : (
          <h2>No hay servicios</h2>
        )}
      </div>

      {modalVisible && (
        <div className="modal modal_Calificacion">
          <div className="cerrar-modal">
            <img
              src={CerrarBtn}
              alt="cerrar modal"
              onClick={cerrarModalCalificacion}
            />
          </div>
          <div className='campo'>
            <h2>Calificar Servicio</h2>
            <p>Servicio: {servicioACalificar.nombre}</p>
            <label>Calificación:</label>
            <div className="estrellas">
              {[1, 2, 3, 4, 5].map((valor) => (
                <FaStar
                  key={valor}
                  className={valor <= calificacion ? 'estrella-activa' : 'estrella-inactiva'}
                  onClick={() => setCalificacion(valor)}
                />
              ))}
            </div>
            <button className='btn_cancelar' onClick={cerrarModalCalificacion}>Cancelar</button>
            <button className='btn_calificar' onClick={calificarServicio}>Calificar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ServiciosPublicos;