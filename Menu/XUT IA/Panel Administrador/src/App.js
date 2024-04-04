import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Login } from './componentes/login/login';
// import { Inicio } from './componentes/inicio/inicio';
// import { Registro } from './componentes/registro/registro';
// import { Carga } from './componentes/inicio/carga';
import { Registro } from './components/Auth/registro';
import { Login } from './components/login'
import { HomeEstado } from './components/menus/homeEstado'
import { Bienvenidos } from './components/bienvenidos'
import { HomeRecursos } from './components/menus/menuRecursos'
import { HomeApis } from './components/menus/homeApi'; 
import { HomeConfiguracion } from './components/menus/homeConfiguracion';
import { HomeReglas } from './components/menus/homeReglas';

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Bienvenidos />} />
          <Route path='/login' element={<Login/>} />
          <Route path="/registrar" element={<Registro/>} /> 
          <Route path="/home" element={<HomeEstado />} />   
          <Route path="/homeRecursos" element={<HomeRecursos />} />   
          <Route path="/homeApis" element={<HomeApis />} />  
          <Route path="/homeConfiguracion" element={<HomeConfiguracion />} /> 
          <Route path="/homeReglas" element={<HomeReglas />} /> 
        </Routes>
      </Router>
    );
  };

export default App;