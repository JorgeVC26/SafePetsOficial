import React, { useEffect, useState } from 'react';
import './detalleServicio.css';
import Footer from "../footer/footer";



const DetalleServicio = () => {
  const [detalleServicio, setDetalleServicio] = useState(null);

  useEffect(() => {
    // Obtener detalles del servicio almacenados en localStorage
    const storedDetails = localStorage.getItem('detalleServicio');
    if (storedDetails) {
      setDetalleServicio(JSON.parse(storedDetails));
      // Limpiar el item de localStorage después de obtener los detalles
      localStorage.removeItem('detalleServicio');
    }
  }, []);

  return (
    <div>
    <header>
      <a className="titulo" href="/">
        <h1>Safe<span>Pets</span></h1>
      </a>
    </header>
    

    <div className='cont__servicio'>

      <div className='__title'>
        <h2>Detalles del Servicio</h2>
      </div>
      {detalleServicio && (
        <div className='dato__s'>
          {/* Mostrar detalles del servicio */}
          <div className='__info'>
            <p className='__subTitle'>Categoría: <span style={{ color: 'var(--celeste)', fontWeight: 'bold' }}>{ detalleServicio.categoria}</span> </p>
            <p className='__subTitle'>Nombre Completo: <span style={{ color: 'var(--celeste)', fontWeight: 'bold' }}>{detalleServicio.nombre} {detalleServicio.apellido}</span> </p>
            <p className='__subTitle'>Teléfono: <span style={{ color: 'var(--celeste)', fontWeight: 'bold' }}>{detalleServicio.telefono}</span> </p>
            <p className='__subTitle'>Ubicación: <span style={{ color: 'var(--celeste)', fontWeight: 'bold' }}>{detalleServicio.ubicacion}</span> </p>
          </div>
          <div className='contenido__datos'>
            <p className='__subTitle'>Sobre mi: <span style={{ color: 'var(--celeste)', fontWeight: 'bold' }}>{detalleServicio.descripcion}</span> </p>
            <p className='__subTitle'>Tarifa: <span style={{ color: 'var(--celeste)', fontWeight: 'bold' }}>₡{detalleServicio.precio}</span> </p>
            <p className='__subTitle'>Creado por: <span style={{ color: 'var(--celeste)', fontWeight: 'bold' }}>{detalleServicio.usuarioActivoName}</span> </p>
            <p className='__subTitle'>Agregado el: <span style={{ color: 'var(--celeste)', fontWeight: 'bold' }}>{detalleServicio.fecha}</span> </p>
            {/* ... (mostrar otros detalles) */}
          </div>
        </div>
      )}
    </div>
    <Footer />

    </div>
  );
};

export default DetalleServicio;