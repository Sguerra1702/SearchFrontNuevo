import axios from 'axios';

const API_BASE_URL = 'http://localhost:8093/search';

export const searchByParam = async (param, type) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/param`, {
      params: { param, type }
    });
    return response.data;
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    return [];
  }
};


export const searchByCode = async (id) => {
  try {
    console.log('code', id);
    const response = await axios.get(`${API_BASE_URL}/id`, {
      params: { id }
      
    });
    console.log('response', response);
    return response.data;
  } catch (error) {
    console.log('error', error);
    console.error('Error en la búsqueda:', error);
    return [];
  }
}