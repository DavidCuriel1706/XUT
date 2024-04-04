import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Styles from './login.module.css'

export const Login = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          password
        })
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (response.ok) {
        alert('Inicio de sesión exitoso!');
        // Redirige al usuario a la página de inicio
        navigate('/home');
      } else {
        alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      alert('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };
  
  return (
    <div className={Styles.todos}>
      <h1>XUT</h1>

      <div className={Styles.division}></div>

      <form className={Styles.formulario} onSubmit={handleSubmit}>
        <h2>Iniciar sesión en tu cuenta</h2>

        <label>Nombre:</label>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
        
        <label>Contraseña:</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

        <Link className={Styles.olvidaste}>¿Olvidaste tu contraseña?</Link>

        <button className={Styles.btn} type='submit'>Continuar</button>
      </form>

      <div className={Styles.footer}>
        <p className={Styles.olvidaste}>¿No tienes una cuenta?</p>
        <Link className={Styles.btn} to="/registrar">Registrate</Link>

      </div>
    </div>
  );
};
