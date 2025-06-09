// authService.js (corrigido)
import api from '../api';

export const registerUser = async (userData) => {
  try {
    const response = await api.post('/api/user', userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await api.post('/auth/login', loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerClientAndPet = async (clientData, petData) => {
  try {
    const response = await api.post('/clients/dashboard/register-client', {
      clientData,
      petData,
    });
    return response.data;
  } catch (error) {
    console.error('Error registering client and pet:', error);
    throw error;
  }
};
