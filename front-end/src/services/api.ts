import axios from 'axios';

// Criando uma base url.
const api = axios.create({
  baseURL: 'http://localhost:3333/',
})

export default api;