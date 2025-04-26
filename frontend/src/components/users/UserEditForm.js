import React, { useState } from 'react';
import '../../styles/UserForm.css';

const UserEditForm = ({ user, onSubmit, onCancel, fieldErrors }) => {
  const [username, setUsername] = useState(user.username || '');
  const [email, setEmail] = useState(user.email || '');
  const [age, setAge] = useState(user.age || '');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Crear objeto con solo los campos que se han modificado
    const userData = {};
    
    if (username !== user.username) userData.username = username;
    if (email !== user.email) userData.email = email;
    
    if (age !== '') {
      const ageNum = parseInt(age, 10);
      if (!isNaN(ageNum) && ageNum !== user.age) {
        userData.age = ageNum;
      }
    } else if (user.age && age === '') {
      userData.age = null; 
    }
    
    // Solo enviar la solicitud si hay cambios
    if (Object.keys(userData).length > 0) {
      onSubmit(userData);
    } else {
      onCancel(); // Si no hay cambios, cancelamos
    }
  };

  //obtenemos el mensaje de error exacto del backend
  const getErrorMessage = (field) => {
    if (!fieldErrors || !fieldErrors[field]) return null;
    
    if (Array.isArray(fieldErrors[field])) {
      return fieldErrors[field][0];
    }
    
    return fieldErrors[field];
  };

  return (
    <div className="user-edit-form">
      <form onSubmit={handleSubmit} className="edit-form-inline">
        <div className="edit-form-fields">
          <div className="edit-form-field">
            <label htmlFor="edit-username">Usuario:</label>
            <input
              id="edit-username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`form-control ${fieldErrors?.username ? 'input-error' : ''}`}
              required
            />
            {getErrorMessage('username') && (
              <span className="field-error-message">{getErrorMessage('username')}</span>
            )}
          </div>
          
          <div className="edit-form-field">
            <label htmlFor="edit-email">Email:</label>
            <input
              id="edit-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-control ${fieldErrors?.email ? 'input-error' : ''}`}
              required
            />
            {getErrorMessage('email') && (
              <span className="field-error-message">{getErrorMessage('email')}</span>
            )}
          </div>
          
          <div className="edit-form-field">
            <label htmlFor="edit-age">Edad:</label>
            <input
              id="edit-age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className={`form-control ${fieldErrors?.age ? 'input-error' : ''}`}
              min="1"
              max="120"
            />
            {getErrorMessage('age') && (
              <span className="field-error-message">{getErrorMessage('age')}</span>
            )}
          </div>
        </div>
        
        <div className="edit-form-actions">
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

export default UserEditForm; 