import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/messages';

const getAll = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    const response = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      localStorage.removeItem('token');
      throw new Error('Session expired. Please login again.');
    }
    throw error;
  }
};

const create = async (newObject) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    const response = await axios.post(baseUrl, newObject, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      localStorage.removeItem('token');
      throw new Error('Session expired. Please login again.');
    }
    throw error;
  }
};

export default { getAll, create };
