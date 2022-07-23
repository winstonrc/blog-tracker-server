import axios from 'axios';
const baseUrl = (id) => `/api/blogs/${id}/comments`;

const getAll = (id) => {
  const request = axios.get(baseUrl(id));
  return request.then((response) => response.data);
};

const create = async (id, text) => {
  const response = await axios.post(baseUrl(id), text);
  return response.data;
};

export default { getAll, create };
