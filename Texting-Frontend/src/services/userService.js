import axios from 'axios';
const baseUrl = 'http://localhost:3000/api/users';

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(baseUrl, newObject).then((response) => response.data);
};

const update = (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

const getOne = (id) => {
  return axios.get(`${baseUrl}/${id}`).then((response) => response.data);
};

const login = (credentials) => {
  return axios
    .post('http://localhost:3000/api/login', credentials, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => response.data);
};

export default { getAll, create, update, getOne, login };
