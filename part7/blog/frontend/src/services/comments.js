import axios from 'axios';
const baseUrl = (blog) => `/api/blogs/${blog.id}/comments`;

const getAll = (blog) => {
  const request = axios.get(baseUrl(blog));
  return request.then((response) => response.data);
};

const create = async (blog, text) => {
  const response = await axios.post(baseUrl(blog), { text: text });
  return response.data;
};

export default { getAll, create };
