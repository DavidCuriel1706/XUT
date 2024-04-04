import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import styles from './registro.module.css';

export const Registro = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Enviar los datos al backend
    try {
      const response = await fetch('http://localhost:5001/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password,
          confirmPassword
        })
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (response.ok) {
        alert('Registro exitoso!');
        // Limpia los campos después de un registro exitoso
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        alert('Error al registrar. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error al enviar datos:', error);
      alert('Error al registrar. Por favor, inténtalo de nuevo.');
    }
  };
  
  return (
    <div className={styles.todo}>
      <h1>Registro</h1>

      <div className='division'></div>


      <form className={styles.formulario} onSubmit={handleSubmit}>
        <h3>Crea tu cuenta</h3>

        <label className='label-form'>Nombre</label>
        <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
          
        <label className='label-form'>Correo</label>
        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
          
        <label className='label-form'>Contraseña</label>
        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

        <label className='label-form'>Confirmar contraseña</label>
        <input type='password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

        <button className={styles.btn} type='submit'>Continuar</button>
      </form>


      <div className={styles.footer}>
        <label>¿Tienes una cuenta?</label>
        <Link className={styles.btn} to='/Login'>Iniciar Sesión</Link>
      </div>
      <Outlet />
    </div>
  );
};

