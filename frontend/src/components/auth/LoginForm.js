import React, { useState } from 'react';
import { login } from '../../services/api';
import '../../styles/LoginForm.css';

const LoginForm = ({ onLoginSuccess, onError }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await login({ username, password });
      // Si el login es exitoso, notificamos al componente padre
      onLoginSuccess(response.data.access);
    } catch (error) {
      // Solo notificamos al componente padre del error
      onError('Credenciales incorrectas');
    }
  };

  return (
    <div className="auth-box">
      <h1 className="auth-title">Iniciar Sesión</h1>
      <form onSubmit={handleLogin} className="auth-form">
        <div className="form-group">
          <label>Usuario</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="form-control"
            placeholder="Ingrese su usuario"
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="form-control"
            placeholder="Ingrese su contraseña"
          />
        </div>
        <button type="submit" className="btn-primary">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginForm; 