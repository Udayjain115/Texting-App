import axios from 'axios';
baseUrl = 'http://localhost:3000/api/messages';

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

export default { getAll, create };
