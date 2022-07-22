import axios from 'axios';
import tokenUtils from '../utils/tokenUtils';
const baseUrl = '/api/blogs';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getById = async (id) => {
  const request = await axios.get(`${baseUrl}/${id}`);
  return request.data;
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: tokenUtils.getToken() },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (updatedObject) => {
  const response = await axios.put(
    `${baseUrl}/${updatedObject.id}`,
    updatedObject
  );
  return response.data;
};

const remove = async (removeObject) => {
  const config = {
    headers: { Authorization: tokenUtils.getToken() },
  };
  const response = await axios.delete(`${baseUrl}/${removeObject.id}`, config);
  return response.data;
};

export default { getAll, getById, create, update, remove };
