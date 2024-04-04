import React from 'react'
import { Outlet } from 'react-router-dom'
import { Link } from 'react-router-dom';

import imagen from './imagenes/image1.png'
import imagen2 from './imagenes/XUT2.png'
import kibana from './imagenes/image2.png'
import './bienvenidos.css'

export const Bienvenidos = () => {
  return (
    <div className='todo'>


        <h1 className='bienvenidos'>BIENVENIDOS</h1>

        <div className='separacion'></div>


        {/* Contenedor izquierda */}
        <div className='contenedores_login'>
          <div className='Contenedor-izquierda'>
            <img className='Imagenes' src={imagen} alt='Logo XUT'/>
            <div className='contenedor-kibana'>
              <img className='imagen-kibana' src={kibana} alt='logo kibana'/>
              <p className='text-kibana'>ibana</p>
            </div>
            
            <a className='boton'>ADMINISTRAR</a>
          </div>

          {/* Contenedor derecho */}
          <div className='Contenedor-derecha'>
            <img className='Imagenes' src={imagen} alt='Logo XUT'/>
            <div className='contenedor-kibana'>
              <p className='text-kibana'>IA</p>
            </div>

            <Link to="/Login" className='boton boton-2' >INICIAR</Link>
          </div>
        </div>

        {/* Contenedor ultimo */}
        <div className='abajo'>
          <div className='izquierda'>
            <img src={imagen2} alt='logo isir'/>
            <div className='parrafos'>
              <p>Desarrollado por:</p>
              <p>Ejercito ISIR</p>
            </div>
          </div>
          <div className='derecha'>
            <a>Ayuda</a>
          </div>
        </div>
        <Outlet />
    </div>
  )
}