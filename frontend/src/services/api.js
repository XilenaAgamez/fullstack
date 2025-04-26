import axios from 'axios';

//API backend python
const API_URL = 'http://localhost:8000/api/';

//login
export const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}token/`, credentials);
    return response;
  } catch (error) {
    console.error('Error al hacer login:', error.response?.data || error.message);
    throw error;
  }
};

//obtener usuarios (usando JWT)
export const getUsers = async (token) => {
  try {
    const response = await axios.get(`${API_URL}users/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error al obtener usuarios:', error.response?.data || error.message);
    throw error;
  }
};


//Crear un nuevo usuario
export const createUser = async (userData, token) => {
  try {
    console.log('Datos enviados para crear usuario:', userData);
    
    const response = await axios.post(`${API_URL}users/`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Respuesta de creación:', response.data);
    return response;
  } catch (error) {
    console.error('Error al crear usuario:', error.response?.data || error.message);
    throw error;
  }
};

//Editar usuario
export const updateUser = async (userId, userData, token) => {
  try {
    console.log('Datos enviados para actualizar usuario:', userData);
    
    const response = await axios.patch(`${API_URL}users/${userId}/`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    
    console.log('Respuesta de actualización:', response.data);
    return response;
  } catch (error) {
    console.error('Error al actualizar usuario:', error.response?.data || error.message);
    throw error;
  }
};

// Eliminar usuario
export const deleteUser = async (userId, token) => {
  try {
    const response = await axios.delete(`${API_URL}users/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error('Error al eliminar usuario:', error.response?.data || error.message);
    throw error;
  }
}; 