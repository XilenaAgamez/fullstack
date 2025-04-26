import React, { useState } from 'react';
import '../../styles/UserForm.css';

const UserForm = ({ onSubmit, onCancel, fieldErrors }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construir el objeto de usuario con valores apropiados
    const userData = {
      username: username.trim(),
      email: email.trim()
    };
    
    // Solo incluir age si tiene un valor
    if (age !== '') {
      const ageNum = parseInt(age, 10);
      if (!isNaN(ageNum)) {
        userData.age = ageNum;
      }
    }
    
    // Enviar datos al componente padre
    onSubmit(userData);
  };

  // Obtiene el mensaje de error exacto del backend, puede ser un string o un array
  const getErrorMessage = (field) => {
    if (!fieldErrors || !fieldErrors[field]) return null;
    
    // Si el error es un array, mostramos el primer mensaje
    if (Array.isArray(fieldErrors[field])) {
      return fieldErrors[field][0];
    }
    
    return fieldErrors[field];
  };

  return (
    <div className="user-form-container">
      <h2 className="form-title">Agregar Nuevo Usuario</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="username">Nombre de Usuario:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`form-control ${fieldErrors?.username ? 'input-error' : ''}`}
            placeholder="Ingrese el nombre de usuario"
            required
          />
          {getErrorMessage('username') && (
            <span className="field-error-message">{getErrorMessage('username')}</span>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`form-control ${fieldErrors?.email ? 'input-error' : ''}`}
            placeholder="Ingrese su correo electrónico"
            required
          />
          {getErrorMessage('email') && (
            <span className="field-error-message">{getErrorMessage('email')}</span>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="age">Edad:</label>
          <input
            id="age"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className={`form-control ${fieldErrors?.age ? 'input-error' : ''}`}
            placeholder="Ingrese la edad"
            min="1"
            max="120"
          />
          {getErrorMessage('age') && (
            <span className="field-error-message">{getErrorMessage('age')}</span>
          )}
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn-success">
            Guardar
          </button>
          <button 
            type="button" 
            className="btn-secondary"
            onClick={onCancel}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm; 