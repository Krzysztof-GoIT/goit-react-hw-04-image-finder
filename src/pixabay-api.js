import axios from 'axios';

export const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '45175541-9cc476e012fb2174069326f55';
//Pixabay user - litono2670:litono2670@qodiq.com

export const getAPI = async (query, page) => {
  const url = `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`;

  const response = await axios.get(url);

  return response.data;
};
