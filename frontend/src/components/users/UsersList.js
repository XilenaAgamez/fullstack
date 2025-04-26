import React, { useState } from 'react';
import UserEditForm from './UserEditForm';
import '../../styles/UsersList.css';

const UsersList = ({ users, onEdit, onDelete, fieldErrors }) => {
  const [editingUserId, setEditingUserId] = useState(null);

  const startEditing = (userId) => {
    setEditingUserId(userId);
  };

  const cancelEditing = () => {
    setEditingUserId(null);
  };

  const handleEdit = (userId, userData) => {
    onEdit(userId, userData);
    if (!fieldErrors) {
      setEditingUserId(null);
    }
  };

  return (
    <div className="users-list-container">
      <div className="users-list-header">
        <h2>Lista de Usuarios</h2>
      </div>
      
      {users.length > 0 ? (
        <div className="users-table-container">
          <table className="users-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre de Usuario</th>
                <th>Email</th>
                <th>Edad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  {editingUserId === user.id ? (
                    <td colSpan="5">
                      <UserEditForm 
                        user={user} 
                        onSubmit={(userData) => handleEdit(user.id, userData)} 
                        onCancel={cancelEditing}
                        fieldErrors={fieldErrors}
                      />
                    </td>
                  ) : (
                    <>
                      <td>{user.id}</td>
                      <td>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.age}</td>
                      <td className="action-buttons">
                        <button 
                          className="btn-edit" 
                          onClick={() => startEditing(user.id)}
                        >
                          Editar
                        </button>
                        <button 
                          className="btn-delete" 
                          onClick={() => onDelete(user.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-users-message">No hay usuarios registrados</p>
      )}
    </div>
  );
};

export default UsersList; 