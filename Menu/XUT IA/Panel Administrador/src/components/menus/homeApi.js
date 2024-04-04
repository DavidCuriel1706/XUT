import React from 'react';
import { Link } from 'react-router-dom';

import imagen1 from '../imagenes/XUT1.png'
import imagen2 from '../imagenes/XUT2.png'
import logosalir from '../imagenes/SALIR.png'
import Styles from './homeApi.module.css'

export const HomeApis = () => {
  return (
    <div className={Styles.contenedortodo}>
      <div className={Styles.todocontenedor}>
        <img src={imagen1} className={Styles.logo1}/>
        <p className={Styles.titulo}>Xtreme-View Universal Technology</p>
        <img src={logosalir} className={Styles.logosalir}/>
      </div>


      <div className={Styles.contenedorAbajo}>
        {/* contenedor izquierda */}
        <div className={Styles.contenedorIzquierda}>
            <div className={Styles.enlaces}>
              <h3 className={Styles.hmenu}>Menu</h3>

              <Link to='/home'>Estado</Link>
              <Link to='/homeRecursos'>Recursos</Link>
              <Link to='/homeApis' className={Styles.apis}>APIS</Link>
              <Link to='/homeConfiguracion'>Configuracion</Link>
              <Link to='/homeReglas'>Reglas</Link>
            </div>

            <div className={Styles.desarrollado}>

              <img src={imagen2} className={Styles.logo2}/>

              <div className={Styles.parrafos}>
                <p>Desarrollado por:</p>
                <p>Ejercito ISIR</p>
              </div>


            </div>


        </div>

        {/* contenedor derecha */}

        <div className={Styles.contenedorDerecha}>



        </div>


      </div>

      
    </div>
  );
};