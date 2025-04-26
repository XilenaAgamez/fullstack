// src/App.js
import React, { useState, useEffect } from 'react';
import { getUsers, updateUser, deleteUser, createUser } from './services/api';
import LoginForm from './components/auth/LoginForm';
import UsersList from './components/users/UsersList';
import UserForm from './components/users/UserForm';
import UserStats from './components/reports/UserStats';
import './styles/common.css';
import './App.css';

// Constantes para las vistas
const VIEWS = {
  LIST: 'list',
  REGISTER: 'register',
  STATS: 'stats'
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [currentView, setCurrentView] = useState(VIEWS.LIST);
  const [fieldErrors, setFieldErrors] = useState(null);
  const [editFieldErrors, setEditFieldErrors] = useState(null);

  // Verificar token al cargar la página
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUsers(storedToken);
    }
  }, []);


  //Limpiar mensaje de éxito después de 3 segundos
  useEffect(() => {
    let timer;
    if (successMessage) {
      timer = setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [successMessage]);

  //cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUsers([]);
    setErrorMessage('');
    setSuccessMessage('Sesión cerrada correctamente');
  };

  // Función para obtener los usuarios
  const fetchUsers = async (accessToken) => {
    try {
      const response = await getUsers(accessToken);
      setUsers(response.data);
    } catch (error) {
      // Si el token expiró o es inválido, cerrar sesión
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setToken(null);
        setErrorMessage('La sesión ha expirado. Por favor, inicie sesión nuevamente.');
        return;
      }
      
      //Mostrar el mensaje exacto que viene del backend
      if (error.response?.data?.detail) {
        setErrorMessage(error.response.data.detail);
      } else if (error.response?.data) {
        setErrorMessage(JSON.stringify(error.response.data));
      } else {
        setErrorMessage(error.message || 'Error desconocido');
      }
      setSuccessMessage('');
    }
  };


  // esto es para cuando el login es exitoso
  const handleLoginSuccess = (accessToken) => {
    localStorage.setItem('token', accessToken);
    setToken(accessToken);
    setErrorMessage('');
    setSuccessMessage('Inicio de sesión exitoso');
    fetchUsers(accessToken);
  };


  // esto es para cambiar de vista
  const changeView = (view) => {
    setCurrentView(view);
    setFieldErrors(null);
    setEditFieldErrors(null);
    setErrorMessage('');
  };

  // aqui para cancelar la adición de usuario
  const handleCancelAdd = () => {
    changeView(VIEWS.LIST);
  };

  //aqui para crear un nuevo usuario
  const handleCreateUser = async (userData) => {
    try {
      console.log('Creando usuario con datos:', userData);
      await createUser(userData, token);
      fetchUsers(token);
      changeView(VIEWS.LIST);
      setSuccessMessage('Usuario creado correctamente');
    } catch (error) {
      //Si el token expiró o es inválido, cerrar sesión
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setToken(null);
        setErrorMessage('La sesión ha expirado. Por favor, inicie sesión nuevamente.');
        return;
      }
      
      console.log('Error del backend durante creación:', error.response?.data);
      
      //Usamos exactamente los errores que vienen del backend
      if (error.response?.data && typeof error.response.data === 'object') {
        // Si son errores de validación de campo
        setFieldErrors(error.response.data);
        
        //aca si hay un mensaje de error general
        if (error.response.data.detail) {
          setErrorMessage(error.response.data.detail);
        } else if (error.response.data.non_field_errors) {
          //Si hay errores que no están asociados a un campo específico
          setErrorMessage(Array.isArray(error.response.data.non_field_errors) 
            ? error.response.data.non_field_errors[0] 
            : error.response.data.non_field_errors);
        } else {
          //aqui construyo un mensaje con todos los errores
          const errorMessages = Object.entries(error.response.data)
            .map(([field, messages]) => {
              const message = Array.isArray(messages) ? messages[0] : messages;
              return `${field}: ${message}`;
            })
            .join('. ');
          setErrorMessage(errorMessages || '');
        }
      } else {
        //Mensaje de error general
        setErrorMessage(error.message || 'Error desconocido');
        setFieldErrors(null);
      }
      
      setSuccessMessage('');
    }
  };

  //editar usuario
  const handleEditUser = async (userId, userData) => {
    try {
      console.log('Editando usuario:', userId, 'con datos:', userData);
      await updateUser(userId, userData, token);
      
      // Después de actualizar, refrescamos la lista
      fetchUsers(token);
      setErrorMessage(''); // Limpiamos mensaje de error si la operación fue exitosa
      setEditFieldErrors(null);
      setSuccessMessage('Usuario actualizado correctamente');
    } catch (error) {
      // Si el token expiró o es inválido, cerrar sesión
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setToken(null);
        setErrorMessage('La sesión ha expirado. Por favor, inicie sesión nuevamente.');
        return;
      }
      
      console.log('Error del backend durante edición:', error.response?.data);
      
      if (error.response?.data && typeof error.response.data === 'object') {
        // Si son errores de validación de campo
        setEditFieldErrors(error.response.data);
        
        // Si hay un mensaje de error general
        if (error.response.data.detail) {
          setErrorMessage(error.response.data.detail);
        } else if (error.response.data.non_field_errors) {
          // Si hay errores que no están asociados a un campo específico
          setErrorMessage(Array.isArray(error.response.data.non_field_errors) 
            ? error.response.data.non_field_errors[0] 
            : error.response.data.non_field_errors);
        } else {
          // Construir un mensaje con todos los errores
          const errorMessages = Object.entries(error.response.data)
            .map(([field, messages]) => {
              const message = Array.isArray(messages) ? messages[0] : messages;
              return `${field}: ${message}`;
            })
            .join('. ');
          setErrorMessage(errorMessages || '');
        }
      } else {
        // Mensaje de error general
        setErrorMessage(error.message || 'Error desconocido');
        setEditFieldErrors(null);
      }
      
      setSuccessMessage('');
    }
  };

  // Handler para eliminar un usuario
  const handleDeleteUser = async (userId) => {
    if (window.confirm('¿Está seguro que desea eliminar este usuario?')) {
      try {
        await deleteUser(userId, token);
        // Después de eliminar, refrescamos la lista
        fetchUsers(token);
        setErrorMessage(''); // Limpiamos mensaje de error si la operación fue exitosa
        setSuccessMessage('Usuario eliminado correctamente');
      } catch (error) {
        // Si el token expiró o es inválido, cerrar sesión
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          setToken(null);
          setErrorMessage('La sesión ha expirado. Por favor, inicie sesión nuevamente.');
          return;
        }
        
        // Mostrar el mensaje exacto que viene del backend
        if (error.response?.data?.detail) {
          setErrorMessage(error.response.data.detail);
        } else if (error.response?.data) {
          setErrorMessage(JSON.stringify(error.response.data));
        } else {
          setErrorMessage(error.message || 'Error desconocido');
        }
        setSuccessMessage('');
      }
    }
  };

  // Handler para manejar errores
  const handleError = (message) => {
    setErrorMessage(message);
    setSuccessMessage('');
  };

  // Renderiza la vista actual
  const renderCurrentView = () => {
    switch (currentView) {
      case VIEWS.REGISTER:
        return (
          <UserForm 
            onSubmit={handleCreateUser} 
            onCancel={handleCancelAdd}
            fieldErrors={fieldErrors}
          />
        );
      case VIEWS.STATS:
        return <UserStats users={users} />;
      case VIEWS.LIST:
      default:
        return (
          <UsersList 
            users={users} 
            onEdit={handleEditUser} 
            onDelete={handleDeleteUser}
            fieldErrors={editFieldErrors}
          />
        );
    }
  };

  return (
    <div className="app-container">
      {!token ? (
        <div className="auth-container">
          <LoginForm 
            onLoginSuccess={handleLoginSuccess} 
            onError={handleError}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      ) : (
        <>
          <div className="app-header">
            <h1 className="app-title">Gestión de Usuarios</h1>
            <div className="app-navigation">
              <button 
                className={`nav-link ${currentView === VIEWS.LIST ? 'active' : ''}`}
                onClick={() => changeView(VIEWS.LIST)}
              >
                Lista
              </button>
              <button 
                className={`nav-link ${currentView === VIEWS.REGISTER ? 'active' : ''}`}
                onClick={() => changeView(VIEWS.REGISTER)}
              >
                Registro
              </button>
              <button 
                className={`nav-link ${currentView === VIEWS.STATS ? 'active' : ''}`}
                onClick={() => changeView(VIEWS.STATS)}
              >
                Estadísticas
              </button>
              <button 
                className="nav-link logout"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
          
          {renderCurrentView()}
          
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </>
      )}
    </div>
  );
};

export default App;
