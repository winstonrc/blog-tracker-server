import axios from 'axios';
import tokenUtils from '../utils/tokenUtils';

const baseUrl = (id) => `/api/blogs/${id}/comments`;

const getAll = (id) => {
  const request = axios.get(baseUrl(id));
  return request.then((response) => response.data);
};

const create = async (id, text) => {
  const config = {
    headers: { Authorization: tokenUtils.getToken() },
  };

  const newObject = {
    text: text,
  };

  const response = await axios.post(baseUrl(id), newObject, config);
  return response.data;
};

export default { getAll, create };
