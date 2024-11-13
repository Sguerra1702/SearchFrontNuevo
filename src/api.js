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
